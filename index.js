// ===== Personalize here =====
const NAME = "";   // type the person's name, e.g. "Sarah"
// ============================

const $ = id => document.getElementById(id);
const scene = $("scene"), modal = $("modal");

if (NAME) {
  $("eyebrow").textContent = "FOR " + NAME.toUpperCase() + ", WITH ALL MY LOVE";
  document.title = "For " + NAME + " ❤️";
}

// confetti burst
function confetti() {
  const stage = scene.querySelector(".stage");
  const colors = ["#ff5fa8", "#ffd34d", "#ff3b52", "#fff", "#ffb3c9", "#8ee0a8"];
  for (let i = 0; i < 46; i++) {
    const c = document.createElement("span");
    c.className = "confetti";
    c.style.background = colors[i % colors.length];
    c.style.setProperty("--dx", (Math.random() * 380 - 190) + "px");
    c.style.setProperty("--dy", (Math.random() * -260 - 20) + "px");
    c.style.setProperty("--r", (Math.random() * 720 - 360) + "deg");
    c.style.animationDelay = (0.5 + Math.random() * 0.3) + "s";
    stage.appendChild(c);
    setTimeout(() => c.remove(), 2800);
  }
}

// open gift -> bear -> letter
let busy = false;
function openGift() {
  if (busy) return;
  busy = true;
  scene.classList.add("open");
  confetti();
  setTimeout(() => modal.classList.add("show"), 2300);
}
function closeLetter() {
  modal.classList.remove("show");
  setTimeout(() => { scene.classList.remove("open"); busy = false; }, 900);
}
$("gift").addEventListener("click", openGift);
$("gift").addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") openGift(); });
$("close").onclick = closeLetter;
$("x").onclick = closeLetter;
modal.addEventListener("click", e => { if (e.target === modal) closeLetter(); });

// floating hearts background
const cv = $("bg"), ctx = cv.getContext("2d");
let W, H;
const dots = [];
function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
addEventListener("resize", resize); resize();
for (let i = 0; i < 45; i++) dots.push({
  x: Math.random() * innerWidth, y: Math.random() * innerHeight,
  r: 2 + Math.random() * 8, v: .2 + Math.random() * .6,
  a: .12 + Math.random() * .35, heart: Math.random() < .3
});
function heart(x, y, s) {
  ctx.beginPath();
  ctx.moveTo(x, y + s / 4);
  ctx.bezierCurveTo(x, y - s / 2, x - s, y - s / 2, x - s, y + s / 4);
  ctx.bezierCurveTo(x - s, y + s, x, y + s * 1.2, x, y + s * 1.5);
  ctx.bezierCurveTo(x, y + s * 1.2, x + s, y + s, x + s, y + s / 4);
  ctx.bezierCurveTo(x + s, y - s / 2, x, y - s / 2, x, y + s / 4);
  ctx.fill();
}
(function loop() {
  ctx.clearRect(0, 0, W, H);
  for (const d of dots) {
    d.y -= d.v;
    if (d.y < -20) { d.y = H + 20; d.x = Math.random() * W; }
    ctx.fillStyle = `rgba(255,150,200,${d.a})`;
    if (d.heart) heart(d.x, d.y, d.r * 1.4);
    else { ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 7); ctx.fill(); }
  }
  requestAnimationFrame(loop);
})();