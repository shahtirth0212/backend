// Importing packages
const express = require('express');
const router = express.Router();
const food = require('../models/foodModel');

// Insert New Food Item from admin page to # items # schema in project database
router.post('/',async (req, res) => {
    const newFood = new food({
        itemName: req.body.itemName,
        itemPrice: req.body.itemPrice,
        itemType:req.body.itemType,
        isSpecial: req.body.isSpecial,
        isSpicy: req.body.isSpicy,
        ingredients:req.body.ingredients
});
    try {
        const savedFood = await newFood.save();
        console.log("Item added succesfully");
        res.send(savedFood)
    } catch (err) {
        console.log(err)
    }
})
// Get all Food Items from #   items  # schema in project database
router.get('/', async (req, res) => {
    try {
        const allFoodItems = await food.find();
	console.log("All items fethced");
        res.json(allFoodItems);
	console.log("All items sent");
    } catch (err) {
        console.log(err)
    }

})


// Delete Food Item from #   items  # schema in project database with _id
router.delete('/:itemId', async (req, res) => {
    try {
        const removedFood = await food.deleteOne({ _id: req.params.itemId })
        res.send(removedFood);
	console.log("Item Deleted");
    } catch (err) {
        console.log(err)
    }
})

// Update Food Item from #   items  # schema in project database with _id
router.patch('/:itemId', async (req, res) => {
    try {
        const updatedFood = await food.updateOne({ _id: req.params.itemId }, {
            $set: {
                itemName: req.body.itemName,
                itemPrice: req.body.itemPrice,
                itemType:req.body.itemType,
                isSpecial: req.body.isSpecial,
                isSpicy: req.body.isSpicy,
                ingredients:req.body.ingredients
            }
        })
        res.send(updatedFood);
	console.log("Item updated");
    } catch (err) {
        console.log(err)
    }
})



module.exports = router;