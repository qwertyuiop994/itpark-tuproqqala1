// Preloader Loading Animation
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    // Hide preloader after 1.5s for cool effect
    setTimeout(() => {
        if(preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800); // Wait for transition to finish
        }
    }, 1500);
});

document.addEventListener('DOMContentLoaded', () => {
    if(typingText) typeEffect();
});

// Navbar scroll effect and Mobile menu toggle
const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

const links = document.querySelectorAll('.nav-links li a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});

// Registration Modal Logic
const modal = document.getElementById('registerModal');
const registerBtn = document.getElementById('registerBtn');
const closeModalBtn = document.querySelector('.close-modal');

if(registerBtn) {
    registerBtn.addEventListener('click', () => {
        modal.classList.add('show');
    });
}

if(closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

const modalForm = document.getElementById('modalForm');
if(modalForm) {
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Arizangiz qabul qilindi. Tez orada operatorlarimiz aloqaga chiqishadi!");
        modalForm.reset();
        modal.classList.remove('show');
    });
}

// Certificate Modal Logic
const certModal = document.getElementById('certModal');
const certImage = document.getElementById('certImage');
const closeCert = document.getElementById('closeCert');

function openCert(url) {
    if(certModal && certImage) {
        certImage.src = url;
        certModal.classList.add('show');
    }
}

if(closeCert) {
    closeCert.addEventListener('click', () => {
        certModal.classList.remove('show');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === certModal) {
        certModal.classList.remove('show');
    }
});

// Contact Form
const mainContactForm = document.getElementById('mainContactForm');
if(mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Xabaringiz yuborildi. Rahmat!");
        mainContactForm.reset();
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close others
        faqItems.forEach(otherItem => {
            if(otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current
        item.classList.toggle('active');
    });
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
const words = ['dasturlash', 'sun\'iy intellekt', 'dizayn', 'startaplar'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeEffect() {
    if(!typingText) return;
    
    isEnd = false;
    typingText.innerHTML = words[wordIndex].substring(0, charIndex);

    if(!isDeleting && charIndex < words[wordIndex].length) {
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if(isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 50);
    } else if(!isDeleting && charIndex === words[wordIndex].length) {
        isEnd = true;
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Pause at end
    } else if(isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500); // Pause before next word
    }
}

// Number Counter Animation for Stats
const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps

        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current) + (target > 100 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + (target > 100 ? '+' : '');
            }
        };
        updateCounter();
    });
}

// Trigger counter animation on scroll
window.addEventListener('scroll', () => {
    const statsSection = document.getElementById('stats');
    if(statsSection && !hasAnimated) {
        const sectionTop = statsSection.getBoundingClientRect().top;
        if(sectionTop < window.innerHeight - 100) {
            animateCounters();
            hasAnimated = true;
        }
    }
});

// Mentor rasmini yuklash
const hikmatUpload = document.getElementById('hikmat-upload');
const hikmatImg = document.getElementById('hikmat-img');
if(hikmatUpload && hikmatImg) {
    const savedImg = localStorage.getItem('hikmatImage');
    if(savedImg) hikmatImg.src = savedImg;
    hikmatUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target.result;
                hikmatImg.src = dataUrl;
                try { localStorage.setItem('hikmatImage', dataUrl); } catch(err){}
            };
            reader.readAsDataURL(file);
        }
    });
}
