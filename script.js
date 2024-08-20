window.onload = function () {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let lastX = null;
  let lastY = null;
  let lastTime = null;

  // Generate a random RGB color
  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  let color = getRandomColor(); // Initialize with a random color

  function draw(e) {
    const currentTime = new Date().getTime();
    const currentX = e.offsetX;
    const currentY = e.offsetY;

    if (lastX !== null && lastY !== null && lastTime !== null) {
      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const timeElapsed = currentTime - lastTime;
      const speed = distance / timeElapsed;

      const minLineWidth = 1;
      const maxLineWidth = 10;
      const minRadius = 5;
      const maxRadius = 50;

      if (speed > 0.1) {
        const lineWidth = Math.max(
          minLineWidth,
          Math.min(
            maxLineWidth,
            maxLineWidth - speed * (maxLineWidth - minLineWidth)
          )
        );

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = color; // Use the current color
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = 'round'; // Smooth line joins
        ctx.lineCap = 'round'; // Smooth line ends
        ctx.stroke();
      } else {
        const baseRadius = maxRadius * Math.exp(-speed * 10);
        const radiusX = baseRadius * (1 + speed);
        const radiusY = baseRadius / (1 + speed);

        ctx.beginPath();
        ctx.ellipse(currentX, currentY, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = color; // Use the current color
        ctx.fill();
      }
    }

    lastX = currentX;
    lastY = currentY;
    lastTime = currentTime;
  }

  function changeColor() {
    color = getRandomColor(); // Update the color on click
  }

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('click', changeColor); // Change color on click
};

const img = new Image();
img.src = 'path/to/your/image.jpg'; // Update this path to your image file

img.onload = function () {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw image to fit the canvas
};
