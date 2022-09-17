const route = require('express').Router();
const authController = require('../Controllers/authController')
const multer =require('../Middlwares/upload');
const check_auth=require('../Middlwares/check_auth')
const passport=require('passport');
require('../Middlwares/passport_auth').passport


route.post('/registerAdmin',multer.single('photo'),authController.registerAdmin);

route.post('/registerCustomer',multer.single('photo'), authController.registerCustomer);
route.post('/registerProvider',multer.single('photo'),authController.registerProvider);
route.get('/verify-now/:verificationCode',authController.verifyEmail)
route.post('/login',authController.login);
route.get('/profile_check',check_auth,authController.profile)




route.get('/profile_check',check_auth,authController.profile)
route.get('/profile',passport.authenticate('jwt',{session:false}),authController.profile );
route.put('/updateProfile',passport.authenticate('jwt',{session:false}),authController.updateProfile );
route.get('/forgotpassword',authController.forgotpassword)
route.get('/reset/:resetPasswordToken',authController.resetpassword );
module.exports = route;