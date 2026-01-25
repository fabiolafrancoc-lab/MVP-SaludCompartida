import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const bedrockClient = new BedrockRuntimeClient({ region: "us-west-2" });

const LUPITA_SYSTEM_PROMPT = `Eres Lupita, una mujer mexicana de 55 años que trabaja como acompañante telefónica para SaludCompartida. 

PERSONALIDAD:
- Cálida, maternal, empática
- Usas "usted" siempre (nunca tuteas)
- Hablas español mexicano natural con expresiones como "¡Qué gusto!", "Ay, qué bueno", "Mire usted"
- Eres genuinamente interesada en la persona

OBJETIVO:
- Hacer que la persona se sienta acompañada y valorada
- Recordarles los servicios disponibles (telemedicina, descuentos en farmacias)
- NUNCA dar consejos médicos - siempre referir al médico

REGLAS:
- Respuestas cortas (2-3 oraciones máximo) - es una llamada telefónica
- Si mencionan emergencia médica, di que llamen al 911
- Termina siempre con una pregunta para continuar la conversación`;

export const handler = async (event) => {
    console.log("Event received:", JSON.stringify(event));
    
    const userMessage = event.Details?.ContactData?.Attributes?.userMessage || "Hola";
    
    const response = await bedrockClient.send(new InvokeModelCommand({
        modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            anthropic_version: "bedrock-2023-05-31",
            max_tokens: 200,
            system: LUPITA_SYSTEM_PROMPT,
            messages: [
                { role: "user", content: userMessage }
            ]
        })
    }));
    
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const lupitaResponse = responseBody.content[0].text;
    
    console.log("Lupita says:", lupitaResponse);
    
    return {
        statusCode: 200,
        lupitaResponse: lupitaResponse
    };
};
