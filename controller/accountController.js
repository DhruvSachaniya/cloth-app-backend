const user = require('../models/User');
const bcrypt = require('bcrypt');

exports.accountinfo = async (req, res) => {
    try {
        const seller = req.user.userId;

        const founduser = await user.findById(seller);

        if (founduser) {
            res.status(200).json(founduser);
        } else {
            res.status(401).json({ meassage: "user not found!" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.editusername = async (req, res) => {
    try {
        const { username } = req.body;

        const seller = req.user.userId;

        const updateuser = await user.findOneAndUpdate(
            { _id: seller},
            { $set: {username} },
            { new: true }
        );

        if(!updateuser) {
            return res.status(404).json({ meassage: "user not found!"});
        }
        
        res.status(200).json({ meassage: "username updated successfully", user: updateuser });
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.editemail = async (req, res) => {
    try {
        const { email } = req.body;

        const seller = req.body.userId;

        const updateuser = await user.findOneAndUpdate(
            { _id: seller},
            { $set: {email} },
            { new: true }
        )

        if(!updateuser) {
            res.status(404).json({ meassage: "user not found!"});
        }

        res.status(200).json({ meassage: "email updeted sucessfully!", user: updateuser});
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.editpassword = async (req, res) => {
    try {
        const { newpassword, oldpassword} = req.body;

        const bcrynewpass = await bcrypt.hash(newpassword, 10);

        const seller = req.user.userId;

        const founduser = await user.findById(seller);

        const ispasswordValid = await bcrypt.compare(oldpassword, founduser.password);

        if(ispasswordValid) {
            const updateuser = await user.findOneAndUpdate(
                { _id: seller},
                { $set: {password: bcrynewpass} },
                {new: true}
            );

            if(!updateuser) {
                res.status(404).json({ meassage: "user not found!"});
            }

            res.status(200).json({ meassage: "password updeted sucessfully", user: updateuser});
        } else {
            res.status(404).json({ meassage: "oldpassword is incorrect!"});
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deleteaccount = async (req, res) => {
    try {
        const { confirm } = req.body;
        const seller = req.user.userId;
        if (confirm) {
            const founduser = await user.findByIdAndDelete(seller);
            
            res.status(200).json({ meassage: "your account hase been deleted!", founduser });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}