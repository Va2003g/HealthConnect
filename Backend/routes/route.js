const express = require('express');
const router = express.Router();

//landing route
router.get('/',(req,res)=>res.send(`<h1>Health Connect Backend</h1>`))
//handlers
const signUp = require('../controllers/SignUp');
router.post('/signup',signUp.signup);

module.exports = router;