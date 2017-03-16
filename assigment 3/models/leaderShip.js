var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//create a schema
var leaderSchema = new Schema ({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	destination: {
		type: String,
		required: true
	},
	abbr: {
		type: String,
		required: true
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

var Leaders = mongoose.model('Leader', leaderSchema);

//export this model

module.exports = Leaders;
