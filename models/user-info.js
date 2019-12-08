const Joi = require('joi');
const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema({

 		employeeId: { type: String, required: true},
 		name: { type:String, required: true },
		score: { type:Number, required: true },
		rank: {type: Number, default:0 }
 });

 const User = mongoose.model("User", userSchema);
 
 function validateUser(user) {
 	const schema = {
 		employeeId: Joi.string().required(),
 		name: Joi.string().required(),
 		score: Joi.number().required(),
 		rank: Joi.number()
 	}
 	return Joi.validate(user, schema);
 }
 exports.User = User;
 exports.validateUser = validateUser;