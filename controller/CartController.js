const cart = require('../models/Carts');
const product = require('../models/Products');

exports.addtoCart = async (req, res) => {
    try {   
        const { productid, quntity } = req.body;

        const foundproduct = await product.findById(productid);

        const seller = req.user.userId;
        const productprice = foundproduct.price;
        
        const usercart = await cart.findOne({seller});
        if(usercart) {
            if (usercart.items.length >= 1) {
                let productalreadyInCart = false;

                for (let i = 0; i < usercart.items.length; i++) {
                    if (usercart.items[i] === productid) {
                        productalreadyInCart = true;
                        usercart.quntity += 1;
                        break;
                    } 
                }
                if(!productalreadyInCart) {
                    usercart.items.push(productid);
                    usercart.subtotal += foundproduct.price;
                }
                const updatecart = await usercart.save();
                res.status(200).json(updatecart); 
            } 
        } else {
            const newcart = await new cart({
                seller: seller,
                items: productid,
                quntity: quntity,
                subtotal: productprice,
                createdAt: date = new Date()
            })
        
            const savedcart = await newcart.save();
            res.status(200).json(savedcart);
        }
    } catch (error) {
        res.send(error);
    }
};

exports.cartinfo = async (req, res) => {
    try {
        const seller = req.user.userId;
        const getcart = await cart.findOne({seller});

        if (getcart) {
            res.status(200).json(getcart)
        } else {
            res.status(500).json({meassage: "cart not found!"});
        }
    } catch (error) {
        res.status(500).json({meassage: "error!"});
    }
}