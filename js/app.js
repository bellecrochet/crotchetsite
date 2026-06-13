let allProducts = [];
let currentFilter = "All";

fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    renderProducts();
  });

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  let filtered = allProducts;

  if (currentFilter !== "All") {
    filtered = allProducts.filter(p =>
      p.categories.includes(currentFilter) ||
      (currentFilter === "Sale" && p.sale === true)
    );
  }

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="images/${product.image}" alt="${product.name}" onclick="openLightbox('images/${product.image}')">
      <div class="card-content">
        <h3>${product.name}</h3>
        ${product.price ? `<p>£${product.price}</p>` : ``}
        <div class="tags">${product.categories.join(", ")}</div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function filterCategory(category) {
  currentFilter = category;
  renderProducts();
}

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");

  img.src = src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
