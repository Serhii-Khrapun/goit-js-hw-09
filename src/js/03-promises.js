import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.1.0.min.css';

const formEl = document.querySelector('.form');
const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmount = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const makePromises = () => {
  let amountNumber = Number(inputAmount.value);
  let delayNumber = Number(inputDelay.value);
  let stepNumber = Number(inputStep.value);

  for (let i = 1; i <= amountNumber; i += 1) {
    createPromise(i, delayNumber)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayNumber += stepNumber;
  }
};

const onFormsabmit = evt => {
  evt.preventDefault();
  makePromises();
};

formEl.addEventListener('submit', onFormsabmit);
