var canvas = document.getElementById("bgcanvas");
var bubble_animation_toggle = true;

// Get the device pixel ratio, falling back to 1.
var dpr = window.devicePixelRatio || 1;
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

function setupCanvas(can) {
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  can.width = window.innerWidth * dpr;
  can.height = window.innerHeight * dpr;
  can.style.display = "";
  var ctx = can.getContext('2d');
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  //ctx.scale(dpr, dpr);
  return ctx;
}

var c = setupCanvas(canvas)
//setup dpr c commands
c.lineToDpr = function (x,y) {
	c.lineTo(x*dpr,y*dpr)
};
c.moveToDpr = function (x,y) {
	c.moveTo(x*dpr,y*dpr)
};
c.arcDpr = function (x,y,r,d1,d2) {
	c.arc(x*dpr,y*dpr,r*dpr,d1,d2)
};
c.quadraticCurveToDpr = function (x1,y1,x2,y2) {
	c.quadraticCurveTo(x1*dpr,y1*dpr,x2*dpr,y2*dpr)
};
var bk = 0.1; //baseline spring characteristic
var nk = 0.1; //neighbor spring characteristic
var m = 1; //line mass
var f = 0; //friction (very dangerous!!)
var vLimit = 200; //velocity limit
var vDecay = 0.9; // velocity decay
var position = "bottom";
var dots = function() {return canvas.width/10;}; //no. of physics points (less is faster) OR type canvas.width for true size
var screenRatio = function() {return canvas.width/(dots()+1);};
var bubbleRealeseThreshold = 2; //at this velocity bubbles will be released
var animation; // <- probably should delete this
var botDprHeight = function() {return canvas.height / dpr;};
var baseline = function() {return botDprHeight() / 10;}; //base height
var abRate;
var ogWidth = canvas.width;

window.addEventListener('resize', function(e) {
  if(ogWidth<canvas.width) {
    setup();
    toggleAutoBubble(false);
    abRate /= 5.5;
    toggleAutoBubble(true);
    ogWidth = canvas.width;
  }
});

const lines = [];
const particles = [];

function setup() {
  //fill line array
  for(var i=0;i<=dots()+1;i++) {
    if(lines[i] == null) {
      lines[i] = {
        x: baseline(),  //position
        v: 0,         //velocity
        constForce: 0,//magic constant force
        constX: null  //even morw magic fixed position (currently unused)
      }
    }
  }
  //calculate ms per bubble
  abRate = 800000/canvas.width
  //abRateL.innerHTML = abRate.value+'ms'
}

function newParticle(size, ex) {
  return particles.push({
    size: size,
    v: {spd: 0, dir: 0}, // TODO: add physics to bubbles
    a: {acc: 0, dir: 0}, // TODO: "   "       "  "
    x: ex,        // x coordinate
    y: baseline(),  // y coordinate
    o: 0, //TODO: animate opacity
    phase: 0
    /*
    phase 0 - birth - bubble is growing & bound by a line
    phase 1 - life - bubble is decaying & floating freely
    */
  });
}

function animate() {
  //set sizes
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  c.clearRect(0,0,canvas.width,canvas.height)

  c.beginPath();
  
  //calculate liquid
  /*
  every x coordinate is defined by a line. each line has 5 forces acting on it:
   - lF -> left line force, pulling left neighbor line closer
   - rF -> left line force, pulling right neighbor line closer
   - bF -> is a part of total force (tF), pulling each line towards the baseline height
   - fF -> basically drag, is VERY unstable
   - constForce -> a property of each line. it's a magical force!
  lF, rF & bF operate by hook's law
  fF operates by the drag equation
  
  also velocity is decaying linearly. It's a more stable alternative to drag.
  */
  for(var i=0;i<lines.length;i++) {
    if(lines[i].constX == null) {
      lF = nk * ((i > 0 ? lines[i-1].x : baseline()) - lines[i].x)
      rF = nk * ((i < lines.length-1 ? lines[i+1].x : baseline()) - lines[i].x)
      tF = (baseline() - lines[i].x)*bk + lF + rF + lines[i].constForce;
      fF = lines[i].v == 0 ? 0 : ((lines[i].v > 0 ? -1 : 1)*f*lines[i].v*lines[i].v);
      tF += fF;
      a = tF/m;
      lines[i].v += a;
      lines[i].v *= vDecay;
      if(lines[i].v > vLimit)    {lines[i].v = vLimit}
      if(lines[i].v < -1*vLimit) {lines[i].v = -1*vLimit}
      //lines[i].x += lines[i].v;
    } else {
      lines[i].x = lines[i].constX;
    }
  }
  //render liquid
  switch(position) {
      case "top":
        c.moveToDpr(0, 0);
        break;
      case "bottom":
        c.moveToDpr(0,botDprHeight())
        break;
  }
  for(var i=0;i<lines.length;i++) {
    lines[i].x += lines[i].v;
    
    //if there aren't anough points for the entire screen the fill gaps with curves
    if(lines.length == canvas.width+1) {
      switch(position) {
        case "top":
          //c.moveToDpr(i,0);
          c.lineToDpr(i,lines[i].x)
        break;
        case "bottom":
          //c.moveToDpr(i,canvas.height);
          c.lineToDpr(i,botDprHeight() - lines[i].x)
        break;
      }
    } else {
      switch(position) {
        case "top":
          if(i==0) {
            c.lineToDpr(i, lines[i].x);
          } else if(i<lines.length - 2) {
            var xc = ((i + i+1) / 2)*screenRatio();
            var yc = (lines[i].x + lines[i + 1].x) / 2;
            c.quadraticCurveToDpr(i*screenRatio(), lines[i].x, xc, yc);
          } else {
            c.quadraticCurveToDpr((lines.length-2)*screenRatio(), lines[lines.length-2].x, (lines.length)*screenRatio(),lines[lines.length-1].x);
          }
        break;
        case "bottom":
          if(i==0) {
            c.lineToDpr(i, botDprHeight() - lines[i].x);
          } else if(i<lines.length - 2) {
            var xc = ((i + i+1) / 2)*screenRatio();
            var yc = (lines[i].x + lines[i + 1].x) / 2;
            c.quadraticCurveToDpr(i*screenRatio(), botDprHeight() - lines[i].x, xc, botDprHeight() - yc);
          } else {
            c.quadraticCurveToDpr((lines.length-2)*screenRatio(), botDprHeight() - lines[lines.length-2].x, (lines.length)*screenRatio(),botDprHeight() - lines[lines.length-1].x);
          }
        break;
      }
    }
  }
  
  switch(position) {
    case "top":
      c.lineToDpr(canvas.width,0)
      c.lineToDpr(0,0)
      break;
    case "bottom":
      c.lineToDpr(canvas.width,botDprHeight())
      c.lineToDpr(0,botDprHeight())
      break;
  }
  
  c.strokeStyle = "#ecf0f1";
  c.fillStyle = "#ecf0f1"
  c.shadowBlur = 20;
  c.shadowColor = "#ecf0f1";
  c.shadowOffsetY = -10*dpr;
  //c.filter = 'blur(0px)';
  
  //c.stroke();
  c.fill();
  c.closePath();
  
  //render particles
  c.beginPath();
  
  for(var i=0;i<particles.length;i++) {
    if(particles[i].phase == 1) {
      //phase 1 movement. TODO: add physics to bubbles
      particles[i].size-=0.07;
      particles[i].opacity = particles[i].size;
      particles[i].y+=1;
    }
    if(particles[i].phase == 1 && particles[i].size<=0.5) {
      //if particle is to small, get rid of it
      particles.splice(i,1);
    }
    if(particles[i] != null) {// <- making sure if we didn't remove the last particle in the array
      switch(position) {
        case "top":
          c.moveToDpr((particles[i].x)*screenRatio(),(particles[i].y - particles[i].size));
          c.arcDpr((particles[i].x)*screenRatio(),(particles[i].y - particles[i].size),particles[i].size/2,0,2*Math.PI);
          break;
        case "bottom":
          c.moveToDpr((particles[i].x)*screenRatio(),(botDprHeight() - (particles[i].y - particles[i].size)));
          c.arcDpr((particles[i].x)*screenRatio(),(botDprHeight() - (particles[i].y - particles[i].size)),particles[i].size/2,0,2*Math.PI);
          break;
      }
    }
  }
  
  //c.strokeStyle = "blue";
  c.fillStyle = "#ecf0f1ee"
  c.shadowBlur = 10;
  //c.shadowColor = "blue";
 // c.filter = 'blur(5px)'; seems like filters aren't supported enough, I'll leave them out for a while.
  c.shadowOffsetY = 0;
  c.fill();
  c.closePath();
  
  if(bubble_animation_toggle) {
    animation = requestAnimationFrame(animate);
  }
}

function frame() {requestAnimationFrame(animate);}

function randomInt(min,max){return Math.floor(Math.random()*(max-min+1)+min);}

function randbub() {
  //generate random bubble (ex, size, time)
  blowBubble(randomInt(0,lines.length-1), randomInt(5,10), randomInt(5,8));
}

//timing functions
Math.easeOutCubic = function (t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t + 1) + b;
};

function blowBubble(ex, size, time, cc, bubble) {
  //bubble generation
  //setting up counter & a new particle
  if(cc==null) {cc=0;}
  if(bubble==null) {bubble = particles[newParticle(size, ex)-1];}
  
  //calculate bubble size & force
  for(var i=ex;i<=ex;i++) {
    bubble.y = lines[i].x;
    bubble.size = Math.easeOutCubic(cc, 0, size, time*10);
    lines[i].constForce = bubble.size;
    cc++;
  }
  //on animtion end or downward velocity, detach and float bubble (phase=1)
  if(lines[ex].constForce >= size || lines[ex].v<-bubbleRealeseThreshold) {
    lines[ex].constForce = 0;
    bubble.phase = 1;
    return "done!";
  } else {
    setTimeout(blowBubble,10,ex,size,time,cc,bubble)
  }
}


var abInterval;
function toggleAutoBubble(test) {
  if(test) {
    console.log("Autobubble started with rate of " + Math.round(1000/abRate) + "b/s")
    abInterval = setInterval(randbub, abRate);
  } else {
    console.log("Autobubble stopped")
    clearInterval(abInterval);
  }
}

function toggleAnimation(toggle) {
  if(toggle!=null) {
    if(toggle==bubble_animation_toggle) {
      return bubble_animation_toggle;
    } else {
      bubble_animation_toggle = toggle;
    }
  } else {
    bubble_animation_toggle = bubble_animation_toggle==true ? false : true;
  }
  if(bubble_animation_toggle) {
      animate();
  }
  return bubble_animation_toggle;
}

window.addEventListener('scroll', function() {
  if(document.body.scrollTop > canvas.height) {
    if(bubble_animation_toggle) {
      console.log("Bubble animation: " + toggleAnimation(false))
      toggleAutoBubble(false)
    }
  } else if(bubble_animation_toggle!=true){
    console.log("Bubble animation: " + toggleAnimation(true))
    toggleAutoBubble(true)
  }
});

setup();
animate();
toggleAutoBubble(true);
setTimeout(function(){
  abRate /= 5.5;
  if(bubble_animation_toggle==true) {
    toggleAutoBubble(false);
    toggleAutoBubble(true);
  }
},2800);

