const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]; 

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; 
        //console.log('Decoded Token:', decoded); 
        next(); 
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({ message: "Invalid Token" });
    }
};

module.exports = verifyToken;
