// Mobile Hamburger Menu
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Welcome Join Button
document.getElementById('joinBtn')?.addEventListener('click', () => {
    const name = prompt("Enter your name to join:");
    if (name) {
        localStorage.setItem('username', name);
        document.getElementById('greeting').textContent = `Welcome, ${name}! Thanks for joining.`;
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const submission = { name, email, message };
        localStorage.setItem('contactSubmission', JSON.stringify(submission));

        document.getElementById('formMessage').textContent = `Thank you, ${name}. Your message has been saved.`;
        contactForm.reset();
    });
}
