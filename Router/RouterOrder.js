const route = require('express').Router();
const OrderController=require('../Controllers/OrderController');


route.post('/createOrder',OrderController.createOrder);
module.exports = route;