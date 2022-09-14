// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hourRefs = document.querySelector('[data-hours]');
const minRefs = document.querySelector('[data-minutes]');
const secRefs = document.querySelector('[ data-seconds]');

let timerId = null;

startBtn.setAttribute('disabled', true);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notify.failure('Please choose a date in the future');
            return;
        }
        startBtn.removeAttribute('disabled');

        const showTimer = () => {
        }
    },

};