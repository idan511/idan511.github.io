const obj = [];
const formulas = {
	linear: "x",
	inverse_linear: "1 - x",
	logistic: function(x0,l,k) {return l + "/(1+Math.pow(Math.e,(-" + k + "*(x-" + x0 + "))))";}
};
obj.addItem = function(object, property, unit, formula) {
	obj.push({
		object: object,
		property: property,
		unit: unit,
		formula: formula
	});
}
obj.addItem(document.getElementById("bigTitle"), "opacity", "", "1-3*x")
obj.addItem(document.getElementById("bigTitle"), "y", "vh", "-25*x")
window.addEventListener('scroll', function(e) {

	var x = document.body.scrollTop / window.innerHeight
	obj.forEach(function(item) {
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
  
});