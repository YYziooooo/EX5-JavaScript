

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