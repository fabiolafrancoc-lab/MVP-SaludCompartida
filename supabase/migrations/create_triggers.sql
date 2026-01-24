-- =============================================
-- TRIGGERS AUTOMÁTICOS
-- Ejecutar AL FINAL, después de todas las tablas
-- =============================================

-- =============================================
-- TRIGGER: Callback automático
-- Si usuario pide "llámame en 2 horas"
-- =============================================

CREATE OR REPLACE FUNCTION create_callback_from_call()
RETURNS TRIGGER AS $$
BEGIN
    -- Si el usuario solicitó callback
    IF NEW.callback_requested = true AND NEW.callback_delay_minutes IS NOT NULL THEN
        INSERT INTO public.scheduled_callbacks (
            companion_call_id,
            beneficiary_id,
            registration_id,
            scheduled_for,
            reason
        ) VALUES (
            NEW.id,
            NEW.beneficiary_id,
            NEW.registration_id,
            COALESCE(NEW.callback_requested_at, NOW()) + (NEW.callback_delay_minutes || ' minutes')::INTERVAL,
            NEW.next_call_reason
        );
    END IF;
    
    -- Si hay próxima llamada programada
    IF NEW.next_call_scheduled_at IS NOT NULL THEN
        INSERT INTO public.scheduled_callbacks (
            companion_call_id,
            beneficiary_id,
            registration_id,
            scheduled_for,
            reason
        ) VALUES (
            NEW.id,
            NEW.beneficiary_id,
            NEW.registration_id,
            NEW.next_call_scheduled_at,
            NEW.next_call_reason
        )
        ON CONFLICT DO NOTHING;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_create_callback ON public.companion_calls;
CREATE TRIGGER trigger_create_callback
    AFTER INSERT OR UPDATE ON public.companion_calls
    FOR EACH ROW
    WHEN (NEW.callback_requested = true OR NEW.next_call_scheduled_at IS NOT NULL)
    EXECUTE FUNCTION create_callback_from_call();

-- =============================================
-- TRIGGER: Detectar urgencia y notificar
-- =============================================

CREATE OR REPLACE FUNCTION notify_urgency()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.urgency_level >= 4 THEN
        INSERT INTO public.urgent_notifications (
            type,
            reference_id,
            reference_type,
            beneficiary_id,
            registration_id,
            message,
            priority
        ) VALUES (
            'health_emergency',
            NEW.id,
            'companion_call',
            NEW.beneficiary_id,
            NEW.registration_id,
            'Urgencia detectada en llamada: ' || COALESCE(NEW.follow_up_reason, 'Sin especificar'),
            NEW.urgency_level
        );
        
        PERFORM pg_notify('urgent_health_alert', json_build_object(
            'call_id', NEW.id,
            'beneficiary_id', NEW.beneficiary_id,
            'registration_id', NEW.registration_id,
            'urgency_level', NEW.urgency_level,
            'reason', NEW.follow_up_reason
        )::text);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_notify_urgency ON public.companion_calls;
CREATE TRIGGER trigger_notify_urgency
    AFTER INSERT OR UPDATE ON public.companion_calls
    FOR EACH ROW
    WHEN (NEW.urgency_level >= 4)
    EXECUTE FUNCTION notify_urgency();

-- =============================================
-- TRIGGER: Auto-actualizar historial médico
-- =============================================

CREATE OR REPLACE FUNCTION auto_update_medical_history()
RETURNS TRIGGER AS $$
DECLARE
    symptom JSONB;
BEGIN
    IF NEW.symptoms_reported IS NOT NULL AND jsonb_array_length(NEW.symptoms_reported) > 0 THEN
        FOR symptom IN SELECT * FROM jsonb_array_elements(NEW.symptoms_reported)
        LOOP
            INSERT INTO public.medical_history (
                beneficiary_id,
                record_type,
                titulo,
                descripcion,
                fecha_evento,
                notas_companion,
                created_by,
                source
            ) VALUES (
                NEW.beneficiary_id,
                'consulta',
                'Síntoma reportado: ' || (symptom->>'nombre'),
                symptom->>'descripcion',
                COALESCE(NEW.started_at, NOW())::DATE,
                'Detectado en llamada de Lupita ID: ' || NEW.id,
                'companion',
                'companion_call'
            );
        END LOOP;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_auto_medical_history ON public.companion_calls;
CREATE TRIGGER trigger_auto_medical_history
    AFTER INSERT ON public.companion_calls
    FOR EACH ROW
    WHEN (NEW.symptoms_reported IS NOT NULL)
    EXECUTE FUNCTION auto_update_medical_history();

-- =============================================
-- TRIGGER: Notificar WATI cuando termina llamada
-- =============================================

CREATE OR REPLACE FUNCTION notify_wati_call_complete()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
        PERFORM pg_notify('wati_send_summary', json_build_object(
            'call_id', NEW.id,
            'beneficiary_id', NEW.beneficiary_id,
            'registration_id', NEW.registration_id,
            'summary', NEW.transcript_summary,
            'next_call', NEW.next_call_scheduled_at,
            'action_items', NEW.health_mentions
        )::text);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_wati_notification ON public.companion_calls;
CREATE TRIGGER trigger_wati_notification
    AFTER UPDATE ON public.companion_calls
    FOR EACH ROW
    EXECUTE FUNCTION notify_wati_call_complete();
