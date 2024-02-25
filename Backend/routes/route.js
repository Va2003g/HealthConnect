const express = require('express');
const router = express.Router();
const hospital = require('../models/Hospital')
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
const Hospital = require('../models/Hospital');
router.post('/reset-password-token',resetPasswordToken);

//getting hospital data for checking
router.get('/get-hospital-data', async (req,res)=>{
    try{
        let data = await Hospital.find({State:"Punjab"});
        res.status(200).json(data);
    }catch(err)
    {
        console.log(err);
        res.status(500).send({
            message:"Failed",
        });
    }
    // 
})

module.exports = router;