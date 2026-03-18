const yearElement = document.getElementById('year');
const navLinkItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    navLinks.classList.toggle("active");
});

const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            navLinkItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

function highlightActiveSection() {
    const scrollPosition = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
        } else {
            const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            if (navLink) navLink.classList.remove('active');
        }
    });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        console.log('Form submitted:', formObject);
        alert('this section is under maintenance. Please contact me via email directly.');
        this.reset();
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

function init() {
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            document.querySelector(`.nav-link[href="${window.location.hash}"]`).classList.add('active');
        }
    } else {
        document.querySelector('.nav-link[href="#home"]').classList.add('active');
    }
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
        });
    });
    window.addEventListener('scroll', highlightActiveSection);
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

document.addEventListener('DOMContentLoaded', init);
