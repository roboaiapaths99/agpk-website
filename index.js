document.addEventListener('DOMContentLoaded', () => {

    // Auto Redirection to Technula with 5s Timer
    const TARGET_URL = 'https://technula.com/saas';
    const timerEl = document.getElementById('redirect-timer');
    const timeEl = document.getElementById('redirect-time');
    const redirectBtn = document.getElementById('redirect-btn');

    if (timeEl) {
        timeEl.textContent = new Date().toUTCString();
    }

    if (redirectBtn) {
        redirectBtn.href = TARGET_URL;
    }

    if (timerEl) {
        let timeLeft = 5;
        const countdownInterval = setInterval(() => {
            timeLeft--;
            if (timerEl) {
                timerEl.textContent = timeLeft;
            }
            if (timeEl) {
                timeEl.textContent = new Date().toUTCString();
            }
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                window.location.href = TARGET_URL;
            }
        }, 1000);
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Update Footer Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-fade-in');

                // Trigger counters if present
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // ms
                    const increment = target / (duration / 16); // 60fps

                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + "+";
                        }
                    };
                    updateCounter();
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .glass-card, section h2, .animate-fade-in');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Mobile menu toggle (simple version)
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--background-alt)';
        navLinks.style.padding = '2rem';
        navLinks.style.textAlign = 'center';
    });

    // Handle Contact Form Submission
    const contactForm = document.getElementById('main-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Collect data
            const formData = new FormData();
            formData.append('Name', this.querySelector('input[type="text"]').value);
            formData.append('Email', this.querySelector('input[type="email"]').value);
            formData.append('Mobile', this.querySelector('input[type="tel"]').value);
            formData.append('Message', this.querySelector('textarea').value);

            // Replace YOUR_GOOGLE_SCRIPT_URL with the generated Web App URL from Google Apps Script
            const scriptURL = 'https://script.google.com/macros/s/AKfycbzvU7Vpom-B7ONbSTb952d1AiOn_m8bSRSdo5oMtj5mGDUWP4nwVPQpxTMMbEAozDGNNg/exec';

            if (scriptURL === 'YOUR_GOOGLE_SCRIPT_URL') {
                alert('Please configure your Google Apps Script URL in index.js to enable form submission.');
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                return;
            }

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => {
                    alert('Thanks for your message! We will contact you soon.');
                    contactForm.reset();
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    alert('Oops! Something went wrong. Please try again.');
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});
