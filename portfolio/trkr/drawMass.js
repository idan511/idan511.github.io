onmessage = function(e) {
var canvas = e.data[0];
			canvas.width = /*Math.max((Math.floor(Date.now() / 1000) - weights[0][1])*spaceMod,*/e.data[1] - 75/*);*/
			canvas.height = e.data[2] - 124;
			hRatio = canvas.height / 2 / maxWeight;
			var c = canvas.getContext('2d');
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

			/*c.beginPath();
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
			c.fill();*/

			c.beginPath();
			c.setLineDash([10, 12]);
			c.strokeStyle = '#6D8F30';
			c.lineWidth = 2;
			c.moveTo(0, canvas.height/2 - 77.8*hRatio);
			c.lineTo(canvas.width,canvas.height/2 - 77.8*hRatio);
			c.stroke();
			close();
		}