let sliderData = [];
let currentIndex = 0;

async function fetchData() {
    try {
        let userEmail = localStorage.getItem("u_local") || "";
        let response = await fetch("https://script.google.com/macros/s/AKfycbzyuPOriPLXsXgAZNYbWo7MVfqC7BuNKlPkExHb0u96e8KKlNAs_JB_6KEZ7OoCKRtA/exec", {
            method: "POST",
            body: new URLSearchParams({ u_local: userEmail })
        });
        let data = await response.json();

        document.getElementById("greeting").innerHTML = `
        <img src="https://media.istockphoto.com/id/1396723018/vector/astronaut-vector-illustration-design-hovering-carrying-a-flag.jpg?s=612x612&w=0&k=20&c=yMyaPpamdM_TuueMNve-64Mi6COtWW0HiD63UzwS7ek=">
        <div>
        ${data.greeting}, <br> <p class="username">${data.userName || "Guest"}!</p>
        </div>
        `;

        sliderData = data.sliderData;
        if (sliderData.length > 0) {
            createSlider();
            showSlide(0);
            setInterval(nextSlide, 3000);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function createSlider() {
    let slider = document.getElementById("slider");
    let dotsContainer = document.getElementById("dots");

    slider.innerHTML = "";
    dotsContainer.innerHTML = "";

    sliderData.forEach((item, index) => {
        let slide = document.createElement("div");
        slide.classList.add("slide");

        let img = document.createElement("img");
        img.src = item.image;
        img.onclick = () => redirectToPage(item.url, item.itemType);
        
        slide.appendChild(img);
        slider.appendChild(slide);

        let dot = document.createElement("span");
        dot.classList.add("dot");
        dot.onclick = () => showSlide(index);
        dotsContainer.appendChild(dot);
    });
}

function showSlide(index) {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");

    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].style.display = "block";
    dots[index].classList.add("active");

    currentIndex = index;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % sliderData.length;
    showSlide(currentIndex);
}

function redirectToPage(url, itemType) {
    localStorage.setItem("itemType", itemType || "");
    window.location.href = url ? url : "items.html";
}

fetchData();
