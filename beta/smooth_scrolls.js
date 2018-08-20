const as = document.getElementsByTagName('a');
var pos_bar_lock = false;
const scroll_duration = 1;

for(let i=0;i<as.length;i++) {
  if(as[i].hash!=null) {
    as[i].onclick = function(event) {
      event.preventDefault();
      let target = document.getElementsByName(as[i].hash.substring(1,as[i].hash.length))[0];
      pos_bar_lock = true;
      updateScrollBar(i, scroll_duration) 
      scrollTo(target.offsetTop - 100, scroll_duration*1000, as[i].hash);   
      target.focus();
      return false;
    }
  }
}
    
function scrollTo(to, duration, names) {
    var element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date();
    
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    easeInOutQuad = function(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    },
    animateScroll = function() {
        var currentDate = +new Date();
        var currentTime = currentDate - startDate;
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
        if(currentTime < duration) {
            requestAnimationFrame(animateScroll);
        } else {
            window.location.hash = names;
            element.scrollTop = to;
            setTimeout(function(){pos_bar_lock = false;},5);
        }
    };
    animateScroll();
};




const buttons = document.getElementsByClassName("posbarMenuItem");
const points = [];
const pos_bar = document.createElement("div");

const transition_time = 0.3

//window.addEventListener('resize',setup)

function setup() {
  //set points array
  for(let i=0;i<buttons.length;i++) {
    let target = document.getElementsByName(buttons[i].hash.substring(1,buttons[i].hash.length))[0];
    points[i] = {
      x: buttons[i].getBoundingClientRect().left,
      width: Math.abs(buttons[i].getBoundingClientRect().left - buttons[i].getBoundingClientRect().right),
      target: target.getBoundingClientRect().top - 100
    }
  }
  console.log(points)
  //set posbar
  pos_bar.style.position = "fixed";
  pos_bar.style.top = (buttons[0].getBoundingClientRect().bottom - 5) + "px";
  pos_bar.style.left = points[0].x + "px";
  pos_bar.style.height = "2px";
  pos_bar.style.width = points[0].width + "px";
  pos_bar.style.background = "#ecf0f1"
  pos_bar.style.transformOrigin = "bottom left";
  pos_bar.style.zIndex = "3"
  updateScrollBar()
  setTimeout(function(){pos_bar.style.transition = "transform " + transition_time + "s, opacity " + transition_time + "s";},100)
  document.body.appendChild(pos_bar);
}

window.addEventListener('scroll', updateScrollBar);

function updateScrollBar(pos, posbar_dur) {
  let i=0;
  if(pos_bar_lock == true) {
    if(typeof pos != "number") {
      return false
    }
    if(posbar_dur != null) {
      pos_bar.style.transition = "transform " + posbar_dur + "s, opacity " + posbar_dur + "s";
    }
    i=pos;
  } else {
    while(i<points.length && document.body.scrollTop>points[i].target) {
      i++;
    }
  }
  if(document.body.scrollTop < 0 || i<=1) {
    pos_bar.style.transform = "translateX(0px) scaleX(1)"
    pos_bar.style.opacity = "0";
  } else if(i >= 4) {
    pos_bar.style.opacity = "1";
    pos_bar.style.transform = "translateX(" + (points[points.length-1].x - points[0].x) + "px) scaleX(" + (points[points.length-1].width / points[0].width) + ")"
  } else {
    /*let xa = (points[i-1].x - points[i].x)/(points[i].target - points[i-1].target)
    let xb = points[i].x - points[0].x
    let x = xa * document.body.scrollTop + xb
    console.log("xa:" + xa)
    console.log("xb:" + xb)
    console.log("x:" + x)
    pos_bar.style.transform = "translateX(" + x*-1 + "px)"*/
    pos_bar.style.opacity = "1";
    pos_bar.style.transform = "translateX(" + (points[i-1].x - points[0].x) + "px) scaleX(" + (points[i-1].width / points[0].width) + ")"
  }
  if(posbar_dur != null) {
    setTimeout(function(){pos_bar.style.transition = "transform " + transition_time + "s, opacity " + transition_time + "s";},posbar_dur*1000)
  }
}

setup();