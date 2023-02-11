const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    mobile:String,
    ingredients:Array
});
module.exports = mongoose.model('userData',userSchema);
