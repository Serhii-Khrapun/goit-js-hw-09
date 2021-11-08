import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.1.0.min.css';

const startBtnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let currentDate = null;

startBtnEl.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDate = selectedDates[0];

    if (currentDate.getTime() < new Date().getTime()) {
      Notify.failure('Ця дата вже пройшла');
      startBtnEl.setAttribute('disabled', true);
      return;
    }
    startBtnEl.removeAttribute('disabled');
  },
};
flatpickr('#datetime-picker', options);

startBtnEl.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  setInterval(() => {
    if (currentDate <= Date.now()) {
      return;
    }
    const time = convertMs(currentDate - new Date().getTime());
    daysEl.innerHTML = addLeadingZero(time.days);
    hoursEl.innerHTML = addLeadingZero(time.hours);
    minutesEl.innerHTML = addLeadingZero(time.minutes);
    secondsEl.innerHTML = addLeadingZero(time.seconds);
  }, 1000);
  startBtnEl.setAttribute('disabled', true);
}

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

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
