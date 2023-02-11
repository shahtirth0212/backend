// Importing packages
const express = require('express');
const router = express.Router();
const currentOrder = require('../models/orderModel');
const allOrders = require('../models/allDataModel');
const userData = require('../models/userDataModel');
let orderNumber = 1;


// Update suggestion
router.patch('/updateSuggestion:mobile', async (req, res) => {
    try {
        const updatedUser = await userData.updateOne({ mobile: req.params.mobile }, {
            $set: {
                ingredients:req.body.ingredients,
            }
        })
        res.send(updatedUser);
	console.log("User updated");
    } catch (err) {
        console.log(err)
    }
})

// Get user if exists
router.get('/findUser:mobile', async (req, res) => {
    try {
        const user = await userData.find({mobile:req.params.mobile});
        res.json(user);
    } catch (err) {
        console.log(err)
    }
})


// Post user data
router.post('/postUserData',async(req,res)=>{
    const newUser = new userData({
        mobile:req.body.mobile,
        ingredients:req.body.ingredients
    });
    try{
        const savedUser = await newUser.save();
        res.json(savedUser);
    }catch(err){
        console.log(err);
    }
})

// Insert New order from customer page to # orders # schema in project database
router.post('/placeOrder', async (req, res) => {
    orderNumber++;
    //res.send(orderNumber);
    const newOrder = new currentOrder({
       order:req.body.order,
       total:req.body.total,
       tableNumber:req.body.tableNumber,
       isServed:req.body.isServed,
       isPaymentDone:req.body.isPaymentDone,
       paymentType:req.body.paymentType,
       disableButtons:req.body.disableButtons,
       note:req.body.note
    });
    try {
        const savedOrder = await newOrder.save();
        res.json(savedOrder);
    } catch (err) {
        console.log(err)
    }
})

// Get all orders from #   orders  # schema in project database
router.get('/fetchOrders', async (req, res) => {
    try {
        const currentOrders = await currentOrder.find();
        res.json(currentOrders);
    } catch (err) {
        console.log(err)
    }
})
//Update payment status from admin window for current orders
router.patch('/updatePaymentStatus:itemId', async (req, res) => {
    try {
        const updatedOrder = await currentOrder.updateOne({ _id: req.params.itemId }, {
            $set: {
                isPaymentDone:req.body.isPaymentDone,
                disableButtons:req.body.disableButtons
            }
        })
        res.send(updatedOrder);
	console.log("Item updated");
    } catch (err) {
        console.log(err)
    }
})
// update served status from cook window to current orders
router.patch('/updateServedStatus:itemId', async (req, res) => {
    try {
        const updatedOrder = await currentOrder.updateOne({ _id: req.params.itemId }, {
            $set: {
                isServed:req.body.isServed,
            }
        })
        res.send(updatedOrder);
	console.log("Item updated");
    } catch (err) {
        console.log(err)
    }
})
//cancle recived order with id
router.delete('/cancleThisOrder:OID', async (req, res) => {
    try {
        const removedOrder = await currentOrder.deleteOne({ _id: req.params.OID})
        res.send(removedOrder);
    } catch (err) {
        console.log(err)
    }
})
router.delete('/cancleMyOrder:MTN', async (req, res) => {
    try {
        const removedOrder = await currentOrder.deleteOne({ tableNumber: req.params.MTN})
        res.send(removedOrder);
    } catch (err) {
        console.log(err)
    }
})
//Get my table order status from oders schema and send to from user app
router.get('/fetchMyTableOrder:TNumber', async (req, res) => {
    try {
        const yourOrder = await currentOrder.find({tableNumber:req.params.TNumber});
        res.json(yourOrder);
    } catch (err) {
        console.log(err)
    }
})
//Get all not served Orders
router.get('/fetchNotServedOrder', async (req, res) => {
    try {
        let all = await currentOrder.find({isPaymentDone:true});
        all = all.filter((order)=>{
            if(order.isServed==false){
                return true;
            }
        })
        res.json(all);
    } catch (err) {
        console.log(err)
    }
})
router.get('/fetchAll', async (req, res) => {
    try {
        const all = await allOrders.find();
        res.json(all);
    } catch (err) {
        console.log(err)
    }
})
// Post order to orders History
router.post('/saveToAllData',async(req,res)=>{
    const historyOrderObject = new allOrders({
        tableNumber:req.body.tableNumber,
        orderTotal:req.body.orderTotal,
        paymentType:req.body.paymentType    
    })
    try {
        const orderObject = await historyOrderObject.save();
        res.json(orderObject);
    } catch (err) {
        console.log(err)
    }
})
router.delete('/removeFromAll:OID', async (req, res) => {
    try {
        const removedOrder = await allOrders.deleteOne({ _id: req.params.OID})
        res.send(removedOrder);
    } catch (err) {
        console.log(err)
    }
})
router.delete('/orderServed:id', async (req, res) => {
    try {
        const removedOrder = await currentOrder.deleteOne({ _id: req.params.id })
        res.send(removedOrder);
    } catch (err) {
        console.log(err)
    }
})
module.exports = router;