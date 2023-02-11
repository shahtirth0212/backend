const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    order:Array,
    total:Number,
    tableNumber:Number,
    isServed:Boolean,
    isPaymentDone:Boolean,
    paymentType:String,
    disableButtons:Boolean,
    note:String
});
module.exports = mongoose.model('orders',orderSchema);
