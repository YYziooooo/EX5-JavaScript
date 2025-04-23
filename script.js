

const slides = document.getElementById('slides');
const slideCount = document.querySelectorAll('.slide').length;
let currentSlide = 0;
let autoSlideInterval;

function updateSlidePosition() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function showSlide() {
    const allSlides = document.querySelectorAll(".slide");
    allSlides.forEach(slide => slide.classList.remove("active"));
    allSlides[currentSlide].classList.add("active");
    updateSlidePosition();
}


function prevSlide() {
    currentSlide = (currentSlide <= 0) ? slideCount - 1 : currentSlide - 1;
    showSlide();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide();
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

document.getElementById('prev').addEventListener('click', prevSlide);
document.getElementById('next').addEventListener('click', nextSlide);

window.prevSlide = prevSlide;
window.nextSlide = nextSlide;
window.startAutoSlide = startAutoSlide;
window.stopAutoSlide = stopAutoSlide;

startAutoSlide();

document.getElementById('menuToggle').addEventListener('click', () => {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle("show"); 
});

const form = document.getElementById('registrationform');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name");
    if (!name.value.trim()) {
        nameError.textContent = "Name is required";
        valid = false;
    } else {
        nameError.textContent = "";
    }

    const email = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
        emailError.textContent = "Enter a valid email";
        valid = false;
    } else {
        emailError.textContent = "";
    }

    const dob = document.getElementById("dob");
    if (!dob.value) {
        dobError.textContent = "Birth date";
        valid = false;
    } else {
        dobError.textContent = "";
    }

    const dateOfVisit = document.getElementById("date-of-visit");
    if (!dateOfVisit.value) {
        visitDateError.textContent = "Visit date";
        valid = false;
    } else {
        visitDateError.textContent = "";
    }

    const noOfVisitors = document.getElementById("no-of-visitors");
    if (!noOfVisitors.value) {
        visitorsError.textContent = "Number of visitors";
        valid = false;
    } else {
        visitorsError.textContent = "";
    }

    const ticket = document.getElementById("ticket");
    if (!ticket.value) {
        ticketError.textContent = "Ticket type";
        valid = false;
    } else {
        ticketError.textContent = "";
    }

    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        genderError.textContent = "Select your gender";
        valid = false;
    } else {
        genderError.textContent = "";
    }
    

    if (valid) {
        alert("Registration successful!");
        form.reset();
    }
});
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const dobError = document.getElementById("dobError");
const visitDateError = document.getElementById("visitDateError");
const visitorsError = document.getElementById("visitorsError");
const genderError = document.getElementById("genderError");
const ticketError = document.getElementById("ticketError");

document.addEventListener('DOMContentLoaded', function() {
    const productsList = document.getElementById('productsList');
    const searchBar = document.getElementById('searchBar');
    const checkoutButton = document.getElementById('checkoutButton');
    const checkoutSection = document.getElementById('checkoutSection');
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    const proceedToPayment = document.getElementById('proceedToPayment');
    const purchaseFormSection = document.getElementById('purchaseFormSection');
    const purchaseForm = document.getElementById('purchaseForm');
    const backToShopping = document.getElementById('backToShopping');

    let products = [
        { id: 1, name: 'Totoro Plush', description: 'Soft plush toy of Totoro.', price: 10, image: './assets/001.jpg' },
        { id: 2, name: 'Catbus Pillow', description: 'Pillow shaped like the Catbus.', price: 20, image: './assets/002.jpg' },
        { id: 3, name: 'No-Face Lamp', description: 'A lamp designed like No-Face.', price: 30, image: './assets/003.jpg' },
        { id: 4, name: 'How\'s Ring', description: 'Ring from Howl\'s Moving Castle.', price: 40, image: './assets/004.jpg' },
        { id: 5, name: 'Calcfer Mug', description: 'Mug with the Calcfer design.', price: 50, image: './assets/005.jpg' },
        { id: 6, name: 'Soot Sprite Stickers', description: 'Set of Soot Sprite stickers.', price: 60, image: './assets/006.jpg' },
        { id: 7, name: 'Ghibli Notebook', description: 'Notebook featuring Studio Ghibli characters.', price: 70, image: './assets/007.jpg' },
        { id: 8, name: 'Jiji Keychain', description: 'Keychain shaped like Jiji from Kiki\'s Delivery Service.', price: 80, image: './assets/011.jpg' },
        { id: 9, name: 'Forest Spirit Poster', description: 'Poster of the Forest Spirit from Princess Mononoke.', price: 90, image: './assets/017.jpg' },
        { id: 10, name: 'Ponyo Water Bottle', description: 'Water bottle featuring Ponyo.', price: 100, image: './assets/023.jpg' },
        { id: 11, name: 'Ponyo Night Light', description: 'Night light featuring Ponyo.', price: 110, image: './assets/030.jpg' },
        { id: 12, name: 'Totoro Umbrella', description: 'Umbrella featuring Totoro.', price: 120, image: './assets/032.jpg' },
        { id: 13, name: 'Totoro Phone case', description: 'Phone case with Totoro design.', price: 130, image: './assets/036.jpg' }
    ];

    let cart = [];

    function renderProducts(productList = products) {
        productsList.innerHTML = '';
        productList.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            const shortDesc = product.description.length > 50
                ? product.description.substring(0, 50) + '...'
                : product.description;

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${shortDesc}</p>
                <p><strong>$$${product.price}</strong></p>
                <button class="add-to-cart" data-id="${product.id}">Add To Cart</button>
            `;
            productsList.appendChild(card);
        });
    }

    searchBar.addEventListener('input', function () {
        const query = searchBar.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
        renderProducts(filteredProducts);
    });

    productsList.addEventListener('click', function (event) {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.getAttribute('data-id');
            const product = products.find(p => p.id == productId);
            cart.push(product);
            updateCart();
            if (cart.length > 0) {
                checkoutButton.style.display = 'block';
            }
        }
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            const shortDesc = item.description.length > 40 ? item.description.substring(0, 40) + '...' : item.description;
            li.innerHTML = `
                <img src="${item.image}" style="width: 60px; vertical-align: middle; border-radius: 5px;">
                <span style="margin-left: 10px;"><strong>${item.name}</strong> - $${item.price}</span>
                <p style="margin-left: 70px; font-size: 0.9em;">${shortDesc}</p>
            `;
            cartItems.appendChild(li);
            total += item.price;
        });
        totalPrice.textContent = `$${total}`;
    }

    checkoutButton.addEventListener('click', function () {
        shoppingSection.classList.add('hidden');
        checkoutSection.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    proceedToPayment.addEventListener('click', function () {
        checkoutSection.classList.add('hidden');
        purchaseFormSection.classList.remove('hidden');
        document.body.style.overflow = 'auto'; // Allow scrolling
    });

    purchaseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('paymentMethod').value;
        const cardNumber = document.getElementById('cardNumber').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;

        if (name && email && address && paymentMethod && cardNumber && expiry && cvv) {
            purchaseFormSection.classList.add('hidden');
            confirmationSection.classList.remove('hidden');
        }
    });

    backToShopping.addEventListener('click', function () {
        confirmationSection.classList.add('hidden');
        shoppingSection.classList.remove('hidden');
    });

    renderProducts();
});