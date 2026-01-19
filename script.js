// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add shadow to navbar on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Waitlist Form Submission Logic
const form = document.getElementById('waitlistForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');
const submitBtn = document.getElementById('submitBtn');

// PLACEHOLDER URL - User must replace this with their deployed Google Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw9bphrd5FsnHFB5ywvT_-BrCHZIFm9ZFfHD02lW8kxfzO55xtVLbPPa1GN-76af2o7SQ/exec'; 

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Joining...';
        formError.style.display = 'none';
        
        // Basic Check if URL is replaced
        if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
            setTimeout(() => {
                alert('DEMO MODE: Form submission simulated successfully.\n\nTo really save data, deploy the Google Apps Script and update the SCRIPT_URL in script.js.');
                form.style.display = 'none';
                formSuccess.style.display = 'block';
            }, 1000);
            return;
        }

        // Send data to Google Sheets
        fetch(SCRIPT_URL, { 
            method: 'POST', 
            body: new FormData(form),
            mode: 'no-cors' // Important for Google Apps Script to work without CORS errors
        })
        .then(response => {
            // Google Scripts with no-cors returns an opaque response, so we assume success if no error
            form.style.display = 'none';
            formSuccess.style.display = 'block';
            console.log('Success!', response);
        })
        .catch(error => {
            console.error('Error!', error.message);
            formError.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Join the Waitlist';
        });
    });
}
