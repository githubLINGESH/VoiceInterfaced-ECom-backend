const UserContext = require('../model/userContextModel'); // Update with the correct path

exports.AddUserContext = async (req, res) => {
    try {
        const newUserContext = new UserContext(req.body);
        await newUserContext.save();
        res.status(201).json(newUserContext);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to update an existing user context
exports.updateUserContext = async (req, res) => {
    try {
        const updatedUserContext = await UserContext.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUserContext) {
            return res.status(404).json({ message: 'User context not found' });
        }
        res.status(200).json(updatedUserContext);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};