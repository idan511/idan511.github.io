var ringCanvas, wwg, r, ringC, calInterval, notiC=0, lastval=0;;

		var maxWeight = 110;
		var maxMass = 120;
		var spaceMod = 0.00002;

		var mass = "empty"
		var master = "empty"

		var t2g = [{//0
				"type" : "animate",
				"a" : "2",
				"b" : "0.5"
			},{//1
				"type" : "animate",
				"a" : "2",
				"b" : "0.5"
			},{//2
				"type" : "animate",
				"a" : "3",
				"b" : "1.5"
			},{//3
				"type" : "animate",
				"a" : "26",
				"b" : "22.90181"
			},{//4
				"type" : "animateTransform",
				"a" : "0 40.51025390624999,26.986976623535153",
				"b" : "36.59886932373047 40.51025390624999,26.986976623535153"
			},{//5
				"type" : "animate",
				"a" : "30.5",
				"b" : "39.01025"
			},{//6
				"type" : "animate",
				"a" : "20.84004",
				"b" : "18.76031"
			},{//7
				"type" : "animate",
				"a" : "9.33423",
				"b" : "16.45334"
			},{//8
				"type" : "animate",
				"a" : "2",
				"b" : "0.5"
			},{//9
				"type" : "animate",
				"a" : "2",
				"b" : "0.5"
			},{//10
				"type" : "animate",
				"a" : "2",
				"b" : "1.5"
			},{//11
				"type" : "animate",
				"a" : "31.98675",
				"b" : "29.73636"
			},{//12
				"type" : "animate",
				"a" : "2",
				"b" : "0.5"
			},{//13
				"type" : "animate",
				"a" : "2",
				"b" : "0.5"
			},{//14
				"type" : "animate",
				"a" : "2",
				"b" : "1.5"
			},{//15
				"type" : "animate",
				"a" : "36.97506",
				"b" : "36.50962"
			},{//16
				"type" : "animate",
				"a" : "2",
				"b" : "1.5"
			},{//17
				"type" : "animate",
				"a" : "2",
				"b" : "1.5"
			},{//18
				"type" : "animate",
				"a" : "4",
				"b" : "3"
			},{//19
				"type" : "animate",
				"a" : "28",
				"b" : "3"
			},{//20
				"type" : "animate",
				"a" : "18.01893",
				"b" : "43.07255"
			},{//21
				"type" : "animate",
				"a" : "28",
				"b" : "3"
			},{//22
				"type" : "animate",
				"a" : "2",
				"b" : "1.5"
			},{//23
				"type" : "animate",
				"a" : "2",
				"b" : "1.5"
			},{//24
				"type" : "animate",
				"a" : "4",
				"b" : "3"
			},{//25
				"type" : "animate",
				"a" : "42.07255",
				"b" : "43.07255"
			},{//26
				"type" : "animateTransform",
				"a" : "0 32.358543395996094,30.158100128173828",
				"b" : "118.7963752746582 32.358543395996094,30.158100128173828"
			},{//27
				"type" : "animate",
				"a" : "30.5",
				"b" : "30.85854"
			},{//28
				"type" : "animate",
				"a" : "27.64834",
				"b" : "23.91194"
			},{//29
				"type" : "animate",
				"a" : "9.33423",
				"b" : "12.49232"
			},{//30
				"type" : "animateTransform",
				"a" : "0 23.820972442626946,33.06591796875",
				"b" : "40.36664581298828 23.820972442626946,33.06591796875"
			},{//31
				"type" : "animate",
				"a" : "30.5",
				"b" : "22.32097"
			},{//32
				"type" : "animate",
				"a" : "34.19408",
				"b" : "24.9232"
			},{//33
				"type" : "animate",
				"a" : "9.33423",
				"b" : "16.28543"
			}
		];
		
		window.onresize = function(event) {
	    	//drawMGraph();
	    	setRing();
	    	drawRing(lastval);
	    	drawMassGraph();
		};

		shortcut.add("m", 
			function() { 
				iid("massLogger").value="";
				iid("loggerR").checked = "true";
				openSideBar();
				iid("massLogger").focus();
				iid("logFlash").beginElement();
			},
			{ 'disable_in_input':true}
		);
		shortcut.add("t", 
			function() { 
				if(!iid("homeR").checked)
					if(iid("tableViewButt").getAttribute("onclick")=="openTableView()") openTableView()
					else closeTableView()
				iid("tableFlash").beginElement();
			},
			{ 'disable_in_input':true}
		);
		shortcut.add("f", 
			function() { 
				iid("loggerR").checked = "true";
				openSideBar();
				iid("foodLogger").focus();
				iid("logFlash").beginElement();
			},
			{ 'disable_in_input':true}
		);
		shortcut.add("a", 
			function() { 
				iid("loggerR").checked = "true";
				openSideBar();
				iid("activityLogger").focus();
				iid("logFlash").beginElement();
			},
			{ 'disable_in_input':true}
		);
		shortcut.add("h", 
			function() { 
				iid("loggerR").checked = "true";
				openSideBar();
				iid("heightLogger").focus();
				iid("logFlash").beginElement();
			},
			{ 'disable_in_input':true}
		);
		shortcut.add("p", 
			function() { 
				iid("profileR").checked = "true";
				openSideBar();
				iid("proFlash1").beginElement();
				iid("proFlash2").beginElement();
				iid("proFlash3").beginElement();
			},
			{ 'disable_in_input':true}
		);
		shortcut.add("z", 
			function() { 
				iid("homeR").checked = "true";
				hideTableViewButt()
				iid("homeL").style.animation = "flash 1s cubic-bezier(.1,.8,.2,1)";
				elm = iid("homeL")
				var newone = elm.cloneNode(true);
				elm.parentNode.replaceChild(newone, elm);
				closeSideBar();
			},
			{ 'disable_in_input':true}
		);
		shortcut.add("x", 
			function() { 
				iid('tbmasterR').checked= "true";
				iid("masterR").checked = "true";
				revealTableViewButt()
				iid("masterL").style.animation = "flash 1s cubic-bezier(.1,.8,.2,1)";
				elm = iid("masterL")
				var newone = elm.cloneNode(true);
				elm.parentNode.replaceChild(newone, elm);
				closeSideBar();
			},
			{ 'disable_in_input':true}
		);
		shortcut.add("c", 
			function() { 
				iid('tbioR').checked= "true";
				iid("ioR").checked = "true";
				revealTableViewButt()
				iid("ioL").style.animation = "flash 1s cubic-bezier(.1,.8,.2,1)";
				elm = iid("ioL")
				var newone = elm.cloneNode(true);
				elm.parentNode.replaceChild(newone, elm);
				closeSideBar();
			},
			{ 'disable_in_input':true}
		);
		shortcut.add("v", 
			function() { 
				iid('tbmassR').checked = "true";
				iid("massR").checked = "true";
				revealTableViewButt()
				iid("massL").style.animation = "flash 1s cubic-bezier(.1,.8,.2,1)";
				elm = iid("massL")
				var newone = elm.cloneNode(true);
				elm.parentNode.replaceChild(newone, elm);
				closeSideBar();
			},
			{ 'disable_in_input':true}
		);
		shortcut.add("Esc", closeSideBar);

		window.onload = function() {
			/*iid("massLogForm").addEventListener("submit", function(event){
		    	event.preventDefault();
		    	iid("massLogger").disabled = true;
		    	closeSideBar();
		    	noti = newNotification("load", "Saving mass...")
		    	var xmlhttp2 = new XMLHttpRequest();
				xmlhttp2.onreadystatechange = function() {
		            if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
		                iid("massLogger").value = "";
		                iid("massLogger").disabled = false;
		                updateNotification(noti, "good", "Saved mass!")
		                getData()
		            }
		        }
		        xmlhttp2.open("GET", "acts/logMass.php?m=" + iid("massLogger").value, true);
		        xmlhttp2.send();
			});*/
			/*iid("foodLogForm").addEventListener("submit", function(event){
		    	event.preventDefault();
		    	iid("foodLogger").disabled = true;
		    	iid("foodHr").disabled = true;
		    	iid("foodMn").disabled = true;
		    	iid("foodCalories").disabled = true;
		    	closeSideBar();
		    	noti = newNotification("load", "Saving food...")
		    	var xmlhttp2 = new XMLHttpRequest();
				xmlhttp2.onreadystatechange = function() {
		            if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
		                iid("foodLogger").value = "";
		                iid("foodLogger").disabled = false;
		                iid("foodHr").value = new Date().getHours();
		                iid("foodHr").disabled = false;
		                iid("foodMn").value = new Date().getMinutes();
		                iid("foodMn").disabled = false;
		                iid("foodCalories").value = "";
		                iid("foodCalories").disabled = false;
		                updateNotification(noti, "good", "Added food!")
		                getData()
		            }
		        }
		        xmlhttp2.open("GET", "acts/logFood.php?f=" + iid("foodLogger").value + "&c=" + iid("foodCalories").value + "&th=" + iid("foodHr").value + "&tm=" + iid("foodMn").value, true);
		        xmlhttp2.send();
			});*/
			/*iid("forenameChangeForm").addEventListener("submit", function(event){
		    	event.preventDefault();
		    	iid("forenameChangeLogger").disabled = "true";
		    	var xmlhttp2 = new XMLHttpRequest();
				xmlhttp2.onreadystatechange = function() {
		            if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
		                iid("forenameChangeLogger").placeholder = iid("forenameChangeLogger").value;
		                iid("forenameChangeLogger").value = "";
		                closeSideBar();
		            }
		        }
		        xmlhttp2.open("GET", "acts/logMass.php?fn=" + iid("forenameChangeLogger").value, true);
		        xmlhttp2.send();
			});*/
	        ringCanvas = iid("calRing");
			ringC = ringCanvas.getContext('2d');
			setRing();
			drawRingBase(0);
			getData();
		}
		function iid(ayylmao) {
			return document.getElementById(ayylmao);
		}
		/*function drawMGraph() {
			var canvas = iid("masterGraph");
			canvas.width = Math.max((Math.floor(Date.now() / 1000) - weights[0][1])*spaceMod,iid("mainCard").clientWidth - 75);
			canvas.height = iid("mainCard").clientHeight - 124;
			hRatio = canvas.height / 2 / maxWeight;
			var c = canvas.getContext('2d');
			c.beginPath();
			c.strokeStyle = '#A7A7A7';
			c.moveTo(0, canvas.height/2);
			c.lineTo(canvas.width,canvas.height/2);
			c.stroke();

			c.beginPath();
			c.setLineDash([2, 4]);
			c.strokeStyle = '#A7A7A7';
			c.moveTo(0, canvas.height * 0.125);
			c.lineTo(canvas.width,canvas.height * 0.125);
			c.moveTo(0, canvas.height * 0.25);
			c.lineTo(canvas.width,canvas.height * 0.25);
			c.moveTo(0, canvas.height * 0.375);
			c.lineTo(canvas.width,canvas.height * 0.375);
			c.moveTo(0, canvas.height * 0.625);
			c.lineTo(canvas.width,canvas.height * 0.625);
			c.moveTo(0, canvas.height * 0.75);
			c.lineTo(canvas.width,canvas.height * 0.75);
			c.moveTo(0, canvas.height * 0.875);
			c.lineTo(canvas.width,canvas.height * 0.875);
			c.stroke();

			c.beginPath();
			c.fillStyle = '#30598A';
			c.moveTo(0, canvas.height/2 - weights[0][0]*hRatio);
			if(weights.length>=3) {
				for(i=1;i<weights.length-2;i++) {
					//c.lineTo((weights[i][1] - weights[0][1])*spaceMod,canvas.height/2 - weights[i][0]*hRatio);
					var xc = ((weights[i][1] - weights[0][1])*spaceMod + (weights[i+1][1] - weights[0][1])*spaceMod) / 2;
		      		var yc = (canvas.height/2 - weights[i][0]*hRatio + canvas.height/2 - weights[i+1][0]*hRatio) / 2;
		      		c.quadraticCurveTo((weights[i][1] - weights[0][1])*spaceMod, canvas.height/2 - weights[i][0]*hRatio, xc, yc);
				}
				c.quadraticCurveTo((weights[i][1] - weights[0][1])*spaceMod, canvas.height/2 - weights[i][0]*hRatio, (weights[i+1][1] - weights[0][1])*spaceMod, canvas.height/2 - weights[i+1][0]*hRatio);
			}
			else if(weights.length==2) {
				c.lineTo((weights[1][1] - weights[0][1])*spaceMod,canvas.height/2 - weights[1][0]*hRatio);
			}
			c.lineTo((weights[weights.length-1][1] - weights[0][1])*spaceMod,canvas.height/2);
			c.lineTo(0,canvas.height/2);
			c.closePath();
			c.fill();

			c.beginPath();
			c.setLineDash([10, 12]);
			c.strokeStyle = '#6D8F30';
			c.lineWidth = 2;
			c.moveTo(0, canvas.height/2 - 77.8*hRatio);
			c.lineTo(canvas.width,canvas.height/2 - 77.8*hRatio);
			c.stroke();
		}*/
		function drawMassGraph() {
			var canvas = iid("massGraph");
			canvas.width = iid("mainCard").clientWidth - 75
			canvas.height = iid("mainCard").clientHeight - 124;
			hRatio = canvas.height / maxMass;
			var c = canvas.getContext('2d');
			if(mass == "empty") {
				c.font         = (canvas.height / 9) + "px Avenir Next";
				c.fillStyle    = "#7f8c8d";
				c.textAlign    = "center";
				c.textBaseline = "middle"; 
				c.fillText("Not enough data", canvas.width/2, canvas.height/2); 
			} else {
				canvas.width = Math.max((Math.floor(Date.now() / 1000) - mass[0].time)*spaceMod,iid("mainCard").clientWidth - 75) + iid("mainCard").clientWidth/2;
				c.beginPath();
				c.strokeStyle = '#A7A7A7';
				c.moveTo(0, canvas.height);
				c.lineTo(canvas.width,canvas.height);
				c.stroke();

				c.beginPath();
				c.setLineDash([2, 4]);
				c.strokeStyle = '#A7A7A7';
				c.moveTo(0, canvas.height * 0.125);
				c.lineTo(canvas.width,canvas.height * 0.125);
				c.moveTo(0, canvas.height * 0.25);
				c.lineTo(canvas.width,canvas.height * 0.25);
				c.moveTo(0, canvas.height * 0.375);
				c.lineTo(canvas.width,canvas.height * 0.375);
				c.moveTo(0, canvas.height * 0.625);
				c.lineTo(canvas.width,canvas.height * 0.625);
				c.moveTo(0, canvas.height * 0.75);
				c.lineTo(canvas.width,canvas.height * 0.75);
				c.moveTo(0, canvas.height * 0.875);
				c.lineTo(canvas.width,canvas.height * 0.875);
				c.moveTo(0, canvas.height/2);
				c.lineTo(canvas.width,canvas.height/2);
				c.stroke();

				c.beginPath();
				c.setLineDash([1, 0]);
				c.strokeStyle = '#56A9F6';
				c.lineWidth = 4;
				c.moveTo(0, canvas.height - mass[0].mass*hRatio);
				if(mass.length>=3) {
					for(i=1;i<mass.length-2;i++) {
						//c.lineTo((mass[i][1] - mass[0][1])*spaceMod,canvas.height/2 - mass[i][0]*hRatio);
						var xc = ((mass[i].time - mass[0].time)*spaceMod + (mass[i+1].time - mass[0].time)*spaceMod) / 2;
			      		var yc = (canvas.height - mass[i].mass*hRatio + canvas.height - mass[i+1].mass*hRatio) / 2;
			      		c.quadraticCurveTo((mass[i].time - mass[0].time)*spaceMod, canvas.height - mass[i].mass*hRatio, xc, yc);
					}
					c.quadraticCurveTo((mass[i].time - mass[0].time)*spaceMod, canvas.height - mass[i].mass*hRatio, (mass[i+1].time - mass[0].time)*spaceMod, canvas.height - mass[i+1].mass*hRatio);
				}
				else if(mass.length==2) {
					c.lineTo((mass[1].time - mass[0].time)*spaceMod,canvas.height - mass[1].mass*hRatio);
				}
				c.stroke();

				c.beginPath();
				c.setLineDash([10, 12]);
				c.strokeStyle = '#6D8F30';
				c.lineWidth = 2;
				c.moveTo(0, canvas.height - 77.8*hRatio);
				c.lineTo(canvas.width,canvas.height - 77.8*hRatio);
				c.stroke();
			}
		}
		function openSideBar() {
			iid("mainCard").dataset.state = "disbld";
			iid("closer").style.display = "block";
		}
		function closeSideBar() {
			document.activeElement.blur();
			iid("mainCard").dataset.state = "norm";
			iid("closer").style.display = "none";
		}
		function updateConf() {
			var xmlhttp = new XMLHttpRequest();
	        xmlhttp.open("GET", "acts/updateConfig.php?c=" + iid("birthDay").value + "~" + iid("birthMonth").value + "~" + iid("birthYear").value + "~" + iid("progLen").value + "~" + iid("goalBMI").value, true);
	        xmlhttp.send();
		}
		function drawRingBase(ayy) {
			ringC.lineWidth    = s / 8 + ringCanvas.width/50;
		  	ringC.strokeStyle  = '#dee2e3';
			ringC.beginPath();
			ringC.arc(ringCanvas.width / 2, ringCanvas.width / 2, ringCanvas.width / 2 - ringCanvas.width / 16 - ringCanvas.width/50, 0, 2* Math.PI);
			ringC.stroke();
			if(!isNaN(ayy*(master[master.length-1].output-wwg*1100))) {
				ringC.fillText(Math.round(ayy*(master[master.length-1].output-wwg*1100)) + " / " + Math.round(master[master.length-1].output-wwg*1100), ringCanvas.width/2, ringCanvas.height/2); 
			} else {
				ringC.fillText("0/0", ringCanvas.width/2, ringCanvas.height/2); 
			}
		}
		function drawRing(ayy) {
			ringC.clearRect(0, 0, ringCanvas.width, ringCanvas.width);
			drawRingBase(ayy);
			ringC.lineWidth    = s / 8;
		  	ringC.strokeStyle  = '#27ae60';
			ringC.beginPath();
			ringC.arc(ringCanvas.width / 2, ringCanvas.width / 2, ringCanvas.width / 2 - ringCanvas.width / 16 - ringCanvas.width/50, -1 * Math.PI / 2, (ayy * 2 - 0.5) * Math.PI);
			ringC.stroke();
		}
		function animateRing(duration, start, stop) {
			window.clearInterval(calInterval);
		  	var i = 0;
		  	calInterval = setInterval(function() {
		    	lastval = elastic(i) * (stop - start) + start;
		    	drawRing(lastval);
		    	i += 1 / (duration * 60);
		    	if (i >= 1) {
			      	window.clearInterval(calInterval);
			      	drawRing(stop);
			      	lastval = stop;
			    }
		  	}, 1000 / 60);
		}
		function setRing() {
			if(window.innerWidth / window.innerHeight > 504 / 605) {
				s = Math.min(ringCanvas.parentElement.clientWidth/2- ringCanvas.parentElement.clientHeight /10,ringCanvas.parentElement.clientHeight * 0.9);
			} else {
				s = ringCanvas.parentElement.clientWidth - ringCanvas.parentElement.clientHeight /10;
			}

		  	ringCanvas.width   = s;
		  	ringCanvas.height  = s;
		  	ringC.lineCap      = "round";
		  	ringC.font         = (s / 9) + "px Avenir Next";
			ringC.fillStyle    = "#7f8c8d";
			ringC.textAlign    = "center";
			ringC.textBaseline = "middle"; 
		}

		function ease(t) {
			return t<.5 ? 2*t*t : -1+(4-2*t)*t;
		}
		function elastic(t) {
  			return t<.6 ? 2.83*t*t : 1-0.68121*(t-1)*(t-1)*Math.cos(29.8451*(t-2));
		}

		function revealTableViewButt() {
			iid("menu").classList.add("on");
		}
		function hideTableViewButt() {
			iid("menu").classList.remove("on");
			if(iid("tableViewButt").getAttribute("onclick")=="closeTableView()") closeTableView();
		}

		function closeNotification(el) {
			if(el.dataset.isclosing == "false") {
				el.dataset.isclosing = "true";
				animate(el, [["height",64,0,"px"],["margin-bottom",5,0,"px"]], .4, function() {el.parentElement.removeChild(el);});
			}
		}

		function animate(el, attr, duration, callback) {
			var i = 0;
			var notiInterval = setInterval(function() {
				str = "";
				for(x=0;x<attr.length;x++) {
					str += attr[x][0] + ":" + (ease(i) * (attr[x][2] - attr[x][1]) + attr[x][1]) + attr[x][3] + ";";
				}
				el.setAttribute("style", str);
				i += 1 / (duration * 60);
				if (i >= 1) {
					window.clearInterval(notiInterval);
				    for(x=0;x<attr.length;x++) {
						str += attr[x][0] + ":" + ((attr[x][2] - attr[x][1]) + attr[x][1]) + attr[x][3] + ";";
					}
					el.setAttribute("style", str);
					callback();
				}
			}, 1000 / 60);

		}

		function newNotification(type, content) {
			var noti = document.createElement('div');
			noti.setAttribute("onclick","closeNotification(this)");
			noti.setAttribute("data-isclosing","true");
			noti.setAttribute("id","noti" + notiC++);
			noti.innerHTML = '<div data-type="' + type + '">' + content + '</div>';
			iid("notifications").appendChild(noti);
			animate(noti, [["height",0,64,"px"],["margin-bottom",0,5,"px"]], .4, function() {});
			setTimeout(function(){
				noti.dataset.isclosing = "false";
			}, 10);
			if(type!="load") {
				setTimeout(function(){
					closeNotification(noti);
				}, 3000);
			}
			return noti;
		}
		function updateNotification(noti, type, content) {
			noti.innerHTML = '<div data-type="' + type + '">' + content + '</div>';
			if(type!="load") {
				setTimeout(function(){
					closeNotification(noti);
				}, 3000);
			}
		}
		function getData() {
			//Get user Data
			var xp = '{"status":"ok","first_name":"John","last_name":"Doe","email":"john@example.com","bday":"1995-12-26","goalBMI":"24","progLength":"50","mass":[{"time":1440716400,"mass":"97.3"},{"time":1440737776,"mass":"97.1"},{"time":1440738705,"mass":"97.1"},{"time":1440766033,"mass":"95.7"},{"time":1440873294,"mass":"96.2"},{"time":1446031882,"mass":"95.9"},{"time":1446080299,"mass":"97.1"},{"time":1446101576,"mass":"96.7"},{"time":1446164278,"mass":"97.6"},{"time":1446201825,"mass":"96.4"},{"time":1446379495,"mass":"95.9"},{"time":1535023167,"mass":"85"}],"master":[{"date":"2015-08-27","mass":"97.3","height":"180","input":0,"activity":0},{"date":"2015-08-28","mass":"95.7","height":"180","input":"420","activity":0},{"date":"2015-08-29","mass":"96.2","height":"180","input":0,"activity":0},{"date":"2015-10-28","mass":"95.9","height":"180","input":0,"activity":0},{"date":"2015-10-29","mass":"96.7","height":"180","input":0,"activity":0},{"date":"2015-10-30","mass":"96.4","height":"180","input":0,"activity":0},{"date":"2015-11-01","mass":"95.9","height":"180","input":0,"activity":0},{"date":"2018-08-23","mass":"85","height":"180","input":"568","activity":0}],"date":"2018-08-23"}'
			//var xp = new XMLHttpRequest();
			//xp.onreadystatechange = function() {
		        //if (xp.readyState == 4 && xp.status == 200) {
		        	setTimeout(function(){
						iid("loadCard").style.transform = "translateX(0px)";
						iid("mainCard").style.transform = "translateX(0px)";
						iid("cancon").scrollLeft = iid("cancon").scrollWidth;
					}, 1000);
					setTimeout(function(){
						iid("mainCard").style.transition = "-webkit-transform 0.4s, -webkit-filter 0.4s";
					}, 2010);
		            r = JSON.parse(xp)
		            if(r.status = "ok") {
			            var picker = new Pikaday({
							field: iid('birthdayChangeLogger'),
							format: 'D / M / YY',
							position: 'bottom right'
						});
						iid('birthdayChangeLogger').placeholder = moment(r.bday).format('D / M / YY')
						iid("forenameChangeLogger").placeholder = r.first_name
						iid("surnameChangeLogger").placeholder = r.last_name
						iid("emailChangeLogger").placeholder = r.email
						iid("goalBMIChangeLogger").placeholder = r.goalBMI
						iid("progLenChangeLogger").placeholder = r.progLength
						master = r.master
						mass = r.mass
						if(master != "empty") {
							wwg = (mass[0].mass - Math.pow(r.master[r.master.length-1].height/100,2)*r.goalBMI)/r.progLength
							iid("wwg").innerText = wwg.toFixed(3)
							iid("dwg").innerText = (wwg/7).toFixed(3)
							iid("wcg").innerText = Math.round(wwg*7700)
							iid("dcg").innerText = Math.round(wwg*1100)
							drawMassGraph()
							createMassTable()
							completeMaster()
							createMasterTable()
							setTimeout(function(){
								animateRing(1.7, lastval, master[master.length-1].input/(master[master.length-1].output-wwg*1100));
							}, 1250);
							iid("avaSpan").innerText = Math.round(r.master[r.master.length-1].available)
							iid("massSpan").innerText = mass[mass.length-1].mass
							iid("heightSpan").innerText = r.master[r.master.length-1].height/100
							iid("BMISpan").innerText = (r.master[r.master.length-1].BMI).toFixed(1)
						}
						iid("foodHr").value = new Date().getHours();
						iid("foodMn").value = new Date().getMinutes();
						iid("actHr").value = new Date().getHours();
						iid("actMn").value = new Date().getMinutes();
					}
		        //}
		    //}
		    //xp.open("POST", "acts/getUserData.php", true);
		    //xp.send();
		}

		function openTableView() {
			//for(i=1;i<=16;i++) {
			i=0;
			while(iid("t2g" + i)) {
				if(t2g[i].type=="animate") {
					iid("t2g" + i).setAttribute("values",t2g[i].a + ";" + t2g[i].b)
				}
				if(t2g[i].type=="animateTransform") {
					iid("t2g" + i).setAttribute("from",t2g[i].a)
					iid("t2g" + i).setAttribute("to",t2g[i].b)
				}
				iid("t2g" + i).beginElement();
				i++
			}
			iid("masterTableView").classList.add("tableViewTrue");
			//iid("menu").classList.add("shadow");
			iid("tableViewButt").setAttribute("onclick","closeTableView()");
			document.querySelector(".radioTabs:checked+.tabs").classList.add("blur");
		}
		function closeTableView() {
			//for(i=1;i<=16;i++) {
			i=0;
			while(iid("t2g" + i)) {
				if(t2g[i].type=="animate") {
					iid("t2g" + i).setAttribute("values",t2g[i].b + ";" + t2g[i].a)
				}
				if(t2g[i].type=="animateTransform") {
					iid("t2g" + i).setAttribute("from",t2g[i].b)
					iid("t2g" + i).setAttribute("to",t2g[i].a)
				}
				iid("t2g" + i).beginElement();
				i++
			}
			iid("masterTableView").classList.remove("tableViewTrue");
			//iid("menu").classList.remove("shadow");
			iid("tableViewButt").setAttribute("onclick","openTableView()")
			document.querySelector(".radioTabs:checked+.tabs").classList.remove("blur");
		}

		function completeMaster() {
			//current: date, height, mass, input, activity
			//to add: -output-, -available-, -total-, -BMR-, -BMI-, -goal mass-, -goal diff-
			for(var i in master) {
				master[i].BMR = 10*master[i].mass+6.25*(master[i].height)-5*moment(master[i].date).diff(moment(r.bday), 'years', true)+5;
				master[i].BMI = master[i].mass/Math.pow(master[i].height/100,2)
				master[i].goal_mass = Math.pow(master[i].height/100,2)*r.goalBMI
				master[i].goal_diff = master[i].mass - master[i].goal_mass
				master[i].output = master[i].BMR + master[i].activity
				master[i].total = master[i].input - master[i].output
				master[i].available = (master[i].total + wwg*1100)*-1
			}
			console.log(master)
		}
		function createMassTable() {
			iid("massTbl").innerHTML = '<tr class="tblH"><th>Time</th><th>Mass</th><th>Daily Minimum</th></tr>'
			count = 0, j=0;
			lastDay = new Date(mass[0].time*1000)
			lastDay = moment(lastDay).format("L")
			min = mass[0].mass;
			for(var i in mass) {
				var leRow = document.createElement('tr');
				dt = new Date(mass[i].time*1000)
				if(lastDay!=moment(dt).format("L")) {
					iid("dm" + (i-count)).innerText = master[j].mass
					iid("dm" + (i-count)).setAttribute("rowspan",count);
					count=0;
					j++;
					lastDay = moment(dt).format("L");
				}
				leRow.innerHTML = "<td>" + moment(dt).format('lll') + "</td><td>" + mass[i].mass + "</td>" + ((count == 0) ? "<td id='dm" + i + "' class='" + ((j%2==0) ? "lite" : "dark") + "'></td>" : "");
				count++;
				iid("massTbl").appendChild(leRow);
			}
			iid("dm" + (i-count+1)).innerText = master[j].mass
		}

		function createMasterTable() {
			iid("masterTbl").innerHTML = '<tr class="tblH"><th>Date</th><th>Mass</th><th>Height</th><th>Input</th><th>Activity</th><th>Output</th><th>Available</th><th>Total</th><th>Weekly Total</th><th>BMR</th><th>BMI</th><th>Goal Mass</th><th>Goal Diff.</th></tr>'
			for(var i in master) {
				var leRow = document.createElement('tr');
				leRow.innerHTML = "<td>" + moment(master[i].date).format('D / M') + "</td><td>" + master[i].mass + "</td><td>" + master[i].height/100 + "</td><td>" + Math.round(master[i].input) + "</td><td>" + Math.round(master[i].activity) + "</td><td>" + Math.round(master[i].output) + "</td><td>" + Math.round(master[i].available) + "</td><td>" + Math.round(master[i].total) + "</td><td>" + "to come" + "</td><td>" + Math.round(master[i].BMR) + "</td><td>" + master[i].BMI.toFixed(1) + "</td><td>" + master[i].goal_mass.toFixed(1) + "</td><td>" + master[i].goal_diff.toFixed(1) + "</td>";
				iid("masterTbl").appendChild(leRow);
			}
		}