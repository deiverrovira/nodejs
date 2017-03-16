var argv = require('/Users/deirovir/helios/application/helios-id/id_build/node_modules/yargs')
	.usage('Usage: node $0 --l=[num] --b=[num]')
	.demand(['l','b'])
	.argv;

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

solveRect(argv.l, argv.b);