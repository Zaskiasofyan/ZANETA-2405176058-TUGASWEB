// ==================== STICKY NAVBAR ==================== //
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== SMOOTH SCROLL FOR NAV LINKS ==================== //
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== PHOTO STRIP AUTO-SCROLL ==================== //
const photoStrip = document.querySelector('.photo-strip');

if (photoStrip) {
    // Clone all photos to create seamless loop
    const photos = photoStrip.querySelectorAll('.photo-item');
    photos.forEach(photo => {
        const clone = photo.cloneNode(true);
        photoStrip.appendChild(clone);
    });

    // Ensure continuous animation
    photoStrip.addEventListener('animationend', () => {
        // This keeps the animation smooth
    });
}

// ==================== INTERSECTION OBSERVER FOR FADE IN ON SCROLL ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-scroll');
            // Don't unobserve, keep observing for multiple triggers if needed
        }
    });
}, observerOptions);

// Observe all cards and content sections
document.querySelectorAll('.skill-card').forEach(el => observer.observe(el));
document.querySelectorAll('.project-card').forEach(el => observer.observe(el));
document.querySelectorAll('.experience-card').forEach(el => observer.observe(el));
document.querySelectorAll('.achievement-card').forEach(el => observer.observe(el));
document.querySelectorAll('.soft-skill-card').forEach(el => observer.observe(el));
document.querySelectorAll('.skills-category').forEach(el => observer.observe(el));
document.querySelector('.about-content') && observer.observe(document.querySelector('.about-content'));

// ==================== SMOOTH SCROLL BEHAVIOR ==================== //
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll class to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for valid section links
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                const element = document.querySelector(href);
                const offset = 80; // navbar height
                const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
                
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ==================== CTA BUTTON SCROLL ==================== //
const ctaButton = document.querySelector('.cta-button');

if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const offset = 80; // navbar height
            const elementPosition = aboutSection.getBoundingClientRect().top + window.scrollY - offset;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ==================== INTERACTIVE EFFECTS ==================== //

// Hover effects for skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.position = 'relative';
    });
});

// Hover effects for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Already handled by CSS
    });
});

// ==================== PARALLAX EFFECT (OPTIONAL) ==================== //
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const heroGlow = document.querySelector('.hero-glow');
        if (heroGlow) {
            heroGlow.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.5}px))`;
        }
    }
});

// ==================== ACCESSIBILITY & KEYBOARD NAVIGATION ==================== //
document.addEventListener('keydown', (e) => {
    // Escape key can be used to close any modals if added in future
    if (e.key === 'Escape') {
        // Handle escape key if needed
    }
    
    // Tab navigation is handled by default browser behavior
});

// ==================== ANIMATE ON PAGE LOAD ==================== //
window.addEventListener('load', () => {
    // Trigger animations for hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroTagline = document.querySelector('.hero-tagline');
    const ctaBtn = document.querySelector('.cta-button');
    
    if (heroTitle) heroTitle.style.animation = 'fadeIn 0.8s ease-out forwards';
    if (heroTagline) heroTagline.style.animation = 'fadeIn 0.8s ease-out 0.2s forwards';
    if (ctaBtn) ctaBtn.style.animation = 'fadeIn 0.8s ease-out 0.4s forwards';
});

// ==================== PERFORMANCE OPTIMIZATION ==================== //
// Debounce scroll events for better performance
let scrollTimeout;
const debounceScroll = () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll event handling
    });
};

window.addEventListener('scroll', debounceScroll, { passive: true });

// ==================== MOBILE MENU TOGGLE (FOR FUTURE USE) ==================== //
// If you add a hamburger menu, this will help
const setupMobileMenu = () => {
    const menuButton = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
};

setupMobileMenu();

// ==================== HANDLE CONTACT LINKS ==================== //
const contactButtons = document.querySelectorAll('.contact-btn');

contactButtons.forEach(btn => {
    // Buttons already have href attributes, just ensure they work
    btn.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // WhatsApp and Email have real links
        if (href && href !== '#') {
            // Let the default behavior handle it
            return true;
        }
        
        // LinkedIn and CV buttons are placeholders
        if (this.classList.contains('linkedin-btn')) {
            e.preventDefault();
            alert('LinkedIn profile link to be added');
        }
        
        if (this.classList.contains('cv-btn')) {
            e.preventDefault();
            alert('CV download link to be added');
        }
    });
});

// ==================== RESPONSIVE IMAGE LOADING ==================== //
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// ==================== DARK MODE PREFERENCE (OPTIONAL) ==================== //
// The site is already in dark mode, but this handles system preferences
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDarkScheme.matches) {
    document.body.classList.add('dark-theme');
} else {
    document.body.classList.add('light-theme');
}

// Listen for changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (e.matches) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
});

// ==================== CONSOLE WELCOME MESSAGE ==================== //
console.log('%c Welcome to Zaneta\'s Portfolio ', 'background: #39ff14; color: #000; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Let\'s build the future together! ', 'color: #39ff14; font-size: 14px;');
