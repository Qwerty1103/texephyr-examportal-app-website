const mongoose = require('mongoose');
const { Schema } = mongoose;

const PsuedoCodeSchema = new Schema({
	userId: {
		type: String,
		required: true
	},
	responses: [
		{
			questionId: {
				type: Number,
				required: true
			},
			answer: {
				type: String,
				required: false
			}
		}
	]
})

module.exports = PsuedoCodeSchema;