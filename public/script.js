document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#38bdf8" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
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

    // 3. Hero Section Animations
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    heroTl.from(".navbar", { y: -100, opacity: 0, duration: 1 })
        .from(".hero-title", { y: 50, opacity: 0, duration: 1, skewY: 5 }, "-=0.5")
        .from(".hero-subtitle", { y: 30, opacity: 0, duration: 1 }, "-=0.7")
        .from(".hero-tagline", { scale: 0.8, opacity: 0, duration: 0.8 }, "-=0.7")
        .from(".hero-buttons .btn", { y: 20, opacity: 0, duration: 0.8, stagger: 0.2 }, "-=0.6");

    // NEW: Typed.js Initialization
    if (document.querySelector('.typing-text')) {
        var typed = new Typed('.typing-text', {
            strings: ["BCA Student", "Web Developer", "DevOps Learner"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true,
        });
    }

    // 4. Scroll Animations

    // Section Titles
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1
        });
    });

    // About Text
    gsap.from(".about-text", {
        scrollTrigger: {
            trigger: ".about-text",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 1
    });

    // Stats Counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let countObj = { val: 0 };
        gsap.to(countObj, {
            val: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".stats-container",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            onUpdate: function () {
                counter.innerText = Math.round(countObj.val) + "+";
            }
        });
    });

    // Skill Cards (Staggered Fade In)
    gsap.from(".skill-card", {
        scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 95%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        clearProps: "all"
    });

    // Project Cards (Staggered)
    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 95%",
            toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "all"
    });

    // Experience Items
    gsap.utils.toArray(".timeline-item").forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            clearProps: "all"
        });
    });

    // Contact
    const contactTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    contactTl.from(".contact-info", { x: -50, opacity: 0, duration: 1 })
        .from(".contact-form", { x: 50, opacity: 0, duration: 1 }, "-=0.8");

    // Mobile Menu
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

});
