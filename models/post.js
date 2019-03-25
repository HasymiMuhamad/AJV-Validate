const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    dataTitle : { type : String, required : true, maxlength: 100},
    dataContent : { type : String, required : true},
    dataWriter : { type : String, required : true, maxlength: 100},
    image : { type : String, required : false}

})

module.exports = mongoose.model('Posting', postSchema);