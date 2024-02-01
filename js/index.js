import {fillCanvas} from "./flowerManager";
import {createDynamicPeaceAndLove} from "./peace";
import {domIsReady} from "./pattern";
import {Motion} from "./particles.js";

const sources = document.querySelectorAll('#video source');
let currentSourceIndex = 0;
const videoElement = document.getElementById('video');


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
document.querySelector('.button3').addEventListener('click', () => {
    var gl = Object.create(glitch_exec);
    gl.DELAY_BETWEEN_GLITCHES = 0;
    gl.GLITCH_RENDER_COUNT = 20;
    gl.GLITCH_INTERVAL_MIN = 10;
    gl.GLITCH_INTERVAL_MAX = 50;
    gl.GLITCH_INTERVAL_PROGRESSIVE = 0;
    gl.start(document.body);
});


// document.querySelector('.button3').addEventListener('click', () => {
//   audio();
//   switchVideoSource()
//   document.querySelector('#video').play() ;
// });




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



function switchVideoSource() {
    document.querySelector('#audio').play();
    currentSourceIndex = currentSourceIndex + 1;
    videoElement.src = sources[currentSourceIndex].src;
    videoElement.load(); // Reload video element with new source
    videoElement.play(); // Play video
}

function audio() {
    var video = document.querySelector('.video video');
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var source = audioContext.createMediaElementSource(video);
    var reverb = audioContext.createConvolver();
    var impulseResponseLength = 2 * audioContext.sampleRate;
    var impulseResponse = audioContext.createBuffer(2, impulseResponseLength, audioContext.sampleRate);
    for (var channel = 0; channel < impulseResponse.numberOfChannels; channel++) {
        var bufferData = impulseResponse.getChannelData(channel);
        for (var i = 0; i < impulseResponseLength; i++) {
            bufferData[i] = Math.random() * 2 - 1;
        }
    }

    reverb.buffer = impulseResponse;

    source.connect(reverb);
    reverb.connect(audioContext.destination);

    video.addEventListener('timeupdate', function() {
        audioContext.currentTime = video.currentTime;
    });
}

window.onload = function() {
    let tele = document.querySelector('#tele');
    tele.style.transition = 'transform 2s ease-in-out';
    const circle = document.getElementById('circle');
    setTimeout(() => {
        circle.style.opacity = '0';
    }, 1000);
    tele.style.opacity = 1;
    setTimeout(() => {
        tele.style.transform = 'scale(1)';
    }, 1000);
}
let powerClicked = false;

function removeAllCanvases() {
    var canvases = document.querySelectorAll('canvas');
    let flowers = document.querySelector('#flowerCanvas');
    flowers.parentNode.removeChild(flowers);
    canvases.forEach(function(canvas) {
        canvas.parentNode.removeChild(canvas);
    });
}
document.querySelector('#power').addEventListener('click', () => {
    powerClicked = !powerClicked;
    if(powerClicked) {
        let video = document.querySelector('.video');
        let snow = document.querySelector('.snow');
        video.classList.toggle('active');
        videoElement.play();
        setTimeout(() => {
            video.classList.toggle('effect');
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
                    let motionInstance = new Motion();
                    motionInstance.initialize();
                    setTimeout(() => {
                        snow.classList.toggle('active');
                        setTimeout(() => {
                            snow.classList.toggle('active');
                        }, 400);
                        domIsReady();
                        audio();
                        document.querySelectorAll('.overlay').forEach(overlay => {
                            overlay.classList.toggle('blendMode');
                        });
                        switchVideoSource();

                        setTimeout(() => {
                            removeAllCanvases();
                            var gl = Object.create(glitch_exec);
                            gl.DELAY_BETWEEN_GLITCHES = 0;
                            gl.GLITCH_RENDER_COUNT = 20;
                            gl.GLITCH_INTERVAL_MIN = 10;
                            gl.GLITCH_INTERVAL_MAX = 50;
                            gl.GLITCH_INTERVAL_PROGRESSIVE = 0;
                            gl.start(document.body);
                            var averageGlitchInterval = (gl.GLITCH_INTERVAL_MIN + gl.GLITCH_INTERVAL_MAX) / 2;
                            var totalGlitchDuration = averageGlitchInterval * gl.GLITCH_RENDER_COUNT;

                            setTimeout(() => {
                                document.getElementById('topScreen').classList.add('animate');
                                document.getElementById('bottomScreen').classList.add('animate');
                                setTimeout(() => {
                                    location.reload();
                                }, 3000);
                            }, totalGlitchDuration);
                        }, 10000);
                    },10000);
                },10000)
            },10000)
        },10000)
    }else{
        location.reload();
    }
});
