document.addEventListener('DOMContentLoaded', () => {
    const menubutton = document.getElementById('menubutton');
    const menu = document.getElementById('primary-nav');

    if (menubutton && menu) {
        menubutton.addEventListener('click', () => {
            menu.classList.toggle('open');

            const expanded = menubutton.getAttribute('aria-expanded') === 'true';
            menubutton.setAttribute('aria-expanded', String(!expanded));

            const icon = menubutton.querySelector('.hamburger-icon');
            if (icon) icon.textContent = menu.classList.contains('open') ? '✕' : '☰';
        });
    }

    const yearSpan = document.getElementById('year');
    const lastModSpan = document.getElementById('lastModified');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModSpan) lastModSpan.textContent = document.lastModified || '—';
});
