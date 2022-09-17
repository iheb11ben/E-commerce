const route = require('express').Router();

const controllerSubCategory = require('../Controllers/ControllersSubCategory')

route.post('/createSubCategory', controllerSubCategory.createSubCategory);
route.get('/allSubCategory',controllerSubCategory.getAllSubCategory)
route.get('/getSubCategoryById/:id',controllerSubCategory.getSubCategoryById)
route.get('/getSubCategoryByName',controllerSubCategory.getSubCategoryByName)
route.put('/updateSubCategory/:id',controllerSubCategory.updateSubCategory)
route.delete('/deleteSubcategory/:id',controllerSubCategory.deleteSubCategory)
module.exports = route;