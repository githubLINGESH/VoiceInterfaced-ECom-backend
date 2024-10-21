const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');



// Controller for user signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const generateRandomId = () => {
            return uuid.v4(); // Generates a random UUID
        };

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered.' });
        }

        // WARNING: This is NOT secure. Do NOT use in production.
        // Store the password in plain text.

        const userId = generateRandomId();

        const newUser = new User({
            userId,
            name,
            email,
            password: password, // Storing password in plain text
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Controller for user login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        console.log("Before login", req.session);

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }

        // WARNING: This is NOT secure. Do NOT use in production.
        // Compare the provided password with the stored plain text password.
        if (user.password !== password) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }

        // const token = jwt.sign(
        //     { userId: user._id, email: user.email },
        //     'KJGKLHNAlkad67TWEyr0',
        //     { expiresIn: '1h' }
        // );


        req.session.userId = user.userId.toString();

        console.log("Session user Id:", req.session.userId);

            req.session.save((err) => {
                if (err) {
                console.error('Error saving session:', err);
                } else {
                console.log('Session saved successfully');
                console.log("After login:", req.session.userId);
                }
            });

        // res.status(200).json({ token, userId: user._id, email: user.email });
        res.status(200).json("Success");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const userId = req.session.userId;
        console.log(userId, "Getting user");

        // Wrap userId in an object to specify the field to search
        const user = await User.findOne({ userId: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
};

// Function to retrieve user information by userId
exports.getUserInformation = async (userId) => {
    try {
        console.log(userId, "Getting user");

        // Find user by userId field
        const user = await User.findOne({ userId: userId });

        if (!user) {
            throw new Error('User not found');
        }

        return user; // Return user data
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('An error occurred while fetching the user');
    }
};