const canvas = document.getElementById("ritualCanvas");
const ctx = canvas.getContext("2d");
const center = { x: canvas.width / 2, y: canvas.height / 2 };

const quarters = [
  { pos: { x: center.x, y: center.y - 80 }, angle: 0, target: 0 },     // North
  { pos: { x: center.x + 80, y: center.y }, angle: 90, target: 90 },   // East
  { pos: { x: center.x, y: center.y + 80 }, angle: 180, target: 180 }, // South
  { pos: { x: center.x - 80, y: center.y }, angle: 270, target: 270 }  // West
];

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Central core
  ctx.fillStyle = "gold";
  ctx.beginPath();
  ctx.arc(center.x, center.y, 30, 0, Math.PI * 2);
  ctx.fill();

  // Arrow shapes
  ctx.fillStyle = "rgb(50,100,220)";
  drawArrow(center.x - 15, center.y - 80, center.x, center.y - 110); // Up
  drawArrow(center.x - 15, center.y + 50, center.x, center.y + 110); // Down
  drawArrow(center.x - 80, center.y - 15, center.x - 110, center.y); // Left
  drawArrow(center.x + 50, center.y - 15, center.x + 110, center.y); // Right

  // Corner circles
  ctx.fillStyle = "rgb(200,50,50)";
  [[-60, -60], [60, -60], [60, 60], [-60, 60]].forEach(([dx, dy]) => {
    ctx.beginPath();
    ctx.arc(center.x + dx, center.y + dy, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Quarter circles
  quarters.forEach(q => drawQuarter(q.pos.x, q.pos.y, q.angle));

  // Ritual gates
  const aligned = quarters.every(q => q.angle === q.target);
  const gateColor = aligned ? "orange" : "rgb(200,50,50)";
  [[center.x, 10], [canvas.width - 30, center.y], [center.x, canvas.height - 30], [10, center.y]].forEach(([x, y]) => {
    ctx.fillStyle = gateColor;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  });

  // Feedback
  document.getElementById("feedback").textContent = aligned ? "✨ Ritual Activated! ✨" : "The energies are misaligned...";
}

function drawArrow(sx, sy, tx, ty) {
  ctx.fillRect(sx, sy, 30, 30);
  ctx.beginPath();
  ctx.moveTo(tx, ty);
  ctx.lineTo(sx, sy);
  ctx.lineTo(sx + 30, sy);
  ctx.closePath();
  ctx.fill();
}

function drawQuarter(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.strokeStyle = "rgb(0,180,0)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, 30, 0, Math.PI / 2);
  ctx.stroke();
  ctx.restore();
}

canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  quarters.forEach((q, i) => {
    const dx = mx - q.pos.x;
    const dy = my - q.pos.y;
    if (Math.abs(dx) < 30 && Math.abs(dy) < 30) {
      q.angle = (q.angle + 90) % 360;
    }
  });

  drawScene();
});

drawScene();
