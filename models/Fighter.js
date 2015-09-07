// Fighter model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FighterSchema = new Schema({
	firstname: String,
	lastname: String,
	record: {
		wins: String,
		losses: String,
		draws: String,
		nocontests: String
	},

	nextfight: String
	//set to remove that ugly __v key in mongo


},

	{ versionKey: false }
);

module.exports = mongoose.model('Fighter', FighterSchema);