class Animations {
    constructor() {
        this.initGSAP();
        this.initIntersectionObserver();
    }

    initGSAP() {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Hero Section Animation
        const heroTl = gsap.timeline();

        heroTl.from('#hero h1', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            ease: 'power4.out'
        })
        .from('#hero p', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power4.out'
        }, '-=0.8')
        .from('#hero .btn', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power4.out',
            stagger: 0.2
        }, '-=0.6')
        .from('.hero-image', {
            duration: 1.2,
            scale: 0.8,
            opacity: 0,
            ease: 'power4.out'
        }, '-=1');

        // About Section Animation
        gsap.from('#about h2', {
            scrollTrigger: {
                trigger: '#about',
                start: 'top 80%'
            },
            duration: 1,
            y: 50,
            opacity: 0
        });

        // Skills Animation
        document.querySelectorAll('.skill-item').forEach((skill, index) => {
            const progress = skill.getAttribute('data-progress');

            gsap.from(skill.querySelector('.progress-bar'), {
                scrollTrigger: {
                    trigger: skill,
                    start: 'top 80%'
                },
                width: 0,
                duration: 1.5,
                ease: 'power4.out',
                delay: index * 0.2
            });
        });

        // Project Cards Animation
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '#projects',
                start: 'top 80%'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power4.out'
        });

        // Contact Section Animation
        const contactTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 80%'
            }
        });

        contactTl.from('#contact h2', {
            y: 50,
            opacity: 0,
            duration: 1
        })
        .from('#contact form', {
            x: -100,
            opacity: 0,
            duration: 1
        }, '-=0.5')
        .from('.social-links a', {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
        }, '-=0.5')
        .from('.contact-info p', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
        }, '-=0.5');
    }

    initIntersectionObserver() {
        // Parallax effect for background particles
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
}