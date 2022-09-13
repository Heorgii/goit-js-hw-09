const bodyEl = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStop.disabled = true;
let intervalId = null;

const randomBgColorGenerator = {
    DELAY: 1000,

    getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    },

    interval() {
        intervalId = setInterval(() => {
            changeRandomBgColor();
        }, this.DELAY);
    },

    start() {
        btnStart.addEventListener('click', () => {
            this.interval();
            btnStart.disabled = true;
            btnStop.disabled = false;
        });
        btnStop.addEventListener('click', this.stop);
    },

    stop() {
        clearInterval(intervalId);
        btnStop.disabled = true;
        btnStart.disabled = false;
    },
}

function changeRandomBgColor() {
    bodyEl.style.backgroundColor = `${randomBgColorGenerator.getRandomHexColor()}`;
}

randomBgColorGenerator.start();