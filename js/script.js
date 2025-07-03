document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
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

    // Active nav on scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("text-primary", "font-semibold");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("text-primary", "font-semibold");
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
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            document.querySelectorAll('[id$="Error"]').forEach(el => {
                el.classList.add('hidden');
            });

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

            submitText.textContent = 'Sending...';
            spinner.classList.remove('hidden');

            setTimeout(() => {
                submitText.textContent = 'Send';
                spinner.classList.add('hidden');
                successMessage.classList.remove('hidden');

                // Tampilkan preview
                document.getElementById('previewName').textContent = name.value;
                document.getElementById('previewEmail').textContent = email.value;
                document.getElementById('previewSubject').textContent = subject.value;
                document.getElementById('previewMessage').textContent = message.value;
                document.getElementById('submissionTime').textContent = new Date().toLocaleString();
                inputPreview.classList.remove('hidden');

                // Tampilkan “Hi, Nama” di Hero
                const heroGreeting = document.getElementById('greetingMessage');
                const heroName = document.getElementById('heroName');
                if (heroGreeting && heroName) {
                    heroName.textContent = name.value;
                    heroGreeting.classList.remove('hidden');
                }

                contactForm.reset();

                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }
});