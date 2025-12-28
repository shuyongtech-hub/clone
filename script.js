/**
 * GitHub Modern Web App - Core Logic
 * Refactored for performance, modularity, and clean interaction.
 */

class App {
    constructor() {
        this.header = document.getElementById('header');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        
        this.init();
    }

    init() {
        this.registerScrollEffects();
        this.registerInteractions();
        this.initRevealObserver();
        console.log('GitHub App Initialized');
    }

    /**
     * Handles header appearance on scroll
     */
    registerScrollEffects() {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                this.header.classList.add('header--scrolled');
                this.header.style.boxShadow = 'var(--shadow-md)';
            } else {
                this.header.classList.remove('header--scrolled');
                this.header.style.boxShadow = 'none';
            }
        };

        window.addEventListener('scroll', this.throttle(handleScroll, 100));
    }

    /**
     * General UI Interactions
     */
    registerInteractions() {
        // Mobile Menu Toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                // For brevity, we could add/remove a class here to show a mobile menu
                this.showNotification('Mobile navigation is under development.');
            });
        }

        // CTA Button tracking / feedback
        document.querySelectorAll('.btn--primary').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showNotification('Welcome! Redirecting to setup...');
            });
        });
    }

    /**
     * Reveal on scroll using Intersection Observer
     */
    initRevealObserver() {
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    /**
     * Premium Notification Component (Programmatic)
     */
    showNotification(message) {
        // Cleanup existing notifications
        const existing = document.querySelector('.toast-container');
        if (existing) existing.remove();

        const container = document.createElement('div');
        container.className = 'toast-container';
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast__content">
                <i class="fa-solid fa-circle-info"></i>
                <span>${message}</span>
            </div>
        `;

        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: 'var(--secondary)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            zIndex: '2000',
            display: 'flex',
            alignItems: 'center',
            animation: 'toastIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            fontSize: '0.9rem',
            fontWeight: '500'
        });

        document.body.appendChild(container);
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s forwards';
            setTimeout(() => container.remove(), 300);
        }, 4000);
    }

    /**
     * Utility: Throttle function execution
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Styles for the dynamic notification
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes toastIn {
        from { opacity: 0; transform: translateY(100%) scale(0.9); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes toastOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
    }
    .toast__content { display: flex; align-items: center; gap: 0.75rem; }
    .toast__content i { color: var(--primary); }
`;
document.head.appendChild(styleSheet);

// App Boot
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});