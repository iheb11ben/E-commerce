const Category = require('../Models/Category')
const SubCategory = require('../Models/SubCategory');

createSubCategory = async (req, res) => {
    try {
        const newSubCategory = new SubCategory(req.body);
        await newSubCategory.save();
      
        //const category = await Category.findById(req.body.category)
       //console.log(category)
       
       await Category.findByIdAndUpdate(req.body.category,
            {$push:{subCategories:newSubCategory},})
        
            res.status(201).json({
            message: "SubCategory are successefully created",
            data: newSubCategory,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,

        })

    }
}
getAllSubCategory = async (req, res) => {
    try {
        const listSubCategories = await SubCategory.find({}).populate('category');
        res.status(200).json({
            message: "list of SubCategories",
            data: listSubCategories,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,

        });

    }
};
getSubCategoryById = async (req, res) => {
    try {
        const Subcategory = await SubCategory.findById({ _id: req.params.id }).populate('category');
        console.log(subcategory)
        res.status(200).json({
            messge: 'Subcategory',
            data: Subcategory,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });

    
};
}
getSubCategoryByName = async (req, res) => {
    try {
        const Subcategory = await SubCategory.find({ name: req.query.name }).populate('category');
        res.status(200).json({
            messge: 'Subcategory',
            data: Subcategory,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });

    }
};
updateSubCategory = async (req, res) => {
    try {
        await SubCategory.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json({
            messge: 'Subcategory Updated',

        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });

    }
};
deleteSubCategory = async (req, res) => {
    try {

        const subcat=await SubCategory.findById({_id:req.params.id})
        //console.log(subcat)
        await Category.findByIdAndUpdate(subcat.category,{
            $pull:{subCategories:subcat._id},});


        await SubCategory.deleteOne({ _id: req.params.id });
        res.status(200).json({
           message: 'Subcategory deleted'
        })
       
        
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });

    }
}
module.exports ={ createSubCategory, getAllSubCategory, getSubCategoryById, getSubCategoryByName, updateSubCategory, deleteSubCategory }