document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. 3D Abstract Tech Background (Three.js)
       ========================================= */
    const canvas = document.querySelector('#bg-canvas');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f172a, 0.002); // Slate 900 fog

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // --- Floating Abstract Geometric Shapes ---
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0x38bdf8, // Sky Blue
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const mesh = new THREE.Mesh(geometry, material);

        // Random Position
        mesh.position.x = (Math.random() - 0.5) * 80;
        mesh.position.y = (Math.random() - 0.5) * 50;
        mesh.position.z = (Math.random() - 0.5) * 50;

        // Random Scale
        const scale = Math.random() * 2 + 0.5;
        mesh.scale.set(scale, scale, scale);

        // Random Rotation Speed
        mesh.userData = {
            rotX: (Math.random() - 0.5) * 0.02,
            rotY: (Math.random() - 0.5) * 0.02,
            velX: (Math.random() - 0.5) * 0.05,
            velY: (Math.random() - 0.5) * 0.05
        };

        shapesGroup.add(mesh);
        particles.push(mesh);
    }

    // Add some connecting lines logic or just float?
    // Let's keep it clean with just floating polyhedrons for now.

    // --- Subtle Grid Floor (Retro/Tech vibe) ---
    const gridHelper = new THREE.GridHelper(100, 50, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -20;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.2;
    scene.add(gridHelper);

    // Animation
    camera.position.z = 30;

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const clock = new THREE.Clock();

    const animate = () => {
        const time = clock.getElapsedTime();

        // Rotate entire group slowly
        shapesGroup.rotation.y = time * 0.05;

        // Animate individual particles
        particles.forEach(p => {
            p.rotation.x += p.userData.rotX;
            p.rotation.y += p.userData.rotY;

            // Floating motion
            p.position.x += Math.sin(time * 0.5 + p.position.y) * 0.02;
            p.position.y += Math.cos(time * 0.3 + p.position.x) * 0.02;
        });

        // Camera gentle float
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

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
