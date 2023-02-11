const mongoose = require('mongoose');
const allDataSchema = mongoose.Schema({
    orderDate:{
        type:Date,
        default:Date.now
    },
    tableNumber:Number,
    orderTotal:Number,
    paymentType:String

});
module.exports = mongoose.model('allData',allDataSchema);