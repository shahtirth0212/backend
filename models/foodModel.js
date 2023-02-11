const mongoose = require('mongoose');

const foodItemSchema = mongoose.Schema({
    itemName : String,
    itemPrice : Number,
    itemType:String,
    isSpecial:Boolean,
    isSpicy:Boolean,
    ingredients:Array
});


module.exports = mongoose.model('items',foodItemSchema);