const user = require('../models/User');

exports.accountinfo = async (req, res) => {
    try {
        const seller = req.user.userId;

        const founduser = await user.findById(seller);

        if (founduser) {
            res.status(200).json(founduser);
        } else {
            res.status(401).json({meassage: "user not found!"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.editaccount = async (req, res) => {
    try {
        const seller = req.user.userId;

        const founduser = await user.findById(seller);

        //
    } catch (error) {
        res.status(500).json(error);
    }
}