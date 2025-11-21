
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "St. George Utah",
        location: "St. George, Utah, United States",
        dedicated: "1877, April, 6",
        area: null,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Logan Utah",
        location: "Logan, Utah, United States",
        dedicated: "1884, May, 17",
        area: null,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Oakland California",
        location: "Oakland, California, United States",
        dedicated: "1964, November, 19", 
        area: 80157,  
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    }


];

const grid = document.getElementById("templeGrid");
const nav = document.getElementById("primary-nav");

const yearSpan = document.getElementById("year");
const lastModSpan = document.getElementById("lastModified");



function formatDate(dateString) {
    const d = new Date(dateString);
    if (isNaN(d)) return dateString;
    return d.toLocaleDateString();
}



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



function render(list) {
    grid.innerHTML = "";
    if (!list.length) {
        grid.innerHTML =
            '<p style="padding:1rem">No temples match this filter.</p>';
        return;
    }
    list.forEach((t) => grid.appendChild(createCard(t)));
}



function setActiveButton(button) {
    const buttons = [...nav.querySelectorAll(".nav-btn")];
    buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
    buttons.forEach((b) => b.classList.remove("active"));

    button.setAttribute("aria-pressed", "true");
    button.classList.add("active");
}



render(temples);



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


