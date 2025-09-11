// Main JavaScript for Reena Pampana's Portfolio
document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeTypingAnimation();
    initializeThemeToggle();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeSmoothScrolling();
    initializePDFGeneration();
    emailjs.init('ZbhAuwPnsYbUMEnS6'); // EmailJS initialization
    initializeContactForm();
});

// -----------------------------
// Throttle function for performance
function throttle(fn, wait) {
    let time = Date.now();
    return function () {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

// -----------------------------
// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }, 16));

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Smooth scroll + close menu
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const elementTop = targetSection.getBoundingClientRect().top + window.scrollY;
                let targetPosition = elementTop - navbarHeight - 5;
                const maxScroll = document.body.scrollHeight - window.innerHeight;
                if (targetPosition > maxScroll) targetPosition = maxScroll;

                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', throttle(() => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navbarHeight = navbar.offsetHeight;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    }, 16));
}

// -----------------------------
// Typing animation
function initializeTypingAnimation() {
    const texts = [
        'ASP.NET Core Developer',
        'Angular Expert',
        'SQL Server Specialist',
        'Full Stack Engineer',
        'Problem Solver',
        'Clean Code Advocate'
    ];
    let textIndex = 0, charIndex = 0, isDeleting = false;
    const typingText = document.getElementById('typing-text');
    const typingSpeed = 80, deletingSpeed = 40, delayBetweenTexts = 2000;

    function typeWriter() {
        const currentText = texts[textIndex];
        typingText.textContent = isDeleting ?
            currentText.substring(0, charIndex - 1) :
            currentText.substring(0, charIndex + 1);

        charIndex += isDeleting ? -1 : 1;

        let speed = isDeleting ? deletingSpeed : typingSpeed;
        if (!isDeleting && charIndex === currentText.length) { speed = delayBetweenTexts; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % texts.length; }

        setTimeout(typeWriter, speed);
    }
    typeWriter();
}

// -----------------------------
// Theme toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => document.body.style.transition = '', 300);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// -----------------------------
// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('skills')) animateSkillBars();
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .contact-item, .about-text, .achievements');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    const leftElements = document.querySelectorAll('.hero-content');
    leftElements.forEach(el => { el.classList.add('slide-in-left'); observer.observe(el); });

    const rightElements = document.querySelectorAll('.hero-image, .resume-preview');
    rightElements.forEach(el => { el.classList.add('slide-in-right'); observer.observe(el); });
}

// -----------------------------
// Skill bars animation
function initializeSkillBars() {}
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => { bar.style.width = bar.getAttribute('data-width') + '%'; }, index * 100);
    });
}

// -----------------------------
// Smooth scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    const navbar = document.getElementById('navbar');
    links.forEach(link => link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            let targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight - 5;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            if (targetPosition > maxScroll) targetPosition = maxScroll;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    }));
}

// -----------------------------
// PDF download functionality
function initializePDFGeneration() {
    const downloadResumeBtn = document.getElementById('download-resume');
    const downloadPDFResumeBtn = document.getElementById('download-pdf-resume');
    const generatePortfolioPDFBtn = document.getElementById('generate-portfolio-pdf');

    function downloadFile(filePath, fileName) {
        const link = document.createElement('a');
        link.href = filePath;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    downloadResumeBtn.addEventListener('click', () => downloadFile('Resume.pdf', 'ReenaPraveenaP_FullStack_DotNetDev_Resume.pdf'));
    downloadPDFResumeBtn.addEventListener('click', () => downloadFile('Resume.pdf', 'ReenaPraveenaP_FullStack_DotNetDev_Resume.pdf'));
    generatePortfolioPDFBtn.addEventListener('click', () => downloadFile('Portfolio.pdf', 'Reena_Pampana_Portfolio.pdf'));
}

// -----------------------------
// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('mobile').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
