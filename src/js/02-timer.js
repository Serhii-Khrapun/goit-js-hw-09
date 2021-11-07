import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.1.0.min.css';

const startBtnEL = document.querySelector('button[data-start');
const daysEl = document.querySelector('button[data-days');
const hoursEl = document.querySelector('button[data-hours');
const minutesEl = document.querySelector('button[data-minutes');
const secondsEl = document.querySelector('button[data-seconds');
const inputRef = document.querySelector('#datetime-picker');

startBtnEL.setAttribute('disabled', true);
startBtnEL.addEventListener('click', startBtnClick);
let currentDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDate = selectedDates[0];

    if (currentDate > new Date()) {
      startBtnEL.removeAttribute('disabled');
    } else {
      Notify.failure('Ця дата вже пройшла');
      startBtnEL.setAttribute('disabled', true);
    }
  },
};
flatpickr(inputRef, options);

function startBtnClick() {
  setInterval(() => {
    if (currentDate <= options.defaultDate) {
      return;
    }

    const time = convertMs(currentDate - options.defaultDate);

    secondsEl.textContent = addLeadingZero(time.seconds);
    minutesEl.textContent = addLeadingZero(time.minutes);
    hoursEl.textContent = addLeadingZero(time.hours);
    daysEl.textContent = addLeadingZero(time.days);
  }, 1000);
}
console.log(currentDate);
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
  return String(value).padStart(2, '0');
}
