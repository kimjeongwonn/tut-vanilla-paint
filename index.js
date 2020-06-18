"use strict";
const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const color = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');
const INITIAL_COROL = '#2c2c2c';
canvas.width = 700;
canvas.height = 700;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = INITIAL_COROL;
ctx.strokeStyle = INITIAL_COROL;
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;
function onMouseEnter(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function startPainting() {
    painting = true;
}
function stopPainting() {
    painting = false;
}
function changeColor(e) {
    ctx.strokeStyle = e.target.style.backgroundColor;
    ctx.fillStyle = e.target.style.backgroundColor;
}
function handleRangeChange(e) {
    ctx.lineWidth = e.target.value;
}
function handleModClick() {
    if (filling) {
        filling = !filling;
        mode.innerText = 'Fill';
    }
    else if (!filling) {
        filling = !filling;
        mode.innerText = 'Paint';
    }
}
function handleCanvasClick() {
    if (filling)
        ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function handleCM(e) {
    e.preventDefault();
}
function handleSaveClick() {
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
