/**
 * SoleX Premium Footwear Shop Landing Page
 * Interactive Logic (Cursor, Scrollspy, Particles, Testimonials)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Custom Cursor Follower
    const cursor = document.getElementById('customCursor');
    const follower = document.getElementById('customCursorFollower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Move primary cursor immediately
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });
    
    // Lerp animation for follower ring
    function updateFollower() {
        const speed = 0.12; // Lerp factor
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;
        
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        
        requestAnimationFrame(updateFollower);
    }
    updateFollower();
    
    // Add hover states for interactive elements
    const interactiveElements = document.querySelectorAll('.cursor-trigger, a, button, input');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // 2. Sticky Navbar scroll state & Scroll Progress Indicator
    const navbar = document.getElementById('mainNavbar');
    const progressBar = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPct = (scrollTop / docHeight) * 100;
        
        // Update progress bar width
        progressBar.style.width = `${scrollPct}%`;
        
        // Update navbar style
        if (scrollTop > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Update Back to Top button
        const backToTop = document.getElementById('backToTop');
        if (scrollTop > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // 3. Back to Top Smooth Scroll
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Click Ripple Effect
    const rippleButtons = document.querySelectorAll('.ripple-container');
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 5. Stat Counter Animations
    const stats = document.querySelectorAll('.count-anim');
    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-target'), 10);
                let current = 0;
                const duration = 2000; // 2 seconds
                const stepTime = Math.abs(Math.floor(duration / countTo));
                
                const timer = setInterval(() => {
                    current += 1;
                    if (target.getAttribute('data-target') === "99") {
                        target.textContent = `${current}%`;
                    } else if (target.getAttribute('data-target') === "500") {
                        target.textContent = `${current}K+`;
                    } else {
                        target.textContent = `${current}+`;
                    }
                    
                    if (current >= countTo) {
                        clearInterval(timer);
                        if (target.getAttribute('data-target') === "99") {
                            target.textContent = `${countTo}%`;
                        } else if (target.getAttribute('data-target') === "500") {
                            target.textContent = `${countTo}K+`;
                        } else {
                            target.textContent = `${countTo}+`;
                        }
                    }
                }, stepTime);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statObserver.observe(stat));

    // 6. Testimonials Auto Sliding Carousel
    const track = document.getElementById('testimonialTrack');
    const slides = Array.from(track.children);
    const dotsContainer = document.getElementById('testimonialDots');
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Create dots dynamically
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = Array.from(dotsContainer.children);
    
    function goToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots[currentIndex].classList.remove('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            goToSlide(nextIndex);
        }, 5000); // Slide every 5s
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    startAutoSlide();

    // 7. Interactive Canvas Particles Background (Newsletter)
    const canvas = document.getElementById('newsletterCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.6 - 0.3;
                this.speedY = Math.random() * 0.6 - 0.3;
                this.color = Math.random() > 0.5 ? '#7c3aed' : '#f472b6';
                this.alpha = Math.random() * 0.5 + 0.1;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Wrap boundaries
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }
        }
        
        function initParticles() {
            particles = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();
        window.addEventListener('resize', initParticles);
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // 8. Contact Form / Newsletter Submission logic
    const newsForm = document.getElementById('newsForm');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const messageInput = document.getElementById('messageInput');
    const successMsg = document.getElementById('newsletterSuccess');
    const errorMsg = document.getElementById('newsletterError');
    const errorMessageSpan = document.getElementById('errorMessage');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');
    
    if (newsForm) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameVal = nameInput ? nameInput.value.trim() : '';
            const emailVal = emailInput ? emailInput.value.trim() : '';
            const messageVal = messageInput ? messageInput.value.trim() : '';
            
            if (nameVal && emailVal && messageVal) {
                // Hide any previous messages
                successMsg.classList.add('d-none');
                errorMsg.classList.add('d-none');
                
                // Disable inputs
                nameInput.disabled = true;
                emailInput.disabled = true;
                messageInput.disabled = true;
                subscribeBtn.disabled = true;
                
                // Show spinner
                if (btnSpinner) btnSpinner.classList.remove('d-none');
                if (btnText) btnText.textContent = 'Submitting...';
                
                // Submit via fetch to Flask backend
                fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nameVal,
                        email: emailVal,
                        message: messageVal
                    })
                })
                .then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(res => {
                    if (res.status === 200 && res.body.status === 'success') {
                        // Show success
                        successMsg.classList.remove('d-none');
                        // Reset values
                        newsForm.reset();
                    } else {
                        // Show error
                        if (errorMessageSpan) {
                            errorMessageSpan.textContent = res.body.message || 'An error occurred. Please try again.';
                        }
                        errorMsg.classList.remove('d-none');
                    }
                })
                .catch(err => {
                    console.error('Submission Error:', err);
                    if (errorMessageSpan) {
                        errorMessageSpan.textContent = 'Failed to connect to the server. Please try again later.';
                    }
                    errorMsg.classList.remove('d-none');
                })
                .finally(() => {
                    // Re-enable inputs
                    nameInput.disabled = false;
                    emailInput.disabled = false;
                    messageInput.disabled = false;
                    subscribeBtn.disabled = false;
                    
                    // Hide spinner
                    if (btnSpinner) btnSpinner.classList.add('d-none');
                    if (btnText) btnText.textContent = 'Submit Details';
                });
            }
        });
    }
});
