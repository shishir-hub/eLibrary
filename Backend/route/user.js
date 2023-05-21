const express = require('express');
const { authenticate } = require('../middleware/authenticate');
const User = require('../model/User');
const router = express.Router();

router.get('/user', authenticate, async (req, res, next) => {
    try {
        let user_exist = await User.findById(req.user._id);
        if (user_exist) {
            res.send({
                data: req.user,
                msg: 'User Logged in'
            })
        }
        else {
            res.status(401).send({ msg: "User not found" });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;