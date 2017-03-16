var rect = require('./rectangle-1');

function solveRect(l,b) {
	console.log("solving for rectangle with Large " + l + " and base " + b);

	if(l<=0 || b<0){
		console.log("Those numbers should be greater than 0");
	}
	else {
		console.log("The area is : " + rect.area(l,b));
		console.log("The Perimeter is : " + rect.perimeter(l,b));
	}
}

solveRect(2,3);
solveRect(0,0);
solveRect(5,5);