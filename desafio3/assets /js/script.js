          // variaveis e constantes//
//// ______________________________________ ////
const lightBulb = document.querySelector(".lampada");

const ON = "./assets /img/ligada.jpg";
const OFF = "./assets /img/desligada.jpg";
const BREAK = "/assets /img/quebrada.jpg";

const TIME_ON = 15;
const TIME_OFF = 20;
const TIME_EVENTUALLY_BREAK = 10;
const MAX_COUNTER = 5;

let allowanceMouseOver = true;
let generalTimer;
let canBreak = "no";
let counter = 0;
let lampState = "off";

        // funcoes do estado da lampada//
//// _______________________________________ ////
const turnOn = () => {
    lightBulb.src = ON;
    lampState = "on";
};

const turnOff = () => {
    lightBulb.src = OFF;
    lampState = "off";
};

const breakBulb = () => {
    lightBulb.src = BREAK;
    lampState = "broken";
};

const eventuallyBreakBulb = () => {
    turnOn();
    lampState = "about to break";
    setTimeout(breakBulb, TIME_EVENTUALLY_BREAK * 1000);
};

          // addevent do mouseover//
//// ______________________________________ ////
lightBulb.addEventListener("mouseover", () => {
    counter++;

    if (lampState === "broken" || allowanceMouseOver === false) {
        return;
    } else if (canBreak === "yes") {
        eventuallyBreakBulb();
        return;
    } else if (counter > MAX_COUNTER) {
        breakBulb();
        return;
    };

    setInterval( () => {allowanceMouseOver = true}, 15000);

    allowanceMouseOver = false;
    generalTimer = 0;

    const timerFunction = setInterval( () => {
        console.log(generalTimer, counter, lampState);
        generalTimer++;

        if (lampState === "about to break" || lampState === "broken") {
            return;
        } else if (generalTimer < TIME_ON) {
            turnOn();
        } else if (generalTimer >= TIME_ON && generalTimer <= TIME_OFF) {
            turnOff();
            canBreak = "yes";
        } else if (generalTimer > TIME_OFF) {
            canBreak = "no";
            clearInterval(timerFunction);
            return;
        };
    }, 1000);
});