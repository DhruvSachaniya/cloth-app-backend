const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({email});
        if(user) {
            res.status(409).json({error: "user already exits!"})
        } else if (password.length >= 8) {

            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = new User({ 
                username,
                email,
                password: hashedPassword,
                createdAt:  date = new Date()
            });
    
            const savedUser = await newUser.save();

            res.status(201).json(savedUser);
        } else {
            res.json({error: "password length must have grater than 8!"});
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
        return res.status(401).json({message: "invalid email!"})
    }

    const ispasswordValid = await bcrypt.compare(password, user.password);

    if(!ispasswordValid) {
        return res.status(401).json({message: "invalid password"})
    }

    const token = jwt.sign({userId: user.id}, config.jwtsecretkey , {expiresIn: '1h'});

    res.json({ meassge :"login succecfully", token})
} catch (error) {
    res.status(500).json({meassge: "Login faild!"})
}
}