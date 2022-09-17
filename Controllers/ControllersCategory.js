
const Category = require('../Models/Category');

createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json({
            message: "Category are successefully created",
            data: newCategory,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,

        })

    }
}
getAllCategory = async (req, res) => {
    try {
        const listCategories = await Category.find({})
        res.status(200).json({
            message: "list of Categories",
            data: listCategories,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,

        });

    }
};
getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById({ _id: req.params.id });
        console.log(category)
        res.status(200).json({
            message: 'category',
            data: category
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    };
}
getCategoryByName = async (req, res) => {
    try {
        const category = await Category.find({ name: req.query.name })
        res.status(200).json({
            messge: 'category',
            data: category,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });

    }
};
updateCategory = async (req, res) => {
    try {
        await Category.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({
            messge: 'category Updated',

        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });

    }
};
deleteCategory = async (req, res) => {
    try {
        await Category.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: 'category deleted'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });

    }
}
module.exports = { createCategory, getAllCategory, getCategoryById, getCategoryByName, updateCategory, deleteCategory };

