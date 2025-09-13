// ✅ Allow only letters & spaces in Full Name
document.getElementById('name').addEventListener('keypress', function (e) {
    const char = String.fromCharCode(e.which);
    if (!/^[A-Za-z\s]$/.test(char)) {
        e.preventDefault(); // block invalid chars
    }
});

// ✅ Allow only numbers in Mobile, must start from 6–9
document.getElementById('mobile').addEventListener('keypress', function (e) {
    const char = String.fromCharCode(e.which);

    // Block non-digits
    if (!/^\d$/.test(char)) {
        e.preventDefault();
        return;
    }

    // Check if it's the first digit
    if (this.value.length === 0 && !/[6-9]/.test(char)) {
        e.preventDefault(); // block if first digit is not 6–9
    }

    // Optional: Limit to 10 digits max
    if (this.value.length >= 10) {
        e.preventDefault();
    }
});

// Main JavaScript functionality for Reena Pampana's Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeTypingAnimation();
    initializeThemeToggle();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeSmoothScrolling();
    initializePDFGeneration();
    initializeParallaxEffects();
   // initializeContactForm();
    
});

// // Navigation functionality
// function initializeNavigation() {
//     const navbar = document.getElementById('navbar');
//     const navToggle = document.getElementById('nav-toggle');
//     const navMenu = document.getElementById('nav-menu');
//     const navLinks = document.querySelectorAll('.nav-link');
    
//     // Navbar scroll effect
//     window.addEventListener('scroll', throttle(function() {
//         if (window.scrollY > 50) {
//             navbar.classList.add('scrolled');
//         } else {
//             navbar.classList.remove('scrolled');
//         }
//     }, 16));
    
//     // Mobile menu toggle
//     navToggle.addEventListener('click', function() {
//         navMenu.classList.toggle('active');
//         navToggle.classList.toggle('active');
//         document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
//     });
    
//     // Close mobile menu when clicking on links
//     // navLinks.forEach(link => {
//     //     link.addEventListener('click', function() {
//     //         navMenu.classList.remove('active');
//     //         navToggle.classList.remove('active');
//     //         document.body.style.overflow = '';
//     //     });
//     // });
    
//    // Smooth scroll for each nav link
//     navLinks.forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault(); // stop instant jump

//             const targetId = this.getAttribute('href').substring(1);
//             const targetSection = document.getElementById(targetId);
//             const navbarHeight = navbar.offsetHeight;

//             if (targetSection) {
//                 window.scrollTo({
//                     top: targetSection.offsetTop - navbarHeight,
//                     behavior: 'smooth'
//                 });
//             }

//             // Close mobile menu
//             navMenu.classList.remove('active');
//             navToggle.classList.remove('active');
//             document.body.style.overflow = '';
//         });
//     });



//     // Active navigation link highlighting
//     window.addEventListener('scroll', throttle(function() {
//         let current = '';
//         const sections = document.querySelectorAll('section');
//         const navbarHeight = navbar.offsetHeight; 
        
//         sections.forEach(section => {
//             // const sectionTop = section.offsetTop - 100;
//               const sectionTop = section.offsetTop - navbarHeight;
//             const sectionHeight = section.offsetHeight;
//             if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
//                 current = section.getAttribute('id');
//             }
//         });
        
//         navLinks.forEach(link => {
//             link.classList.remove('active');
//             if (link.getAttribute('href') === `#${current}`) {
//                 link.classList.add('active');
//             }
//         });
//     }, 16));
// }

// Throttle function
function throttle(fn, wait) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            fn.apply(this, args);
            lastTime = now;
        }
    };
}

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

    // Smooth scroll for each nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const navbarHeight = navbar.offsetHeight;

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', throttle(function() {
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
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 16));
} // <-- only ONE closing bracket here



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

// // Initialize EmailJS
// (function(){
//     emailjs.init("ZbhAuwPnsYbUMEnS6"); // Your EmailJS Public Key
// })();

// // Phone number validation
// function isValidPhoneNumber(phone) {
//     const phoneRegex = /^[6-9]\d{9}$/; // Indian 10-digit phone numbers
//     return phoneRegex.test(phone);
// }

// // Email validation
// function isValidEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }

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

// // Initialize contact form
// function initializeContactForm() {
//     const contactForm = document.getElementById('contact-form');
//     const nameInput = document.getElementById('name');
//     const emailInput = document.getElementById('email');
//     const phoneInput = document.getElementById('mobile'); // make sure your input ID is 'mobile'
//     const messageInput = document.getElementById('message');

//     // Helper functions for errors
//     function showError(elementId, message) {
//         const errorElement = document.getElementById(elementId);
//         errorElement.textContent = message;
//         errorElement.classList.add('show');
//     }

//     function clearError(elementId) {
//         const errorElement = document.getElementById(elementId);
//         errorElement.textContent = '';
//         errorElement.classList.remove('show');
//     }

//     function clearErrors() {
//         const errorElements = document.querySelectorAll('.error-message');
//         errorElements.forEach(error => {
//             error.classList.remove('show');
//             error.textContent = '';
//         });
//     }

//     // Real-time validation
//     nameInput.addEventListener('blur', () => {
//         if (!nameInput.value.trim()) showError('name-error', 'Full name is required');
//         else if (nameInput.value.trim().length < 2) showError('name-error', 'Name must be at least 2 characters');
//         else clearError('name-error');
//     });

//     emailInput.addEventListener('blur', () => {
//         if (!emailInput.value.trim()) showError('email-error', 'Email address is required');
//         else if (!isValidEmail(emailInput.value.trim())) showError('email-error', 'Please enter a valid email');
//         else clearError('email-error');
//     });

//     phoneInput.addEventListener('blur', () => {
//         if (!phoneInput.value.trim()) showError('phone-error', 'Phone number is required');
//         else if (!isValidPhoneNumber(phoneInput.value.trim())) showError('phone-error', 'Enter a valid 10-digit number');
//         else clearError('phone-error');
//     });

//     messageInput.addEventListener('blur', () => {
//         if (!messageInput.value.trim()) showError('message-error', 'Message is required');
//         else if (messageInput.value.trim().length < 10) showError('message-error', 'Message must be at least 10 characters');
//         else clearError('message-error');
//     });

//     // Form submit
//     contactForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         clearErrors();

//         let isValid = true;

//         // Validate Name
//         if (!nameInput.value.trim()) { showError('name-error', 'Full name is required'); isValid = false; }
//         else if (nameInput.value.trim().length < 2) { showError('name-error', 'Name must be at least 2 characters'); isValid = false; }

//         // Validate Email
//         if (!emailInput.value.trim()) { showError('email-error', 'Email address is required'); isValid = false; }
//         else if (!isValidEmail(emailInput.value.trim())) { showError('email-error', 'Please enter a valid email'); isValid = false; }

//         // Validate Phone
//         if (!phoneInput.value.trim()) { showError('phone-error', 'Phone number is required'); isValid = false; }
//         else if (!isValidPhoneNumber(phoneInput.value.trim())) { showError('phone-error', 'Enter a valid 10-digit number'); isValid = false; }

//         // Validate Message
//         if (!messageInput.value.trim()) { showError('message-error', 'Message is required'); isValid = false; }
//         else if (messageInput.value.trim().length < 10) { showError('message-error', 'Message must be at least 10 characters'); isValid = false; }

//         if (isValid) {
//             // Send form using EmailJS
//             emailjs.sendForm('service_7lt259o', 'template_pwqngdp', this)
//                 .then(function() {
//                     showSuccessMessage(); // Show custom notification
//                     contactForm.reset();  // Clear form
//                 }, function(error) {
//                     alert("Failed to send message: " + JSON.stringify(error));
//                 });
//         }
//     });
// }

// // Initialize when DOM is ready
// document.addEventListener('DOMContentLoaded', initializeContactForm);

// Initialize EmailJS (v4)
emailjs.init('ZbhAuwPnsYbUMEnS6'); // Replace with your public key from EmailJS

// const form = document.getElementById('contact-form');

// if (form) {
//     form.addEventListener('submit', function(e) {
//         e.preventDefault();

//         // Grab values
//         const name = document.getElementById('name').value.trim();
//         const email = document.getElementById('email').value.trim();
//         const phone = document.getElementById('mobile').value.trim();
//         const subject = document.getElementById('subject').value.trim();
//         const message = document.getElementById('message').value.trim();
//         const time = new Date().toLocaleString(); // Add timestamp

//         // Validation
//         let isValid = true;

//         if (name.length < 2) {
//             showError('name-error', 'Name must be at least 2 characters');
//             isValid = false;
//         } else clearError('name-error');

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             showError('email-error', 'Invalid email');
//             isValid = false;
//         } else clearError('email-error');

//         const phoneRegex = /^[6-9]\d{9}$/;
//         if (phone && !phoneRegex.test(phone)) {
//             showError('phone-error', 'Invalid 10-digit phone number');
//             isValid = false;
//         } else clearError('phone-error');

//         if (message.length < 10) {
//             showError('message-error', 'Message must be at least 10 characters');
//             isValid = false;
//         } else clearError('message-error');

//         if (!isValid) return;

//         // Template params
//         const templateParams = {
//             name: name,
//             email: email,
//             phone: phone,
//             subject: subject,
//             message: message,
//             time: time
//         };

//         // Send email
//         emailjs.send('service_7lt259o', 'template_pwqngdp', templateParams)
//             .then(() => {
//                 showSuccessMessage();
//                 form.reset();
//             })
//             .catch(error => {
//                 alert("Failed to send message: " + JSON.stringify(error));
//             });
//     });
// }
const sendBtn = document.getElementById('sendBtn');
const form = document.getElementById('contact-form');

sendBtn.addEventListener('click', function () {
    // Grab values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('mobile').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const time = new Date().toLocaleString(); 

    let isValid = true;

    // ✅ Name validation
    if (!name) {
        showError('name-error', 'Full name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('name-error', 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearError('name-error');
    }

    // ✅ Email validation
    if (!email) {
        showError('email-error', 'Email address is required');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email-error', 'Invalid email');
        isValid = false;
    } else {
        clearError('email-error');
    }

    // ✅ Phone validation (optional)
    if (phone && !/^[6-9]\d{9}$/.test(phone)) {
        showError('phone-error', 'Invalid 10-digit phone number');
        isValid = false;
    } else {
        clearError('phone-error');
    }
 if (!subject) {
        showError('subject-error', 'subject is required');
        isValid = false;
    } else if (subject.length < 2) {
        showError('subject-error', 'subject must be at least 2 characters');
        isValid = false;
    } else {
        clearError('subject-error');
    }
    // ✅ Message validation
    if (!message) {
        showError('message-error', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message-error', 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError('message-error');
    }

    if (!isValid) return;

    // Prepare params
    const templateParams = { name, email, phone, subject, message, time };

    // Send email
    emailjs.send('service_7lt259o', 'template_pwqngdp', templateParams)
        .then(() => {
            showSuccessMessage();
            form.reset();
        })
        .catch(error => {
            alert("Failed to send message: " + JSON.stringify(error));
        });
});


// Error helper
function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = msg;
        el.classList.add('show');
    }
}

function clearError(id) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = '';
        el.classList.remove('show');
    }
}

// Success notification
function showSuccessMessage() {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed; top: 100px; right: 20px;
            background: #10b981; color: white;
            padding: 1.5rem 2rem; border-radius: 12px;
            z-index: 1001; box-shadow: 0 10px 15px rgba(0,0,0,0.2);
        ">
            <strong>Message Sent Successfully!</strong>
        </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
}


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

    
// // Smooth scrolling
// function initializeSmoothScrolling() {
//     const links = document.querySelectorAll('a[href^="#"]');
    
//     links.forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
            
//             const targetId = this.getAttribute('href');
//             const targetElement = document.querySelector(targetId);
            
//             if (targetElement) {
//                 const navbarHeight = document.getElementById('navbar').offsetHeight;
//                 const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
//                 window.scrollTo({
//                     top: targetPosition,
//                     behavior: 'smooth'
//                 });
//             }
//         });
//     });
// }
// Smooth scrolling for navbar links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    const navbar = document.getElementById('navbar');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Recalculate navbar height dynamically
                const navbarHeight = navbar.offsetHeight;

                // Calculate section position relative to document
                const elementTop = targetSection.getBoundingClientRect().top + window.scrollY;

                // Target scroll position considering navbar offset
                let targetPosition = elementTop - navbarHeight - 5;

                // Prevent scrolling past bottom of page
                const maxScroll = document.body.scrollHeight - window.innerHeight;
                if (targetPosition > maxScroll) targetPosition = maxScroll;

                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile nav if open
                const navMenu = document.getElementById('nav-menu');
                if (navMenu && navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                }
            }
        });
    });

    // Use Intersection Observer to update active nav link dynamically
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: `-${navbar.offsetHeight + 10}px 0px -50% 0px`,
        threshold: 0
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const navLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (entry.isIntersecting && navLink) {
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// function initializeSmoothScrolling() { VE
//     const links = document.querySelectorAll('a[href^="#"]');
//     const navbar = document.getElementById('navbar'); // Ensure navbar has id="navbar"

//     links.forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault(); // Prevent default jump

//             const targetId = this.getAttribute('href').substring(1);
//             const targetSection = document.getElementById(targetId);

//             if (targetSection) {
//                 const navbarHeight = navbar.offsetHeight;

//                 // Calculate section position relative to document
//                 const elementTop = targetSection.getBoundingClientRect().top + window.scrollY;

//                 // Add small margin so content isn't flush against navbar
//                 let targetPosition = elementTop - navbarHeight - 5;

//                 // Prevent scrolling past bottom of page
//                 const maxScroll = document.body.scrollHeight - window.innerHeight;
//                 if (targetPosition > maxScroll) {
//                     targetPosition = maxScroll;
//                 }

//                 // Smooth scroll to section
//                 window.scrollTo({
//                     top: targetPosition,
//                     behavior: 'smooth'
//                 });
//             }
//         });
//     });
// }

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', initializeSmoothScrolling);



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

    // downloadPDFResumeBtn.addEventListener('click', function() {
    //     downloadFile('Resume.pdf', 'ReenaPraveenaP_FullStack_DotNetDev_Resume.pdf'); // same resume
    // });

    // generatePortfolioPDFBtn.addEventListener('click', function() {
    //     downloadFile('Portfolio.pdf', 'Reena_Pampana_Portfolio.pdf'); // uploaded portfolio
    // });
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
