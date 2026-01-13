/**
 * ============================================
 * White Crown Enterprises - Main JavaScript
 * ============================================
 */

/**
 * ============================================
 * 1. THEME SWITCHER MODULE
 * ============================================
 */
const ThemeSwitcher = {
    // Elements
    themeToggle: null,
    themeIcon: null,
    html: document.documentElement,
    logoImg: null,

    // Initialize theme switcher
    init() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.logoImg = document.querySelector('.logo-img');

        // Load saved theme or default to 'light'
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme, false);

        // Attach event listener
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    },

    // Toggle between light and dark themes
    toggleTheme() {
        const currentTheme = this.html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme, true);
    },

    // Set theme and update UI
    setTheme(theme, save = true) {
        // Update HTML attribute
        this.html.setAttribute('data-theme', theme);

        // Update theme icon
        this.updateThemeIcon(theme);

        // Update logo image
        this.updateLogo(theme);

        // Save to localStorage
        if (save) {
            localStorage.setItem('theme', theme);
        }
    },

    // Update the theme toggle icon
    updateThemeIcon(theme) {
        if (this.themeIcon) {
            this.themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
        }
    },

    // Update logo based on theme
    updateLogo(theme) {
        if (this.logoImg) {
            const logoSrc = theme === 'light' ? 'logo.png' : 'dark-logo.png';
            this.logoImg.src = logoSrc;
            this.logoImg.alt = 'White Crown Enterprises - ' + (theme === 'light' ? 'Light' : 'Dark') + ' Logo';
        }
    }
};

/**
 * ============================================
 * 2. NAVIGATION MODULE
 * ============================================
 */
const Navigation = {
    // Elements
    mobileMenuBtn: null,
    navLinks: null,
    header: null,

    // Initialize navigation
    init() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinks = document.getElementById('navLinks');
        this.header = document.getElementById('header');

        // Mobile menu toggle
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking a link
        const navLinkElements = document.querySelectorAll('.nav-links a');
        navLinkElements.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Header scroll effect
        window.addEventListener('scroll', () => this.handleScroll());
    },

    // Toggle mobile menu
    toggleMobileMenu() {
        if (this.navLinks) {
            this.navLinks.classList.toggle('active');
        }
    },

    // Close mobile menu
    closeMobileMenu() {
        if (this.navLinks) {
            this.navLinks.classList.remove('active');
        }
    },

    // Handle scroll effects on header
    handleScroll() {
        if (this.header) {
            if (window.scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }
    }
};

/**
 * ============================================
 * 3. SCROLL TO TOP MODULE
 * ============================================
 */
const ScrollToTop = {
    // Elements
    scrollToTopBtn: null,

    // Initialize scroll to top
    init() {
        this.scrollToTopBtn = document.getElementById('scrollToTop');

        // Show/hide button on scroll
        window.addEventListener('scroll', () => this.handleScroll());

        // Scroll to top on click
        if (this.scrollToTopBtn) {
            this.scrollToTopBtn.addEventListener('click', () => this.scrollToTop());
        }
    },

    // Handle scroll visibility
    handleScroll() {
        if (this.scrollToTopBtn) {
            if (window.scrollY > 500) {
                this.scrollToTopBtn.classList.add('visible');
            } else {
                this.scrollToTopBtn.classList.remove('visible');
            }
        }
    },

    // Smooth scroll to top
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

/**
 * ============================================
 * 4. FORM HANDLER MODULE
 * ============================================
 */
const FormHandler = {
    // Initialize form handler
    init() {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    },

    // Handle form submission
    handleSubmit(event) {
        event.preventDefault();

        // Show success message
        alert('Thank you for your interest! We will contact you shortly.');

        // Reset form
        event.target.reset();
    }
};

/**
 * ============================================
 * 5. INITIALIZATION
 * ============================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    ThemeSwitcher.init();
    Navigation.init();
    ScrollToTop.init();
    FormHandler.init();

    // Make HTML visible (prevent FOUC - Flash of Unstyled Content)
    document.documentElement.style.visibility = 'visible';

    console.log('🏔️ White Crown Enterprises - Website Initialized');
});

/**
 * ============================================
 * 6. UTILITY FUNCTIONS
 * ============================================
 */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export modules for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeSwitcher,
        Navigation,
        ScrollToTop,
        FormHandler
    };
}
