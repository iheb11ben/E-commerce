const Product = require('../Models/Product');

createProduct = async (req, res) => {
    try {
        req.body['gallery'] =
            req.files.lenght < 0 ? [] : req.files.map(function (file) { return { name: file.filename, description: 'add prod' } }
            )
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({
            message: "Products are successefully created",
            data: newProduct,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,

        })

    }
}
getAllProduct = async (req, res) => {
    try {
        const listProduct = await Product.find({}).populate('Subcategory');
        res.status(200).json({
            message: "list of Products",
            data: listProduct,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,

        });

    }
};
getProductById = async (req, res) => {
    try {
        const category = await Product.findById({ _id: req.params.id });
        res.status(200).json({
            messge: 'Product',
            data: category,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
getProductByName = async (req, res) => {
    try {
        const category = await Product.find({ name: req.query.name })
        res.status(200).json({
            messge: 'Product',
            data: category,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });

    }
};
updateProduct = async (req, res) => {
    try {
        console.log(req.body)
        await Product.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({
            messge: 'Product Updated',

        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });

    }
};
deleteProduct = async (req, res) => {
    try {
        await Product.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: 'Product deleted'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });

    }
};

pagination = async (req, res) => {

    try {
        let { page, size, sort } = req.query;

      
        if (!page) {

       
            page = 1;
        }

        if (!size) {
            size = 5;
        }


        const limit = parseInt(size);


        const product = await Product.find().sort(
            { votes: 1, _id: -1 }).limit(limit)

        res.send({
            page,
            size,
            Info: product,
        });
    }
    catch (error) {
        res.sendStatus(500);
    }
};
research=async (req,res)=>{
    let data = await Product.find(
        {
            "$or":[
                {description:{$regex:req.params.key}},
                {ref:{$regex:req.params.key}},
                {price:{$regex:req.params.key}},
               
            ]
        }
    )
    res.send(data);

};


module.exports = {
    createProduct, getAllProduct,
    deleteProduct, updateProduct,
    getProductByName, getProductById, pagination,research
};
