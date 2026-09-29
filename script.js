"use strict";

/* ==========================================
   PREMIUM BIRTHDAY WEBSITE
   Main JavaScript
   Birthday: 29 August 2026, 12:00 AM
========================================== */


/* ==========================================
   BIRTHDAY DATE
========================================== */

const BIRTHDAY_TIME = new Date(
    2027,
    7,
    29,
    0,
    0,
    0,
    0
).getTime();


/* ==========================================
   COMMON ELEMENTS
========================================== */

const loader = document.getElementById("loader");

const dayEl = document.getElementById("days");
const hourEl = document.getElementById("hours");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");

const openGift = document.getElementById("openGift");

const titleEl = document.querySelector(".title");
const subtitleEl = document.querySelector(".subtitle");


/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    if (loader) {

        setTimeout(() => {

            loader.classList.add("loader-hidden");

        }, 2200);

    }

    window.scrollTo({
        top: 0,
        behavior: "auto"
    });

});


/* ==========================================
   COUNTDOWN
   Only runs on index.html
========================================== */

function updateCountdown() {

    if (
        !dayEl ||
        !hourEl ||
        !minuteEl ||
        !secondEl
    ) {
        return;
    }


    const now = Date.now();

    const distance = BIRTHDAY_TIME - now;


    /* Birthday reached */

    if (distance <= 0) {

        dayEl.textContent = "00";
        hourEl.textContent = "00";
        minuteEl.textContent = "00";
        secondEl.textContent = "00";


        if (titleEl) {

            titleEl.textContent =
                "🎉 Happy Birthday Rojina 🎂";

        }


        if (subtitleEl) {

            subtitleEl.textContent =
                "Your Surprise Is Ready 💖";

        }


        unlockSurprise();

        clearInterval(countdownTimer);

        return;
    }


    /* Calculate time */

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );


    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );


    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );


    /* Update UI */

    dayEl.textContent =
        String(days).padStart(2, "0");

    hourEl.textContent =
        String(hours).padStart(2, "0");

    minuteEl.textContent =
        String(minutes).padStart(2, "0");

    secondEl.textContent =
        String(seconds).padStart(2, "0");

}


/* ==========================================
   LOCK / UNLOCK SURPRISE
========================================== */

function lockSurprise() {

    if (!openGift) {
        return;
    }


    openGift.disabled = true;

    openGift.textContent =
        "🎁 Surprise Unlocks on 29/08/2027";

}


function unlockSurprise() {

    if (!openGift) {
        return;
    }


    openGift.disabled = false;

    openGift.textContent =
        "🎁 Open Your Surprise";


    openGift.classList.add("unlocked");

}


/* ==========================================
   START COUNTDOWN
========================================== */

let countdownTimer = null;


if (dayEl) {

    if (Date.now() < BIRTHDAY_TIME) {

        lockSurprise();

    } else {

        unlockSurprise();

    }


    updateCountdown();


    countdownTimer = setInterval(
        updateCountdown,
        1000
    );

}


/* ==========================================
   OPEN SECOND PAGE
========================================== */

if (openGift) {

    openGift.addEventListener("click", () => {

        if (openGift.disabled) {
            return;
        }


        if (Date.now() < BIRTHDAY_TIME) {

            return;

        }


        window.location.href =
            "surprise.html";

    });

}


/* ==========================================
   SURPRISE PAGE
   Elements
========================================== */

const music =
    document.getElementById("music");

const musicBtn =
    document.getElementById("musicBtn");

const wishBtn =
    document.getElementById("wishBtn");

const gift =
    document.querySelector(".gift-box");

const messageEl =
    document.querySelector(".message");

const heartsContainer =
    document.getElementById("hearts");

const canvas =
    document.getElementById("fireworks");

const ctx =
    canvas
        ? canvas.getContext("2d")
        : null;


/* ==========================================
   TYPEWRITER MESSAGE
========================================== */

function startTypewriter() {

    if (!messageEl) {
        return;
    }


    const originalText =
        messageEl.textContent.trim();


    messageEl.textContent = "";

    let index = 0;


    function typeWriter() {

        if (index < originalText.length) {

            messageEl.textContent +=
                originalText.charAt(index);

            index++;

            setTimeout(
                typeWriter,
                22
            );

        }

    }


    typeWriter();

}


if (messageEl) {

    setTimeout(
        startTypewriter,
        700
    );

}


/* ==========================================
   MUSIC
========================================== */

let playing = false;


async function playMusic() {

    if (!music) {
        return;
    }


    try {

        await music.play();

        playing = true;


        if (musicBtn) {

            musicBtn.textContent =
                "⏸ Pause Music";

        }

    } catch (error) {

        playing = false;

        if (musicBtn) {

            musicBtn.textContent =
                "🎵 Play Music";

        }

    }

}


function pauseMusic() {

    if (!music) {
        return;
    }


    music.pause();

    playing = false;


    if (musicBtn) {

        musicBtn.textContent =
            "🎵 Play Music";

    }

}


if (musicBtn && music) {

    musicBtn.addEventListener(
        "click",
        async () => {

            if (music.paused) {

                await playMusic();

            } else {

                pauseMusic();

            }

        }
    );


    music.addEventListener(
        "play",
        () => {

            playing = true;

            musicBtn.textContent =
                "⏸ Pause Music";

        }
    );


    music.addEventListener(
        "pause",
        () => {

            playing = false;

            musicBtn.textContent =
                "🎵 Play Music";

        }
    );

}


/* ==========================================
   WISH BUTTON
========================================== */

if (wishBtn) {

    wishBtn.addEventListener(
        "click",
        () => {

            alert(
`✨ Close your eyes...

Make a beautiful wish...

May every dream of Rojina come true!

🎂 Happy Birthday ❤️`
            );

        }
    );

}


/* ==========================================
   GIFT BOX EFFECT
========================================== */

if (gift) {

    gift.addEventListener(
        "click",
        () => {

            gift.classList.add(
                "gift-active"
            );


            gift.textContent = "💖";


            setTimeout(
                () => {

                    gift.classList.remove(
                        "gift-active"
                    );

                    gift.textContent = "🎁";

                },
                1200
            );

        }
    );

}


/* ==========================================
   CANVAS
========================================== */

function resizeCanvas() {

    if (!canvas || !ctx) {
        return;
    }


    const ratio =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    canvas.width =
        Math.floor(
            window.innerWidth * ratio
        );


    canvas.height =
        Math.floor(
            window.innerHeight * ratio
        );


    canvas.style.width =
        `${window.innerWidth}px`;


    canvas.style.height =
        `${window.innerHeight}px`;


    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* ==========================================
   FIREWORK PARTICLES
========================================== */

let particles = [];


class Particle {

    constructor(x, y, color) {

        this.x = x;
        this.y = y;

        this.radius =
            Math.random() * 2.5 + 1;

        this.color = color;

        this.speedX =
            (Math.random() - 0.5) * 9;

        this.speedY =
            (Math.random() - 0.5) * 9;

        this.alpha = 1;

        this.gravity = 0.05;

    }


    update() {

        this.x += this.speedX;

        this.y += this.speedY;

        this.speedY += this.gravity;

        this.alpha -= 0.015;

    }


    draw() {

        if (!ctx) {
            return;
        }


        ctx.save();

        ctx.globalAlpha =
            Math.max(this.alpha, 0);

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            this.color;

        ctx.fill();

        ctx.restore();

    }

}


/* ==========================================
   CREATE FIREWORK
========================================== */

function createFirework(x, y) {

    const colors = [
        "#ff4fd8",
        "#ffea00",
        "#ffffff",
        "#9b59ff",
        "#00e5ff",
        "#ff6b6b"
    ];


    for (let i = 0; i < 90; i++) {

        particles.push(

            new Particle(
                x,
                y,
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ]
            )

        );

    }

}


/* ==========================================
   FIREWORK ANIMATION
========================================== */

function animateFireworks() {

    if (!ctx || !canvas) {
        return;
    }


    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        particles[i].update();

        particles[i].draw();


        if (
            particles[i].alpha <= 0
        ) {

            particles.splice(i, 1);

        }

    }


    requestAnimationFrame(
        animateFireworks
    );

}


if (canvas) {

    animateFireworks();

}


/* ==========================================
   FIREWORK SHOW
========================================== */

function startFireworks() {

    if (!canvas) {
        return;
    }


    for (let i = 0; i < 10; i++) {

        setTimeout(
            () => {

                createFirework(
                    Math.random() *
                    window.innerWidth,

                    Math.random() *
                    (window.innerHeight * 0.55)
                );

            },
            i * 450
        );

    }

}


/* ==========================================
   CONFETTI
========================================== */

let confetti = [];


class ConfettiPiece {

    constructor() {

        this.x =
            Math.random() *
            window.innerWidth;

        this.y = -20;

        this.size =
            Math.random() * 8 + 5;

        this.speed =
            Math.random() * 3 + 2;

        this.rotation =
            Math.random() * 360;

        this.rotateSpeed =
            Math.random() * 8 - 4;


        const colors = [
            "#ff4fd8",
            "#ff66cc",
            "#9b59ff",
            "#ffd700",
            "#00e5ff",
            "#ffffff"
        ];


        this.color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

    }


    update() {

        this.y += this.speed;

        this.rotation +=
            this.rotateSpeed;

    }


    draw() {

        if (!ctx) {
            return;
        }


        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        ctx.rotate(
            this.rotation *
            Math.PI / 180
        );

        ctx.fillStyle =
            this.color;

        ctx.fillRect(
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size
        );

        ctx.restore();

    }

}


/* ==========================================
   CREATE CONFETTI
========================================== */

function launchConfetti() {

    if (!canvas) {
        return;
    }


    for (let i = 0; i < 160; i++) {

        confetti.push(
            new ConfettiPiece()
        );

    }

}


function updateConfetti() {

    if (!ctx) {
        return;
    }


    for (
        let i = confetti.length - 1;
        i >= 0;
        i--
    ) {

        confetti[i].update();

        confetti[i].draw();


        if (
            confetti[i].y >
            window.innerHeight + 30
        ) {

            confetti.splice(i, 1);

        }

    }

}


/* ==========================================
   COMBINED CANVAS LOOP
========================================== */

function animateCelebration() {

    if (!ctx || !canvas) {
        return;
    }


    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        particles[i].update();

        particles[i].draw();


        if (
            particles[i].alpha <= 0
        ) {

            particles.splice(i, 1);

        }

    }


    updateConfetti();


    requestAnimationFrame(
        animateCelebration
    );

}


/* ==========================================
   SURPRISE PAGE EFFECTS
========================================== */

function createHeart() {

    if (!heartsContainer) {
        return;
    }


    const heart =
        document.createElement("div");


    heart.className = "heart";

    heart.textContent = "❤️";


    heart.style.left =
        `${Math.random() * 100}vw`;


    heart.style.animationDuration =
        `${4 + Math.random() * 4}s`;


    heart.style.fontSize =
        `${18 + Math.random() * 20}px`;


    heartsContainer.appendChild(
        heart
    );


    setTimeout(
        () => heart.remove(),
        8500
    );

}


if (heartsContainer) {

    setInterval(
        createHeart,
        900
    );

}


/* ==========================================
   BALLOONS
========================================== */

function createBalloon() {

    if (!document.body.classList.contains(
        "surprise-page"
    )) {
        return;
    }


    const balloon =
        document.createElement("div");


    balloon.classList.add(
        "balloon"
    );


    const colors = [
        "pink",
        "purple",
        "white"
    ];


    balloon.classList.add(
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ]
    );


    balloon.style.left =
        `${Math.random() * 100}vw`;


    balloon.style.animationDuration =
        `${8 + Math.random() * 6}s`;


    document.body.appendChild(
        balloon
    );


    setTimeout(
        () => balloon.remove(),
        15000
    );

}


if (
    document.body.classList.contains(
        "surprise-page"
    )
) {

    setInterval(
        createBalloon,
        3500
    );

}


/* ==========================================
   ROSE PETALS
========================================== */

function createPetal() {

    if (!document.body.classList.contains(
        "surprise-page"
    )) {
        return;
    }


    const petal =
        document.createElement("div");


    petal.className = "petal";

    petal.textContent = "🌸";


    petal.style.left =
        `${Math.random() * 100}vw`;


    petal.style.animationDuration =
        `${6 + Math.random() * 5}s`;


    petal.style.fontSize =
        `${16 + Math.random() * 16}px`;


    document.body.appendChild(
        petal
    );


    setTimeout(
        () => petal.remove(),
        12000
    );

}


if (
    document.body.classList.contains(
        "surprise-page"
    )
) {

    setInterval(
        createPetal,
        1800
    );

}


/* ==========================================
   SHOOTING STARS
========================================== */

function createShootingStar() {

    if (!document.body.classList.contains(
        "surprise-page"
    )) {
        return;
    }


    const star =
        document.createElement("div");


    star.className =
        "shooting-star";


    star.style.top =
        `${Math.random() * 250}px`;


    document.body.appendChild(
        star
    );


    setTimeout(
        () => star.remove(),
        5000
    );

}


if (
    document.body.classList.contains(
        "surprise-page"
    )
) {

    setInterval(
        createShootingStar,
        9000
    );

}


/* ==========================================
   DESKTOP SPARKLES
========================================== */

let lastSparkleTime = 0;


if (
    document.body.classList.contains(
        "surprise-page"
    )
) {

    document.addEventListener(
        "mousemove",
        (event) => {

            const now =
                performance.now();


            if (
                now - lastSparkleTime <
                80
            ) {
                return;
            }


            lastSparkleTime = now;


            const sparkle =
                document.createElement(
                    "div"
                );


            sparkle.className =
                "sparkle";


            sparkle.style.left =
                `${event.pageX}px`;


            sparkle.style.top =
                `${event.pageY}px`;


            document.body.appendChild(
                sparkle
            );


            setTimeout(
                () => sparkle.remove(),
                1000
            );

        }
    );

}


/* ==========================================
   PHOTO EFFECT
========================================== */

const photos =
    document.querySelectorAll(
        ".photos img"
    );


photos.forEach(
    (photo) => {

        photo.addEventListener(
            "click",
            () => {

                photo.classList.add(
                    "photo-active"
                );


                setTimeout(
                    () => {

                        photo.classList.remove(
                            "photo-active"
                        );

                    },
                    1000
                );

            }
        );

    }
);


/* ==========================================
   START SURPRISE CELEBRATION
========================================== */

if (
    document.body.classList.contains(
        "surprise-page"
    )
) {

    setTimeout(
        () => {

            startFireworks();

            launchConfetti();

        },
        500
    );


    /* Start combined animation loop */

    if (canvas) {

        animateCelebration();

    }

}


console.log(
    "🎉 Birthday Website Ready"
);
