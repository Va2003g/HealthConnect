const express = require('express');
const router = express.Router();

//handlers
const signUp = require('../controllers/SignUp');
router.post('/signup',signUp);