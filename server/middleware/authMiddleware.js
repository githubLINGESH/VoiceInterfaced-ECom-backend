    // authMiddleware.js

    const authMiddleware = async (req, res, next) => {
    try {

        if (req.session && req.session.userId) {
        console.log('In Auth:', req.session.userId);
        next();
        } else {
        console.log('In Auth not:', req.session.userId);
        res.redirect('http://localhost:3000/login-page');
        }
    } catch (error) {
        console.error("Error Occurred:", error);
    }
    };

    module.exports = authMiddleware;