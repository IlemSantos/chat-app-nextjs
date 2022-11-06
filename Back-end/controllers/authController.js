import jsonwebtoken from 'jsonwebtoken';

import authConfig from '../config/auth.json' assert { type: "json" };

import User from '../models/user.js';

function jwt_generated(params = {}) {
    return jsonwebtoken.sign(params, authConfig.secret, { expiresIn: '1h' });
};

export async function auth_signUp(req, res) {
    try {
        const { email, password } = req.body;

        if (await User.findOne({ email }).exec())
            return res.status(400).send({ error: 'User already exists' });

        const user = await User.create({ email, password });

        user.password = undefined;

        const access_token = jwt_generated({ id: user._id });

        return res.status(201).send({ user, access_token });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' })
    }
};

export async function auth_signInWithPassword(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        user.comparePassword(password, (err, isMatch) => {
            if (isMatch) {
                user.password = undefined;

                const access_token = jwt_generated({ id: user._id });

                res.send({ user, access_token });
            } else {
                res.status(400).send({ error: 'Invalid password' });
            }
        });

    } catch (err) {
        return res.status(400).send({ error: 'Sign in failed' })
    }
};

export async function get_user(req, res) {
    try {
        const uid = req.userId;

        const user = await User.findOne({ uid });

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Get failed' })
    }
}

export async function auth_update(req, res) {
    try {
        const { password, image } = req.body;
        const id = req.userId;

        const user = await User.findOne({ id }).select('+password');

        user.password = password ? password : user.password;
        user.image = image ? image : user.image;

        await user.save();

        res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Update failed' })
    }
};
