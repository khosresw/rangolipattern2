const canvas = document.getElementById("ritualCanvas");
const ctx = canvas.getContext("2d");
const center = { x: canvas.width / 2, y: canvas.height / 2 };

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Central core
  ctx.fillStyle = "gold";
  ctx.beginPath();
  ctx.arc(center.x, center.y, 30, 0, Math.PI * 2);
  ctx.fill();

  // Arrow shapes (square + triangle)
  ctx.fillStyle = "rgb(50,100,220)";
  drawArrow(center.x - 15, center.y - 80, "north");
  drawArrow(center.x - 15, center.y + 50, "south");
  drawArrow(center.x - 80, center.y - 15, "west");
  drawArrow(center.x + 50, center.y - 15, "east");

  // Corner circles
  ctx.fillStyle = "rgb(200,50,50)";
  [[-60, -60], [60, -60], [60, 60], [-60, 60]].forEach(([dx, dy]) => {
    ctx.beginPath();
    ctx.arc(center.x + dx, center.y + dy, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Ritual gates
  const gateColor = "orange";
  [[center.x, 10], [canvas.width - 30, center.y], [center.x, canvas.height - 30], [10, center.y]].forEach(([x, y]) => {
    ctx.fillStyle = gateColor;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  });

  // Feedback
  document.getElementById("feedback").textContent = "✨ Ritual Activated! ✨";
}

function drawArrow(sx, sy, direction) {
  // Draw square
  ctx.fillRect(sx, sy, 30, 30);

  // Triangle points
  let triangle;
  switch (direction) {
    case "north":
      triangle = [
        { x: sx, y: sy },
        { x: sx + 30, y: sy },
        { x: sx + 15, y: sy - 30 }
      ];
      break;
    case "south":
      triangle = [
        { x: sx, y: sy + 30 },
        { x: sx + 30, y: sy + 30 },
        { x: sx + 15, y: sy + 60 }
      ];
      break;
    case "east":
      triangle = [
        { x: sx + 30, y: sy },
        { x: sx + 30, y: sy + 30 },
        { x: sx + 60, y: sy + 15 }
      ];
      break;
    case "west":
      triangle = [
        { x: sx, y: sy },
        { x: sx, y: sy + 30 },
        { x: sx - 30, y: sy + 15 }
      ];
      break;
  }

  // Draw triangle
  ctx.beginPath();
  ctx.moveTo(triangle[0].x, triangle[0].y);
  ctx.lineTo(triangle[1].x, triangle[1].y);
  ctx.lineTo(triangle[2].x, triangle[2].y);
  ctx.closePath();
  ctx.fill();
}

drawScene();
