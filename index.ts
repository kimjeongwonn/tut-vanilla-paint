const canvas = document.getElementById('jsCanvas') as HTMLCanvasElement;
const ctx: any = canvas.getContext('2d');
const color = document.getElementsByClassName('jsColor');
for (const setColor of Array.from(color)) {
  setColor.addEventListener('click', changeColor);
}

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

let painting: Boolean = false;

function onMouseEnter(e: any): void {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startPainting(): void {
  painting = true;
}

function stopPainting(): void {
  painting = false;
}

function changeColor(e: any): void {
  ctx.strokeStyle = e.target.style.backgroundColor;
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseEnter);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
}
