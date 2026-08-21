/* ==========================
   WISHLIST
========================== */

let wishlist =
    JSON.parse(localStorage.getItem("soleSphereWishlist")) || [];


/* ==========================
   SAVE WISHLIST
========================== */

function saveWishlist() {

    localStorage.setItem(
        "soleSphereWishlist",
        JSON.stringify(wishlist)
    );

}


/* ==========================
   ADD / REMOVE WISHLIST
========================== */

function toggleWishlist(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;

    const existingProduct = wishlist.find(
        item => item.id === productId
    );

    if (existingProduct) {

        // Remove from wishlist
        wishlist = wishlist.filter(
            item => item.id !== productId
        );

    } else {

        // Add to wishlist
        wishlist.push(product);

    }

    saveWishlist();

    updateWishlistCount();

    updateAllHearts();
}


/* ==========================
   CHECK WISHLIST
========================== */

function isInWishlist(productId) {

    return wishlist.some(
        item => item.id === productId
    );

}


/* ==========================
   UPDATE HEART
========================== */

function updateProductHeart(productId) {

    const heart =
        document.querySelector(
            `.wishlist[data-id="${productId}"] i`
        );

    if (!heart) return;

    if (isInWishlist(productId)) {

        heart.classList.remove("fa-regular");

        heart.classList.add("fa-solid");

        heart.classList.add("active");

    } else {

        heart.classList.remove("fa-solid");

        heart.classList.remove("active");

        heart.classList.add("fa-regular");

    }

}


/* ==========================
   UPDATE ALL HEARTS
========================== */

function updateAllHearts() {

    const wishlistButtons =
        document.querySelectorAll(".product-card .wishlist");

    wishlistButtons.forEach(button => {

        const productId =
            Number(button.dataset.id);

        const heart =
            button.querySelector("i");

        if (!heart) return;

        if (isInWishlist(productId)) {

            heart.classList.remove("fa-regular");

            heart.classList.add("fa-solid");

            heart.classList.add("active");

        } else {

            heart.classList.remove("fa-solid");

            heart.classList.remove("active");

            heart.classList.add("fa-regular");

        }

    });
}

/* ==========================
   WISHLIST COUNT
========================== */

function updateWishlistCount() {

    const count =
        document.getElementById("wishlistCount");

    if (!count) return;

    count.textContent = wishlist.length;

}


/* ==========================
   WISHLIST UI
========================== */

function updateWishlistUI() {

    updateWishlistCount();

    updateAllHearts();

}


/* ==========================
   WISHLIST BUTTON EVENTS
========================== */

function attachWishlistButtons() {

    const buttons =
        document.querySelectorAll(".wishlist");

    buttons.forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            const productId =
                Number(button.dataset.id);

            toggleWishlist(productId);

        });

    });

}


/* ==========================
   INITIALIZE
========================== */

function initializeWishlist() {

    // Make sure wishlist is loaded from localStorage
    wishlist =
        JSON.parse(
            localStorage.getItem("soleSphereWishlist")
        ) || [];

    updateWishlistCount();

    updateAllHearts();

    attachWishlistButtons();

}
initializeWishlist();