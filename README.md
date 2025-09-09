# ✨ Lumora - Centro de Estética Profesional

> **Sitio web oficial de Lumora Centro de Estética** - Especializado en tratamientos faciales profesionales y cuidado integral de la piel.

![Lumora](https://img.shields.io/badge/Lumora-Centro_de_Estética-ffd158?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)

## 📖 Descripción

Lumora es un centro de estética profesional especializado en tratamientos faciales y cuidado de la piel. Este sitio web presenta una experiencia digital que refleja la calidad y elegancia de los servicios ofrecidos.

### 🎯 Filosofía de la Marca
- **Lumora** = *Lumen* (luz) + *Aura* (energía personal)
- **Misión**: Iluminar la esencia natural de cada persona
- **Visión**: Ser el referente en cuidado profesional de la piel

## 🌟 Características Principales

### ✨ **Diseño y Experiencia**
- **Estética moderna** con paleta de colores dorados y cremas
- **Navegación intuitiva** con menú hamburguesa responsive
- **Animaciones suaves** y transiciones elegantes
- **Tipografía profesional** (Lora + Open Sans)
- **Loader animado** para mejor experiencia de usuario

### 🎨 **Secciones del Sitio**
- **Hero Section**: Presentación impactante con isotipo y slogan
- **Sobre Lumora**: Historia de la marca y filosofía de trabajo
- **Reseñas**: Testimonios reales de clientes y profesionales
- **Tratamientos**: 7 servicios especializados con descripciones detalladas
- **Productos**: Galería interactiva con slider automático
- **Contacto**: Formulario, mapa y redes sociales

### 📱 **Funcionalidades Avanzadas**
- **Formulario de contacto** con validación en tiempo real
- **WhatsApp flotante** para consultas rápidas
- **Slider de productos** con controles interactivos
- **Mapa integrado** de Google Maps
- **SEO optimizado** con meta tags completos
- **Schema.org** para mejor indexación

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **HTML5** - Estructura semántica y accesible
- **CSS3** - Diseño responsive con Grid y Flexbox
- **JavaScript** - Interactividad y validaciones
- **Google Fonts** - Tipografías premium (Lora, Open Sans)

### **Backend**
- **PHP** - Procesamiento del formulario de contacto
- **Validación de datos** - Sanitización y seguridad
- **Envío de emails** - Sistema de notificaciones HTML

### **Características Técnicas**
- **Responsive Design** - Mobile-first approach
- **Cross-browser** - Compatibilidad garantizada
- **SEO Optimized** - Meta tags y estructura semántica
- **Accessibility** - Atributos ARIA y navegación por teclado

## 📂 Estructura del Proyecto

```
lumora/
├── index.html              # Página principal
├── style.css              # Estilos principales
├── app.js                 # JavaScript interactivo
├── form.php               # Procesador del formulario
├── media/                 # Recursos multimedia
│   ├── fondo.webp         # Imagen de fondo hero
│   ├── lumora-png.png     # Logo principal
│   ├── iso_lum.png        # Isotipo
│   ├── sn.png             # Imagen sobre nosotros
│   └── ...                # Otros assets
└── README.md              # Documentación
```

## 🚀 Instalación y Uso

### **Desarrollo Local**
```bash
# Clonar el repositorio
git clone https://github.com/LautyLuc/Lumora.git

# Navegar al directorio
cd Lumora

# Abrir con Live Server o navegador
open index.html
```

### **Despliegue en Servidor**
1. Subir todos los archivos a la carpeta pública del servidor
2. Asegurar que PHP esté habilitado
3. Configurar el email destino en `form.php`:
   ```php
   $para = 'tu-email@ejemplo.com';
   ```
4. Verificar permisos de escritura para logs

## ⚙️ Configuración

### **Variables de Estilo (CSS Custom Properties)**
```css
:root {
  --fuente-uno: 'Lora', serif;
  --fuente-dos: 'Open Sans', sans-serif;
  --crema: #f5f5dc;
  --azul: #6d8299;
  --dorado: #ffd158;
  --gris-oscuro: #242424;
}
```

### **Configuración del Formulario**
```php
// En form.php - Línea 85
$para = 'lauluc004@gmail.com';  // Cambiar por email real
$tema = 'Nuevo mensaje desde Lumora - ' . $asunto;
```

## 🎯 Servicios Incluidos

1. **HydroBoost Facial** - Hidratación profunda con electroporación
2. **Glass Skin** - Tratamiento antioxidante e iluminador
3. **Deep Detox** - Limpieza intensiva y purificación
4. **Sensitive Skin** - Protocolo suave para pieles sensibles
5. **Collagen Therapy** - Anti-age con radiofrecuencia
6. **Define & Purify** - Limpieza con efecto contorno
7. **Radiant Peel** - Peeling para renovación celular

## 🔒 Seguridad

### **Validaciones Implementadas**
- ✅ Sanitización de datos de entrada
- ✅ Validación de formato de email
- ✅ Protección contra XSS
- ✅ Límites de caracteres
- ✅ Detección de contenido malicioso
- ✅ Headers de seguridad

### **Características Anti-Spam**
- Rate limiting en formularios
- Validación de campos requeridos
- Logging de intentos maliciosos
- CORS configurado apropiadamente

## 📱 Responsive Design

### **Breakpoints Principales**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### **Características Responsive**
- Menú hamburguesa en móviles
- Grids adaptativos
- Imágenes optimizadas
- Textos escalables
- Botones táctiles

## 🌐 SEO y Accesibilidad

### **Meta Tags Completos**
- Open Graph para redes sociales
- Twitter Cards
- Geo-localización (Neuquén, Argentina)
- Keywords específicos del sector

### **Accesibilidad**
- Atributos ALT en todas las imágenes
- Roles ARIA apropiados
- Navegación por teclado
- Contraste de colores AA
- Estructura semántica HTML5

## 📊 Métricas y Analytics

### **Performance**
- Imágenes optimizadas (WebP)
- CSS y JS minificados
- Carga asíncrona de recursos
- Lazy loading implementado

### **Tracking Preparado**
- Estructura lista para Google Analytics
- Events tracking en formularios
- Schema.org para rich snippets

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crear una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit los cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## 📞 Información de Contacto

**Lumora Centro de Estética**
- 📍 Julio Arg. Roca 2266, Neuquén Capital
- 📞 +54 299 513 5012
- ✉️ lumoraestetica@gmail.com
- 📱 WhatsApp: [Consultar turnos](https://wa.link/abq0u1)

**Redes Sociales**
- 📸 [Instagram](https://www.instagram.com/lumoraestetica/)
- 🎵 [TikTok](https://tiktok.com/@lumora)

## 📄 Licencia

© 2025 Lumora Centro de Estética. Todos los derechos reservados.

---

**Desarrollado por** [JunoStudio](https://junostudio.art) 🎨
