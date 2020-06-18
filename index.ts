const canvas = document.getElementById('jsCanvas') as HTMLCanvasElement;
const ctx: any = canvas.getContext('2d');
const color = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode: any = document.getElementById('jsMode');
const save = document.getElementById('jsSave');

const INITIAL_COROL = '#2c2c2c';

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = INITIAL_COROL;
ctx.strokeStyle = INITIAL_COROL;
ctx.lineWidth = 2.5;

let painting: Boolean = false;
let filling: Boolean = false;

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
  ctx.fillStyle = e.target.style.backgroundColor;
}

function handleRangeChange(e: any): void {
  ctx.lineWidth = e.target.value;
}

function handleModClick(): void {
  if (filling) {
    filling = !filling;
    mode.innerText = 'Fill';
  } else if (!filling) {
    filling = !filling;
    mode.innerText = 'Paint';
  }
}

function handleCanvasClick(): void {
  if (filling) ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleCM(e: any): void {
  e.preventDefault();
}

function handleSaveClick(): void {
  const image = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'output.jpg';
  link.click();
}

for (const setColor of Array.from(color)) {
  setColor.addEventListener('click', changeColor);
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseEnter);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModClick);
}

if (save) {
  save.addEventListener('click', handleSaveClick);
}
