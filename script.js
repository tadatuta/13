// Language Switching Functionality
function updateLanguage() {
    const currentLang = document.documentElement.lang || 'ru';
    const switchLink = document.getElementById('languageSwitch');

    if (switchLink) {
        if (currentLang === 'ru') {
            switchLink.textContent = 'English';
            switchLink.href = 'index_en.html';
        } else {
            switchLink.textContent = 'Русский';
            switchLink.href = 'index.html';
        }
    }
}

// Initialize language switcher
document.addEventListener('DOMContentLoaded', updateLanguage);

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-toggle__icon');

// Check for saved theme preference or respect system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply theme based on saved preference or system preference
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
} else if (systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
} else {
    themeIcon.textContent = '🌙';
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update icon
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navList = document.querySelector('.nav__list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link or theme toggle
document.querySelectorAll('.nav__list a, .nav__cta, .theme-toggle').forEach(element => {
    element.addEventListener('click', () => {
        navList.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox__close');
const lightboxPrev = document.querySelector('.lightbox__prev');
const lightboxNext = document.querySelector('.lightbox__next');
const galleryItems = document.querySelectorAll('.gallery__item');

let currentIndex = 0;

// Open lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        const fullsizeSrc = item.querySelector('img').getAttribute('data-fullsize');
        lightboxImg.src = fullsizeSrc;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    });
});

// Close lightbox
lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close lightbox when clicking on the background
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Navigation in lightbox
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const fullsizeSrc = galleryItems[currentIndex].querySelector('img').getAttribute('data-fullsize');
    lightboxImg.src = fullsizeSrc;
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryItems.length;
    const fullsizeSrc = galleryItems[currentIndex].querySelector('img').getAttribute('data-fullsize');
    lightboxImg.src = fullsizeSrc;
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            lightboxPrev.click();
        } else if (e.key === 'ArrowRight') {
            lightboxNext.click();
        }
    }
});

// Form validation and submission
const consultationForm = document.getElementById('consultationForm');

consultationForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const eventType = document.getElementById('event-type').value;

    // Simple validation
    if (!name || !phone || !eventType) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return;
    }

    // Phone validation (simple)
    const phoneRegex = /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!phoneRegex.test(phone)) {
        alert('Пожалуйста, введите корректный номер телефона.');
        return;
    }

    // Email validation (if provided)
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Пожалуйста, введите корректный email.');
            return;
        }
    }

    // If validation passes, show success message
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');

    // Reset form
    consultationForm.reset();
});

// Book consultation buttons
const bookButtons = document.querySelectorAll('#bookConsultation, #heroCta');
bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            window.scrollTo({
                top: contactSection.offsetTop - 80,
                behavior: 'smooth'
            });

            // Focus on name field
            setTimeout(() => {
                document.getElementById('name').focus();
            }, 1000);
        }
    });
});

// Animation on scroll (simple implementation)
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service__card, .team__member, .feature__item, .pricing__section');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.querySelectorAll('.service__card, .team__member, .feature__item, .pricing__section').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Trigger animations on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
