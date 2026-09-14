// LISTA DE PRODUTOS
const products = [
    {
        id: 1,
        title: "Vestido Midi Floral Elegance",
        category: "Vestidos",
        price: 189.90,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Blazer Alfaiataria Chic Rosa",
        category: "Alfaiataria",
        price: 249.90,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Bolsa Couro Nude Premium",
        category: "Acessórios",
        price: 159.90,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Vestido Longo Fluído Rose",
        category: "Vestidos",
        price: 219.90,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80"
    }
];

// ESTADO DO CARRINHO
let cart = [];

// ELEMENTOS DO DOM
const productGrid = document.getElementById("product-grid");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeModal = document.getElementById("close-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cartCountElement = document.getElementById("cart-count");
const searchInput = document.getElementById("pesquisa");
const newsletterForm = document.getElementById("newsletter-form");

// RENDERIZAR PRODUTOS NA VITRINE
function renderProducts(itemsToRender = products) {
    if (!productGrid) return;
    
    productGrid.innerHTML = "";
    
    if (itemsToRender.length === 0) {
        productGrid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #666;'>Nenhum produto encontrado.</p>";
        return;
    }

    itemsToRender.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <button class="btn-add" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// ADICIONAR AO CARRINHO
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
    }
}

// REMOVER DO CARRINHO
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// ATUALIZAR CARRINHO (CONTADOR, TOTAL E MODAL)
function updateCart() {
    // Atualizar contador
    cartCountElement.textContent = cart.length;

    // Atualizar lista de itens no modal
    cartItemsContainer.innerHTML = "";
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p style='text-align: center; color: #777;'>Seu carrinho está vazio.</p>";
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div>
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                </div>
                <span class="remove-btn" onclick="removeFromCart(${index})">&times;</span>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    // Calcular total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// PESQUISA EM TEMPO REAL
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm) || 
            product.category.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });
}

// EVENTOS DO MODAL
cartBtn.addEventListener("click", () => cartModal.classList.add("active"));
closeModal.addEventListener("click", () => cartModal.classList.remove("active"));

window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove("active");
    }
});

// FINALIZAR COMPRA
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Obrigado por comprar na About the Fit! Seu pedido foi recebido com sucesso.");
    cart = [];
    updateCart();
    cartModal.classList.remove("active");
});

// NEWSLETTER
if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Obrigado por se cadastrar! Em breve você receberá seu cupom de 10% OFF.");
        newsletterForm.reset();
    });
}

// INICIALIZAR PÁGINA
renderProducts();