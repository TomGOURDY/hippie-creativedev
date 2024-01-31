import {fillCanvas} from "./flowerManager";
import {createDynamicPeaceAndLove} from "./peace";


document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 1000);
    });
})




document.querySelector('.button1').addEventListener('click', () => {
    let snow = document.querySelector('.snow');
    snow.classList.toggle('active');
    setTimeout(() => {
        snow.classList.toggle('active');
    }, 400);
    document.querySelector('#audio').volume = 1;
    document.querySelector('#audio').play();

});

document.querySelector('.button2').addEventListener('click', () => {
    let snow = document.querySelector('.video');
    snow.classList.toggle('effect');
    // setTimeout(() => {
    //     snow.classList.toggle('effect');
    // }, 5000); // 1000 milliseconds = 1 second
});




var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

function generate_noise(ctx, chunkSize = 5) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        idata = ctx.createImageData(w, h),
        buffer32 = new Uint32Array(idata.data.buffer),
        w_chunks = Math.ceil(w / chunkSize),
        h_chunks = Math.ceil(h / chunkSize);

    for (var y = 0; y < h_chunks; y++) {
        for (var x = 0; x < w_chunks; x++) {
            var value = ((255 * Math.random()) | 0) << 24;
            for (var dy = 0; dy < chunkSize; dy++) {
                for (var dx = 0; dx < chunkSize; dx++) {
                    var idx = (y * chunkSize + dy) * w + (x * chunkSize + dx);
                    if (idx < buffer32.length) {
                        buffer32[idx] = value;
                    }
                }
            }
        }
    }

    ctx.putImageData(idata, 0, 0);
}

var toggle = true;
(function loop() {
    toggle = !toggle;
    if (toggle) {
        requestAnimationFrame(loop);
        return;
    }
    generate_noise(ctx);
    requestAnimationFrame(loop);
})();

const sources = document.querySelectorAll('#video source');
let currentSourceIndex = 0;
const videoElement = document.getElementById('video');


function switchVideoSource() {
    document.querySelector('#audio').play();
    currentSourceIndex = currentSourceIndex + 1;
    videoElement.src = sources[currentSourceIndex].src;
    videoElement.load(); // Reload video element with new source
    videoElement.play(); // Play video
}
document.querySelector('#power').addEventListener('click', () => {
    let video = document.querySelector('.video');
    let snow = document.querySelector('.snow');
    video.classList.toggle('active');
    videoElement.play();
    setTimeout(() => {
        let motionInstance = new Motion();
        motionInstance.initialize();
    },3000);
    setTimeout(() => {
        videoElement.play();
        snow.classList.toggle('active');
        switchVideoSource();
        setTimeout(() => {
            snow.classList.toggle('active');
        }, 400);
        fillCanvas();
        setTimeout(() => {
            snow.classList.toggle('active');
            switchVideoSource();
            setTimeout(() => {
                snow.classList.toggle('active');
            }, 400);
            createDynamicPeaceAndLove();
            setTimeout(() => {
                snow.classList.toggle('active');
                switchVideoSource();
                setTimeout(() => {
                    snow.classList.toggle('active');
                }, 400);
                video.classList.toggle('effect');
            },10000)
        },10000)
    },10000)
});
