const wishlist = require('../models/Wishlist');

exports.addwishlist = async (req, res) => {
    try {
        const { productid } = req.body;

        const seller = req.user.userId;
        const userwishlist = await wishlist.findOne({userID: seller});
        if(userwishlist) {
            if (userwishlist.items.length >= 1) {
                
                for (let i = 0; i< userwishlist.items.length; i++) {
                    if (userwishlist.items[i].toString() !== productid) {
                        userwishlist.items.push(productid);
                        const updatewishlist = await userwishlist.save();
                        res.status(200).json(updatewishlist);
                        break;
                    } 
                }

            } else {
                userwishlist.items.push(productid);

                const updatewishlist = await userwishlist.save();
                res.status(200).json(updatewishlist);
            }


        } else {

            const newwishlist = new wishlist({
                userID: seller,
                items: productid,
                createdAt: date = new Date()
            })
    
            const updatewishlist = await newwishlist.save();
            res.status(200).json(updatewishlist);
        } 
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getwishlist = async (req, res) => {
    try {
        const seller = req.user.userId;

        const foundwishlist = await wishlist.findOne({userID: seller});

        if(foundwishlist) {
            if (foundwishlist.items.length === 0) {
                res.status(201).json({meassage: "you wishlist is empty!"})
            } else {
                res.status(200).json(foundwishlist);
            }
        } else {
            res.status(500).json({meassage: "wishlist not found!"});
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.deletewishlist = async (req, res) => {
    try {
        const { productid } = req.body;

        const seller = req.user.userId;

        const foundwishlist = await wishlist.findOne({userID: seller});

        if(foundwishlist) {
            if (foundwishlist.items.length >= 1) {

                for(let i = 0; i < foundwishlist.items.length; i++) {
                    if (foundwishlist.items[i].toString() === productid) {
                        foundwishlist.items.splice(i, 1)[0];
                        break;
                    }
                }
            } else {
                foundwishlist.items.pop(productid);

                const updatewishlist = await foundwishlist.save();
                res.status(200).json(updatewishlist);
            }

            const updatewishlist = await foundwishlist.save();
            res.status(200).json(updatewishlist);

        } else {
            res.status(500).json({meassage: "wishlist not found!"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}