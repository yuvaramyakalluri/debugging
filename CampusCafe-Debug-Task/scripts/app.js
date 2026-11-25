const menuGrid = document.getElementById("menu-grid");
const cartList = document.getElementById("cart-list");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const cartCountEl = document.getElementById("cart-count");
const cartMsgEl = document.getElementById("cart-msg");
const checkoutBtn = document.getElementById("checkout-btn");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");

let cart = JSON.parse(localStorage.getItem("campus_cart")) || [];
let activeCategory = "all";
let searchQuery = "";

function getFilteredMenu() {
  return MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category.toLowerCase() === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });
}

function renderMenu(items) {
  menuGrid.innerHTML = "";

  if (items.length === 0) {
    menuGrid.innerHTML = '<p class="empty-state">No matching menu items found.</p>';
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="card-header">
        <span class="category-tag">${item.category}</span>
        <span class="price">₹${Number(item.price)}</span>
      </div>
      <h3>${item.name}</h3>
      <p style="font-size: 0.85rem; color: #6b7280;">${item.description}</p>
      <button class="btn btn-primary add-btn" data-id="${item.id}">Add to Cart</button>
    `;
    menuGrid.appendChild(card);
  });

  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      addToCart(id);
    });
  });
}

function addToCart(itemId) {
  const found = MENU_ITEMS.find((item) => item.id === itemId);
  if (!found) return;

  cartMsgEl.textContent = "";
  const existing = cart.find((entry) => entry.id === itemId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: found.id,
      name: found.name,
      price: Number(found.price),
      qty: 1
    });
  }

  saveCart();
  renderCart();
}

function updateQuantity(itemId, delta) {
  const index = cart.findIndex((entry) => entry.id === itemId);
  if (index === -1) return;

  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("campus_cart", JSON.stringify(cart));
}

function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = '<li class="empty-state">Your cart is empty.</li>';
  } else {
    cart.forEach((item) => {
      const qty = item.qty || 1;
      const li = document.createElement("li");
      li.className = "cart-row";
      li.innerHTML = `
        <span>${item.name}</span>
        <div class="qty-controls">
          <button type="button" class="qty-btn" data-id="${item.id}" data-delta="-1">-</button>
          <span>${qty}</span>
          <button type="button" class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
          <span>₹${Number(item.price) * qty}</span>
        </div>
      `;
      cartList.appendChild(li);
    });

    document.querySelectorAll(".qty-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        const delta = Number(btn.dataset.delta);
        updateQuantity(id, delta);
      });
    });
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.qty || 1),
    0
  );
  const totalCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  cartSubtotalEl.textContent = subtotal;
  cartCountEl.textContent = totalCount;
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category.toLowerCase();
    renderMenu(getFilteredMenu());
  });
});

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  renderMenu(getFilteredMenu());
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    cartMsgEl.textContent = "Please add at least one item before checking out.";
    return;
  }
  cartMsgEl.textContent = "";
  window.location.href = "pages/checkout.html";
});

renderMenu(MENU_ITEMS);
renderCart();