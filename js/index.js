document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 1000); // 1000 milliseconds = 1 second
    });
});



/**********************************************************\
		- Peace & Love Logo animation
\**********************************************************/

const fps = 60; // 60 frames/second
const logo = document.getElementById("peace-logo");

// Event on click
document.body.addEventListener("click", createDynamicPeaceAndLove);

function createDynamicPeaceAndLove() {
    const dynamicSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    dynamicSVG.setAttribute("class", "peace-logo");
    dynamicSVG.setAttribute("viewBox", "0 0 512 512");

    path.setAttribute("d", "M224 445.3V323.5l-94.3 77.1c26.1 22.8 58.5 38.7 94.3 44.7zM89.2 351.1L224 240.8V66.7C133.2 81.9 64 160.9 64 256c0 34.6 9.2 67.1 25.2 95.1zm293.1 49.5L288 323.5V445.3c35.7-6 68.1-21.9 94.3-44.7zm40.6-49.5c16-28 25.2-60.5 25.2-95.1c0-95.1-69.2-174.1-160-189.3V240.8L422.8 351.1zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z");

    dynamicSVG.appendChild(path);
    document.querySelector(".peace-container").appendChild(dynamicSVG);

    animateLogo(dynamicSVG);
}

var lastColor = -1;

function animateLogo(logo) {
    let width,
        height,
        velocityX = 1, // 1 px/frame
        velocityY = 1, // 1 px/frame
        pause = true;

    reset();

    window.addEventListener("resize", reset, true);

    setInterval(function() {
        if (pause) return;

        var rect = logo.getBoundingClientRect();
        var parentRect = document.querySelector(".gradient").getBoundingClientRect();

        var left = rect.x - parentRect.x;
        var top = rect.y - parentRect.y;

        if (left + rect.width >= width || left <= 0) {
            velocityX = -velocityX; // invert direction
            logo.style.fill = getRandomColor();
        }

        if (top + rect.height >= height || top <= 0) {
            velocityY = -velocityY; // invert direction
            logo.style.fill = getRandomColor();
        }

        logo.style.left = left + velocityX + "px";
        logo.style.top = top + velocityY + "px";
    }, 1000 / fps);


    function reset() {
        width   = document.querySelector(".gradient").clientWidth;
        height  = document.querySelector(".gradient").clientHeight;

        pause =
            width <= logo.getBoundingClientRect().width ||
            height <= logo.getBoundingClientRect().height;

        logo.style.left = (Math.floor(Math.random() * (width - 41)) + 1) +"px";
        logo.style.top =  (Math.floor(Math.random() * (height - 41)) + 1) + "px";
        logo.style.fill = getRandomColor();
    }
}

function getRandomColor() {
    var colors = [
        "#ff1100",
        "#E91E63",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#2196F3",
        "#03A9F4",
        "#00BCD4",
        "#05a898",
        "#4fc453",
        "#8BC34A",
        "#d3e438",
        "#FFEB3B",
        "#FFC107",
        "#FF9800",
        "#FF5722",
    ];
    var index = -1;
    do {
        index = Math.floor(Math.random() * colors.length);
    } while (lastColor == index);
    lastColor = index;
    return colors[index];
}