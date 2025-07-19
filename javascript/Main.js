import {Star} from "./Star.js";

// Last update: 2025-05-29

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight - 125;

ctx.translate(canvas.width / 2, canvas.height / 2);

ctx.fillStyle = "black";
ctx.fillRect(canvas.width * -1 / 2, canvas.height * -1 / 2, canvas.width, canvas.height);

window.addEventListener('resize', function () { 
    "use strict";
    window.location.reload(); 
});

function draw() {
    
    for (let star of stars) {
        // tail
        ctx.strokeStyle  = star.color;
        ctx.lineWidth  = star.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.px[star.px.length - 3], star.py[star.px.length - 3]);
        ctx.stroke();
        ctx.closePath();
        
        // star
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();

    }
}

var stars = [];

for (let i = 0; i < 138; i++) {
    stars.push(new Star(canvas.width, canvas.height));
}

function updateAndDraw() {

    ctx.fillStyle = "black";
    ctx.fillRect(canvas.width * -1 / 2, canvas.height * -1 / 2, canvas.width, canvas.height);

    for (let star of stars) {
        star.update(canvas.width, canvas.height);
    }
  
    draw();
}

setInterval(updateAndDraw, 32);

function myClock() {

    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const dateString = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${String(year).padStart(2, '0')}`;
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;


    document.getElementById('date').textContent = dateString;
    document.getElementById('clock').textContent = timeString;

    // set blue start
    if (seconds == 23) {
        stars[22].color = "blue";
        stars[22].size = 3.2;
    }

    // set explosion
    if (minutes == 0 && seconds == 0) {
        stars[0].x = 0;
        stars[0].y = 0;
    }


}

function myCountdown(pMinuend, pSubtrahend, pElementId) {

    const difference = pMinuend - pSubtrahend;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const countdownString = `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;

    document.getElementById(pElementId).textContent = countdownString;

}

// constants 
const endOfToday = new Date();
endOfToday.setHours(24, 0, 0);

const myBirthday = new Date(1995, 2, 23, 15, 30, 0);
const nextCentury = new Date(2101, 2, 23, 15, 30, 0);

// Update myClock every second
setInterval(myClock, 1000);

// End of today: 23:59:59 | start of today: 00:00:00 
// Update myCountdown every second: endOfToday - now
setInterval(() => {
    myCountdown(endOfToday, new Date(), "today_countdown");
}
    , 1000);

// Update myCountdown every second: now - myBirthday
setInterval(() => {
    myCountdown(new Date(), myBirthday, "countup");
}
    , 1000);

// Update myCountdown every second next Century Birthday - now
setInterval(() => {
    myCountdown(nextCentury, new Date(), "countdown");
}
    , 1000);

