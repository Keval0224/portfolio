document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Three.js Galaxy Background
       ========================================= */
    const canvas = document.querySelector('#bg-canvas');
    const scene = new THREE.Scene();

    // Use a fog to create depth
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // --- Starfield ---
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const starPosArray = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
        starPosArray[i] = (Math.random() - 0.5) * 2000; // Spread stars wide
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPosArray, 3));

    const starMaterial = new THREE.PointsMaterial({
        size: 2,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // --- Galaxy Spiral (The "Next Level" Element) ---
    // Parameters
    const parameters = {
        count: 10000,
        size: 0.02,
        radius: 100,
        branches: 3,
        spin: 1,
        randomness: 0.2,
        randomnessPower: 3,
        insideColor: '#ec4899', // Pink (Core)
        outsideColor: '#a855f7' // Deep Purple (Arms)
    };

    let geometry = null;
    let material = null;
    let points = null;

    const generateGalaxy = () => {
        if (points !== null) {
            geometry.dispose();
            material.dispose();
            scene.remove(points);
        }

        geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);

        const colorInside = new THREE.Color(parameters.insideColor);
        const colorOutside = new THREE.Color(parameters.outsideColor);

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;

            // Radius
            const radius = Math.random() * parameters.radius;

            // Spin angle
            const spinAngle = radius * parameters.spin;

            // Branch angle
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

            // Randomness
            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY; // Flat galaxy
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            // Colors
            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / parameters.radius);

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        material = new THREE.PointsMaterial({
            size: parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        });

        points = new THREE.Points(geometry, material);

        // Tilt the galaxy slightly
        points.rotation.x = 0.5;
        scene.add(points);
    };

    // Initialize Galaxy
    generateGalaxy();

    // --- Animation Loop ---
    camera.position.z = 100;
    camera.position.y = 20;

    let mouseX = 0;
    let mouseY = 0;

    // Mouse Move Effect
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // Rotate Galaxy
        if (points) {
            points.rotation.y = elapsedTime * 0.05;
        }

        // Rotate Stars slowly
        stars.rotation.y = -elapsedTime * 0.02;

        // Slight Camera movement based on mouse
        camera.position.x += (mouseX * 0.001 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.001 - camera.position.y) * 0.05;

        // Parallax Effect on Scroll
        const scrollY = window.scrollY;
        camera.position.z = 100 - scrollY * 0.05;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });


    /* =========================================
       Existing Functionality (Preserved)
       ========================================= */

    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: false,
        mirror: true
    });

    // Initialize Typed.js
    if (document.querySelector('.role-dynamic')) {
        new Typed('.role-dynamic', {
            strings: ['BCA Student', 'DevOps Enthusiast', 'Web Developer'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
});
