class Animations {
    constructor() {
        this.initGSAP();
    }

    initGSAP() {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Hero Section Animation
        gsap.from('#hero h1', {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: 'power4.out'
        });

        gsap.from('#hero p', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power4.out',
            delay: 0.3
        });

        gsap.from('#hero .btn', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power4.out',
            delay: 0.6,
            stagger: 0.2
        });

        // About Section Animation
        gsap.from('#about .skill-item', {
            scrollTrigger: {
                trigger: '#about',
                start: 'top center'
            },
            width: 0,
            duration: 1,
            stagger: 0.2
        });

        // Project Cards Animation
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '#projects',
                start: 'top center'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        });

        // Contact Section Animation
        gsap.from('#contact form', {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center'
            },
            x: -100,
            opacity: 0,
            duration: 1
        });

        gsap.from('.social-links a', {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center'
            },
            scale: 0,
            duration: 0.5,
            stagger: 0.1
        });
    }
}
