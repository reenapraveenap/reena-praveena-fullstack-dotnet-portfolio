// Main JavaScript functionality for Reena Pampana's Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeTypingAnimation();
    initializeThemeToggle();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeContactForm();
    initializeSmoothScrolling();
    initializePDFGeneration();
    initializeParallaxEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 16));
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Active navigation link highlighting
    window.addEventListener('scroll', throttle(function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 16));
}

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
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingText = document.getElementById('typing-text');
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const delayBetweenTexts = 2000;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? deletingSpeed : typingSpeed;
        
        if (!isDeleting && charIndex === currentText.length) {
            speed = delayBetweenTexts;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeWriter, speed);
    }
    
    typeWriter();
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations when skills section is visible
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .contact-item, .about-text, .achievements');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Special animations for specific elements
    const leftElements = document.querySelectorAll('.hero-content');
    leftElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });
    
    const rightElements = document.querySelectorAll('.hero-image, .resume-preview');
    rightElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });
}

// Skill bars animation
function initializeSkillBars() {
    // This will be called when the skills section becomes visible
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 100);
    });
}

// Initialize EmailJS
(function(){
    emailjs.init("ZbhAuwPnsYbUMEnS6"); // Your EmailJS Public Key
})();

// Phone number validation
function isValidPhoneNumber(phone) {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian 10-digit phone numbers
    return phoneRegex.test(phone);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to show custom success notification
function showSuccessMessage() {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(to right, #10b981, #059669);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 12px;
            box-shadow: 0 20px 25px rgba(0,0,0,0.1);
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: slideInRight 0.5s ease-out;
            max-width: 400px;
        ">
            <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
            <div>
                <div style="font-weight: 600; margin-bottom: 0.25rem;">Message Sent Successfully!</div>
                <div style="font-size: 0.875rem; opacity: 0.9;">Thank you for reaching out. I will get back to you soon.</div>
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('mobile'); // make sure your input ID is 'mobile'
    const messageInput = document.getElementById('message');

    // Helper functions for errors
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(error => {
            error.classList.remove('show');
            error.textContent = '';
        });
    }

    // Real-time validation
    nameInput.addEventListener('blur', () => {
        if (!nameInput.value.trim()) showError('name-error', 'Full name is required');
        else if (nameInput.value.trim().length < 2) showError('name-error', 'Name must be at least 2 characters');
        else clearError('name-error');
    });

    emailInput.addEventListener('blur', () => {
        if (!emailInput.value.trim()) showError('email-error', 'Email address is required');
        else if (!isValidEmail(emailInput.value.trim())) showError('email-error', 'Please enter a valid email');
        else clearError('email-error');
    });

    phoneInput.addEventListener('blur', () => {
        if (!phoneInput.value.trim()) showError('phone-error', 'Phone number is required');
        else if (!isValidPhoneNumber(phoneInput.value.trim())) showError('phone-error', 'Enter a valid 10-digit number');
        else clearError('phone-error');
    });

    messageInput.addEventListener('blur', () => {
        if (!messageInput.value.trim()) showError('message-error', 'Message is required');
        else if (messageInput.value.trim().length < 10) showError('message-error', 'Message must be at least 10 characters');
        else clearError('message-error');
    });

    // Form submit
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();

        let isValid = true;

        // Validate Name
        if (!nameInput.value.trim()) { showError('name-error', 'Full name is required'); isValid = false; }
        else if (nameInput.value.trim().length < 2) { showError('name-error', 'Name must be at least 2 characters'); isValid = false; }

        // Validate Email
        if (!emailInput.value.trim()) { showError('email-error', 'Email address is required'); isValid = false; }
        else if (!isValidEmail(emailInput.value.trim())) { showError('email-error', 'Please enter a valid email'); isValid = false; }

        // Validate Phone
        if (!phoneInput.value.trim()) { showError('phone-error', 'Phone number is required'); isValid = false; }
        else if (!isValidPhoneNumber(phoneInput.value.trim())) { showError('phone-error', 'Enter a valid 10-digit number'); isValid = false; }

        // Validate Message
        if (!messageInput.value.trim()) { showError('message-error', 'Message is required'); isValid = false; }
        else if (messageInput.value.trim().length < 10) { showError('message-error', 'Message must be at least 10 characters'); isValid = false; }

        if (isValid) {
            // Send form using EmailJS
            emailjs.sendForm('service_7lt259o', 'template_pwqngdp', this)
                .then(function() {
                    showSuccessMessage(); // Show custom notification
                    contactForm.reset();  // Clear form
                }, function(error) {
                    alert("Failed to send message: " + JSON.stringify(error));
                });
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeContactForm);


// // Contact form functionality
// function initializeContactForm() {
//     const contactForm = document.getElementById('contact-form');
//     const nameInput = document.getElementById('name');
//     const emailInput = document.getElementById('email');
//     const subjectInput = document.getElementById('subject');
//     const messageInput = document.getElementById('message');
//      const phoneInput = document.getElementById('phone');
    
//     contactForm.addEventListener('submit', function(e) {
//         e.preventDefault();
        
//         // Clear previous errors
//         clearErrors();
        
//         let isValid = true;
        
//         // Validate name
//         if (!nameInput.value.trim()) {
//             showError('name-error', 'Full name is required');
//             isValid = false;
//         } else if (nameInput.value.trim().length < 2) {
//             showError('name-error', 'Name must be at least 2 characters');
//             isValid = false;
//         }
        
//         // Validate email
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailInput.value.trim()) {
//             showError('email-error', 'Email address is required');
//             isValid = false;
//         } else if (!emailRegex.test(emailInput.value.trim())) {
//             showError('email-error', 'Please enter a valid email address');
//             isValid = false;
//         }
        
//         // Validate message
//         if (!messageInput.value.trim()) {
//             showError('message-error', 'Message is required');
//             isValid = false;
//         } else if (messageInput.value.trim().length < 10) {
//             showError('message-error', 'Message must be at least 10 characters');
//             isValid = false;
//         }

//          // Validate phone
//         const phoneRegex = /^[6-9]\d{9}$/; // Valid Indian phone numbers
//         if (!phoneInput.value.trim()) {
//             showError('phone-error', 'Phone number is required');
//             isValid = false;
//         } else if (!phoneRegex.test(phoneInput.value.trim())) {
//             showError('phone-error', 'Please enter a valid 10-digit phone number');
//             isValid = false;
//         }
        
//         if (isValid) {
//             // Show success message and simulate form submission
//             showSuccessMessage();
//             contactForm.reset();
//         }
//     });
    
//     // Real-time validation
//     nameInput.addEventListener('blur', validateName);
//     emailInput.addEventListener('blur', validateEmail);
//     messageInput.addEventListener('blur', validateMessage);
//      phoneInput.addEventListener('blur', validatePhone);
    
//     function validateName() {
//         const nameError = document.getElementById('name-error');
//         if (!nameInput.value.trim()) {
//             showError('name-error', 'Full name is required');
//         } else if (nameInput.value.trim().length < 2) {
//             showError('name-error', 'Name must be at least 2 characters');
//         } else {
//             nameError.classList.remove('show');
//         }
//     }
    
//     function validateEmail() {
//         const emailError = document.getElementById('email-error');
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailInput.value.trim()) {
//             showError('email-error', 'Email address is required');
//         } else if (!emailRegex.test(emailInput.value.trim())) {
//             showError('email-error', 'Please enter a valid email address');
//         } else {
//             emailError.classList.remove('show');
//         }
//     }
    
//     function validateMessage() {
//         const messageError = document.getElementById('message-error');
//         if (!messageInput.value.trim()) {
//             showError('message-error', 'Message is required');
//         } else if (messageInput.value.trim().length < 10) {
//             showError('message-error', 'Message must be at least 10 characters');
//         } else {
//             messageError.classList.remove('show');
//         }
//     }

//     function validatePhone() {
//         const phoneRegex = /^[6-9]\d{9}$/;
//         if (!phoneInput.value.trim()) {
//             showError('phone-error', 'Phone number is required');
//         } else if (!phoneRegex.test(phoneInput.value.trim())) {
//             showError('phone-error', 'Please enter a valid 10-digit phone number');
//         } else {
//             clearError('phone-error');
//         }
//     }
    
//     function showError(elementId, message) {
//         const errorElement = document.getElementById(elementId);
//         errorElement.textContent = message;
//         errorElement.classList.add('show');
//     }
    
//     function clearErrors() {
//         const errorElements = document.querySelectorAll('.error-message');
//         errorElements.forEach(error => {
//             error.classList.remove('show');
//             error.textContent = '';
//         });
//     }
    
// //     function showSuccessMessage() {
// //         // Create success notification
// //         const notification = document.createElement('div');
// //         notification.innerHTML = `
// //             <div style="
// //                 position: fixed;
// //                 top: 100px;
// //                 right: 20px;
// //                 background: linear-gradient(to right, #10b981, #059669);
// //                 color: white;
// //                 padding: 1.5rem 2rem;
// //                 border-radius: 12px;
// //                 box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
// //                 z-index: 1001;
// //                 display: flex;
// //                 align-items: center;
// //                 gap: 1rem;
// //                 animation: slideInRight 0.5s ease-out;
// //                 max-width: 400px;
// //             ">
// //                 <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
// //                 <div>
// //                     <div style="font-weight: 600; margin-bottom: 0.25rem;">Message Sent Successfully!</div>
// //                     <div style="font-size: 0.875rem; opacity: 0.9;">Thank you for reaching out. I'll get back to you soon.</div>
// //                 </div>
// //             </div>
// //         `;
        
// //         document.body.appendChild(notification);
        
// //         // Remove notification after 5 seconds
// //         setTimeout(() => {
// //             notification.style.animation = 'slideOutRight 0.5s ease-out';
// //             setTimeout(() => {
// //                 notification.remove();
// //             }, 500);
// //         }, 5000);
// //     }
// // }

// // Initialize EmailJS
// (function(){
//     emailjs.init("ZbhAuwPnsYbUMEnS6"); // Your EmailJS Public Key
// })();

// // Function to show custom success notification
// function showSuccessMessage() {
//     const notification = document.createElement('div');
//     notification.innerHTML = `
//         <div style="
//             position: fixed;
//             top: 100px;
//             right: 20px;
//             background: linear-gradient(to right, #10b981, #059669);
//             color: white;
//             padding: 1.5rem 2rem;
//             border-radius: 12px;
//             box-shadow: 0 20px 25px rgba(0,0,0,0.1);
//             z-index: 1001;
//             display: flex;
//             align-items: center;
//             gap: 1rem;
//             animation: slideInRight 0.5s ease-out;
//             max-width: 400px;
//         ">
//             <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
//             <div>
//                 <div style="font-weight: 600; margin-bottom: 0.25rem;">Message Sent Successfully!</div>
//                 <div style="font-size: 0.875rem; opacity: 0.9;">Thank you for reaching out. I will get back to you soon.</div>
//             </div>
//         </div>
//     `;
    
//     document.body.appendChild(notification);
    
//     setTimeout(() => {
//         notification.style.animation = 'slideOutRight 0.5s ease-out';
//         setTimeout(() => notification.remove(), 500);
//     }, 5000);
// }



// // Attach form submit event
// document.getElementById("contact-form").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent default form submission

//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const phone = document.getElementById("mobile").value.trim();
//     const message = document.getElementById("message").value.trim();

//     // Simple validation
//     if (!name || !email || !message) {
//         alert("Please fill in all required fields.");
//         return;
//     }

//     if (phone && !isValidPhoneNumber(phone)) {
//         alert("Please enter a valid 10-digit phone number.");
//         return;
//     }

//     // Send form using EmailJS
//     emailjs.sendForm('service_7lt259o', 'template_pwqngdp', this)
//         .then(function() {
//             showSuccessMessage(); // Show success notification
//             document.getElementById("contact-form").reset(); // Clear form
//         }, function(error) {
//             alert("Failed to send message: " + JSON.stringify(error));
//         });
// });

    
// Smooth scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// PDF Generation functionality
// function initializePDFGeneration() {
//     const downloadResumeBtn = document.getElementById('download-resume');
//     const downloadPDFResumeBtn = document.getElementById('download-pdf-resume');
//     const generatePortfolioPDFBtn = document.getElementById('generate-portfolio-pdf');
    
//     // Simple resume download (you would replace this with actual resume URL)
//     downloadResumeBtn.addEventListener('click', function() {
//         // For demo purposes, we'll generate a simple PDF
//         generateResumePDF();
//     });
    
//     downloadPDFResumeBtn.addEventListener('click', function() {
//         generateResumePDF();
//     });
    
//     generatePortfolioPDFBtn.addEventListener('click', function() {
//         generatePortfolioPDF();
//     });
    
//     function generateResumePDF() {
//         if (typeof window.jspdf === 'undefined') {
//             alert('PDF generation library not loaded. Please try again.');
//             return;
//         }
        
//         const { jsPDF } = window.jspdf;
//         const doc = new jsPDF();
        
//         // Add content to PDF
//         doc.setFontSize(24);
//         doc.setTextColor(15, 118, 110); // Primary color
//         doc.text('Reena Praveena Pampana', 20, 30);
        
//         doc.setFontSize(16);
//         doc.setTextColor(100, 116, 139);
//         doc.text('Full Stack .NET Developer', 20, 45);
        
//         doc.setFontSize(12);
//         doc.setTextColor(0, 0, 0);
//         doc.text('Email: reenapampana@example.com', 20, 60);
//         doc.text('LinkedIn: linkedin.com/in/reenapampana', 20, 70);
//         doc.text('GitHub: github.com/reenapampana', 20, 80);
        
//         // Skills section
//         doc.setFontSize(16);
//         doc.setTextColor(15, 118, 110);
//         doc.text('Technical Skills', 20, 100);
        
//         doc.setFontSize(12);
//         doc.setTextColor(0, 0, 0);
//         doc.text('Backend: ASP.NET Core, C#, Web API, Entity Framework, Dapper', 20, 115);
//         doc.text('Frontend: Angular, React.js, TypeScript, JavaScript, Bootstrap', 20, 125);
//         doc.text('Database: SQL Server, Stored Procedures, Query Optimization', 20, 135);
//         doc.text('Tools: Git, Azure, Swagger, Postman', 20, 145);
        
//         // Experience section
//         doc.setFontSize(16);
//         doc.setTextColor(15, 118, 110);
//         doc.text('Key Projects', 20, 165);
        
//         doc.setFontSize(12);
//         doc.setTextColor(0, 0, 0);
//         doc.text('• APSCHE Web-Based Admission System - Handled 50K+ students', 20, 180);
//         doc.text('• CETS WBA Platform - Certificate verification with React + .NET Core', 20, 190);
//         doc.text('• Stree Nidhi Degree Module - Dynamic forms with advanced validations', 20, 200);
//         doc.text('• Asset Management System - Comprehensive tracking for KITS Warangal', 20, 210);
        
//         // Save the PDF
//         doc.save('Reena_Pampana_Resume.pdf');
        
//         // Show success message
//         showPDFSuccessMessage('Resume downloaded successfully!');
//     }
    
//     function generatePortfolioPDF() {
//         if (typeof window.jspdf === 'undefined') {
//             alert('PDF generation library not loaded. Please try again.');
//             return;
//         }
        
//         // const { jsPDF } = window.jspdf;
//         const { jsPDF } = window.jspdf || {};
// if (!jsPDF) {
//     alert('jsPDF not loaded. Check your script import.');
//     return;
// }
//         const doc = new jsPDF();
        
//         // Portfolio PDF with more detailed information
//         doc.setFontSize(20);
//         doc.setTextColor(15, 118, 110);
//         doc.text('Portfolio - Reena Praveena Pampana', 20, 30);
        
//         doc.setFontSize(14);
//         doc.setTextColor(100, 116, 139);
//         doc.text('Full Stack .NET Developer', 20, 45);
        
//         // About section
//         doc.setFontSize(16);
//         doc.setTextColor(15, 118, 110);
//         doc.text('About Me', 20, 65);
        
//         doc.setFontSize(10);
//         doc.setTextColor(0, 0, 0);
//         const aboutText = 'Passionate Full Stack .NET Developer with extensive experience in building robust, scalable web applications. Expertise in ASP.NET Core, Angular, and SQL Server.';
//         const splitAbout = doc.splitTextToSize(aboutText, 170);
//         doc.text(splitAbout, 20, 80);
        
//         // Projects section
//         doc.setFontSize(16);
//         doc.setTextColor(15, 118, 110);
//         doc.text('Featured Projects', 20, 110);
        
//         doc.setFontSize(12);
//         doc.setTextColor(0, 0, 0);
//         doc.text('1. APSCHE Admission System', 20, 125);
//         doc.setFontSize(10);
//         doc.text('   Technologies: ASP.NET Core, Angular, SQL Server, JWT', 25, 135);
//         doc.text('   Scale: 50,000+ students handled', 25, 145);
        
//         doc.setFontSize(12);
//         doc.text('2. CETS WBA Platform', 20, 160);
//         doc.setFontSize(10);
//         doc.text('   Technologies: React.js, .NET Core, Web API', 25, 170);
//         doc.text('   Features: Certificate verification, QR codes', 25, 180);
        
//         doc.setFontSize(12);
//         doc.text('3. Asset Management System', 20, 195);
//         doc.setFontSize(10);
//         doc.text('   Technologies: ASP.NET Core, Angular, Dapper, Azure', 25, 205);
//         doc.text('   Client: KITS Warangal', 25, 215);
        
//         // Contact info
//         doc.setFontSize(16);
//         doc.setTextColor(15, 118, 110);
//         doc.text('Contact Information', 20, 240);
        
//         doc.setFontSize(10);
//         doc.setTextColor(0, 0, 0);
//         doc.text('Email: reenapampana@example.com', 20, 255);
//         doc.text('LinkedIn: linkedin.com/in/reenapampana', 20, 265);
//         doc.text('GitHub: github.com/reenapampana', 20, 275);
        
//         // Save the PDF
//         doc.save('Reena_Pampana_Portfolio.pdf');
        
//         // Show success message
//         showPDFSuccessMessage('Portfolio PDF generated successfully!');
//     }

function initializePDFGeneration() {
    const downloadResumeBtn = document.getElementById('download-resume');
    const downloadPDFResumeBtn = document.getElementById('download-pdf-resume');
    const generatePortfolioPDFBtn = document.getElementById('generate-portfolio-pdf');

    // Function to download a file
    function downloadFile(filePath, fileName) {
        const link = document.createElement('a');
        link.href = filePath;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Attach click events for download
    downloadResumeBtn.addEventListener('click', function() {
        downloadFile('Resume.pdf', 'ReenaPraveenaP_FullStack_DotNetDev_Resume.pdf'); // uploaded resume
    });

    downloadPDFResumeBtn.addEventListener('click', function() {
        downloadFile('Resume.pdf', 'ReenaPraveenaP_FullStack_DotNetDev_Resume.pdf'); // same resume
    });

    generatePortfolioPDFBtn.addEventListener('click', function() {
        downloadFile('Portfolio.pdf', 'Reena_Pampana_Portfolio.pdf'); // uploaded portfolio
    });
}

// // Initialize the download functionality
// initializePDFDownload();


    
    function showPDFSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(to right, #0f766e, #0891b2);
                color: white;
                padding: 1.5rem 2rem;
                border-radius: 12px;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                z-index: 1001;
                display: flex;
                align-items: center;
                gap: 1rem;
                animation: slideInRight 0.5s ease-out;
                max-width: 350px;
            ">
                <i class="fas fa-file-pdf" style="font-size: 1.5rem;"></i>
                <div>
                    <div style="font-weight: 600; margin-bottom: 0.25rem;">PDF Generated!</div>
                    <div style="font-size: 0.875rem; opacity: 0.9;">${message}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 4000);
    }


// Parallax effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero, .resume');
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 16));
}

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

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

// Add custom animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error occurred:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log performance metrics
    if ('performance' in window) {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Add keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'k':
                e.preventDefault();
                // Focus on navigation
                document.querySelector('.nav-link').focus();
                break;
            case 'd':
                e.preventDefault();
                // Trigger theme toggle
                document.getElementById('theme-toggle').click();
                break;
        }
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Analytics tracking (placeholder)
function trackEvent(action, category, label) {
    // Add your analytics tracking code here
    console.log('Event tracked:', { action, category, label });
}

// Track important interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        const btnText = e.target.textContent.trim();
        trackEvent('button_click', 'engagement', btnText);
    }
    
    if (e.target.matches('.nav-link')) {
        const linkText = e.target.textContent.trim();
        trackEvent('navigation', 'menu', linkText);
    }
});

// Track form submissions
document.getElementById('contact-form').addEventListener('submit', function() {
    trackEvent('form_submit', 'contact', 'contact_form');
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Initialize lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initializeLazyLoading();

// Preload critical resources
function preloadResources() {
    // Preload important images
    const criticalImages = [
        'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();
