/* ========================================
   PASTEL PINK WEBSITE - JAVASCRIPT
   ======================================== */

// ========== DOCUMENT READY =========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeParticles();
    initializeCardInteractions();
    initializeFloatingAnimation();
    console.log('Website initialized successfully! ✨');
});

// ========== FLOATING PARTICLES GENERATOR =========
function initializeParticles() {
    const particlesContainer = document.getElementById('particlesContainer');
    const particleCount = 20; // Number of floating particles

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random horizontal position
        const randomLeft = Math.random() * 100;
        particle.style.left = randomLeft + '%';

        // Random animation duration (15s to 25s)
        const randomDuration = 15 + Math.random() * 10;
        particle.style.animationDuration = randomDuration + 's';

        // Random animation delay
        const randomDelay = Math.random() * 3;
        particle.style.animationDelay = randomDelay + 's';

        // Random particle size (4px to 8px)
        const randomSize = 4 + Math.random() * 4;
        particle.style.width = randomSize + 'px';
        particle.style.height = randomSize + 'px';

        // Add opacity variation
        const randomOpacity = 0.3 + Math.random() * 0.7;
        particle.style.opacity = randomOpacity;

        particlesContainer.appendChild(particle);
    }

    console.log('✨ Particles initialized: ' + particleCount + ' floating particles created');
}

// ========== CARD HOVER INTERACTIONS =========
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // Ensure cursor is pointer and maintain visibility
        card.style.cursor = 'pointer';
        card.style.opacity = '1';

        // Mouse enter event
        card.addEventListener('mouseenter', function() {
            // Add floating animation on hover
            this.classList.add('float-animation');
            
            // Ensure styling is not removed
            this.style.opacity = '1';
            this.style.visibility = 'visible';

            // Optional: Add ripple effect
            createRippleEffect(this);
        });

        // Mouse leave event
        card.addEventListener('mouseleave', function() {
            // Remove floating animation
            this.classList.remove('float-animation');
            // Maintain visibility
            this.style.opacity = '1';
        });

        // Click event (optional feedback)
        card.addEventListener('click', function(e) {
            // Maintain visibility on click
            this.style.opacity = '1';
            this.style.visibility = 'visible';
            
            // Prevent default if link is placeholder
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                console.log('Card clicked: ' + this.getAttribute('data-card'));
                // You can add custom behavior here
                showNotification(this);
            }
        });

        // Focus event for accessibility
        card.addEventListener('focus', function() {
            this.classList.add('float-animation');
            this.style.opacity = '1';
            this.style.visibility = 'visible';
        });

        card.addEventListener('blur', function() {
            this.classList.remove('float-animation');
            this.style.opacity = '1';
        });

        // Touch events for mobile devices
        card.addEventListener('touchstart', function() {
            this.classList.add('float-animation');
            this.style.opacity = '1';
            this.style.visibility = 'visible';
            createRippleEffect(this);
        });

        card.addEventListener('touchend', function() {
            this.classList.remove('float-animation');
            this.style.opacity = '1';
        });
    });

    console.log('🎯 Card interactions initialized with persistent visibility');
}

// ========== CREATE RIPPLE EFFECT =========
function createRippleEffect(element) {
    // Check if ripple already exists
    const existingRipple = element.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    // Get position
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (rect.width - size) / 2;
    const y = (rect.height - size) / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    // Add ripple styles via inline (optional, can be in CSS)
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'rippleAnimation 0.6s ease-out';
    ripple.style.pointerEvents = 'none';

    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600);
}

// ========== FLOATING ANIMATION =========
function initializeFloatingAnimation() {
    // This function enhances the floating effect on elements
    // The actual animation is handled by CSS, but we can add interactivity here

    // Optional: Add mouse parallax effect to cards
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            // Apply subtle 3D tilt on hover
            this.style.transform = `scale(1.05) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            // Reset transform
            this.style.transform = 'scale(1) perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    console.log('✨ Floating animations enhanced with parallax effects');
}

// ========== NOTIFICATION SYSTEM =========
function showNotification(cardElement) {
    const cardTitle = cardElement.querySelector('.card-title').textContent;

    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        color: #333;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.25), 
                    0 0 20px rgba(255, 105, 180, 0.2);
        font-weight: 500;
        z-index: 1000;
        animation: slideInNotification 0.3s ease-out;
        font-family: 'Poppins', sans-serif;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 105, 180, 0.2);
    `;
    notification.textContent = `✨ ${cardTitle} card clicked!`;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// ========== SMOOTH PAGE LOAD ANIMATION =========
window.addEventListener('load', function() {
    console.log('✨ Page fully loaded and animated!');

    // Optional: Add any post-load effects
    const header = document.querySelector('.header');
    if (header) {
        header.style.opacity = '1';
    }
});

// ========== DETECT SCROLL FOR FUTURE SCROLL ANIMATIONS =========
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card');
    animatedElements.forEach(el => observer.observe(el));
}

// ========== KEYBOARD NAVIGATION ENHANCEMENT =========
document.addEventListener('keydown', function(e) {
    // Handle Enter key on focused cards
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('card')) {
            activeElement.click();
        }
    }

    // Handle Tab key for accessibility
    if (e.key === 'Tab') {
        // Browser handles this naturally, but we can add visual feedback
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('card')) {
            console.log('Card focused via keyboard: ' + focusedElement.getAttribute('data-card'));
        }
    }
});

// ========== HELPER: ADD RIPPLE ANIMATION TO CSS DYNAMICALLY =========
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        @keyframes slideInNotification {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutNotification {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========== INITIALIZE ANIMATIONS =========
addRippleAnimation();

// ========== OPTIONAL: SMOOTH SCROLL BEHAVIOR =========
if (!('scrollBehavior' in document.documentElement.style)) {
    // Fallback for browsers that don't support smooth scroll
    document.querySelector('html').style.scrollBehavior = 'auto';
}

// ========== CONSOLE FEEDBACK =========
console.log(`
╔═══════════════════════════════════════╗
║  🌸 Pastel Pink Website               ║
║  Modern & Aesthetic UI Loaded ✨     ║
╚═══════════════════════════════════════╝
`);
