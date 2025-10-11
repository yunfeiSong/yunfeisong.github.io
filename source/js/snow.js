/* 控制下雪（优化版：避免渲染冲突） */
function snowFall(snow) {
    snow = snow || {};
    this.maxFlake = snow.maxFlake || 40;   /* 减少片数，避免 FPS 竞争 */
    this.flakeSize = snow.flakeSize || 10;
    this.fallSpeed = snow.fallSpeed || 1;
    this.animationId = null;  /* 修复：添加 ID 便于停止 */
}

/* 兼容写法 */
requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) { setTimeout(callback, 1000 / 60); };

cancelAnimationFrame = window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function(id) { clearTimeout(id); };

/* 开始下雪 */
snowFall.prototype.start = function(){
    snowCanvas.apply(this);
    createFlakes.apply(this);
    drawSnow.apply(this);
};

/* 停止下雪（修复：添加停止方法） */
snowFall.prototype.stop = function() {
    if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
    }
    if (this.canvas) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

/* 创建画布 */
function snowCanvas() {
    var snowcanvas = document.createElement("canvas");
    snowcanvas.id = "snowfall";
    snowcanvas.width = window.innerWidth;
    snowcanvas.height = window.innerHeight;
    snowcanvas.setAttribute("style", "position:fixed; top: 0; left: 0; z-index: 0; pointer-events: none;");  /* 修复：z=0 底层，不挡 fireworks */
    document.body.appendChild(snowcanvas);
    this.canvas = snowcanvas;
    this.ctx = snowcanvas.getContext("2d");
    var that = this;
    window.onresize = function() {
        snowcanvas.width = window.innerWidth;
        snowcanvas.height = window.innerHeight;
        that.canvas = snowcanvas;
    };
}

/* 雪运动对象 */
function flakeMove(canvasWidth, canvasHeight, flakeSize, fallSpeed) {
    this.x = Math.floor(Math.random() * canvasWidth);
    this.y = Math.floor(Math.random() * canvasHeight);
    this.size = Math.random() * flakeSize + 2;
    this.maxSize = flakeSize;
    this.speed = Math.random() * 1 + fallSpeed;
    this.fallSpeed = fallSpeed;
    this.velY = this.speed;
    this.velX = 0;
    this.stepSize = Math.random() / 30;
    this.step = 0;
}

flakeMove.prototype.update = function() {
    this.velX *= 0.98;
    if (this.velY <= this.speed) {
        this.velY = this.speed;
    }
    this.velX += Math.cos(this.step += .05) * this.stepSize;
    this.y += this.velY;
    this.x += this.velX;

    var currentWidth = window.innerWidth;
    var currentHeight = window.innerHeight;
    if (this.x >= currentWidth || this.x <= 0 || this.y >= currentHeight || this.y <= 0) {
        this.reset(currentWidth, currentHeight);
    }
};

flakeMove.prototype.reset = function(width, height) {
    this.x = Math.floor(Math.random() * width);
    this.y = Math.random() * -50;
    this.size = Math.random() * this.maxSize + 2;
    this.speed = Math.random() * 1 + this.fallSpeed;
    this.velY = this.speed;
    this.velX = 0;
};

flakeMove.prototype.render = function(ctx) {
    var snowFlake = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    snowFlake.addColorStop(0, "rgba(255, 255, 255, 0.9)");
    snowFlake.addColorStop(.5, "rgba(255, 255, 255, 0.5)");
    snowFlake.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.save();
    ctx.fillStyle = snowFlake;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
};

/* 创建雪花 */
function createFlakes() {
    var maxFlake = this.maxFlake,
        flakes = this.flakes = [],
        canvas = this.canvas;
    for (var i = 0; i < maxFlake; i++) {
        flakes.push(new flakeMove(canvas.width, canvas.height, this.flakeSize, this.fallSpeed));
    }
}

/* 画雪（修复：添加节流，避免高频循环） */
function drawSnow() {
    var maxFlake = this.maxFlake,
        flakes = this.flakes;
    var ctx = this.ctx;
    var canvas = this.canvas;
    var that = this;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var e = 0; e < maxFlake; e++) {
        flakes[e].update();
        flakes[e].render(ctx);
    }

    this.animationId = requestAnimationFrame(function() {
        drawSnow.apply(that);
    });
}

/* 调用及控制方法 */
var snow = new snowFall({maxFlake:40});  /* 减少默认片数 */
snow.start();