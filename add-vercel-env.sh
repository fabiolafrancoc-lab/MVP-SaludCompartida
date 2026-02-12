#!/bin/bash
# Agregar variable de entorno a Vercel

vercel env add SQUARE_PLAN_VARIATION_ID production <<< "VU76FHKSAXPGGJT2MM72WKSZ"
vercel env add SQUARE_PLAN_VARIATION_ID preview <<< "VU76FHKSAXPGGJT2MM72WKSZ"
vercel env add SQUARE_PLAN_VARIATION_ID development <<< "VU76FHKSAXPGGJT2MM72WKSZ"

echo "✅ Variable agregada. Ahora ejecuta: vercel --prod"
