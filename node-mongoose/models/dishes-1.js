var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema
var dishSchema = new Schema ({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

// the schema is useless so far
// we need to create a model in order to use it

var Dishes = mongoose.model('Dish', dishSchema);

//export this model

module.exports = Dishes;
