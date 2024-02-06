const User = require('../model/user');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {

        const { name, email, password, confirmPass } = req.body;
        
        // check all values are given or not
        if (!email || !password || !confirmPass || !name) {
            return res.status(400).json({
                message: "All data are required",
            });
        }

        // check pass and confirm pass
        if (password !== confirmPass) {
            return res.status(400).json({
                message: "Password & Confirm-Password doesn't match",
            });
        }

        // check user is already exist or not
        const existUser = await User.findOne({ email: email });
        // if exist
        if (existUser) {
            return res.status(400).json({
                message: "User is already exist,Please SiginIn",
            });
        }

        // hash/hide the password
        const hashedPass = await bcrypt.hash(password, 10);
        console.log("HashedPass : ", hashedPass);

        // find the most recent otp---------

        // create entry in database
        const newUser = await User.create({
            name,
            email,
            password: hashedPass,
        });

        return res.status(200).json({
            Message: "Sign Up Successfully",
            Data: newUser
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error When Sign Up",
        });
    }

} 