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
            const existingUsername = await User.findOne({
                where: { userName: user.userName },
            });

            if (existingUsername !== null) {
                return res.status(200).json({ message: `Username ${user.userName} already exists.` });
            }

            if (validateDataAdd(req, res)) {
                // hash the password
                const hash = await bcrypt.hash(user.password, 10);
                //create user with hashed password
                const newUser = await User.create({
                    userName: user.userName,
                    password: hash,
                    email: user.email,
                    role: user.role || 'user', // Set a default role if not provided
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
            // find if username exists
            const existingUser = await User.findOne({
                where: { userName: user.userName },
            });
            if (!existingUser) {
                return res.status(200).json({ error: `Username ${user.userName} doesn't exists.` });
            }

            // compare the password
            const match = await bcrypt.compare(user.password, existingUser.password);
            if (!match) {
                return res.status(200).json({ error: "Wrong Username And Password Combination" });
            }
            // generate a token and pass the front-end
            const accessToken = sign({ userName: user.userName, id: existingUser.id }, "importantsecret");
            console.log("Controller: " + accessToken);
            res.status(201).json({
                message: `You are loggin in as ${user.userName}.`,
                token: accessToken
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'User Controllers: Internal Server Error' });
        }
    }
}

function validateDataAdd(req, res) {

    const { userName, password, role, email } = req.body;
    console.log(password);

    // required, 4-20 characters, contains only numbers and lowercase letters 
    if (validator.isEmpty(userName) || !validator.isLength(userName, { min: 4, max: 20 }) || !validator.isAlphanumeric(userName, 'en-US')) {
        res.status(400).send({ message: 'User Controllers: Username must be 4-20 characters long and only contain numbers and lowercase letters' });
        return false;
    }

    // required, 6-100 characters, at least one uppercase letter, one lowercase letter, one number or special character 
    if (validator.isEmpty(password) || !validator.isLength(password, { min: 6, max: 100 }) || !validator.matches(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, 'g')) {
        res.status(400).send({ message: 'User Controllers: Password must be 6-100 characters long, contain at least one uppercase letter, one lowercase letter, one number or special character' });
        return false;
    }

    if (validator.isEmpty(role)) {
        res.status(400).send({ message: 'User Controllers: Role must be entered' });
        return false;
    }

    // required, must look like a valid email
    if (validator.isEmpty(email) || !validator.isEmail(email)) {
        res.status(400).send({ message: 'User Controllers: Email must be entered and valid' });
        return false;
    }
    return { valid: true };
}