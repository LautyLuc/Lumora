// LOADER
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Simular carga de recursos
  const loadingTasks = [
    // Precargar imágenes críticas
    () => preloadImages([
      'media/fondo.webp',
      'media/lumora-png.png',
      'media/logo_2.png'
    ]),
    // Simular carga de fonts y CSS
    () => new Promise(resolve => setTimeout(resolve, 800)),
    // Inicializar componentes
    () => new Promise(resolve => {
      // Asegurar que todos los elementos estén listos
      setTimeout(resolve, 500);
    })
  ];

  Promise.all(loadingTasks.map(task => task()))
    .then(() => {
      // Agregar delay mínimo para mejor experiencia
      setTimeout(() => {
        loader.classList.add('fade-out');
        
        // Remover loader del DOM después de la animación
        setTimeout(() => {
          loader.style.display = 'none';
          document.body.classList.add('loaded'); // Restaurar scroll
        }, 600);
      }, 1200);
    })
    .catch(error => {
      console.warn('Error durante la carga:', error);
      // En caso de error, ocultar loader de todos modos
      setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
          loader.style.display = 'none';
          document.body.classList.add('loaded');
        }, 600);
      }, 2000);
    });
}

function preloadImages(imageUrls) {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Continuar aunque falle una imagen
        img.src = url;
      });
    })
  );
}

// Smooth scroll y cierre de menú mobile
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    const mobileNav = document.getElementById('mobileNav');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    if (mobileNav?.classList.contains('active')) {
      [mobileNav, hamburgerMenu, mobileOverlay].forEach(el => el?.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar loader primero
  initLoader();
  
  // Inicializar otros componentes
  initProductSlider();
  initContactForm();
  initMobileMenu();
  initAppointmentBooking();
});

function initMobileMenu() {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileNav = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileOverlay');
  
  if (!hamburgerMenu || !mobileNav || !mobileOverlay) return;
  
  const isSmallScreen = () => window.innerWidth <= 768;
  
  const closeMobileMenu = () => {
    [hamburgerMenu, mobileNav, mobileOverlay].forEach(el => el.classList.remove('active'));
    document.body.style.overflow = '';
    
    mobileNav.querySelectorAll('.mobile-link').forEach(link => {
      link.style.transition = link.style.opacity = link.style.transform = '';
    });
  };
  
  const openMobileMenu = () => {
    [hamburgerMenu, mobileNav, mobileOverlay].forEach(el => el.classList.add('active'));
    document.body.style.overflow = 'hidden';
    
    mobileNav.querySelectorAll('.mobile-link').forEach((link, index) => {
      link.style.opacity = '0';
      link.style.transform = 'translateX(30px)';
      
      setTimeout(() => {
        link.style.transition = 'all 0.3s ease';
        link.style.opacity = '1';
        link.style.transform = 'translateX(0)';
      }, 200 + (index * 100));
    });
  };
  
  hamburgerMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isSmallScreen()) {
      mobileNav.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
    }
  });
  
  mobileOverlay.addEventListener('click', () => isSmallScreen() && closeMobileMenu());
  
  mobileNav.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      if (isSmallScreen()) setTimeout(closeMobileMenu, 300);
    });
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active') && isSmallScreen()) {
      closeMobileMenu();
    }
  });
  
  window.addEventListener('resize', () => {
    if (!isSmallScreen() && mobileNav.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

function initProductSlider() {
  const slider = document.querySelector('.slider-track');
  const productos = slider?.querySelectorAll('.product-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.querySelectorAll('.indicator');
  
  if (!slider || !productos.length) {
    console.warn('Slider de productos no encontrado');
    return;
  }
  
  let currentIndex = 0;
  const totalProducts = productos.length;
  
  // Función para actualizar el slider - usar porcentajes para mejor consistencia
  function updateSlider() {
    const translateX = currentIndex * 20; // 20% por cada producto (100% / 5 productos)
    slider.style.transform = `translateX(-${translateX}%)`;
    
    // Actualizar clase active en productos
    productos.forEach((product, index) => {
      product.classList.toggle('active', index === currentIndex);
    });
    
    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Inicializar con la primera tarjeta activa
  updateSlider();
  
  // Auto-scroll cada 15 segundos
  let autoSlideInterval = setInterval(() => {
    currentIndex = currentIndex >= (totalProducts - 1) ? 0 : currentIndex + 1;
    updateSlider();
  }, 15000);
  
  // Función para reiniciar el auto-scroll
  function restartAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      currentIndex = currentIndex >= (totalProducts - 1) ? 0 : currentIndex + 1;
      updateSlider();
    }, 15000);
  }
  
  // Event listeners para las flechas
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = currentIndex <= 0 ? (totalProducts - 1) : currentIndex - 1;
      updateSlider();
      restartAutoSlide();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = currentIndex >= (totalProducts - 1) ? 0 : currentIndex + 1;
      updateSlider();
      restartAutoSlide();
    });
  }
  
  // Event listeners para los indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
      restartAutoSlide();
    });
  });
  
  // Soporte para touch/swipe en mobile
  let startX, moveX, isDragging = false;
  
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    clearInterval(autoSlideInterval); // Pausar auto-scroll durante interacción
  });
  
  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    moveX = e.touches[0].clientX;
    const diff = startX - moveX;
    
    if (Math.abs(diff) > 50) { // Mínimo 50px para considerar swipe
      if (diff > 0 && currentIndex < (totalProducts - 1)) {
        // Swipe izquierda - siguiente
        currentIndex++;
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe derecha - anterior
        currentIndex--;
      }
      
      updateSlider();
      startX = moveX; // Reset para permitir múltiples swipes
    }
  });
  
  slider.addEventListener('touchend', () => {
    isDragging = false;
    // Reanudar auto-scroll después de 2 segundos
    setTimeout(() => {
      restartAutoSlide();
    }, 2000);
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const mensajeTextarea = document.getElementById('mensaje');
  const charCount = document.getElementById('charCount');
  const charCounter = document.querySelector('.char-counter');

  // Contador de caracteres optimizado
  if (mensajeTextarea && charCount) {
    mensajeTextarea.addEventListener('input', () => {
      const count = mensajeTextarea.value.length;
      charCount.textContent = count;
      
      charCounter.className = 'char-counter' + 
        (count > 400 ? ' warning' : '') + 
        (count >= 500 ? ' error' : '');
    });
  }

  // Validación optimizada
  const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => input.classList.remove('error'));
  });

  // Envío del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const button = form.querySelector('.form-button');
    const buttonText = button.querySelector('.button-text');
    const originalText = buttonText.textContent;
    
    // Validar todos los campos
    const isValid = Array.from(inputs).every(input => validateField(input));
    
    if (!isValid) {
      showNotification('Por favor, corrige los errores en el formulario.', 'error');
      return;
    }
    
    // Estado de carga
    button.disabled = true;
    buttonText.textContent = 'Enviando...';
    
    try {
      const response = await fetch('form.php', {
        method: 'POST',
        body: new FormData(form)
      });
      
      const result = await response.json();
      
      if (result.success) {
        showNotification(result.message, 'success');
        form.reset();
        if (charCount) charCount.textContent = '0';
        inputs.forEach(input => input.classList.remove('error'));
      } else {
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, message]) => {
            const input = form.querySelector(`[name="${field}"]`);
            if (input) {
              input.classList.add('error');
              showNotification(message, 'error');
            }
          });
        } else {
          showNotification(result.message, 'error');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error al enviar el formulario. Por favor, intenta nuevamente.', 'error');
    } finally {
      button.disabled = false;
      buttonText.textContent = originalText;
    }
  });

  // Funciones de validación
  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const validations = {
      nombre: validateName,
      apellido: validateName,
      email: validateEmail,
      asunto: (v) => v ? null : 'El asunto es requerido',
      mensaje: validateMessage
    };

    const validation = validations[fieldName];
    if (!validation) return true;

    const error = validation(value);
    if (error) {
      setFieldError(field, error);
      return false;
    }
    
    setFieldSuccess(field);
    return true;
  }

  function validateName(value) {
    if (!value) return 'El nombre es requerido';
    if (value.length < 2 || value.length > 50) return 'Debe tener entre 2 y 50 caracteres';
    if (containsMaliciousContent(value)) return 'Contenido no válido detectado';
    return null;
  }

  function validateEmail(value) {
    if (!value) return 'El email es requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Formato de email inválido';
    return null;
  }

  function validateMessage(value) {
    if (!value) return 'El mensaje es requerido';
    if (value.length < 10) return 'El mensaje debe tener al menos 10 caracteres';
    if (value.length > 500) return 'El mensaje no puede exceder 500 caracteres';
    if (containsMaliciousContent(value)) return 'Contenido no válido detectado';
    return null;
  }

  function containsMaliciousContent(text) {
    return [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      /javascript:|vbscript:|onload\s*=|onclick\s*=|onerror\s*=/gi
    ].some(pattern => pattern.test(text));
  }

  function setFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorDiv = formGroup?.querySelector('.error-message');
    
    if (formGroup && errorDiv) {
      formGroup.className = 'form-group error';
      errorDiv.textContent = message;
    }
  }

  function setFieldSuccess(field) {
    const formGroup = field.closest('.form-group');
    if (formGroup) formGroup.className = 'form-group success';
  }

  function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 2rem',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '600',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      maxWidth: '400px',
      background: type === 'success' ? '#27ae60' : '#e74c3c'
    });

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }
}

function initAppointmentBooking() {
  const agendarButtons = document.querySelectorAll('.agendar-btn');
  const asuntoSelect = document.getElementById('asunto');
  const mensajeTextarea = document.getElementById('mensaje');
  
  if (!agendarButtons.length || !asuntoSelect || !mensajeTextarea) return;

  const tratamientoMap = {
    'HydroBoost Facial': 'turno-hydroboost',
    'Glass Skin': 'turno-glassskin',
    'Deep Detox': 'turno-deepdetox',
    'Sensitive Skin': 'turno-sensitiveskin',
    'Collagen Therapy': 'turno-collagentherapy',
    'Define & Purify': 'turno-definepurify',
    'Radiant Peel': 'turno-radiantpeel'
  };

  agendarButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const tratamiento = button.getAttribute('data-tratamiento');
      if (tratamiento) {
        const contactoSection = document.getElementById('contacto');
        if (contactoSection) {
          contactoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          setTimeout(() => {
            // Configurar el asunto
            const selectValue = tratamientoMap[tratamiento];
            if (selectValue) {
              asuntoSelect.value = selectValue;
              asuntoSelect.dispatchEvent(new Event('change', { bubbles: true }));
              
              // Animación visual del select
              asuntoSelect.style.cssText = 'background: rgba(255, 209, 88, 0.1); border-color: var(--dorado);';
              setTimeout(() => asuntoSelect.style.cssText = '', 2000);
            }

            // Pre-llenar el mensaje si está vacío
            if (!mensajeTextarea.value.trim()) {
              const mensaje = `Hola, me interesa agendar un turno para el tratamiento "${tratamiento}". Me gustaría conocer disponibilidad y coordinar una cita. ¡Gracias!`;
              mensajeTextarea.value = mensaje;
              
              const charCount = document.getElementById('charCount');
              if (charCount) charCount.textContent = mensaje.length;
              
              // Animación visual del textarea
              mensajeTextarea.style.cssText = 'background: rgba(255, 209, 88, 0.1); border-color: var(--dorado);';
              setTimeout(() => mensajeTextarea.style.cssText = '', 2000);
            }
          }, 800);
        }
      }
    });
  });
}

    // Estilos del contenido
    const content = notification.querySelector('.notification-content');


