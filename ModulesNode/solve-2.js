var rect = require('./rectangle-2');

function solveRect(l,b) {
	console.log("solving for rectangle with Large " + l + " and base " + b);

	rect(l,b,function (err,rectangle){
		if(err){
			console.log(err);
		}
		else {
			console.log("this is the result for Area from Callback " + rectangle.area());
			console.log("PERIMETER from Callback " + rectangle.perimeter());
		}
	});	
};

solveRect(2,3);
solveRect(0,0);
solveRect(5,5);