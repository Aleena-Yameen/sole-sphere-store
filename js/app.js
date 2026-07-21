const products = [

{
    id:1,
    name:"Air Runner X",
    category:"Running",
    price:120,
    image:"images/products/shoe1.avif"
},

{
    id:2,
    name:"Urban Street",
    category:"Casual",
    price:95,
    image:"images/products/shoe2.avif"
},

{
    id:3,
    name:"Velocity Pro",
    category:"Sports",
    price:160,
    image:"images/products/shoe3.avif"
},

{
    id:4,
    name:"Classic Elite",
    category:"Premium",
    price:210,
    image:"images/products/shoe4.avif"
}

];

const container = document.getElementById("product-container");

products.forEach(product=>{

container.innerHTML += `

<div class="product-card">

    <div class="product-image">

        <img src="${product.image}" alt="${product.name}">

    </div>

    <div class="product-info">

        <div class="category">

            ${product.category}

        </div>

        <h3 class="product-name">

            ${product.name}

        </h3>

        <div class="rating">

            ★★★★★

        </div>

        <div class="bottom-row">

            <div class="price">

                $${product.price}

            </div>

            <div class="actions">

                <button>

                    <i class="fa-regular fa-heart"></i>

                </button>

                <button>

                    <i class="fa-solid fa-cart-shopping"></i>

                </button>

            </div>

        </div>

    </div>

</div>

`;

});