# CampusCafe — AI-Generated Project Debugging & Enhancement Task

## Scenario
An AI assistant generated this 2-page **CampusCafe** web application using **HTML, CSS, and JavaScript**. However, when you open `index.html` in a browser, the layout, images, scripts, checkout page, and calculations are broken—and several requested features are incomplete.

---

## Your Objectives

### Part 1: Fix Folder Structure, Resource Links & Existing Bugs
1. Inspect the project folder structure and fix all broken **CSS**, **JavaScript**, **image**, and **page navigation** paths across both `index.html` and `pages/checkout.html` (including CSS `url(...)` paths and `<script>` loading order).
2. Fix all broken icons on the menu cards so every item displays its proper SVG graphic.
3. Fix the JavaScript bugs preventing:
   - All "Add to Cart" buttons from working properly
   - Cart totals from calculating numerically (currently concatenating values)
   - Saved cart items from appearing on `pages/checkout.html`
   - Grand Total from displaying on the checkout page

### Part 2: Add Missing Logic
1. **Menu Filtering & Search (`index.html`)**:
   - Clicking `All`, `Drinks`, or `Snacks` should filter the menu items and highlight the active button.
   - Typing in the search box should filter items by name in real time (combined with the active category).
2. **Cart Quantity Controls & Empty Check (`index.html`)**:
   - Adding the same item again should increase its quantity instead of duplicating rows.
   - Add working `+` and `-` quantity buttons in the cart (removing the item if quantity reaches `0`).
   - Update the top-right `Cart: X items` badge with the total item quantity.
   - Block navigation to checkout and display a helpful message if the cart is empty.
3. **Student Promo Code Logic (`pages/checkout.html`)**:
   - Code `STUDENT15` gives **15% off the subtotal** only when the subtotal is **₹150 or more**.
   - Show a clear error message if the subtotal is under ₹150 or if the promo code is invalid (and reset discount to `0`).
4. **Order Confirmation Validation (`pages/checkout.html`)**:
   - Require both **Full Name** and **Roll Number** before confirming an order (and disallow confirming an empty cart).
   - On valid submission, display an order confirmation message with a generated Order ID and clear the saved cart.

---

## Reflection Question (To Include in Your Submission)
Why couldn't pasting a single file into a standard online chat window solve all of these bugs immediately, whereas workspace-aware AI tools (like **GitHub Copilot** or **Antigravity**) can locate and fix them accurately?
