document.addEventListener('DOMContentLoaded', () => {
    // --- Countdown Timer ---
    function updateCountdown() {
        const targetDate = new Date('2025-10-27T18:30:00+05:00').getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    // --- Mobile Drawer Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileCloseButton = document.getElementById('mobile-close-button');

    function openDrawer() {
        mobileDrawer.classList.remove('-translate-x-full');
        mobileDrawer.classList.add('is-open');
        mobileOverlay.classList.remove('hidden');
        setTimeout(() => mobileOverlay.style.opacity = '1', 10);
        mobileMenuButton.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.add('-translate-x-full');
        mobileDrawer.classList.remove('is-open');
        mobileOverlay.style.opacity = '0';
        setTimeout(() => mobileOverlay.classList.add('hidden'), 300);
        mobileMenuButton.classList.remove('is-active');
        document.body.style.overflow = '';
    }

    mobileMenuButton.addEventListener('click', openDrawer);
    mobileOverlay.addEventListener('click', closeDrawer);
    mobileCloseButton.addEventListener('click', closeDrawer);

    const mobileDrawerLinks = mobileDrawer.querySelectorAll('a');
    mobileDrawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // --- Scroll Animation Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Show loading animation
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = `
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            `;
            submitButton.disabled = true;
            
            // Send to Google Apps Script (Contact Form Endpoint)
            fetch('https://script.google.com/macros/s/AKfycbz6CnjL5IYrHfbEo2LzcIGyb7C_bSN-14F1rdzLIIPMXvJnwD9iWdhwn9GT2ecZ4T7PvA/exec', {
                method: 'POST',
                body: formData  // Send as FormData, not JSON
            })
            .then(response => response.json())
            .then(result => {
                // Restore button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                if (result.status === 'success') {
                    // Redirect to thank you page on successful submission
                    window.location.href = 'thankyou.html';
                } else {
                    alert('Error sending message. Please try again.');
                    console.log('Error:', result.message);
                }
            })
            .catch(error => {
                // Restore button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                console.error('Error:', error);
                alert('Error sending message. Please try again.');
            });
        });
    }

    // --- Newsletter Form Submission ---
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(newsletterForm);
            
            // Show loading animation
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = `
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            `;
            submitButton.disabled = true;
            
            // Send to Google Apps Script (Newsletter Endpoint)
            fetch('https://script.google.com/macros/s/AKfycbz0SDOJMc9YkWDIfYMYFfqIk2HD2cvXBzktHrVsXJQGpL9VZzR1sfemO7D24tl7mgJf/exec', {
                method: 'POST',
                body: formData  // Send as FormData, not JSON
            })
            .then(response => response.json())
            .then(result => {
                // Restore button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                if (result.status === 'success') {
                    // Show success message
                    alert('Thank you for subscribing to our newsletter!');
                    newsletterForm.reset(); // Reset form
                } else {
                    alert('Error subscribing. Please try again.');
                    console.log('Error:', result.message);
                }
            })
            .catch(error => {
                // Restore button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                console.error('Error:', error);
                alert('Error subscribing. Please try again.');
            });
        });
    }

    // --- Specific functionality for teacher-training.html ---
    if (window.location.pathname.includes('teacher-training.html')) {
        // Additional mobile drawer logic for teacher-training page
        mobileDrawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                // We don't want to close the drawer if the link is opening a new tab
                if (link.target !== '_blank') {
                    closeDrawer();
                }
            });
        });
    }

    // --- Specific functionality for 404.html ---
    if (window.location.pathname.includes('404.html')) {
        // Add 404 specific animations and functionality if needed
    }

    // --- Specific functionality for thankyou.html ---
    if (window.location.pathname.includes('thankyou.html')) {
        // Add thankyou page specific functionality if needed
    }

    // --- Specific functionality for terms.html ---
    if (window.location.pathname.includes('terms.html')) {
        // Add terms page specific functionality if needed
    }

    // --- Specific functionality for privacy.html ---
    if (window.location.pathname.includes('privacy.html')) {
        // Add privacy page specific functionality if needed
    }

    // --- Initializations ---
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
