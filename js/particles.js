// function motion() {
//     var c;
//     var $;
//     var w;
//     var h;
//     var u = 0;
//     var msdn = true;
//     var ms = {
//         x: 199,
//         y: 0
//     };
//
//     var grav = 0.02;
//     var rng = 20;
//     var nrng = rng * rng;
//     var den = 2.5;
//     var frc = 1;
//     var nfrc = 1;
//     var pli = 30;
//     var gnum = 18;
//     var gs = 1 / (398 / gnum);
//
//     var parts;
//     var nparts;
//     var nxt;
//     var nnxt;
//     var cnt;
//     var _frc;
//     var grd;
//
//     this.set = function() {
//         c = document.getElementById("canv");
//         $ = c.getContext('2d');
//         w = c.width = 398;
//         h = c.height = 334;
//
//         parts = []
//         nparts = 0;
//         nxt = [];
//         nnxt = 0;
//         grd = [];
//
//         var i, j;
//         for (i = 0; i < gnum; i++) {
//             grd[i] = new Array(gnum);
//             for (j = 0; j < gnum; j++) {
//                 grd[i][j] = new Grid();
//             }
//         }
//         cnt = 0;
//
//         c.addEventListener('mousemove', function(e) {
//             ms.x = e.layerX || e.offsetX;
//             ms.y = e.layerY || e.offsetY;
//         }, false);
//
//         c.addEventListener('touchmove', function(e) {
//             ms.x = e.touches[0].layerX || e.offsetX;
//             ms.y = e.touches[0].layerY || e.offsetY;
//             e.preventDefault();
//         }, false);
//
//         c.addEventListener('mousedown', function(e) {
//             e.preventDefault();
//             msdn = true;
//         }, false);
//         c.addEventListener('touchdown', function(e) {
//             e.preventDefault();
//             msdn = true;
//         }, false);
//
//         c.addEventListener('mouseup', function(e) {
//             e.preventDefault();
//             msdn = false;
//         }, false);
//         c.addEventListener('touchend', function(e) {
//             e.preventDefault();
//             msdn = false;
//         }, false);
//         c.addEventListener('mouseout', function(e) {
//             e.preventDefault();
//             msdn = false;
//             clear();
//         }, false);
//
//         run();
//     }
//
//     function run() {
//         window.requestAnimationFrame(run);
//         upd();
//     }
//
//     var upd = function() {
//         clear();
//         if (msdn) {
//             fall();
//         }
//         mv();
//     }
//
//     var fall = function() {
//         var i;
//         for (i = -6; i <= 6; i++) {
//             parts[nparts++] = new P(ms.x + i * 10, ms.y,
//                 Math.floor(cnt / 10 % 5));
//             parts[nparts - 1].vy = 5;
//
//             if (nparts >= 1000) {
//                 parts.shift();
//                 nparts--;
//             }
//         }
//     }
//     var mv = function() {
//         cnt++;
//
//         gupd();
//         fnxt();
//         calc();
//         var i, p;
//
//         for (i = 0; i < nparts; i++) {
//             p = parts[i];
//             mvp(p);
//             $.fillStyle = 'hsla(' + i + ',95%,50%,1)';
//             $.fillRect(p.x - 1, p.y - 1, 3, 3);
//         }
//     }
//
//     var gupd = function() {
//         var p;
//         var i, j;
//
//         for (i = 0; i < gnum; i++) {
//             for (j = 0; j < gnum; j++) {
//                 grd[i][j].parts.length = 0;
//                 grd[i][j].nparts = 0;
//             }
//         }
//         for (i = 0; i < nparts; i++) {
//             p = parts[i];
//             p.fx = 0;
//             p.fy = 0;
//             p.den = 0;
//             p.nden = 0;
//             p.gx = Math.floor(p.x * gs);
//             p.gy = Math.floor(p.y * gs);
//
//             if (p.gx < 0) {
//                 p.gx = 0;
//             }
//             if (p.gy < 0) {
//                 p.gy = 0;
//             }
//             if (p.gx > gnum - 1) {
//                 p.gx = gnum - 1;
//             }
//             if (p.gy > gnum - 1) {
//                 p.gy = gnum - 1;
//             }
//         }
//     }
//     var fnxt = function() {
//         var i;
//         var p;
//         nnxt = 0;
//
//         for (i = 0; i < nparts; i++) {
//             p = parts[i];
//             var minX = p.gx != 0;
//             var maxX = p.gx != (gnum - 1);
//             var minY = p.gy != 0;
//             var maxY = p.gy != (gnum - 1);
//             locnxt(p, grd[p.gx][p.gy]);
//
//             if (minX) {
//                 locnxt(p, grd[p.gx - 1][p.gy]);
//             }
//             if (maxX) {
//                 locnxt(p, grd[p.gx + 1][p.gy]);
//             }
//             if (minY) {
//                 locnxt(p, grd[p.gx][p.gy - 1]);
//             }
//             if (maxY) {
//                 locnxt(p, grd[p.gx][p.gy + 1]);
//             }
//             if (minX && minY) {
//                 locnxt(p, grd[p.gx - 1][p.gy - 1]);
//             }
//             if (minX && maxY) {
//                 locnxt(p, grd[p.gx - 1][p.gy + 1]);
//             }
//             if (maxX && minY) {
//                 locnxt(p, grd[p.gx + 1][p.gy - 1]);
//             }
//             if (maxX && maxY) {
//                 locnxt(p, grd[p.gx + 1][p.gy + 1]);
//             }
//             grd[p.gx][p.gy].add(p);
//         }
//     }
//
//     var locnxt = function(pi, g) {
//         var j;
//
//         var jarr, dist;
//         for (j = 0; j < g.nparts; j++) {
//
//             jarr = g.parts[j];
//             dist = (pi.x - jarr.x) * (pi.x - jarr.x) +
//                 (pi.y - jarr.y) * (pi.y - jarr.y);
//
//             if (dist < nrng) {
//                 if (nxt.length == nnxt) {
//                     nxt[nnxt] = new Nxt();
//                 }
//                 nxt[nnxt++].setP(pi, jarr);
//             }
//         }
//     }
//
//     var calc = function() {
//         var i;
//         for (i = 0; i < nnxt; i++) {
//             nxt[i].calc();
//         }
//     }
//     var mvp = function(p) {
//         p.vy += grav;
//
//         if (p.den > 0) {
//             p.vx += p.fx / (p.den * 0.9 + 0.1);
//             p.vy += p.fy / (p.den * 0.9 + 0.1);
//         }
//         p.x += p.vx;
//         p.y += p.vy;
//
//         if (p.x < 5) {
//             p.vx += (5 - p.x) * 0.5 - p.vx * 0.5;
//         }
//         if (p.x > 398) {
//             p.vx += (398 - p.x) * 0.5 - p.vx * 0.5;
//         }
//         if (p.y < 5) {
//             p.vy += (5 - p.y) * 0.5 - p.vy * 0.5;
//         }
//         if (p.y > 398) {
//             p.vy += (398 - p.y) * 0.5 - p.vy * 0.5;
//         }
//     }
//
//     var clear = function() {
//         c.width = c.width
//     }
// }
//
// function Nxt() {
//     this.p1;
//     this.p2;
//     this.dist;
//     this.nx;
//     this.ny;
//     this.wgt;
//     this.rng = 20;
//     this.frc = 1;
//     this.nfrc = 1;
//     this.den = 2.5;
//     this.pli = 0.1;
//
//     this.setP = function(p1, p2) {
//         this.p1 = p1;
//         this.p2 = p2;
//         this.nx = p1.x - p2.x;
//         this.ny = p1.y - p2.y;
//         this.dist = Math.sqrt(this.nx * this.nx + this.ny * this.ny);
//         this.wgt = 1 - this.dist / this.rng;
//         var den = this.wgt * this.wgt;
//
//         p1.den += den;
//         p2.den += den;
//
//         den *= this.wgt * this.nfrc;
//
//         p1.nden += den;
//         p2.nden += den;
//
//         var invd = 1 / this.dist;
//         this.nx *= invd;
//         this.ny *= invd;
//     }
//
//     this.calc = function() {
//         var p;
//         var p1 = this.p1;
//         var p2 = this.p2;
//
//         if (this.p1.sort != this.p2.sort) {
//             p = (p1.den + p2.den - this.den * 1.5) * this.frc;
//         } else {
//             p = (p1.den + p2.den - this.den * 2) * this.frc;
//         }
//
//         var pn = (p1.nden + p2.nden) * this.nfrc;
//         var pwgt = this.wgt * (p + this.wgt * pn);
//         var pliwgt = this.wgt * this.pli;
//         var fx = this.nx * pwgt;
//         var fy = this.ny * pwgt;
//
//         fx += (p2.vx - p1.vx) * pliwgt;
//         fy += (p2.vy - p1.vy) * pliwgt;
//
//         p1.fx += fx;
//         p1.fy += fy;
//
//         p2.fx -= fx;
//         p2.fy -= fy;
//     }
// }
//
// function P(x, y, sort) {
//     var u = 0;
//     this.x = x;
//     this.y = y;
//
//     this.gx;
//     this.gy;
//     this.vx = 0;
//     this.vy = 0;
//     this.fx = 0;
//     this.fy = 0;
//
//     this.den;
//     this.nden;
//
//     this.sort = sort;
//     this.grav = 0.05;
// }
//
// function Grid() {
//     this.parts = new Array();
//     this.nparts = 0;
//     this.add = function(p) {
//         this.parts[this.nparts++] = p;
//     }
// }
// var mot = new motion();
// mot.set();


export class Motion {
    constructor() {
        this.c = null;
        this.$ = null;
        this.w = 0;
        this.h = 0;
        this.u = 0;
        this.msdn = true;
        this.ms = { x: 199, y: 0 };

        this.grav = 0.02;
        this.rng = 20;
        this.nrng = this.rng * this.rng;
        this.den = 2.5;
        this.frc = 1;
        this.nfrc = 1;
        this.pli = 30;
        this.gnum = 18;
        this.gs = 1 / (398 / this.gnum);

        this.parts = [];
        this.nparts = 0;
        this.nxt = [];
        this.nnxt = 0;
        this.grd = [];
        this.cnt = 0;
    }

    initialize() {
        this.c = document.getElementById("canv");
        this.$ = this.c.getContext('2d');
        this.w = this.c.width = 398;
        this.h = this.c.height = 334;

        this.parts = [];
        this.nparts = 0;
        this.nxt = [];
        this.nnxt = 0;
        this.grd = [];

        for (let i = 0; i < this.gnum; i++) {
            this.grd[i] = [];
            for (let j = 0; j < this.gnum; j++) {
                this.grd[i][j] = new Grid();
            }
        }
        this.cnt = 0;

        // Event listeners for mouse and touch interactions
        this.setupEventListeners();

        this.run();
    }

    setupEventListeners() {
        this.c.addEventListener('mousemove', (e) => {
            this.ms.x = e.layerX || e.offsetX;
            this.ms.y = e.layerY || e.offsetY;
        }, false);

        this.c.addEventListener('touchmove', (e) => {
            this.ms.x = e.touches[0].layerX || e.offsetX;
            this.ms.y = e.touches[0].layerY || e.offsetY;
            e.preventDefault();
        }, false);

        this.c.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.msdn = true;
        }, false);
        this.c.addEventListener('touchdown', (e) => {
            e.preventDefault();
            this.msdn = true;
        }, false);

        this.c.addEventListener('mouseup', (e) => {
            e.preventDefault();
            this.msdn = false;
        }, false);
        this.c.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.msdn = false;
        }, false);
        this.c.addEventListener('mouseout', (e) => {
            e.preventDefault();
            this.msdn = false;
            this.clear();
        }, false);
    }

    run() {
        window.requestAnimationFrame(() => this.run());
        this.upd();
    }

    upd() {
        this.clear();
        if (this.msdn) {
            this.fall();
        }
        this.mv();
    }

    fall() {
        for (let i = -6; i <= 6; i++) {
            this.parts[this.nparts++] = new P(this.ms.x + i * 10, this.ms.y, Math.floor(this.cnt / 10 % 5));
            this.parts[this.nparts - 1].vy = 5;

            if (this.nparts >= 1000) {
                this.parts.shift();
                this.nparts--;
            }
        }
    }

    mv() {
        this.cnt++;

        this.gupd();
        this.fnxt();
        this.calc();

        for (let i = 0; i < this.nparts; i++) {
            let p = this.parts[i];
            this.mvp(p);
            this.$.fillStyle = 'hsla(' + i + ',95%,50%,1)';
            this.$.fillRect(p.x - 1, p.y - 1, 3, 3);
        }
    }

    gupd() {
        for (let i = 0; i < this.gnum; i++) {
            for (let j = 0; j < this.gnum; j++) {
                this.grd[i][j].parts.length = 0;
                this.grd[i][j].nparts = 0;
            }
        }
        for (let i = 0; i < this.nparts; i++) {
            let p = this.parts[i];
            p.fx = 0;
            p.fy = 0;
            p.den = 0;
            p.nden = 0;
            p.gx = Math.floor(p.x * this.gs);
            p.gy = Math.floor(p.y * this.gs);

            if (p.gx < 0) p.gx = 0;
            if (p.gy < 0) p.gy = 0;
            if (p.gx > this.gnum - 1) p.gx = this.gnum - 1;
            if (p.gy > this.gnum - 1) p.gy = this.gnum - 1;
        }
    }

    fnxt() {
        this.nnxt = 0;

        for (let i = 0; i < this.nparts; i++) {
            let p = this.parts[i];
            let minX = p.gx !== 0;
            let maxX = p.gx !== (this.gnum - 1);
            let minY = p.gy !== 0;
            let maxY = p.gy !== (this.gnum - 1);
            this.locnxt(p, this.grd[p.gx][p.gy]);

            if (minX) this.locnxt(p, this.grd[p.gx - 1][p.gy]);
            if (maxX) this.locnxt(p, this.grd[p.gx + 1][p.gy]);
            if (minY) this.locnxt(p, this.grd[p.gx][p.gy - 1]);
            if (maxY) this.locnxt(p, this.grd[p.gx][p.gy + 1]);
            if (minX && minY) this.locnxt(p, this.grd[p.gx - 1][p.gy - 1]);
            if (minX && maxY) this.locnxt(p, this.grd[p.gx - 1][p.gy + 1]);
            if (maxX && minY) this.locnxt(p, this.grd[p.gx + 1][p.gy - 1]);
            if (maxX && maxY) this.locnxt(p, this.grd[p.gx + 1][p.gy + 1]);

            this.grd[p.gx][p.gy].add(p);
        }
    }

    locnxt(pi, g) {
        for (let j = 0; j < g.nparts; j++) {
            let jarr = g.parts[j];
            let dist = (pi.x - jarr.x) ** 2 + (pi.y - jarr.y) ** 2;

            if (dist < this.nrng) {
                if (this.nxt.length === this.nnxt) {
                    this.nxt[this.nnxt] = new Nxt();
                }
                this.nxt[this.nnxt++].setP(pi, jarr);
            }
        }
    }

    calc() {
        for (let i = 0; i < this.nnxt; i++) {
            this.nxt[i].calc();
        }
    }

    mvp(p) {
        p.vy += this.grav;

        if (p.den > 0) {
            p.vx += p.fx / (p.den * 0.9 + 0.1);
            p.vy += p.fy / (p.den * 0.9 + 0.1);
        }
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 5) {
            p.vx += (5 - p.x) * 0.5 - p.vx * 0.5;
        }
        if (p.x > 398) {
            p.vx += (398 - p.x) * 0.5 - p.vx * 0.5;
        }
        if (p.y < 5) {
            p.vy += (5 - p.y) * 0.5 - p.vy * 0.5;
        }
        if (p.y > 398) {
            p.vy += (398 - p.y) * 0.5 - p.vy * 0.5;
        }
    }

    clear() {
        this.c.width = this.c.width;
    }
}

class Grid {
    constructor() {
        this.parts = [];
        this.nparts = 0;
    }

    add(p) {
        this.parts[this.nparts++] = p;
    }
}

class Nxt {
    constructor() {
        this.p1 = null;
        this.p2 = null;
        this.dist = 0;
        this.nx = 0;
        this.ny = 0;
        this.wgt = 0;
        this.rng = 20;
        this.frc = 1;
        this.nfrc = 1;
        this.den = 2.5;
        this.pli = 0.1;
    }

    setP(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.nx = p1.x - p2.x;
        this.ny = p1.y - p2.y;
        this.dist = Math.sqrt(this.nx * this.nx + this.ny * this.ny);
        this.wgt = 1 - this.dist / this.rng;

        let den = this.wgt * this.wgt;
        p1.den += den;
        p2.den += den;
        den *= this.wgt * this.nfrc;
        p1.nden += den;
        p2.nden += den;

        let invd = 1 / this.dist;
        this.nx *= invd;
        this.ny *= invd;
    }

    calc() {
        let p;
        if (this.p1.sort !== this.p2.sort) {
            p = (this.p1.den + this.p2.den - this.den * 1.5) * this.frc;
        } else {
            p = (this.p1.den + this.p2.den - this.den * 2) * this.frc;
        }

        let pn = (this.p1.nden + this.p2.nden) * this.nfrc;
        let pwgt = this.wgt * (p + this.wgt * pn);
        let pliwgt = this.wgt * this.pli;
        let fx = this.nx * pwgt + (this.p2.vx - this.p1.vx) * pliwgt;
        let fy = this.ny * pwgt + (this.p2.vy - this.p1.vy) * pliwgt;

        this.p1.fx += fx;
        this.p1.fy += fy;
        this.p2.fx -= fx;
        this.p2.fy -= fy;
    }
}

class P {
    constructor(x, y, sort) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.fx = 0;
        this.fy = 0;
        this.den = 0;
        this.nden = 0;
        this.sort = sort;
        this.gx = 0;
        this.gy = 0;
        this.grav = 0.05;
    }
}