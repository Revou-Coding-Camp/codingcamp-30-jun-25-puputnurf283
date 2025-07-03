document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const inputPreview = document.getElementById('inputPreview');
    const submitText = document.getElementById('submitText');
    const spinner = document.getElementById('spinner');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('[id$="Error"]').forEach(el => {
                el.classList.add('hidden');
            });
            
            // Validate form
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                document.getElementById('nameError').classList.remove('hidden');
                isValid = false;
            }
            
            if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                document.getElementById('emailError').classList.remove('hidden');
                isValid = false;
            }
            
            if (!subject.value) {
                document.getElementById('subjectError').classList.remove('hidden');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                document.getElementById('messageError').classList.remove('hidden');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Show loading state
            submitText.textContent = 'Sending...';
            spinner.classList.remove('hidden');
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // Hide loading state
                submitText.textContent = 'Send';
                spinner.classList.add('hidden');
                
                // Show success message
                successMessage.classList.remove('hidden');
                
                // Show input preview
                document.getElementById('previewName').textContent = name.value;
                document.getElementById('previewEmail').textContent = email.value;
                document.getElementById('previewSubject').textContent = subject.value;
                document.getElementById('previewMessage').textContent = message.value;
                
                // Add current time
                const now = new Date();
                document.getElementById('submissionTime').textContent = now.toLocaleString();
                
                inputPreview.classList.remove('hidden');
                
                // Scroll to preview
                inputPreview.scrollIntoView({ behavior: 'smooth' });
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }
});