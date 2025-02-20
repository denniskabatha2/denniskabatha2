document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js scene
    const threeScene = new ThreeScene();

    // Initialize animations
    const animations = new Animations();

    // Load projects
    loadProjects();

    // Load blog posts
    loadBlogPosts();

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
    if (form) {
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

                    const data = await response.json();
                    if (response.ok) {
                        showNotification(data.message, 'success');
                        form.reset();
                    } else {
                        showNotification(data.message, 'error');
                    }
                } catch (error) {
                    showNotification('An error occurred. Please try again later.', 'error');
                }
            }
            form.classList.add('was-validated');
        });
    }

    // Project loading and filtering
    async function loadProjects(category = 'all') {
        try {
            const response = await fetch(`/api/projects?category=${category}`);
            const projects = await response.json();
            const projectsGrid = document.getElementById('projects-grid');
            const template = document.getElementById('project-card-template');

            projectsGrid.innerHTML = '';

            projects.forEach(project => {
                const clone = template.content.cloneNode(true);
                const card = clone.querySelector('.project-card');

                card.setAttribute('data-category', project.category);
                card.querySelector('img').src = project.image;
                card.querySelector('img').alt = project.title;
                card.querySelector('.card-title').textContent = project.title;
                card.querySelector('.card-text').textContent = project.description;

                const techContainer = card.querySelector('.technologies');
                project.technologies.forEach(tech => {
                    const badge = document.createElement('span');
                    badge.className = 'badge bg-secondary me-1';
                    badge.textContent = tech;
                    techContainer.appendChild(badge);
                });

                projectsGrid.appendChild(clone);
            });
        } catch (error) {
            console.error('Error loading projects:', error);
            showNotification('Error loading projects', 'error');
        }
    }

    // Blog posts loading
    async function loadBlogPosts() {
        try {
            const response = await fetch('/api/blog-posts');
            const posts = await response.json();
            const blogContainer = document.querySelector('#blog .row');

            if (blogContainer) {
                blogContainer.innerHTML = posts.map(post => `
                    <div class="col-md-4">
                        <div class="card blog-card h-100">
                            <img src="${post.image}" class="card-img-top" alt="${post.title}">
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">${post.excerpt}</p>
                                <p class="text-muted">${post.date}</p>
                                <a href="#" class="btn btn-outline-primary">Read More</a>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error('Error loading blog posts:', error);
        }
    }

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadProjects(filter);
        });
    });

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

    // Language Switcher
    const languageButtons = document.querySelectorAll('[data-lang]');
    let currentLang = 'en';

    const translations = {
        en: {
            hero: {
                title: 'Creative Developer & Designer',
                subtitle: 'Transforming ideas into immersive digital experiences'
            },
            about: {
                title: 'About Me',
                background: 'Background',
                skills: 'Skills'
            },
            projects: {
                title: 'Featured Projects',
                filters: {
                    all: 'All',
                    web: 'Web',
                    mobile: 'Mobile',
                    '3d': '3D'
                }
            },
            contact: {
                title: 'Get in Touch',
                name: 'Name',
                email: 'Email',
                message: 'Message',
                send: 'Send Message'
            }
        },
        es: {
            hero: {
                title: 'Desarrollador y Diseñador Creativo',
                subtitle: 'Transformando ideas en experiencias digitales inmersivas'
            },
            about: {
                title: 'Sobre Mí',
                background: 'Experiencia',
                skills: 'Habilidades'
            },
            projects: {
                title: 'Proyectos Destacados',
                filters: {
                    all: 'Todos',
                    web: 'Web',
                    mobile: 'Móvil',
                    '3d': '3D'
                }
            },
            contact: {
                title: 'Contacto',
                name: 'Nombre',
                email: 'Correo',
                message: 'Mensaje',
                send: 'Enviar Mensaje'
            }
        },
        fr: {
            hero: {
                title: 'Développeur et Designer Créatif',
                subtitle: 'Transformer les idées en expériences numériques immersives'
            },
            about: {
                title: 'À Propos',
                background: 'Parcours',
                skills: 'Compétences'
            },
            projects: {
                title: 'Projets Phares',
                filters: {
                    all: 'Tous',
                    web: 'Web',
                    mobile: 'Mobile',
                    '3d': '3D'
                }
            },
            contact: {
                title: 'Contact',
                name: 'Nom',
                email: 'Email',
                message: 'Message',
                send: 'Envoyer'
            }
        }
    };

    function updateContent(content) {
        // Update all sections with translations
        document.querySelector('#hero h1').textContent = content.hero.title;
        document.querySelector('#hero p').textContent = content.hero.subtitle;

        document.querySelector('#about h2').textContent = content.about.title;
        document.querySelector('#about h3:first-of-type').textContent = content.about.background;
        document.querySelector('#about h3:last-of-type').textContent = content.about.skills;

        document.querySelector('#projects h2').textContent = content.projects.title;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            btn.textContent = content.projects.filters[filter];
        });

        document.querySelector('#contact h2').textContent = content.contact.title;
        document.querySelector('label[for="name"]').textContent = content.contact.name;
        document.querySelector('label[for="email"]').textContent = content.contact.email;
        document.querySelector('label[for="message"]').textContent = content.contact.message;
        document.querySelector('#contact-form button').textContent = content.contact.send;
    }

    languageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang === currentLang) return;

            currentLang = lang;
            updateContent(translations[lang]);
        });
    });

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type} position-fixed top-0 end-0 m-3 p-3 rounded shadow-lg`;
        notification.textContent = message;

        document.body.appendChild(notification);

        gsap.fromTo(notification,
            { y: -50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    setTimeout(() => {
                        gsap.to(notification, {
                            y: -50,
                            opacity: 0,
                            duration: 0.5,
                            ease: 'power2.in',
                            onComplete: () => notification.remove()
                        });
                    }, 3000);
                }
            }
        );
    }

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


    // Resume Download
    const resumeBtn = document.querySelector('.resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            // Add analytics tracking
            console.log('Resume downloaded');
        });
    }
});