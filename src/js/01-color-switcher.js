const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

let timerId = null;

refs.stopBtn.setAttribute('disabled', true);

function onStartBtnClick(event) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);  
  refs.startBtn.setAttribute('disabled', true);
  refs.stopBtn.removeAttribute('disabled', true);
  
};

function onStopBtnClick(event) {
  clearInterval(timerId);
  refs.startBtn.removeAttribute('disabled', true);
  refs.stopBtn.setAttribute('disabled', true);

};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}