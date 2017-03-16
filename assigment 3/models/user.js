var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Me permite utilizar mertodos especializados
var passportLocalMongoose = require('passport-local-mongoose');


//create a schema
var User = new Schema ({
	username: String,
	password: String,
	//Al momento de crear un usuario tendra el rol de admin false por defecto
	admin: {
		type: Boolean,
		default: false
	}	
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);