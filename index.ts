const canvas: HTMLElement = document.getElementById('jsCanvas');

function onMouseEnter(e) {
  console.log();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseEnter);
}
