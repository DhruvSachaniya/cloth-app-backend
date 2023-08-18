const cart = require('../models/Carts');

exports.addtoCart = async (req, res) => {
    try {   
        const { productid, quntity } = req.body;
        const seller = req.user.userId;
        const usercart = await cart.findOne({seller});
        if(usercart) { 
            if (usercart.items.length >= 1) {
    
                await usercart.items.push(productid);
                const udatecart = await usercart.save();
    
                res.send(udatecart);
            } 
        } else {
            const newcart = await new cart({
                seller: seller,
                items: productid,
                quntity: quntity,
                createdAt: date = new Date()
            })
        
            const savedcart = await newcart.save();
            res.status(200).json(savedcart);
        }
    } catch (error) {
        res.send(error);
    }
};