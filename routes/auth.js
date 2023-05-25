const express = require('express');
const authController = require ('../controllers/auth');
const router = express.Router();

router.post('/register',authController.register);

router.post('/profilet',authController.updateUserDetails);

router.post('/profilea',authController.updateUserDetailsA);

router.post('/insert',authController.input);

router.post('/delete',authController.deleteTour);

router.post('/login',authController.login);

router.get('/logout',authController.logout);

router.post('/book',authController.books);


module.exports = router;