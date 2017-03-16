var mongoose = require('mongoose'),
assert = require('assert');

var Promos = require('./models/promotion');

//Conection to URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
	//We'r connected
	console.log('connected correctly to server');

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

		db.collection('promos').drop(function(){
		db.close();
		});
	});
});