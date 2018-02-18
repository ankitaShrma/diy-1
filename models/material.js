var mongoose = require('mongoose');

//path and originalname are the fields stored in mongoDB
var imageSchema = mongoose.Schema({
name: String,
price: Number,
department: String,
info: String,
myimage: String,

/* path: {
 type: String,
 required: true,
 trim: true
 },
 originalname: {
 type: String,
 required: true
 }*/
 
},{ runSettersOnQuery: true });
 
 
var Material = module.exports = mongoose.model('Material', imageSchema);
 
 module.exports.getImages = function(callback, limit) {
 
 Material.find(callback).limit(limit);
}