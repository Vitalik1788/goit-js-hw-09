import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onBtnStartClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onUserDateValue(selectedDates);
  }
};
flatpickr('#datetime-picker', options);


function onUserDateValue(selectedDates) {
  const userSelectedDate = selectedDates[0].getTime();
  const userDefaultDate = options.defaultDate.getTime();
  if (userSelectedDate <= userDefaultDate) {
    Notiflix.Notify.warning('Please choose a date in the future');
    refs.startBtn.setAttribute('disabled', true);
    return;
  }
  refs.startBtn.removeAttribute('disabled', true);
  const ms = userSelectedDate - userDefaultDate;
  convertMs(ms);
};

function onBtnStartClick({ days, hours, minutes, seconds }) {
  console.log(
    `залишилось часу до розпродажу: ${days} : ${hours} : ${minutes} : ${seconds}`
  );

};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  onBtnStartClick({ days, hours, minutes, seconds });

  return { days, hours, minutes, seconds };
};


