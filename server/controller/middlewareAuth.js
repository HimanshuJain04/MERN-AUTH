const jwt = require("jsonwebtoken");
const User = require("../model/user");
require('dotenv').config();

let verifyToken = (token, next) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { ...decoded, expired: false };
    } catch (err) {
        if (err) {
            if (err.name === "TokenExpiredError") {
                const decoded = jwt.decode(token);
                if (decoded) {
                    return { ...decoded, expired: true };
                } else return false;
            } else return false;
        }
    }
};

let tokenValidation = async (req, res, next) => {

    console.log("reqtoken", req.token);

    const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

    console.log("token :", token);

    if (token) {

        req.token = token;

        try {

            const decodedToken = verifyToken(req.token, next);

            if (!decodedToken) {
                res.status(400).json({
                    status: 400,
                    message: "User does not have  token",
                });
            } else if (decodedToken.expired) {
                let decoded = jwt.decode(token);
                console.log("decoded: ", decoded);
                let user = await User.findById(decoded.id);

                user.token = jwt.sign(
                    {
                        id: user._id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "3d",
                    }
                );
                next();
            } else {
                const user = await User.findOne({ email: decodedToken.email });
                user.token = req.token;
                req.user = user;
                console.log("successfully retrieved");
                next();
            }
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: "Error with your token",
            });
        }
    } else {
        res.status(400).json({
            status: 400,
            message: "User does not have  token",
        });
    }
};

module.exports.authUser = tokenValidation;
