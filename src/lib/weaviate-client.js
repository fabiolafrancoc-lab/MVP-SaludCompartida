/**
 * Weaviate Client Wrapper para Lupita AI Brain
 * 
 * Funciones helper para búsquedas semánticas, híbridas y filtradas
 * Optimizado para el caso de uso de llamadas diarias a usuarios
 */

import weaviate from 'weaviate-ts-client';
import OpenAI from 'openai';

class WeaviateAI {
  constructor() {
    // Extraer el host del URL (sin https://)
    const weaviateUrl = process.env.WEAVIATE_URL?.replace('https://', '').replace('http://', '');
    
    this.client = weaviate.client({
      scheme: 'https',
      host: weaviateUrl,
      apiKey: {
        apiKey: process.env.WEAVIATE_API_KEY
      },
      headers: {
        'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY
      }
    });

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  /**
   * Genera embedding para búsqueda
   */
  async generateEmbedding(text) {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        dimensions: 1536
      });
      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generando embedding:', error);
      return null;
    }
  }

  /**
   * Buscar llamadas similares del mismo usuario
   * Caso de uso: Antes de llamar, revisar historial del usuario
   */
  async searchUserCallHistory(userPhone, query, limit = 10) {
    try {
      const queryVector = await this.generateEmbedding(query);

      const result = await this.client.graphql
        .get()
        .withClassName('CallRecording')
        .withFields('userPhone transcription analysis sentiment topics redFlags callDate churnRisk _additional { distance }')
        .withNearVector({
          vector: queryVector,
          certainty: 0.7
        })
        .withWhere({
          path: ['userPhone'],
          operator: 'Equal',
          valueText: userPhone
        })
        .withLimit(limit)
        .do();

      return result.data.Get.CallRecording || [];
    } catch (error) {
      console.error('Error buscando historial:', error);
      return [];
    }
  }

  /**
   * Buscar llamadas similares de otros usuarios (transfer learning)
   * Caso de uso: Usuario nuevo - aprender de usuarios similares
   */
  async searchSimilarUsersCalls(query, filters = {}, limit = 20) {
    try {
      const queryVector = await this.generateEmbedding(query);

      let graphqlQuery = this.client.graphql
        .get()
        .withClassName('CallRecording')
        .withFields('userPhone userAccessCode transcription analysis sentiment topics ageRange userRegion migrantLocation churnRisk _additional { distance }')
        .withNearVector({
          vector: queryVector,
          certainty: 0.7
        })
        .withLimit(limit);

      // Agregar filtros opcionales
      if (filters.ageRange) {
        graphqlQuery = graphqlQuery.withWhere({
          path: ['ageRange'],
          operator: 'Equal',
          valueText: filters.ageRange
        });
      }

      if (filters.userRegion) {
        graphqlQuery = graphqlQuery.withWhere({
          path: ['userRegion'],
          operator: 'Equal',
          valueText: filters.userRegion
        });
      }

      if (filters.sentiment) {
        graphqlQuery = graphqlQuery.withWhere({
          path: ['sentiment'],
          operator: 'Equal',
          valueText: filters.sentiment
        });
      }

      const result = await graphqlQuery.do();
      return result.data.Get.CallRecording || [];
    } catch (error) {
      console.error('Error buscando llamadas similares:', error);
      return [];
    }
  }

  /**
   * Búsqueda híbrida: Vector + Keywords (BM25)
   * Caso de uso: Buscar menciones específicas + contexto semántico
   */
  async hybridSearch(query, keywords, filters = {}, limit = 15) {
    try {
      const queryVector = await this.generateEmbedding(query);

      let graphqlQuery = this.client.graphql
        .get()
        .withClassName('CallRecording')
        .withFields('userPhone transcription analysis sentiment topics redFlags callDate churnRisk _additional { score }')
        .withHybrid({
          query: keywords,
          vector: queryVector,
          alpha: 0.7 // 0.7 = más peso a vector, 0.3 a keywords
        })
        .withLimit(limit);

      // Agregar filtros
      if (filters.ageRange) {
        graphqlQuery = graphqlQuery.withWhere({
          path: ['ageRange'],
          operator: 'Equal',
          valueText: filters.ageRange
        });
      }

      const result = await graphqlQuery.do();
      return result.data.Get.CallRecording || [];
    } catch (error) {
      console.error('Error en búsqueda híbrida:', error);
      return [];
    }
  }

  /**
   * Buscar patrones de churn
   * Caso de uso: Detectar señales de cancelación
   */
  async searchChurnPatterns(minChurnRisk = 0.6, limit = 50) {
    try {
      const result = await this.client.graphql
        .get()
        .withClassName('CallRecording')
        .withFields('userPhone transcription analysis sentiment topics redFlags churnRisk callDate')
        .withWhere({
          path: ['churnRisk'],
          operator: 'GreaterThan',
          valueNumber: minChurnRisk
        })
        .withSort([{
          path: ['churnRisk'],
          order: 'desc'
        }])
        .withLimit(limit)
        .do();

      return result.data.Get.CallRecording || [];
    } catch (error) {
      console.error('Error buscando patrones de churn:', error);
      return [];
    }
  }

  /**
   * Buscar conocimiento colectivo
   * Caso de uso: Encontrar técnicas que funcionaron en situaciones similares
   */
  async searchCollectiveKnowledge(query, knowledgeType = null, limit = 10) {
    try {
      const queryVector = await this.generateEmbedding(query);

      let graphqlQuery = this.client.graphql
        .get()
        .withClassName('CollectiveKnowledge')
        .withFields('knowledgeType content context outcomeType effectivenessScore successRate ageRange userRegion isSticky isWarningSignal _additional { distance }')
        .withNearVector({
          vector: queryVector,
          certainty: 0.75
        })
        .withLimit(limit);

      // Filtrar por tipo de conocimiento
      if (knowledgeType) {
        graphqlQuery = graphqlQuery.withWhere({
          path: ['knowledgeType'],
          operator: 'Equal',
          valueText: knowledgeType
        });
      }

      // Ordenar por efectividad
      graphqlQuery = graphqlQuery.withSort([{
        path: ['effectivenessScore'],
        order: 'desc'
      }]);

      const result = await graphqlQuery.do();
      return result.data.Get.CollectiveKnowledge || [];
    } catch (error) {
      console.error('Error buscando conocimiento:', error);
      return [];
    }
  }

  /**
   * Obtener perfil de usuario
   */
  async getUserProfile(userPhone) {
    try {
      const result = await this.client.graphql
        .get()
        .withClassName('UserProfile')
        .withFields('userPhone userAccessCode conversationSummary preferredTopics concerns communicationStyle engagementLevel churnRisk totalCalls lastCallDate')
        .withWhere({
          path: ['userPhone'],
          operator: 'Equal',
          valueText: userPhone
        })
        .withLimit(1)
        .do();

      const profiles = result.data.Get.UserProfile || [];
      return profiles.length > 0 ? profiles[0] : null;
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      return null;
    }
  }

  /**
   * Insertar nueva llamada
   */
  async insertCallRecording(callData) {
    try {
      // Generar embedding
      const textForEmbedding = `${callData.transcription}\n\n${callData.analysis}`;
      const vector = await this.generateEmbedding(textForEmbedding);

      const result = await this.client.data
        .creator()
        .withClassName('CallRecording')
        .withProperties({
          userPhone: callData.userPhone,
          userAccessCode: callData.userAccessCode,
          transcription: callData.transcription,
          analysis: callData.analysis,
          sentiment: callData.sentiment || 'neutral',
          topics: callData.topics || [],
          redFlags: callData.redFlags || [],
          callDuration: callData.callDuration || 0,
          audioUrl: callData.audioUrl || '',
          callDate: callData.callDate || new Date().toISOString(),
          ageRange: callData.ageRange || '',
          userRegion: callData.userRegion || '',
          migrantLocation: callData.migrantLocation || '',
          churnRisk: callData.churnRisk || 0
        })
        .withVector(vector)
        .do();

      return result;
    } catch (error) {
      console.error('Error insertando llamada:', error);
      throw error;
    }
  }

  /**
   * Actualizar perfil de usuario
   */
  async upsertUserProfile(profileData) {
    try {
      // Buscar perfil existente
      const existing = await this.getUserProfile(profileData.userPhone);

      if (existing) {
        // Actualizar (Weaviate no tiene update directo, hay que eliminar y recrear)
        // Por ahora, crear uno nuevo
        // TODO: Implementar lógica de merge si es necesario
      }

      // Generar embedding del summary
      const vector = await this.generateEmbedding(profileData.conversationSummary);

      const result = await this.client.data
        .creator()
        .withClassName('UserProfile')
        .withProperties({
          userPhone: profileData.userPhone,
          userAccessCode: profileData.userAccessCode,
          conversationSummary: profileData.conversationSummary,
          preferredTopics: profileData.preferredTopics || [],
          concerns: profileData.concerns || [],
          communicationStyle: profileData.communicationStyle || 'casual',
          responsePattern: profileData.responsePattern || 'detailed',
          engagementLevel: profileData.engagementLevel || 'medium',
          churnRisk: profileData.churnRisk || 0,
          totalCalls: profileData.totalCalls || 0,
          lastCallDate: profileData.lastCallDate || new Date().toISOString(),
          avgCallDuration: profileData.avgCallDuration || 0,
          updatedAt: new Date().toISOString()
        })
        .withVector(vector)
        .do();

      return result;
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  }

  /**
   * Insertar aprendizaje colectivo
   */
  async insertCollectiveKnowledge(knowledgeData) {
    try {
      const textForEmbedding = `${knowledgeData.content}\n\n${knowledgeData.context}`;
      const vector = await this.generateEmbedding(textForEmbedding);

      const result = await this.client.data
        .creator()
        .withClassName('CollectiveKnowledge')
        .withProperties({
          knowledgeType: knowledgeData.knowledgeType,
          content: knowledgeData.content,
          context: knowledgeData.context,
          outcomeType: knowledgeData.outcomeType || '',
          effectivenessScore: knowledgeData.effectivenessScore || 0,
          usageCount: knowledgeData.usageCount || 0,
          successRate: knowledgeData.successRate || 0,
          ageRange: knowledgeData.ageRange || '',
          userRegion: knowledgeData.userRegion || '',
          emotionalTone: knowledgeData.emotionalTone || '',
          isSticky: knowledgeData.isSticky || false,
          isWarningSignal: knowledgeData.isWarningSignal || false,
          riskLevel: knowledgeData.riskLevel || '',
          discoveredAt: knowledgeData.discoveredAt || new Date().toISOString(),
          lastUsedAt: new Date().toISOString()
        })
        .withVector(vector)
        .do();

      return result;
    } catch (error) {
      console.error('Error insertando conocimiento:', error);
      throw error;
    }
  }

  /**
   * Verificar salud de Weaviate
   */
  async healthCheck() {
    try {
      const isReady = await this.client.misc.liveChecker().do();
      return { healthy: isReady, timestamp: new Date().toISOString() };
    } catch (error) {
      return { healthy: false, error: error.message, timestamp: new Date().toISOString() };
    }
  }

  /**
   * Obtener estadísticas
   */
  async getStats() {
    try {
      const callRecordings = await this.client.graphql
        .aggregate()
        .withClassName('CallRecording')
        .withFields('meta { count }')
        .do();

      const collectiveKnowledge = await this.client.graphql
        .aggregate()
        .withClassName('CollectiveKnowledge')
        .withFields('meta { count }')
        .do();

      const userProfiles = await this.client.graphql
        .aggregate()
        .withClassName('UserProfile')
        .withFields('meta { count }')
        .do();

      return {
        callRecordings: callRecordings.data.Aggregate.CallRecording[0]?.meta.count || 0,
        collectiveKnowledge: collectiveKnowledge.data.Aggregate.CollectiveKnowledge[0]?.meta.count || 0,
        userProfiles: userProfiles.data.Aggregate.UserProfile[0]?.meta.count || 0,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error obteniendo stats:', error);
      return null;
    }
  }
}

// Singleton instance
let weaviateAI = null;

export function getWeaviateClient() {
  if (!weaviateAI) {
    weaviateAI = new WeaviateAI();
  }
  return weaviateAI;
}

export default WeaviateAI;
