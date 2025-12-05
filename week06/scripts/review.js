// js/review.js
document.addEventListener('DOMContentLoaded', () => {
    const key = 'reviewCount';
    const current = Number(localStorage.getItem(key) || 0);
    const next = current + 1;
    localStorage.setItem(key, String(next));
    const el = document.getElementById('count');
    if (el) el.textContent = next;
});
