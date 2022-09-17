const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },

    filename: (req, file, cb) => {
        //console.log(file)
        //methode simple
        
       // cb(null, file.originalname)
       cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname)
    },
})
const fileFilter=(req,file,cb)=>{
    if (
        file.mimetype=='image/jpeg'||
        file.mimetype=='image/png'||
        file.mimetype=='image/jpg'
        ) {cb(null,true)
        
    }
    else{cb(new Error('Image uploded is not type jpg/jpeg/png'),false)}
}
module.exports = multer({ storage: storage })