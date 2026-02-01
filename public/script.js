document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Original Galaxy Background (Purple/Pink Spiral)
       ========================================= */
    const canvas = document.querySelector('#bg-canvas');
    if (canvas) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Parameters
        const parameters = {
            count: 15000,
            size: 0.02,
            radius: 5, // Tighter spiral for background
            branches: 3,
            spin: 1,
            randomness: 0.2,
            randomnessPower: 3,
            insideColor: '#ec4899', // Pink
            outsideColor: '#a855f7' // Purple
        };

        let geometry = null;
        let material = null;
        let points = null;

        const generateGalaxy = () => {
            geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(parameters.count * 3);
            const colors = new Float32Array(parameters.count * 3);

            const colorInside = new THREE.Color(parameters.insideColor);
            const colorOutside = new THREE.Color(parameters.outsideColor);

            for (let i = 0; i < parameters.count; i++) {
                const i3 = i * 3;
                const radius = Math.random() * parameters.radius + 2; // Spread out
                const spinAngle = radius * parameters.spin;
                const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

                const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
                const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
                const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

                positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
                positions[i3 + 1] = randomY;
                positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

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
            points.rotation.x = 0.4;
            scene.add(points);
        };
        generateGalaxy();

        // Starfield
        const starGeo = new THREE.BufferGeometry();
        const starCount = 3000;
        const starPos = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 100;
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const starMat = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff });
        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);

        camera.position.z = 8;
        camera.position.y = 2;

        let mouseX = 0;
        let mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth - 0.5;
            mouseY = e.clientY / window.innerHeight - 0.5;
        });

        const clock = new THREE.Clock();

        const animate = () => {
            const time = clock.getElapsedTime();
            points.rotation.y = time * 0.05;
            stars.rotation.y = -time * 0.02;

            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // Initialize AOS
    AOS.init({ duration: 800, easing: 'ease-out', once: false });

    // Initialize Typed.js
    if (document.querySelector('.role-dynamic')) {
        new Typed('.role-dynamic', {
            strings: ['DevOps Enthusiast', 'Web Developer', 'Software Engineer'],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true
        });
    }

    // Mobile Menu
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
