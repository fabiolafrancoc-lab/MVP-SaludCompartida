import { z } from 'zod';

// ========================================
// Phone Validation Helpers
// ========================================

const phoneUSARegex = /^(\+?1)?[\s.-]?\(?([0-9]{3})\)?[\s.-]?([0-9]{3})[\s.-]?([0-9]{4})$/;
const phoneMXRegex = /^(\+?52)?[\s.-]?([0-9]{2,3})[\s.-]?([0-9]{3,4})[\s.-]?([0-9]{4})$/;

// ========================================
// Registro Inicial (Landing Page)
// ========================================

export const registroInicialSchema = z.object({
  nombre: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
});

export type RegistroInicial = z.infer<typeof registroInicialSchema>;

// ========================================
// Datos Migrante (Paso 2)
// ========================================

export const datosMigranteSchema = z.object({
  nombreCompleto: z.string()
    .min(3, 'El nombre completo debe tener al menos 3 caracteres')
    .max(150, 'El nombre es demasiado largo'),
  email: z.string()
    .email('Email inválido')
    .toLowerCase(),
  telefonoUS: z.string()
    .regex(phoneUSARegex, 'Debe ser un teléfono válido de USA (+1)')
    .transform(val => val.replace(/\D/g, '')), // Remove formatting
  estadoUS: z.string()
    .min(2, 'Selecciona tu estado')
});

export type DatosMigrante = z.infer<typeof datosMigranteSchema>;

// ========================================
// Usuario Familia (México)
// ========================================

export const usuarioFamiliaSchema = z.object({
  nombre: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  telefono: z.string()
    .regex(phoneMXRegex, 'Debe ser un teléfono válido de México (+52)')
    .transform(val => val.replace(/\D/g, '')), // Remove formatting
  parentesco: z.enum([
    'Madre',
    'Padre',
    'Esposo/a',
    'Hijo/a',
    'Hermano/a',
    'Abuelo/a',
    'Tío/a',
    'Primo/a',
    'Otro familiar'
  ])
});

export type UsuarioFamilia = z.infer<typeof usuarioFamiliaSchema>;

// ========================================
// Datos Familia (Paso 3)
// ========================================

export const datosFamiliaSchema = z.object({
  usuarioPrincipal: usuarioFamiliaSchema,
  usuariosAdicionales: z.array(usuarioFamiliaSchema)
    .max(3, 'Máximo 3 usuarios adicionales')
    .optional()
    .default([])
}).refine(
  (data) => {
    const total = 1 + (data.usuariosAdicionales?.length || 0);
    return total <= 4;
  },
  { message: 'Máximo 4 familiares en total' }
);

export type DatosFamilia = z.infer<typeof datosFamiliaSchema>;

// ========================================
// Plan Selection (Paso 4)
// ========================================

export const planSchema = z.object({
  planId: z.enum(['basic', 'premium']),
  planName: z.string(),
  planPrice: z.number().positive()
});

export type PlanSelection = z.infer<typeof planSchema>;

// ========================================
// Complete Registration
// ========================================

export const registrationSchema = z.object({
  suscriptor: datosMigranteSchema,
  usuarioPrincipal: usuarioFamiliaSchema,
  usuariosAdicionales: z.array(usuarioFamiliaSchema).max(3).optional(),
  plan: planSchema
});

export type Registration = z.infer<typeof registrationSchema>;

// ========================================
// Validation Helper Functions
// ========================================

/**
 * Validate data and throw error if invalid
 */
export function validateOrThrow<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

/**
 * Validate data and return result object
 */
export function validateSafe<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
} {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, errors: result.error };
  }
}

/**
 * Format Zod errors for display
 */
export function formatZodErrors(errors: z.ZodError): Record<string, string> {
  const formatted: Record<string, string> = {};
  
  errors.issues.forEach((issue) => {
    const path = issue.path.join('.');
    formatted[path] = issue.message;
  });
  
  return formatted;
}

// ========================================
// Field-specific validators
// ========================================

export const emailValidator = z.string().email('Email inválido');
export const phoneUSAValidator = z.string().regex(phoneUSARegex, 'Teléfono USA inválido');
export const phoneMXValidator = z.string().regex(phoneMXRegex, 'Teléfono México inválido');
export const nameValidator = z.string().min(2).max(100);
export const codigoFamiliaValidator = z.string().regex(/^SC-[A-HJ-NP-Z2-9]{6}$/, 'Código inválido');
