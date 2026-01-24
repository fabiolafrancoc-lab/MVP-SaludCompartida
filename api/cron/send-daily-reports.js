/**
 * Cron Job: Enviar reportes acumulados automáticamente
 * Se ejecuta 2 veces al día: 7:00 AM y 7:00 PM (Hora de México)
 * Días: Lunes a Domingo
 * Inicio: Lunes 27 de Enero 2025
 * 
 * Vercel Cron: Se configura en vercel.json
 */

export default async function handler(req, res) {
  // Verificar que sea una solicitud de Vercel Cron o con token de autorización
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;

  // Validar que la petición venga de Vercel Cron
  if (authHeader !== `Bearer ${cronSecret}`) {
    console.log('❌ Acceso no autorizado al cron job');
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    console.log('🕐 Ejecutando cron job de reportes diarios...');

    // Determinar el período del reporte (últimas 24 horas)
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const startDate = yesterday.toISOString();
    const endDate = now.toISOString();

    // Llamar al endpoint de reporte acumulado
    const reportUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://saludcompartida.app'}/api/report-accumulated`;
    
    const response = await fetch(reportUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate,
        endDate,
        sendEmail: true
      })
    });

    const result = await response.json();

    if (result.success) {
      console.log(`✅ Reporte enviado exitosamente: ${result.report?.totalUsuarios || 0} usuarios`);
      
      return res.status(200).json({
        success: true,
        message: 'Reporte diario enviado correctamente',
        timestamp: now.toISOString(),
        period: {
          start: startDate,
          end: endDate
        },
        report: result.report
      });
    } else {
      console.error('❌ Error al generar reporte:', result.error);
      return res.status(500).json({
        success: false,
        error: 'Error al generar reporte',
        details: result.error
      });
    }

  } catch (error) {
    console.error('❌ Error en cron job:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
