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
	console.log('connected correctly to server');

	Dishes.create({
		name: 'nombre del dish',
		description: 'Description del dish'
	}, function(err, dish){
		if(err) throw err;

		console.log('Dish created');
		console.log(dish);
		var id = dish._id;

		//Set a timeout 
		setTimeout(function(){		
			Dishes.findByIdAndUpdate(id, {
				$set:{
					description: 'nueva description'
				}
			},{
				//Esta propiedad regresa el dish despues de ser actualizado, de no tenerla, devuelve el antiguo valor
				new: true
			})
			//Exec, emula el comportamiento del callback
			.exec(function(error, dish){
				if(error) throw error;

				console.log('Dish updated!!');
				console.log(dish);

				db.collection('dishes').drop(function(){
					db.close();
				});

			});
		}, 3000);
	});
});