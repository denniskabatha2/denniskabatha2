document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js scene
    const threeScene = new ThreeScene();
    
    // Initialize animations
    const animations = new Animations();

    // Handle loading screen
    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading-screen');
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loadingScreen.style.display = 'none';
            }
        });
    });

    // Form validation
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.checkValidity()) {
            // Handle form submission
            console.log('Form submitted');
        }
        form.classList.add('was-validated');
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
