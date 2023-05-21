const User = require("../model/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = async (req, res, next) => {
    try {
        let user_in = await User.findOne({ email: req.body.email });
        if (user_in) {
            let pw_valid = await bcrypt.compare(req.body.password, user_in.password);

            if (pw_valid) {
                let user_obj = user_in.toObject();
                delete user_obj.password;
                let token = jwt.sign(user_obj, process.env.JWT_SECRET);
                res.send({
                    data: user_obj,
                    token: token,
                    msg: 'User Login successful'
                })
            }
            else {
                res.status(401).send({ msg: "Password donot match" })
            }
        }
        else {
            res.status(400).send({ msg: "User not found" })
        }
    } catch (error) {
        next(error);
    }
}

const signup = async (req, res, next) => {
    try {
        let user_in = await User.findOne({ email: req.body.email });
        if (user_in) {
            res.status(400).send({ msg: "User already exists with this mail" })
        }
        else {
            let hashed = await bcrypt.hash(req.body.password, 10);
            let new_user = await User.create({ ...req.body, password: hashed });
            let user_obj = new_user.toObject();
            delete user_obj.password;
            res.send({
                data: user_obj,
                msg: "User Created Successfully"
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
    signup,
}