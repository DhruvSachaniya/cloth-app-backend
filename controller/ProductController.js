const product = require('../models/Products');
const users = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.addProducts = async (req, res) => {
    try {
        const { title,  description, price, fileURL } = req.body;

        const token = req.header('Authorization');

        if(token) {
            
            const decoded = jwt.verify(token, config.jwtsecretkey);
    
            const newProduct = await new product({
                title,
                description,
                price,
                seller: decoded.userId,
                fileURL,
            })
    
            const savedproduct = await newProduct.save();
    
            res.status(201).json(savedproduct);
        } else {
            res.status(404).json({meassge: "unathorized!"})
        }

    } catch (error) {
        res.status(501).json({meassge: "faild to add product"})
    }
};


exports.getallproducts = async (req, res) => {
    try {
        const token = req.header('Authorization');
        if(token) {
            const allproducts = await product.find();
        
            if(allproducts) {
                res.status(200).json(allproducts);
            } else {
                res.status(500).json({meassge: "there is no products available"});
            }
        } else {
            res.status(401).json({error: "unathorized!"})
        }
    } catch (error) {
        res.send(error);
    }
};