
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

exports.authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};
