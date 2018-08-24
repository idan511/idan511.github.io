const obj = [];
const formulas = {
	linear: "x",
	inverse_linear: "1 - x",
	logistic: function(x0,l,k) {return l + "/(1+Math.pow(Math.e,(-" + k + "*(x-" + x0 + "))))";}
};
obj.addItem = function(object, property, unit, formula, position) {
	obj.push({
		object: object,
		property: property,
		unit: unit,
		formula: formula,
		position: position
	});
}
obj.addItem(document.getElementById("bigTitle"), "opacity", "", "1-3*x", 0)
obj.addItem(document.getElementById("bigTitle"), "y", "vh", "-25*x", 0)
obj.addItem(document.getElementById("aboutmearticle"), "opacity", "", "2.7+3*x", 1)
obj.addItem(document.getElementById("porfolioh"), "opacity", "", "4+4*x", 1)
obj.addItem(document.getElementById("apa"), "opacity", "", "4+4*x", 1)
document.querySelectorAll(".gallery>a, .contact>*").forEach(function(it) {
	obj.addItem(it, "opacity", "", "3.5+4*x", 1)
})
//obj.addItem(document.getElementById("portfolio"), "opacity", "", "2.8+3*x", 1)
//obj.addItem(document.getElementById("projects"), "opacity", "", "2.8+3*x", 1)
window.addEventListener('scroll', function(e) {
	obj.forEach(function(item) {
		var x;
		if(item.position==1) {
			x = (document.body.scrollTop - item.object.offsetTop) / window.innerHeight;
		} else {
			x = document.body.scrollTop / window.innerHeight;
		}
		
		//console.log(item.object.id + ": " + item.object.offsetTop)
		if(item.property=="opacity") {
			item.object.style.opacity = eval(item.formula);
		}
		if(item.property == "y"){
			let patt = /(?:translateY\()([^\)]*)(?:\))/;
			if(patt.test(item.object.style.transform)) {
				item.object.style.transform = item.object.style.transform.replace(patt, "translateY(" + eval(item.formula) + item.unit + ")")
			} else {
				item.object.style.transform += " translateY(" + eval(item.formula) + item.unit + ")";
			}
		}
		if(item.property == "x"){
			let patt = /(?:translateX\()([^\)]*)(?:\))/;
			if(patt.test(item.object.style.transform)) {
				item.object.style.transform = item.object.style.transform.replace(patt, "translateX(" + eval(item.formula) + item.unit + ")")
			} else {
				item.object.style.transform += " translateX(" + eval(item.formula) + item.unit + ")";
			}
		}
		if(item.property == "scale") {
			let patt = /(?:scale\()([^\)]*)(?:\))/;
			if(patt.test(item.object.style.transform)) {
				item.object.style.transform = item.object.style.transform.replace(patt, "scale(" + eval(item.formula) + item.unit + ")")
			} else {
				item.object.style.transform += " scale(" + eval(item.formula) + item.unit + ")";
			}
		}
	});
	if(document.body.scrollTop / window.innerHeight > 0.18) {
		document.getElementById("menu").style.backgroundColor = "";
		document.getElementById("menu").style.boxShadow = "";
		document.body.style.background = ""
	} else {
		document.getElementById("menu").style.backgroundColor = "rgba(0,0,0,0)";
		document.getElementById("menu").style.boxShadow = "none";
		document.body.style.background = "black"
	}
});
if(document.body.scrollTop / window.innerHeight > 0.18) {
	document.getElementById("menu").style.backgroundColor = "";
	document.getElementById("menu").style.boxShadow = "";
	document.body.style.background = ""
} else {
	document.getElementById("menu").style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById("menu").style.boxShadow = "none";
	document.body.style.background = "black"
}