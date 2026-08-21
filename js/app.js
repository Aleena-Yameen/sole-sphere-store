/* ==========================
   PRODUCT DISPLAY
========================== */

const productGrid = document.getElementById("productGrid");

let cart = JSON.parse(localStorage.getItem("soleSphereCart")) || [];


/* ==========================
   LOAD PRODUCTS
========================== */

function loadProducts() {

    if (!productGrid) return;

    productGrid.innerHTML = "";

    products.forEach(product => {

        productGrid.innerHTML += `

            <div class="product-card">

                <div class="badge">
                    ${product.badge}
                </div>

                <div class="wishlist">
                    <i class="fa-regular fa-heart"></i>
                </div>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <h3>${product.name}</h3>

                <div class="rating">
                    ⭐ ${product.rating}
                </div>

                <div class="price">

                    <span class="new-price">
                        $${product.price}
                    </span>

                    <span class="old-price">
                        $${product.oldPrice}
                    </span>

                </div>

                <div class="sizes">

                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>

                </div>

                <button
                    class="add-cart-btn"
                    data-id="${product.id}"
                >
                    Add To Cart
                </button>

            </div>

        `;
    });

    attachCartButtons();
}


/* ==========================
   ADD TO CART BUTTONS
========================== */

function attachCartButtons() {

    const buttons =
        document.querySelectorAll(".add-cart-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                Number(button.dataset.id);

            addToCart(productId);

        });

    });

}


/* ==========================
   ADD PRODUCT TO CART
========================== */

function addToCart(productId) {

    const product =
        products.find(item => item.id === productId);

    if (!product) return;

    const existingItem =
        cart.find(item => item.id === productId);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }

    saveCart();

    updateCartUI();

    openCart();

}


/* ==========================
   SAVE CART
========================== */

function saveCart() {

    localStorage.setItem(
        "soleSphereCart",
        JSON.stringify(cart)
    );

}


/* ==========================
   UPDATE CART COUNT
========================== */

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;

}


/* ==========================
   RENDER CART
========================== */

function renderCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>Your cart is empty</h3>

                <p>
                    Looks like you haven't added
                    anything yet.
                </p>

            </div>

        `;

        cartTotal.textContent = "$0.00";

        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <strong>
                        $${item.price}
                    </strong>

                    <div class="quantity-controls">

                        <button
                            class="quantity-btn"
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            class="quantity-btn"
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

        `;

    });

    cartTotal.textContent =
        `$${total.toFixed(2)}`;

}


/* ==========================
   CHANGE QUANTITY
========================== */

function changeQuantity(productId, change) {

    const item =
        cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== productId
        );

    }

    saveCart();

    updateCartUI();

}


/* ==========================
   REMOVE FROM CART
========================== */

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

    updateCartUI();

}


/* ==========================
   UPDATE EVERYTHING
========================== */

function updateCartUI() {

    updateCartCount();

    renderCart();

}


/* ==========================
   CART DRAWER
========================== */

const cartButton =
    document.getElementById("cartButton");

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");


function openCart() {

    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.classList.add("cart-open");

}


function closeCartDrawer() {

    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.classList.remove("cart-open");

}


if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeCartDrawer
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCartDrawer
    );

}


/* ==========================
   INITIALIZE
========================== */

loadProducts();

updateCartUI();