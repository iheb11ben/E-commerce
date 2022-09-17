const route = require('express').Router();

const controllerCategory = require('../Controllers/ControllersCategory')

route.post('/createCategory', controllerCategory.createCategory);
route.get('/allCategory',controllerCategory.getAllCategory)
route.get('/getCategoryById/:id',controllerCategory.getCategoryById)
route.get('/getCategoryByName',controllerCategory.getCategoryByName)
route.put('/updateCategory/:id',controllerCategory.updateCategory)
route.delete('/deletecategory/:id',controllerCategory.deleteCategory)
module.exports = route;