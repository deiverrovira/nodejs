var mongoose = require('mongoose'),
assert = require('assert');

var Dishes = require('./models/dishes');
var Promos = require('./models/promotion');
var Leaders = require('./models/leader');


//Conection to URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
	//We'r connected
	console.log('connected correctly to server');

	//Creacion de Dish
	Dishes.create({
		name: 'nombre del dish',
		image: 'etc/imagen.jpg',
		category: 'category1',
		label:'',
		price: '49999.966',
		description: 'Description del dish',
		comments: [
					{
						rating: 1,
						comment: 'comentario 1',
						author: 'Autor de comentario 1'
					}
				]
	}, function(err, dish){
		if(err) throw err;

		console.log('Dish created');
		console.log(dish);
		var id = dish._id;

		db.collection('dishes').drop(function(){
		db.close();
		});
	});

	//Creacion de Promos
	Promos.create({
		name: 'nombre del promotion',
		image: 'etc/imagen.jpg',
		label:'',
		price: '49999.966',
		description: 'Description del promotion'
	}, function(err, promo){
		if(err) throw err;

		console.log('Promo created');
		console.log(promo);

		db.collection('dishes').drop(function(){
		db.close();
		});
	});

	//Creacion de Leaders
	Leaders.create({
		name: 'nombre del Leader',
		image: 'etc/imagen.jpg',
		destination:'destination',
		abbr: 'DEST',
		description: 'Description del leader'
	}, function(err, lead){
		if(err) throw err;

		console.log('Leader created');
		console.log(lead);

		db.collection('dishes').drop(function(){
		db.close();
		});
	});
});