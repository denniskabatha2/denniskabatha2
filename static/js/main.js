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
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => {
                loadingScreen.style.display = 'none';
            }
        });
    });

    // Form validation and submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (form.checkValidity()) {
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('/submit-contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    showNotification('Message sent successfully!', 'success');
                    form.reset();
                } else {
                    showNotification('Failed to send message. Please try again.', 'error');
                }
            } catch (error) {
                showNotification('An error occurred. Please try again later.', 'error');
            }
        }
        form.classList.add('was-validated');
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 50
                },
                ease: 'power2.inOut'
            });
        });
    });

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        gsap.fromTo(notification, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        );

        setTimeout(() => {
            gsap.to(notification, {
                y: 50,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => notification.remove()
            });
        }, 3000);
    }

    // Dynamic skill progress animation
    const updateSkillProgress = () => {
        document.querySelectorAll('.skill-item').forEach(item => {
            const progress = item.getAttribute('data-progress');
            const progressBar = item.querySelector('.progress-bar');
            progressBar.style.width = `${progress}%`;
        });
    };

    // Initialize skill progress
    updateSkillProgress();
});