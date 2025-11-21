// ---------------------------
// Temple Data (10 temples)
// ---------------------------
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005-08-07",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888-05-21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015-06-07",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020-05-02",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974-11-19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986-01-10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983-12-02",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
    },
    // Added Temples
    {
        templeName: "London England",
        location: "London, England, United Kingdom",
        dedicated: "1958, September, 7",
        area: 31000,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/london-england/400x250/london-temple-exterior.jpg"
    },
    {
        templeName: "Sydney Australia",
        location: "Sydney, Australia",
        dedicated: "1984, September, 20",
        area: 14400,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sydney-australia/400x250/sydney-temple-exterior.jpg"
    }

];

// ---------------------------
// DOM References
// ---------------------------
const grid = document.getElementById("templeGrid");
const nav = document.getElementById("primary-nav");

const yearSpan = document.getElementById("year");
const lastModSpan = document.getElementById("lastModified");


// ---------------------------
// Helper: Format date
// ---------------------------
function formatDate(dateString) {
    const d = new Date(dateString);
    if (isNaN(d)) return dateString;
    return d.toLocaleDateString();
}


// ---------------------------
// Create Temple Card
// ---------------------------
function createCard(t) {
    const article = document.createElement("article");
    article.className = "card";

    const img = document.createElement("img");
    img.src = t.imageUrl;
    img.alt = t.templeName;
    img.loading = "lazy";

    const content = document.createElement("div");
    content.className = "card-content";

    const h3 = document.createElement("div");
    h3.className = "name";
    h3.textContent = t.templeName;

    const loc = document.createElement("div");
    loc.className = "meta";
    loc.textContent = t.location;

    const ded = document.createElement("div");
    ded.className = "meta";
    ded.textContent = "Dedicated: " + formatDate(t.dedicated);

    const area = document.createElement("div");
    area.className = "meta";
    area.textContent =
        "Area: " + Number(t.area).toLocaleString() + " sq ft";

    const footerRow = document.createElement("div");
    footerRow.className = "footer-row";

    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent =
        t.area > 90000
            ? "Large"
            : t.area < 10000
                ? "Small"
                : "Medium";

    footerRow.appendChild(chip);

    content.appendChild(h3);
    content.appendChild(loc);
    content.appendChild(ded);
    content.appendChild(area);
    content.appendChild(footerRow);

    article.appendChild(img);
    article.appendChild(content);

    return article;
}


// ---------------------------
// Render Temples
// ---------------------------
function render(list) {
    grid.innerHTML = "";
    if (!list.length) {
        grid.innerHTML =
            '<p style="padding:1rem">No temples match this filter.</p>';
        return;
    }
    list.forEach((t) => grid.appendChild(createCard(t)));
}


// ---------------------------
// Highlight Active Filter
// ---------------------------
function setActiveButton(button) {
    const buttons = [...nav.querySelectorAll(".nav-btn")];
    buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
    buttons.forEach((b) => b.classList.remove("active"));

    button.setAttribute("aria-pressed", "true");
    button.classList.add("active");
}


// ---------------------------
// Initial Display
// ---------------------------
render(temples);


// ---------------------------
// Filter Handler
// ---------------------------
nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".nav-btn");
    if (!btn) return;

    const filter = btn.dataset.filter;
    setActiveButton(btn);

    let result = [];

    if (filter === "all") result = temples.slice();
    else if (filter === "old")
        result = temples.filter(
            (t) => new Date(t.dedicated) < new Date("1900-01-01")
        );
    else if (filter === "new")
        result = temples.filter(
            (t) => new Date(t.dedicated) > new Date("2000-12-31")
        );
    else if (filter === "large")
        result = temples.filter((t) => t.area > 90000);
    else if (filter === "small")
        result = temples.filter((t) => t.area < 10000);

    render(result);
});


// ---------------------------
// Hamburger Menu + Footer Date
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    const menubutton = document.getElementById("menubutton");
    const primaryNav = document.getElementById("primary-nav");

    if (menubutton && primaryNav) {
        menubutton.addEventListener("click", () => {
            primaryNav.classList.toggle("open");

            const expanded =
                menubutton.getAttribute("aria-expanded") === "true";
            menubutton.setAttribute("aria-expanded", !expanded);

            const icon = menubutton.querySelector(".hamburger-icon");
            if (icon)
                icon.textContent = primaryNav.classList.contains("open")
                    ? "✕"
                    : "☰";
        });
    }

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModSpan)
        lastModSpan.textContent = document.lastModified;
});
