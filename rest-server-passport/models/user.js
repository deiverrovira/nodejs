var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Me permite utilizar mertodos especializados
var passportLocalMongoose = require('passport-local-mongoose');


//create a schema
var User = new Schema ({
	username: String,
	password: String,
	OauthId: String,
    OauthToken: String,
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
	//Al momento de crear un usuario tendra el rol de admin false por defecto
	admin: {
		type: Boolean,
		default: false
	}	
});

User.plugin(passportLocalMongoose);

User.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};

module.exports = mongoose.model('User', User);