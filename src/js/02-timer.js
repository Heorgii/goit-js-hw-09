import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            startBtn.setAttribute('disabled', true);
            Notify.failure('Please choose a date in the future');
            return;
        }

        startBtn.removeAttribute('disabled');

        const timer = () => {
            const now = new Date();
            localStorage.setItem('selectedData', selectedDates[0]);
            const selectData = new Date(localStorage.getItem('selectedData'));

            if (!selectData) return;

            const diff = selectData - now;
            const { days, hours, minutes, seconds } = convertMs(diff);

            daysRef.textContent = addLeadingZero(days);
            hourRefs.textContent = addLeadingZero(hours);
            minRefs.textContent = addLeadingZero(minutes);
            secRefs.textContent = addLeadingZero(seconds);

            if (
                daysRef.textContent === '00' &&
                hourRefs.textContent === '00' &&
                minRefs.textContent === '00' &&
                secRefs.textContent === '00'
            ) {
                clearInterval(timerId);
            }
        };

        const stopTimer = null;
        if (stopTimer <= -1) {
            timer.clearInterval(timerId);
        }

        const onClick = () => {
            if (timerId) {
                clearInterval(timerId);
            }
            timer();
            timerId = setInterval(timer, 1000);
        }

        startBtn.addEventListener('click', onClick);

    },
};

flatpickr('#datetime-picker', { ...options });