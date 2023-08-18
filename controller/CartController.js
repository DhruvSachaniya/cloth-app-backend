const config = require('../config/config');
const cart = require('../models/Carts');
const jwt = require('jsonwebtoken');

exports.addtoCart = async (req, res) => {
    try {
        const token = req.header('Authorization');
        if(token) {
            const decoded = jwt.verify(token, config.jwtsecretkey);
            
            const { productid, quntity } = req.body;
            const seller = decoded.userId;
            const usercart = await cart.findOne({seller});
            if(usercart) { 
                if (usercart.items.length >= 1) {
    
                    await usercart.items.push(productid);
                    const udatecart = await usercart.save();
    
                    res.send(udatecart);
                } 
                
            } else {
                const newcart = await new cart({
                    seller: decoded.userId,
                    items: productid,
                    quntity: quntity,
                    createdAt: date = new Date()
                })
        
                const savedcart = await newcart.save();
                res.status(200).json(savedcart);
            }

        } else {
            res.status(401).json({meassage: "unauthorized!"})
        }

    } catch (error) {
        res.send(error);
    }
};