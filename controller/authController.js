const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({email});
        if(user) {
            res.status(201).json({message: "user already exits!"})
        } else if (password.length >= 8) {

            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = new User({ 
                username,
                email,
                password: hashedPassword,
                createdAt:  date = new Date()
            });
    
            const savedUser = await newUser.save();

            res.status(200).json(savedUser, {message: "Register succesfully"});
        } else {
            res.status(201).json({message: "password length must have grater than 8!"});
        }

    } catch (error) {
        res.status(500).json({message: "Regisration failed"});
    }
}

exports.loginUser = async (req, res) => {
try {
        
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) {
        return res.json({message: "invalid email!"})
    }

    const ispasswordValid = await bcrypt.compare(password, user.password);

    if(!ispasswordValid) {
        return res.json({message: "invalid password"})
    }

    const token = jwt.sign({userId: user.id}, config.jwtsecretkey , {expiresIn: '1h'});

    res.status(200).json({ message :"login succecfully", token})
} catch (error) {
    res.status(500).json({message: "Login faild!"})
}
}