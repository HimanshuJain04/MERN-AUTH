const express = require('express');
const router = express.Router();

const { login } = require("../controller/login");
const { signup } = require("../controller/signup");
const { authUser } = require("../controller/middlewareAuth");

router.post("/login", login);
router.post("/signup", signup);

router.get("/home", authUser, (req, res) => {
    res.send("Auth Success Jiii");
});

module.exports = router;