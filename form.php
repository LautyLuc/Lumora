<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Función para limpiar datos de entrada
function limpiarDatos($datos) {
    $datos = trim($datos);
    $datos = stripslashes($datos);
    $datos = htmlspecialchars($datos);
    return $datos;
}

// Función para validar email
function validarEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Función para detectar contenido malicioso
function contenidoMalicioso($texto) {
    $patrones = [
        '/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i',
        '/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/i',
        '/javascript:/i',
        '/vbscript:/i',
        '/onload\s*=/i',
        '/onclick\s*=/i',
        '/onerror\s*=/i'
    ];
    
    foreach ($patrones as $patron) {
        if (preg_match($patron, $texto)) {
            return true;
        }
    }
    return false;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $respuesta = ['success' => false, 'message' => '', 'errors' => []];
    
    // Obtener y limpiar datos
    $nombre = isset($_POST['nombre']) ? limpiarDatos($_POST['nombre']) : '';
    $apellido = isset($_POST['apellido']) ? limpiarDatos($_POST['apellido']) : '';
    $email = isset($_POST['email']) ? limpiarDatos($_POST['email']) : '';
    $asunto = isset($_POST['asunto']) ? limpiarDatos($_POST['asunto']) : '';
    $mensaje = isset($_POST['mensaje']) ? limpiarDatos($_POST['mensaje']) : '';
    
    // Validaciones
    if (empty($nombre)) {
        $respuesta['errors']['nombre'] = 'El nombre es requerido';
    } elseif (strlen($nombre) < 2 || strlen($nombre) > 50) {
        $respuesta['errors']['nombre'] = 'El nombre debe tener entre 2 y 50 caracteres';
    } elseif (contenidoMalicioso($nombre)) {
        $respuesta['errors']['nombre'] = 'Contenido no válido detectado';
    }
    
    if (empty($apellido)) {
        $respuesta['errors']['apellido'] = 'El apellido es requerido';
    } elseif (strlen($apellido) < 2 || strlen($apellido) > 50) {
        $respuesta['errors']['apellido'] = 'El apellido debe tener entre 2 y 50 caracteres';
    } elseif (contenidoMalicioso($apellido)) {
        $respuesta['errors']['apellido'] = 'Contenido no válido detectado';
    }
    
    if (empty($email)) {
        $respuesta['errors']['email'] = 'El email es requerido';
    } elseif (!validarEmail($email)) {
        $respuesta['errors']['email'] = 'Formato de email inválido';
    }
    
    if (empty($asunto)) {
        $respuesta['errors']['asunto'] = 'El asunto es requerido';
    }
    
    if (empty($mensaje)) {
        $respuesta['errors']['mensaje'] = 'El mensaje es requerido';
    } elseif (strlen($mensaje) < 10) {
        $respuesta['errors']['mensaje'] = 'El mensaje debe tener al menos 10 caracteres';
    } elseif (strlen($mensaje) > 500) {
        $respuesta['errors']['mensaje'] = 'El mensaje no puede exceder 500 caracteres';
    } elseif (contenidoMalicioso($mensaje)) {
        $respuesta['errors']['mensaje'] = 'Contenido no válido detectado';
    }
    
    // Si no hay errores, procesar el formulario
    if (empty($respuesta['errors'])) {
        // Configuración del email
        $para = 'lauluc004@gmail.com';
        $tema = 'Nuevo mensaje desde Lumora - ' . $asunto;
        
        // Template HTML moderno y elegante
        $cuerpo = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mensaje desde Lumora</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Arial, sans-serif;">
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                
                <!-- Container Principal -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07); overflow: hidden;">
                    
                    <!-- Header Elegante -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #ffd158 0%, #f4c842 100%); padding: 40px 30px; text-align: center; position: relative;">
                            <h1 style="color: #2d3748; font-size: 32px; font-weight: 300; margin: 0; letter-spacing: 2px; text-transform: uppercase;">
                                Lumora
                            </h1>
                            <div style="width: 40px; height: 2px; background-color: #2d3748; margin: 12px auto 0; opacity: 0.6;"></div>
                            <p style="color: #4a5568; margin: 8px 0 0; font-size: 13px; font-weight: 500; letter-spacing: 0.5px;">
                                CENTRO DE ESTÉTICA PROFESIONAL
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Contenido -->
                    <tr>
                        <td style="padding: 0;">
                            
                            <!-- Título -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="padding: 35px 30px 25px; text-align: center;">
                                        <h2 style="color: #2d3748; font-size: 24px; font-weight: 400; margin: 0; line-height: 1.3;">
                                            Nuevo mensaje de contacto
                                        </h2>
                                        <p style="color: #718096; font-size: 14px; margin: 8px 0 0; line-height: 1.4;">
                                            Recibido desde el sitio web
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Información del Cliente -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="padding: 0 30px 30px;">
                                        
                                        <!-- Card de Información -->
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f7fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                                            <tr>
                                                <td style="padding: 25px;">
                                                    
                                                    <!-- Nombre -->
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 15px;">
                                                        <tr>
                                                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                    <tr>
                                                                        <td style="width: 80px; vertical-align: top;">
                                                                            <span style="color: #4a5568; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Nombre</span>
                                                                        </td>
                                                                        <td>
                                                                            <span style="color: #2d3748; font-size: 15px; font-weight: 500;">' . htmlspecialchars($nombre . ' ' . $apellido, ENT_NOQUOTES, 'UTF-8') . '</span>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    
                                                    <!-- Email -->
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 15px;">
                                                        <tr>
                                                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                    <tr>
                                                                        <td style="width: 80px; vertical-align: top;">
                                                                            <span style="color: #4a5568; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                                                                        </td>
                                                                        <td>
                                                                            <a href="mailto:' . htmlspecialchars($email, ENT_NOQUOTES, 'UTF-8') . '" style="color: #3182ce; font-size: 15px; text-decoration: none; font-weight: 500;">' . htmlspecialchars($email, ENT_NOQUOTES, 'UTF-8') . '</a>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    
                                                    <!-- Asunto -->
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td style="padding: 8px 0;">
                                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                    <tr>
                                                                        <td style="width: 80px; vertical-align: top;">
                                                                            <span style="color: #4a5568; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Asunto</span>
                                                                        </td>
                                                                        <td>
                                                                            <span style="color: #2d3748; font-size: 15px; font-weight: 500;">' . htmlspecialchars($asunto, ENT_NOQUOTES, 'UTF-8') . '</span>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Mensaje -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="padding: 0 30px 30px;">
                                        
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0;">
                                            <tr>
                                                <td style="padding: 25px;">
                                                    <h3 style="color: #ffd158; font-size: 14px; font-weight: 600; margin: 0 0 15px; text-transform: uppercase; letter-spacing: 0.5px;">
                                                        Mensaje
                                                    </h3>
                                                    <div style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">' . nl2br(html_entity_decode($mensaje, ENT_QUOTES, 'UTF-8')) . '</div>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Botón de Acción -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="padding: 0 30px 40px; text-align: center;">
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="background-color: #ffd158; border-radius: 6px; padding: 0;">
                                                    <a href="mailto:' . htmlspecialchars($email, ENT_NOQUOTES, 'UTF-8') . '" style="display: block; padding: 14px 28px; color: #2d3748; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; text-transform: uppercase;">
                                                        Responder
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #2d3748; padding: 30px; text-align: center;">
                            <h4 style="color: #ffd158; font-size: 16px; font-weight: 400; margin: 0 0 8px; letter-spacing: 1px;">
                                LUMORA
                            </h4>
                            <p style="color: #a0aec0; font-size: 13px; margin: 0 0 15px; line-height: 1.4;">
                                Julio Arg. Roca 2266, Neuquén Capital<br>
                                +54 299 513 5012 | lumoraestetica@gmail.com
                            </p>
                            <div style="width: 30px; height: 1px; background-color: #4a5568; margin: 0 auto 15px;"></div>
                            <p style="color: #718096; font-size: 11px; margin: 0; opacity: 0.7;">
                                ' . date('d \d\e F \d\e Y \a \l\a\s H:i') . ' | lumora.com
                            </p>
                        </td>
                    </tr>
                    
                </table>
                
            </td>
        </tr>
    </table>
    
</body>
</html>';
        
        // Headers optimizados para Gmail
        $cabeceras = [
            'MIME-Version' => '1.0',
            'Content-Type' => 'text/html; charset=UTF-8',
            'Content-Transfer-Encoding' => '7bit',
            'From' => 'Formulario Lumora <noreply@' . $_SERVER['HTTP_HOST'] . '>',
            'Reply-To' => $email,
            'Return-Path' => 'noreply@' . $_SERVER['HTTP_HOST'],
            'X-Mailer' => 'Lumora Contact Form',
            'X-Priority' => '3 (Normal)',
            'Message-ID' => '<' . time() . '.' . uniqid() . '@' . $_SERVER['HTTP_HOST'] . '>',
            'Date' => date('r'),
            'List-Unsubscribe' => '<mailto:noreply@' . $_SERVER['HTTP_HOST'] . '?subject=unsubscribe>'
        ];
        
        // Convertir headers a string para mail()
        $headers_string = '';
        foreach ($cabeceras as $key => $value) {
            $headers_string .= $key . ': ' . $value . "\r\n";
        }
        
        // Intentar enviar el email
        if (mail($para, $tema, $cuerpo, $headers_string)) {
            $respuesta['success'] = true;
            $respuesta['message'] = '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.';
            
            // Log del mensaje para debugging (opcional)
            error_log("Mensaje de contacto enviado: $nombre $apellido - $email - $asunto");
        } else {
            $respuesta['message'] = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
            error_log("Error al enviar email de contacto: $nombre $apellido - $email");
        }
    } else {
        $respuesta['message'] = 'Por favor, corrige los errores en el formulario.';
    }
    
    echo json_encode($respuesta);
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
