// Funcionalidad para el formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const formularioContacto = document.getElementById('formulario-contacto');
    
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;
            
            if (!nombre || !email || !asunto || !mensaje) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }
            
            // Simulación de envío (en un caso real, aquí iría una petición AJAX)
            alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
            formularioContacto.reset();
        });
    }
    
    // Funcionalidad para el FAQ
    const faqPreguntas = document.querySelectorAll('.faq-pregunta');
    
    faqPreguntas.forEach(pregunta => {
        pregunta.addEventListener('click', function() {
            const respuesta = this.nextElementSibling;
            const icono = this.querySelector('.faq-icon');
            
            // Cerrar otras respuestas
            document.querySelectorAll('.faq-respuesta').forEach(item => {
                if (item !== respuesta && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.previousElementSibling.querySelector('.faq-icon').textContent = '+';
                }
            });
            
            // Toggle la respuesta actual
            respuesta.classList.toggle('active');
            icono.textContent = respuesta.classList.contains('active') ? '−' : '+';
        });
    });
    
    // Animación suave para los elementos de información
    const infoItems = document.querySelectorAll('.info-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    infoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
});