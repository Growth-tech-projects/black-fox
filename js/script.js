/* ---- 1. PARTICLE FIELD ---- */
const canvas = document.getElementById('pc');
const ctx    = canvas.getContext('2d');
let W, H, pts = [];

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.s    = Math.random() * 1.3 + 0.3;
    this.vx   = (Math.random() - 0.5) * 0.22;
    this.vy   = (Math.random() - 0.5) * 0.22;
    this.life = Math.random();
    this.ml   = Math.random() * 0.8 + 0.5;
    this.cr   = Math.random() > 0.68
      ? 'rgba(196, 30, 30, '
      : 'rgba(184, 150, 12, ';
  }
  update() {
    this.x    += this.vx;
    this.y    += this.vy;
    this.life += 0.003;
    if (this.life > this.ml || this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
      this.reset();
    }
  }
  draw() {
    const alpha = Math.sin((this.life / this.ml) * Math.PI) * 0.55;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
    ctx.fillStyle = this.cr + alpha + ')';
    ctx.fill();
  }
}

for (let i = 0; i < 130; i++) pts.push(new Particle());

(function animParticles() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animParticles);
})();


/* ---- 2. NAVBAR SCROLL ---- */
const navbar = document.getElementById('nb');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('sc', window.scrollY > 60);
});


/* ---- 3. HAMBURGER MENU ---- */
const hamBtn = document.getElementById('hb');
const mobNav = document.getElementById('mn');

hamBtn.addEventListener('click', () => {
  hamBtn.classList.toggle('op');
  mobNav.classList.toggle('op');
});

// This smoothly closes the mobile menu when you click a link
function cm() {
  hamBtn.classList.remove('op');
  mobNav.classList.remove('op');
}


/* ---- 4. SCROLL REVEAL ---- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('v');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.rv, .rl, .rr').forEach(el => revealObs.observe(el));


/* ---- 5. STAGGER DELAYS ---- */
document.querySelectorAll('.off-c').forEach((c, i) => c.style.transitionDelay = (i * 0.08) + 's');
document.querySelectorAll('.cc').forEach((c, i)    => c.style.transitionDelay = (i * 0.05) + 's');
document.querySelectorAll('.pl').forEach((c, i)    => c.style.transitionDelay = (i * 0.08) + 's');


/* ---- 6. LOGO PARALLAX ---- */
const heroFox = document.querySelector('.h-fox-img');
if (heroFox) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroFox.style.transform = `translateY(${window.scrollY * 0.2}px)`;
    }
  });
}

/* ---- 7. AUTO-SCROLLING HERO SLIDER ---- */
const track = document.getElementById('hero-slider');
if (track) {
  let currentSlide = 0;
  // We have 3 total slides mapped in HTML
  const totalSlides = 3;

  setInterval(() => {
    currentSlide++;
    if (currentSlide >= totalSlides) {
      currentSlide = 0;
    }
    // Moves the track left based on the current slide
    track.style.transform = `translateX(-${(currentSlide * 100) / totalSlides}%)`;
  }, 4000); // 4000ms = scrolls every 4 seconds
}

/* ---- 8. ABOUT SECTION SLIDER ---- */
const abTrack = document.getElementById('about-slider');
if (abTrack) {
  let abCurrentSlide = 0;
  // We have 4 total slides mapped in the HTML
  const abTotalSlides = 4;

  setInterval(() => {
    abCurrentSlide++;
    if (abCurrentSlide >= abTotalSlides) {
      abCurrentSlide = 0;
    }
    // Moves the track left based on the current slide
    abTrack.style.transform = `translateX(-${(abCurrentSlide * 100) / abTotalSlides}%)`;
  }, 3500); // 3500ms = scrolls every 3.5 seconds
}

/* ---- 9. POP-UP GALLERY MODAL LOGIC ---- */

// This object holds the images for men's clothing in each category
const galleryData = {
  shirts: [
    "assets/images/shirt1.webp",
    "assets/images/shirt2.webp",
    "assets/images/shirt3.webp",
    "assets/images/shirt4.webp"
  ],
  trousers: [
    "assets/images/trouser1.webp",
    "assets/images/trouser2.webp",
    "assets/images/trouser3.webp",
    "assets/images/trouser4.webp"
  ],
  ethnic: [
    "assets/images/ethnic1.webp",
    "assets/images/ethnic2.webp",
    "assets/images/ethnic3.webp",
    "assets/images/ethnic4.webp"
  ],
  jackets: [
    "assets/images/jacket1.webp",
    "assets/images/jacket2.webp",
    "assets/images/jacket3.webp",
    "assets/images/jacket4.webp"
  ]
};

const modal = document.getElementById("galleryModal");
const galleryGrid = document.getElementById("galleryGrid");
const galleryTitle = document.getElementById("galleryTitle");

function openGallery(category) {
  // Clear old images
  galleryGrid.innerHTML = "";

  // Set the title (e.g., changes "shirts" to "Premium Shirts")
  if(category === 'shirts') galleryTitle.innerHTML = "Premium <span>Shirts</span>";
  if(category === 'trousers') galleryTitle.innerHTML = "Trousers & <span>Chinos</span>";
  if(category === 'ethnic') galleryTitle.innerHTML = "Ethnic & <span>Suits</span>";
  if(category === 'jackets') galleryTitle.innerHTML = "Premium <span>Jackets</span>";

  // Inject the new images specifically for guys
  galleryData[category].forEach(imageUrl => {
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.alt = "Black Fox Menswear";
    galleryGrid.appendChild(imgElement);
  });

  // Show the modal window
  modal.classList.add("show");
  document.body.style.overflow = "hidden"; // Stops the background from scrolling
}

function closeGallery() {
  modal.classList.remove("show");
  document.body.style.overflow = "auto"; // Allows scrolling again
}

// Close the modal if the user clicks anywhere outside of the image box
window.onclick = function(event) {
  if (event.target == modal) {
    closeGallery();
  }
}