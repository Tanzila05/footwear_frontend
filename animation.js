/**
 * SoleX Premium Footwear Shop Landing Page
 * GSAP & AOS Animations (Wipes, Parallax, Tilts)
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. GSAP Loader & Intro Timeline
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loaderBar');
    const loaderNum = document.getElementById('loaderNum');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Run page entry timeline
            runEntryTimeline();
        }
        loaderBar.style.width = `${progress}%`;
        loaderNum.textContent = `${progress}%`;
    }, 80);

    function runEntryTimeline() {
        const tl = gsap.timeline();
        
        // Fade out loader numbers/bar
        tl.to([loaderBar.parentElement, loaderNum], {
            opacity: 0,
            duration: 0.4
        });
        
        // Scale logo up in loader
        tl.to('#loaderLogo', {
            scale: 1.2,
            opacity: 0,
            duration: 0.6,
            ease: 'back.in(1.7)'
        });
        
        // Slide preloader screen up out of view
        tl.to(preloader, {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut'
        });
        
        // Hide preloader element entirely after transition completes
        tl.set(preloader, { display: 'none' });
        
        // --- Page Element Entrances ---
        
        // Header Nav Items Slide Down
        tl.from('#mainNavbar', {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4');
        
        // Giant background brand text zoom in
        tl.from('#giantText', {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out'
        }, '-=0.8');
        
        // Tagline reveal
        tl.from('#heroTag', {
            x: -30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=1.0');
        
        // Title Text Wipes / Reveals
        tl.from('#heroTitle', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.8');
        
        // Description reveal
        tl.from('#heroDesc', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6');
        
        // Buttons reveal
        tl.from('#heroButtons', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.5');
        
        // Hero shoe image entry
        tl.from('#heroShoeImage', {
            scale: 0,
            rotation: -45,
            opacity: 0,
            duration: 1.2,
            ease: 'back.out(1.2)'
        }, '-=1.2');
        
        // Background glow orbit rings
        tl.from('.hero-shoe-glow', {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.8');
        
        // Mouse scroll icon bounce in
        tl.from('#scrollIndicator', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4');
        
        // Trigger AOS initialization here to keep synced
        tl.add(() => {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 120,
                easing: 'ease-out-cubic'
            });
        });
    }

    // 2. Mouse parallax for Hero Section
    const hero = document.getElementById('home');
    const giantText = document.getElementById('giantText');
    const heroShoe = document.getElementById('heroShoeImage');
    
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Normalize mouse position between -0.5 and 0.5
            const mouseX = (e.clientX / width) - 0.5;
            const mouseY = (e.clientY / height) - 0.5;
            
            // Parallax shift for background giant text
            gsap.to(giantText, {
                x: mouseX * 60,
                y: mouseY * 30,
                duration: 0.6,
                ease: 'power1.out'
            });
            
            // Subtle 3D tilt shift for the hero sneaker
            gsap.to(heroShoe, {
                rotationY: mouseX * 25,
                rotationX: -mouseY * 25,
                x: mouseX * 20,
                y: mouseY * 20,
                duration: 0.6,
                ease: 'power1.out'
            });
        });
        
        hero.addEventListener('mouseleave', () => {
            // Reset to defaults on mouse leave
            gsap.to([giantText, heroShoe], {
                x: 0,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                duration: 1,
                ease: 'power2.out'
            });
        });
    }

    // 3. 3D Tilt Card effect for Featured Shoes grid
    const cards = document.querySelectorAll('.shoe-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            
            // Find coordinate relative to card center
            const mouseX = e.clientX - rect.left - (width / 2);
            const mouseY = e.clientY - rect.top - (height / 2);
            
            // Map to rotation angles
            const angleX = -(mouseY / (height / 2)) * 12;
            const angleY = (mouseX / (width / 2)) * 12;
            
            gsap.to(card, {
                rotationX: angleX,
                rotationY: angleY,
                transformPerspective: 1000,
                scale: 1.03,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    });

    // 4. Parallax Background Scrolling on New Arrival Banner
    const parallaxBg = document.getElementById('parallaxBg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const rect = parallaxBg.parentElement.getBoundingClientRect();
            const scrollY = window.scrollY;
            
            // Calculate relative offset based on page scroll
            const offset = (scrollY - parallaxBg.parentElement.offsetTop) * 0.2;
            
            gsap.to(parallaxBg, {
                y: offset,
                duration: 0.1,
                ease: 'none'
            });
        });
    }
});
