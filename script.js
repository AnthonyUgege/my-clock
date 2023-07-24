const canvas = document.getElementById('canvas');
const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const lineColor = document.getElementById('line-color');
const largeHandColor = document.getElementById('large-hand-color');
const secondHandColor = document.getElementById('second-hand-color');

// Retrieve colors from local storage if available, otherwise set defaults
const defaultColors = {
  faceColor: '#f4f4f4',
  borderColor: '#000000',
  lineColor: '#d3d3d3',
  largeHandColor: '#c0392b',
  secondHandColor: '#000000'
};
faceColor.value = JSON.parse(localStorage.getItem('faceColor')) || defaultColors.faceColor;
borderColor.value = JSON.parse(localStorage.getItem('borderColor')) || defaultColors.borderColor;
lineColor.value = JSON.parse(localStorage.getItem('lineColor')) || defaultColors.lineColor;
largeHandColor.value = JSON.parse(localStorage.getItem('largeHandColor')) || defaultColors.largeHandColor;
secondHandColor.value = JSON.parse(localStorage.getItem('secondHandColor')) || defaultColors.secondHandColor;

function clock() {
  const now = new Date();
  const ctx = canvas.getContext('2d');

  // Setup canvas
  ctx.save();
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250);
  ctx.rotate(-Math.PI / 2);

  // Set default styles
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = faceColor.value;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  // Draw clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor.value;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  // Draw hour lines
  ctx.save();
  ctx.strokeStyle = lineColor.value;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Draw minute lines
  ctx.save();
  ctx.strokeStyle = lineColor.value;
  ctx.lineWidth = 4;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  // Get current time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // Draw hour hand
  ctx.save();
  ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
  ctx.strokeStyle = largeHandColor.value;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // Draw min hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = largeHandColor.value;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  // Draw sec hand
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = secondHandColor.value;
  ctx.fillStyle = secondHandColor.value;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.restore();

  requestAnimationFrame(clock);
  localStorage.setItem('faceColor', JSON.stringify(faceColor.value));
  localStorage.setItem('borderColor', JSON.stringify(borderColor.value));
  localStorage.setItem('lineColor', JSON.stringify(lineColor.value));
  localStorage.setItem('largeHandColor', JSON.stringify(largeHandColor.value));
  localStorage.setItem('secondHandColor', JSON.stringify(secondHandColor.value));
}

requestAnimationFrame(clock);

document.getElementById('save-btn').addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'clock.png';
  link.href = dataURL;
  link.click();
});