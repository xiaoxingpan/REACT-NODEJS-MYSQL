const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    // grab the accessToken from front-end and pass to header
    const accessToken = req.header("accessToken");

    console.log("111");
    if (!accessToken) {
        return res.status(401).json({ error: 'User not logged in!' });
    }

    try {
        const validToken = verify(accessToken, "importantsecret");

        if (validToken) {
            return next();
        }
        else {
            // Token is invalid
            return res.status(401).json({ error: 'Invalid token' });
        }

    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

module.exports = { validateToken };