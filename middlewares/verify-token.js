const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) res.status(401).json({ status: "FAILED", message: "Unauthorized" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({ status: "FAILED", message: "Forbidden" });
        req.user_id = decoded.userId;
        next();
    })
}

module.exports = verifyToken