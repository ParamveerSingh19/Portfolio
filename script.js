// THEME
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("light");
};

// CURSOR
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// SCROLL ANIMATION
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// GITHUB PROJECTS
const username = "ParamveerSingh19";
const container = document.getElementById("projectsContainer");

async function fetchProjects() {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await res.json();

    container.innerHTML = "";

    data
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 6)
      .forEach((repo) => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
<h3>${repo.name}</h3>
<p>${repo.description || "No description available"}</p>
<a href="${repo.html_url}" target="_blank" class="btn">View Project</a>
`;

        container.appendChild(card);
      });
  } catch {
    container.innerHTML = "<p>Failed to load projects</p>";
  }
}

fetchProjects();

// PARTICLES
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    dx: Math.random() - 0.5,
    dy: Math.random() - 0.5,
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "#00f7ff";
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
  });
  requestAnimationFrame(animate);
}
animate();
