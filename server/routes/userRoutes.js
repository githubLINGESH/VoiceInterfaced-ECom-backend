// server/routes/user.routes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');


const myMiddleware = (req, res, next) => {
    next();
    console.log("In middleware:",req.session.userId);
};
router.use(myMiddleware);

router.post('/register', UserController.signup);
router.post('/login', UserController.login);


module.exports = router;
