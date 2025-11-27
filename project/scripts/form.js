const products = [
    { id: "p1", name: "Camping Tent" },
    { id: "p2", name: "Sleeping Bag" },
    { id: "p3", name: "Backpack" },
    { id: "p4", name: "Camping Stove" }
];

const select = document.getElementById("product"); 


products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    select.appendChild(option);
});


document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("review.html")) {
        let reviewCount = localStorage.getItem("reviewCount") || 0;
        reviewCount = parseInt(reviewCount) + 1;
        localStorage.setItem("reviewCount", reviewCount);

        const counterDiv = document.createElement("div");
        counterDiv.textContent = `You have submitted ${reviewCount} review(s).`;
        document.body.prepend(counterDiv);
    }
});

