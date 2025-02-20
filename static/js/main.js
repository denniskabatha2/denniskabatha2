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

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const html = document.documentElement;

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-bs-theme', newTheme);
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Project Filtering
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    gsap.to(card, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3
                    });
                } else {
                    gsap.to(card, {
                        scale: 0.8,
                        opacity: 0.3,
                        duration: 0.3
                    });
                }
            });
        });
    });

    // Project Modal
    const projectModal = document.getElementById('projectModal');
    const modalTitle = projectModal.querySelector('.modal-title');
    const modalBody = projectModal.querySelector('.modal-body');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.card-title').textContent;
            const description = card.querySelector('.card-text').textContent;
            const image = card.querySelector('img').src;

            modalTitle.textContent = title;
            modalBody.innerHTML = `
                <img src="${image}" class="img-fluid mb-3" alt="${title}">
                <p>${description}</p>
                <div class="project-details">
                    <h6>Technologies Used:</h6>
                    <ul>
                        <li>HTML5/CSS3</li>
                        <li>JavaScript</li>
                        <li>React.js</li>
                    </ul>
                </div>
            `;

            const modal = new bootstrap.Modal(projectModal);
            modal.show();
        });
    });

    // Language Switcher
    const languageButtons = document.querySelectorAll('[data-lang]');
    let currentLang = 'en';

    const translations = {
        en: {
            hero: {
                title: 'Creative Developer & Designer',
                subtitle: 'Transforming ideas into immersive digital experiences'
            },
            // Add more translations as needed
        },
        es: {
            hero: {
                title: 'Desarrollador y Diseñador Creativo',
                subtitle: 'Transformando ideas en experiencias digitales inmersivas'
            }
        },
        fr: {
            hero: {
                title: 'Développeur et Designer Créatif',
                subtitle: 'Transformer les idées en expériences numériques immersives'
            }
        }
    };

    languageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang === currentLang) return;

            currentLang = lang;
            updateContent(translations[lang]);
        });
    });

    function updateContent(content) {
        // Update hero section
        document.querySelector('#hero h1').textContent = content.hero.title;
        document.querySelector('#hero p').textContent = content.hero.subtitle;
        // Add more content updates as needed
    }

    // Resume Download
    const resumeBtn = document.querySelector('.resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            // Add analytics tracking
            console.log('Resume downloaded');
        });
    }
});