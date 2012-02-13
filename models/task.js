var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;


var Task = module.exports = new Schema({
    name:String,
    description:String,
    points:Number,
    state:String
});

var TaskModel = exports.model = mongoose.model('Task', Task);

