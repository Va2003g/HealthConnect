const express = require('express');
const router = express.Router();

//landing route
router.get('/',(req,res)=>res.send(`<h1>Health Connect Backend</h1>`))

//signup handlers
const signUp = require('../controllers/SignUp');
router.post('/signup',signUp.signup);

//login handlers
const {login} = require('../controllers/login');
router.get('/login',login);

//forget password
const {resetPasswordToken} = require('../controllers/resetPassword');
router.post('/reset-password-token',resetPasswordToken);


module.exports = router;