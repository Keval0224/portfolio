document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. 3D Black Hole / Vortex Background (Three.js)
       ========================================= */
    const canvas = document.querySelector('#bg-canvas');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030014, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // --- Black Hole Particle System ---
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 15000; // Dense
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    const colorInside = new THREE.Color('#ff00cc'); // Pink/Magenta center
    const colorOutside = new THREE.Color('#3300ff'); // Deep Blue/Purple edge

    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        // Vortex shape: flat spiral
        const radius = Math.random() * 50 + 10; // Hole in middle (radius 0-10 empty)
        const spinAngle = radius * 0.5; // More spin further out
        const branchAngle = (i % 5) * 2 * Math.PI / 5; // 5 arms

        const randomX = (Math.random() - 0.5) * 2;
        const randomY = (Math.random() - 0.5) * 5; // Flattened
        const randomZ = (Math.random() - 0.5) * 2;

        posArray[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        posArray[i3 + 1] = randomY;
        posArray[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // Color based on radius
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / 50);

        colorArray[i3] = mixedColor.r;
        colorArray[i3 + 1] = mixedColor.g;
        colorArray[i3 + 2] = mixedColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
    });

    const blackHole = new THREE.Points(particlesGeometry, particlesMaterial);

    // Position Black Hole at Top Center (as per screenshot)
    blackHole.rotation.x = 0.5; // Tilt to see spiral
    blackHole.position.y = 15; // Move up
    blackHole.position.z = -10; // Move back
    scene.add(blackHole);

    // --- Starfield Background ---
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 2000;
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ size: 1.5, color: 0xffffff, transparent: true, opacity: 0.6 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Animation
    camera.position.z = 40;

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const clock = new THREE.Clock();

    const animate = () => {
        const time = clock.getElapsedTime();

        // Rotate Vortex
        blackHole.rotation.y = time * 0.1;

        // Pulse Effect (Heartbeat of the black hole)
        const scale = 1 + Math.sin(time * 2) * 0.02;
        blackHole.scale.set(scale, scale, scale);

        // Stars drift
        stars.rotation.y = -time * 0.01;

        // Camera float
        camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
        camera.lookAt(0, 10, 0); // Look at black hole

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    /* =========================================
       2. 3D Floating Tag Cloud (CSS) 
       ========================================= */
    const tagCloudContainer = document.getElementById('tag-cloud');
    if (tagCloudContainer) {
        const skills = ['React', 'Node.js', 'AWS', 'Python', 'Docker', 'MongoDB', 'Three.js', 'DevOps', 'JS', 'Git'];

        // Create 3D Container
        const cloud = document.createElement('div');
        cloud.className = 'tag-cloud-container';
        tagCloudContainer.appendChild(cloud);

        // Distribute tags on a sphere using Fibonacci Spiral
        const radius = 180;

        skills.forEach((skill, i) => {
            const tag = document.createElement('div');
            tag.className = 'tag-item';
            tag.textContent = skill;

            // Spherical coordinates
            const phi = Math.acos(-1 + (2 * i) / skills.length);
            const theta = Math.sqrt(skills.length * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            tag.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
            cloud.appendChild(tag);
        });
    }

    // Initialize AOS
    AOS.init({ duration: 800, once: false });
});
