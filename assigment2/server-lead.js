var mongoose = require('mongoose'),
assert = require('assert');

var Leaders = require('./models/leader');

//Conection to URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
	//We'r connected
	console.log('connected correctly to server');

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

		db.collection('leaders').drop(function(){
		db.close();
		});
	});
});