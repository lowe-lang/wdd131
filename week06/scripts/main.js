// js/main.js
// Uses objects, arrays, array methods, template literals, multiple functions, DOM events, conditionals, localStorage, lazy loading init

/* Product data (array of objects) */
const products = [
    { id: 'p100', name: 'Super Drill 3000', price: 129.99, img: 'images/drill.webp' },
    { id: 'p200', name: 'Mega Hammer', price: 39.99, img: 'images/hammer.webp' },
    { id: 'p300', name: 'Ultra Saw Pro', price: 79.00, img: 'images/saw.webp' },
    { id: 'p400', name: 'Precision Screwdriver Set', price: 29.50, img: 'images/screwdrivers.webp' },
    { id: 'p500', name: 'Heavy Duty Wrench', price: 45.00, img: 'images/wrench.webp' }
];

/* 1) Populate product select for the form (objects+array methods + DOM) */
function populateProductSelect(selectId = 'product') {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    // Remove existing options except placeholder
    // Add options from products array
    products.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;               // id as value (requirement)
        opt.textContent = p.name;       // display name
        sel.appendChild(opt);
    });
}

/* 2) Render product cards (template literals exclusively) */
function renderProductCards(containerId = 'productsContainer') {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = products.map(p => `
    <article class="card" tabindex="0" aria-label="${p.name}">
      <h3>${p.name}</h3>
      <p>Price: $${p.price.toFixed(2)}</p>
      <button class="btn buy-btn" data-id="${p.id}">Add to cart</button>
    </article>
  `).join('');
}

/* 3) Cart functionality (localStorage + events + conditionals) */
function setupCart() {
    const CART_KEY = 'w06_cart';
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

    function saveCart() {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        // optionally show cart count element if present
        const el = document.getElementById('cartCount');
        if (el) el.textContent = cart.length;
    }

    document.addEventListener('click', (e) => {
        if (e.target.matches('.buy-btn')) {
            const id = e.target.dataset.id;
            const item = products.find(p => p.id === id);
            if (item) {
                cart.push(item);
                saveCart();
                // conditional branching
                if (cart.length === 1) {
                    alert(`Added ${item.name}. You have 1 item in your cart.`);
                } else {
                    alert(`Added ${item.name}. You have ${cart.length} items in your cart.`);
                }
            }
        }
    });

    updateCartCount();
}

/* 4) Lazy loading images using IntersectionObserver with native loading fallback */
function initLazy() {
    const lazyImgs = document.querySelectorAll('img.lazy');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.addEventListener('load', () => img.classList.remove('lazy'));
                    obs.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });
        lazyImgs.forEach(i => io.observe(i));
    } else {
        lazyImgs.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

/* 5) Initialise site on DOMContentLoaded (single place to call functions) */
function initSite() {
    populateProductSelect('product');   // form requirement
    renderProductCards('productsContainer');
    setupCart();
    initLazy();
}

document.addEventListener('DOMContentLoaded', initSite);
