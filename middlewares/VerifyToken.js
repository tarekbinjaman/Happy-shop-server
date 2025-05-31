const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({message: 'Unauthorized access - No token' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            const message = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
            return res.status(401).json({message});
        }

        req.user = decoded; 
        next();

    });
};

module.exports = verifyToken;