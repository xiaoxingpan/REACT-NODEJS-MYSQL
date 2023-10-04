const { User } = require('../models');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    findAll: async (req, res) => {
        try {
            const users = await User.findAll();
            console.log(users);
            res.json(users).status(200);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'User Controllers: Internal Server Error' });
        }
    },
    addUser: async (req, res) => {
        try {
            const user = req.body;
            const existingEmail = await User.findOne({
                where: { email: user.email },
            });

            if (existingEmail !== null) {
                return res.status(200).json({ message: `Email ${user.email} already exists.` });
            }
            console.log(user.email);
            console.log(user.password);
            if (validateDataAdd(req, res)) {
                // hash the password
                const hash = await bcrypt.hash(user.password, 10);
                //create user with hashed password
                const newUser = await User.create({
                    password: hash,
                    email: user.email,
                });
                res.json(newUser).status(201);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'User Controllers: Internal Server Error' });
        }
    },
    authUser: async (req, res) => {
        try {
            const user = req.body;
            // find if email exists
            const existingUser = await User.findOne({
                where: { email: user.email },
            });
            if (!existingUser) {
                return res.status(200).json({ error: `email ${user.email} doesn't exists.` });
            }

            // compare the password
            const match = await bcrypt.compare(user.password, existingUser.password);
            if (!match) {
                return res.status(200).json({ error: "Wrong email And Password Combination" });
            }
            // generate a token and pass the front-end
            const accessToken = sign({ email: user.email, id: existingUser.id }, "importantsecret");

            console.log(existingUser.id);
            res.status(201).json({
                message: `You are loggin in as ${user.email}.`,
                token: accessToken,
                userId: existingUser.id,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'User Controllers: Internal Server Error' });
        }
    }
}

function validateDataAdd(req, res) {

    const { password, email } = req.body;
    console.log(password);

    // required, 6-50 characters
    if (validator.isEmpty(password) || !validator.isLength(password, { min: 6, max: 50 })) {
        res.status(400).send({ message: 'User Controllers: Password must be 6-50 characters long' });
        return false;
    }

    // required, must look like a valid email
    if (validator.isEmpty(email) || !validator.isEmail(email)) {
        res.status(400).send({ message: 'User Controllers: Email must be entered and valid' });
        return false;
    }
    return { valid: true };
}