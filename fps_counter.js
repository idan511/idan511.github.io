
//fps calculator
const times = [];
let fps;
if(location.hostname != "idanalper.in") {
    var fpsCounteObject = document.createElement("div");
    fpsCounteObject.style.position = "fixed";
    fpsCounteObject.style.top = "5px";
    fpsCounteObject.style.right = "5px";
    fpsCounteObject.style.fontFamily = "arial";
    fpsCounteObject.style.direction = "ltr";
    var fpsCounteMeter = document.createElement("meter");
    fpsCounteMeter.min = 0;
    fpsCounteMeter.max = 90;
    fpsCounteMeter.low = 30;
    fpsCounteMeter.high = 45;
    fpsCounteMeter.optimum = 60;
    var fpsCounteLabel = document.createElement("span");
    fpsCounteObject.appendChild(fpsCounteLabel);
    fpsCounteObject.appendChild(fpsCounteMeter);
    document.body.appendChild(fpsCounteObject);
    fpsCounteLabel.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
    fpsCounteLabel.style.color = "white"
    refreshLoop()
}

function refreshLoop() {
  window.requestAnimationFrame(() => {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    fpsCounteMeter.value = fps;
    fpsCounteLabel.innerText = fps;
    refreshLoop();
  });
}

