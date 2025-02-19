class ThreeScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('three-canvas'),
            alpha: true,
            antialias: true
        });

        this.mouse = new THREE.Vector2();
        this.targetRotation = new THREE.Vector2();
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

        for(let i = 0; i < 200; i++) {
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            );
            particle.scale.setScalar(Math.random() * 0.5 + 0.5);
            this.particles.add(particle);
        }

        this.scene.add(this.particles);

        // Add center sphere
        const sphereGeometry = new THREE.IcosahedronGeometry(1, 2);
        const sphereMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x6c63ff,
            wireframe: true
        });
        this.centerSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.scene.add(this.centerSphere);

        // Event listeners
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('resize', () => this.onWindowResize());

        // Animation
        this.animate();
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.targetRotation.x = this.mouse.y * 0.5;
        this.targetRotation.y = this.mouse.x * 0.5;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate particles
        this.particles.rotation.x += 0.001;
        this.particles.rotation.y += 0.002;

        // Smooth center sphere rotation
        this.centerSphere.rotation.x += (this.targetRotation.x - this.centerSphere.rotation.x) * 0.05;
        this.centerSphere.rotation.y += (this.targetRotation.y - this.centerSphere.rotation.y) * 0.05;

        // Pulse animation for center sphere
        const time = Date.now() * 0.001;
        this.centerSphere.scale.setScalar(1 + Math.sin(time) * 0.1);

        // Animate particles
        this.particles.children.forEach((particle, i) => {
            particle.position.y += Math.sin(time + i) * 0.01;
        });

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}