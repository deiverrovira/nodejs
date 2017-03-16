var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

//create a schema
var dishSchema = new Schema ({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	label: {
		type: String,
		required: false
	},
	price: { 
		type: Currency 
	},
	description: {
		type: String,
		required: true
	},
	 comments: [commentSchema]
}, {
	timestamps: true
});

// the schema is useless so far
// we need to create a model in order to use it

var Dishes = mongoose.model('Dish', dishSchema);

//export this model

module.exports = Dishes;
