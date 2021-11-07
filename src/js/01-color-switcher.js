const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let bodyColor = null;

const changeColor = {
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    bodyColor = setInterval(() => {
      bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },
  stop() {
    clearInterval(bodyColor);
    this.isActive = false;
  },
};
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', () => {
  changeColor.start();
});
stopBtn.addEventListener('click', () => {
  changeColor.stop();
});
