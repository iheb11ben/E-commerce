const cors = require('cors');
const express = require('express');
require('dotenv').config()
const db = require('./Config/database.js');
const{success,error}=require('consola')
const PORT = process.env.APP_PORT || 4000;
const DOMAIN = process.env.APP_DOMAIN;

const routerCategory=require('./Router/RouterCategory');
const routerSubCategory=require('./Router/RouterSubCategory');
const routerProduct=require('./Router/RouterProduct'); 
const authRoute=require('./Router/authRoute');
const routerOrder=require('./Router/RouterOrder')
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/category',routerCategory )
app.use('/Subcategory',routerSubCategory )
app.use('/product',routerProduct )
app.use('/',authRoute)
app.use('/order',routerOrder)

app.listen(PORT, async() => {
    try {

        success({
            message: `Server started on port ${PORT}`+`URL: ${DOMAIN}`,
            badge:true,

        });
    }
    catch (err) {
        error({
            message: `Error with server`,badge:true,
        });
      
    };
});