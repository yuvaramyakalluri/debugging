const checkoutItemsEl = document.getElementById("checkout-items");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const discountEl = document.getElementById("discount");
const grandTotalEl = document.getElementById("grand-total");

const promoInput = document.getElementById("promo-input");
const applyPromoBtn = document.getElementById("apply-promo-btn");
const promoMsgEl = document.getElementById("promo-msg");

const orderForm = document.getElementById("order-form");
const studentNameInput = document.getElementById("student-name");
const rollNumberInput = document.getElementById("roll-number");
const orderMsgEl = document.getElementById("order-msg");

let cart = JSON.parse(localStorage.getItem("campus_cart")) || [];
let discountAmount = 0;

function setStatusMessage(el, message, isSuccess = false) {
  el.textContent = message;
  el.className = isSuccess ? "msg-success" : "msg-error";
}

function calculateSubtotal() {
  return cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.qty || 1),
    0
  );
}

function renderCheckout() {
  checkoutItemsEl.innerHTML = "";

  if (cart.length === 0) {
    checkoutItemsEl.innerHTML =
      '<li class="empty-state">No items found in your order.</li>';
  } else {
    cart.forEach((item) => {
      const qty = item.qty || 1;
      const li = document.createElement("li");
      li.className = "cart-row";
      li.innerHTML = `
        <span>${item.name} × ${qty}</span>
        <span>₹${(Number(item.price) * qty).toFixed(2)}</span>
      `;
      checkoutItemsEl.appendChild(li);
    });
  }

  const subtotal = calculateSubtotal();
  if (subtotal < 150) {
    discountAmount = 0;
  }

  const tax = subtotal * 0.05;
  const grandTotal = Math.max(0, subtotal + tax - discountAmount);

  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax.toFixed(2);
  discountEl.textContent = discountAmount.toFixed(2);
  grandTotalEl.textContent = grandTotal.toFixed(2);
}

applyPromoBtn.addEventListener("click", () => {
  const code = promoInput.value.trim().toUpperCase();
  const subtotal = calculateSubtotal();

  if (!code) {
    discountAmount = 0;
    setStatusMessage(promoMsgEl, "Please enter a promo code.");
    renderCheckout();
    return;
  }

  if (code !== "STUDENT15") {
    discountAmount = 0;
    setStatusMessage(promoMsgEl, "Invalid promo code. Try STUDENT15.");
    renderCheckout();
    return;
  }

  if (subtotal < 150) {
    discountAmount = 0;
    setStatusMessage(
      promoMsgEl,
      "STUDENT15 requires a minimum subtotal of ₹150."
    );
    renderCheckout();
    return;
  }

  discountAmount = subtotal * 0.15;
  setStatusMessage(
    promoMsgEl,
    `STUDENT15 applied! You saved ₹${discountAmount.toFixed(2)}.`,
    true
  );
  renderCheckout();
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const studentName = studentNameInput.value.trim();
  const rollNumber = rollNumberInput.value.trim();

  if (cart.length === 0) {
    setStatusMessage(orderMsgEl, "Your cart is empty. Return to menu to add items.");
    return;
  }

  if (!studentName) {
    setStatusMessage(orderMsgEl, "Please enter your full name.");
    studentNameInput.focus();
    return;
  }

  if (!rollNumber) {
    setStatusMessage(orderMsgEl, "Please enter your roll number.");
    rollNumberInput.focus();
    return;
  }

  const finalTotal = grandTotalEl.textContent;
  cart = [];
  discountAmount = 0;
  localStorage.removeItem("campus_cart");
  promoInput.value = "";
  promoMsgEl.textContent = "";
  orderForm.reset();
  renderCheckout();

  setStatusMessage(
    orderMsgEl,
    `Order confirmed for ${studentName} (${rollNumber}) — Total: ₹${finalTotal}.`,
    true
  );
});

renderCheckout();