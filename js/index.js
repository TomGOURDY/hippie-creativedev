document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 1000); // 1000 milliseconds = 1 second
    });
});

document.querySelector('.button1').addEventListener('click', () => {
    let snow = document.querySelector('.snow');
    snow.classList.toggle('active');
    setTimeout(() => {
        snow.classList.toggle('active');
    }, 300); // 1000 milliseconds = 1 second
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
