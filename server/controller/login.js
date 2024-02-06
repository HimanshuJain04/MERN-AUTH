const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createToken = (email, id) => {
    return jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: "3d" });
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // check all values are given or not
        if (!email || !password) {
            return res.status(400).json({
                message: "All data are required",
            });
        }

        // check user is already exist or not
        let existUser = await User.findOne({ email: email });

        // if not exist
        if (!existUser) {
            return res.status(400).json({
                message: "User is not exist,Please Siginup",
            });
        }

        // compare the password
        const passMatch = await bcrypt.compare(password, existUser.password);

        // if doesn't match
        if (!passMatch) {
            return res.status(400).json({
                message: "password doesn't match",
            });
        }

        const token = createToken(email, existUser._id);

        existUser = existUser.toObject();
        existUser.token = token;
        existUser.password = undefined;
        // req.token = token;

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json; charset=utf-8');
        myHeaders.append('Authorization', 'Bearer ' + token);

        console.log("reqbody: ", req.token);

        // set cookie
        const options = {
            maxAge: 1000 * 60 * 60 * 24 * 3, // would expire after 3 days
            httpOnly: true,
        };
        res.cookie("token", token, options);

        // response
        return res.status(200).json({
            success: true,
            token,
            existUser,
            message: `User Login Success`,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error When Signin/login",
        });
    }

} 