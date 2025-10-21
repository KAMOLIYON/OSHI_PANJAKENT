let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    header.classList.toggle('active', window.scrollY > 0);
});

menu.onclick = () => {
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}


// --- Cart script ---

const cart = document.querySelector('.cart');
const cartContent = cart.querySelector('.cart-content');
const cartTotal = cart.querySelector('#cart-total');
const closeCartBtn = cart.querySelector('#close-cart');

let cartItems = {};

// Parse price string and calculate average if range
function parsePrice(priceText) {
    let nums = priceText.match(/[\d.]+/g);
    if (!nums) return 0;
    if (nums.length === 1) return parseFloat(nums[0]);
    return (parseFloat(nums[0]) + parseFloat(nums[1])) / 2;
}

// Format price with 2 decimals and add "сомони"
function formatPrice(num) {
    return num.toFixed(2) + ' сомони';
}

// Render the cart content and update total
function renderCart() {
    cartContent.innerHTML = '';
    let total = 0;

    for (const key in cartItems) {
        const item = cartItems[key];
        const itemTotalPrice = item.price * item.qty;
        total += itemTotalPrice;

        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('cart-item');

        cartItemEl.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>${formatPrice(itemTotalPrice)}</p>
      </div>
      <div class="cart-item-qty">x${item.qty}</div>
    `;

        cartContent.appendChild(cartItemEl);
    }

    cartTotal.textContent = formatPrice(total);

    if (total > 0) {
        cart.classList.add('open');
    }
}

// Close cart on close button click
closeCartBtn.addEventListener('click', () => {
    cart.classList.remove('open');
});

// Add event listeners on all "add to cart" icons/buttons
document.querySelectorAll('.shop-box .bxs-cart-add').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', () => {
        const box = btn.closest('.shop-box');
        const name = box.querySelector('h3').textContent.trim();
        const priceText = box.querySelector('h2').textContent.trim();
        const imgSrc = box.querySelector('img').src;

        const price = parsePrice(priceText);

        if (cartItems[name]) {
            cartItems[name].qty++;
        } else {
            cartItems[name] = {
                name: name,
                price: price,
                qty: 1,
                img: imgSrc
            };
        }

        renderCart();
    });
});

// ... Keep the previous code as is above ...

function renderCart() {
    cartContent.innerHTML = '';
    let total = 0;

    for (const key in cartItems) {
        const item = cartItems[key];
        const itemTotalPrice = item.price * item.qty;
        total += itemTotalPrice;

        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('cart-item');

        cartItemEl.innerHTML = `
      <button class="cart-item-delete" data-name="${item.name}">&times;</button>
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>${formatPrice(itemTotalPrice)}</p>
      </div>
      <div class="cart-item-qty">x${item.qty}</div>
    `;

        cartContent.appendChild(cartItemEl);
    }

    cartTotal.textContent = formatPrice(total);

    if (total > 0) {
        cart.classList.add('open');
    } else {
        cart.classList.remove('open');
    }

    // Add event listeners for delete buttons
    document.querySelectorAll('.cart-item-delete').forEach(button => {
        button.onclick = () => {
            const name = button.getAttribute('data-name');
            delete cartItems[name];
            renderCart();
        };
    });
}

// Inside renderCart() function, after adding all cart items:

const payBtn = document.getElementById('pay-btn');

payBtn.addEventListener('click', () => {
    alert('Для оплаты свяжитесь с нами по номеру: +992 926 03 75 57');
});




document.querySelectorAll('.clickable').forEach(el => {
    el.addEventListener('click', () => {
        if (el.classList.contains('fall')) return; // prevent re-click during animation

        el.classList.add('fall');

        setTimeout(() => {
            el.classList.remove('fall');
            el.classList.add('rebuild');

            setTimeout(() => {
                el.classList.remove('rebuild');
            }, 500); // rebuild animation duration
        }, 4000); // time before rebuilding
    });

    el.addEventListener('touchstart', () => {
        if (el.classList.contains('fall')) return;

        el.classList.add('fall');

        setTimeout(() => {
            el.classList.remove('fall');
            el.classList.add('rebuild');

            setTimeout(() => {
                el.classList.remove('rebuild');
            }, 500);
        }, 4000);
    });
});