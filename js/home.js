// Funcionalidad para la página home
document.addEventListener('DOMContentLoaded', function() {
    // Animación de elementos al hacer scroll
    const animatedElements = document.querySelectorAll('.categoria-card, .producto-card, .testimonio-card, .blog-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Contador de estadísticas (opcional)
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 16);
        });
    }
    
    // Validación del formulario de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Por favor, ingresa tu correo electrónico.');
                return;
            }
            
            // Simulación de suscripción
            alert('¡Gracias por suscribirte! Te hemos enviado un email de confirmación.');
            this.reset();
        });
    }
    
    // Efecto de escritura para el hero (opcional)
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Iniciar efecto después de 500ms
        setTimeout(typeWriter, 500);
    }
});