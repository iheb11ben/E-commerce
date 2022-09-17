

const Order = require('../Models/Order');


createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({
            message: "Order successefully created",
            data: newOrder,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,

        })

    }
}
module.exports = { createOrder}