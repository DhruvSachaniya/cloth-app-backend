const product = require('../models/Products');

exports.addProducts = async (req, res) => {
    try {               
        const { title,  description, price} = req.body;
        const user = req.user.userId;
        const fileURL = req.file.path;


        const newProduct = await new product({
            title,
            description,
            price,
            seller: user,
            fileURL,
        })
    
        const savedproduct = await newProduct.save();
    
        res.status(201).json(savedproduct);
    } catch (error) {
        res.status(501).json({meassge: "faild to add product"})
    }
};


exports.getallproducts = async (req, res) => {
    try {
        const allproducts = await product.find();
        
        if(allproducts) {
            res.status(200).json(allproducts);
        } else {
                res.status(500).json({meassge: "there is no products available"});
        }
    } catch (error) {
        res.send(error);
    }
};

exports.productinfo = async (req, res) => {
    try {
        const { productid } = req.params;

        const findproduct = await product.findById(productid);
        
        if (findproduct) {
            res.status(200).json(findproduct);
        } else {
            res.status(500).json({meassge: "product not found!"})
        }
    } catch (error) {
        res.send(error);
    }
}