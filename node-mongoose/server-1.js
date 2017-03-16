var mongoose = require('mongoose'),
assert = require('assert');

var Dishes = require('./models/dishes-1');

//Conection to URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
	//We'r connected
	console.log('connected  correctly to server');

	var newDish = Dishes({
		name: 'nombre del dish',
		description: 'Description del dish'
	});

	newDish.save(function(error){
		if(error) console.log(error);

		console.log('Dish saved correctly');

			//Get all dishes
		Dishes.find({}, function(err, dishes){
			if(err) throw err;

			//object with all dishes
			console.log(dishes);

			db.collection('dishes').drop(function(){
				db.close();
			});
		});
	});



});