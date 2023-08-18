const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if(token) {
            const decoded = jwt.verify(token, config.jwtsecretkey);

            req.user = decoded;

            next();
            
        } else {
            res.status(401).json({meassage: "unathorized"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}