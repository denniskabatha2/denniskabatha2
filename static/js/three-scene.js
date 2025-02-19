class ThreeScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('three-canvas'),
            alpha: true
        });
        
        this.init();
    }

    init() {
        // Setup
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 5;

        // Add particles
        this.particles = new THREE.Group();
        const particleGeometry = new THREE.SphereGeometry(0.05, 24, 24);
        const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x6c63ff });

        for(let i = 0; i < 100; i++) {
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            this.particles.add(particle);
        }
        
        this.scene.add(this.particles);

        // Animation
        this.animate();

        // Resize handler
        window.addEventListener('resize', () => this.onWindowResize());
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.particles.rotation.x += 0.001;
        this.particles.rotation.y += 0.002;

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
