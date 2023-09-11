const order = require('../models/Order');
const cart = require('../models/Carts');

exports.checkout = async (req, res) => {
    try {
        const { cartID, shippingInfo, paymentInfo } = req.body;

        const seller = req.user.userId;

        const usercart = await cart.findOne({seller});

        if(!usercart) {
            res.status(401).json({meassage: "user cart not found!"})
        }

        const neworder = await new order({
            userID: seller,
            items: usercart.items,
            totalamount: usercart.subtotal,
            shippingInfo,
            paymentInfo,
            ordersDate: date = new Date(),
            createdDate: date = new Date()
        })

        const savedorder = await neworder.save();
        res.status(200).json(savedorder);

    } catch (error) {
        res.status(500).json(error);
    }
}

exports.orderinfo = async (req, res) => {
    try {
        const userID = req.user.userId;

        const foundorder = await order.findOne({userID});

        if(foundorder) {
            res.status(200).json(foundorder)
        } else {
            res.status(200).json({meassage: "you have no order"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.cancelorder = async (req, res) => {
    try {
        const userID = req.user.userId;

        const foundorder = await order.findOne({userID});

        if(foundorder) {
            const deleteorder = await order.deleteOne({userID});
            if(deleteorder) {
                res.status(200).json({meassage: "your order has been canceled"});
            } else {
                res.status(401).json({meassage: "order not found!"});
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}