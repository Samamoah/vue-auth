var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    todo :{
        type : String,
        required : true
    },
    date :{
        type : Date,
        default : Date.now
    }

});

var Todo = module.exports = mongoose.model('Todo', todoSchema);





