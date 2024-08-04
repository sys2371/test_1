window.onload = function () {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let lastX, lastY, lastTime;

  canvas.addEventListener('mousemove', draw);

  function draw(e) {
    const currentTime = new Date().getTime();
    const currentX = e.offsetX;
    const currentY = e.offsetY;

    if (lastX !== undefined && lastY !== undefined && lastTime !== undefined) {
      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const timeElapsed = currentTime - lastTime;
      const speed = distance / timeElapsed;

      if (speed > 0.1) {
        // 속도가 0.1 이상일 때 선 그리기
        const minLineWidth = 1; // 선의 최소 두께
        const maxLineWidth = 5; // 선의 최대 두께
        const lineWidth = maxLineWidth - speed * (maxLineWidth - minLineWidth); // 속도가 빠를수록 얇은 선

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = Math.max(
          minLineWidth,
          Math.min(maxLineWidth, lineWidth)
        ); // 선의 두께를 설정
        ctx.stroke();
      } else {
        // 속도가 0.1 이하일 때 원 그리기
        const maxRadius = 600; // 원의 최대 반지름
        const minRadius = 1; // 원의 최소 반지름
        const radius = minRadius + speed * (maxRadius - minRadius); // 속도가 느릴수록 큰 원

        ctx.beginPath();
        ctx.arc(currentX, currentY, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
      }
    }

    lastX = currentX;
    lastY = currentY;
    lastTime = currentTime;
  }
};
