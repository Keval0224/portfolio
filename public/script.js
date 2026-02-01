document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Particles.js (Keep existing background)
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.2, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // 2. Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    // 3. Hero Section Animations (On Load)
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl.from(".navbar", { y: -100, opacity: 0, duration: 1 })
        .from(".hero h1", { y: 50, opacity: 0, duration: 1 }, "-=0.5")
        .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-tagline", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-buttons .btn", { y: 20, opacity: 0, duration: 0.8, stagger: 0.2 }, "-=0.6");

    // 4. Scroll Animations (ScrollTrigger)

    // Generic Section Title Reveal
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 1
        });
    });

    // About Text
    gsap.from(".about-text", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 75%"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2
    });

    // Skills Badges (Staggered Pop-in)
    gsap.from(".skill-badge", {
        scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%"
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(1.7)"
    });

    // Project Cards (Staggered Fade Up)
    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });

    // Experience Items (Slide In from Left)
    gsap.utils.toArray(".timeline-item").forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%"
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Contact Section
    gsap.from(".contact-info", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 75%"
        },
        x: -30,
        opacity: 0,
        duration: 1
    });

    gsap.from(".contact-form", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 75%"
        },
        x: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2
    });

    // 5. Mobile Menu Logic (preserved)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scroll for Internal Links (Optional, CSS usually handles it, but this adds control)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
