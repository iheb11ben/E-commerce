const route = require('express').Router();

const controllerProduct = require('../Controllers/ControllerProduct')
const upload=require('../Middlwares/upload')

route.post('/createProduct',upload.array('photos'),controllerProduct.createProduct)
route.get('/allProduct',controllerProduct.getAllProduct)
route.get('/getProductById/:id',controllerProduct.getProductById)
route.get('/getProductByName',controllerProduct.getProductByName)
route.put('/updateProduct/:id',controllerProduct.updateProduct)
route.delete('/deleteProduct/:id',controllerProduct.deleteProduct)
route.get('/pagination',controllerProduct.pagination)
route.get('/research/:key',controllerProduct.research)
module.exports = route;