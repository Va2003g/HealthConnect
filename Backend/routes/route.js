const express = require('express');
const router = express.Router();
// const hospital = require('../models/Hospital')
const Hospital = require('../models/Hospital');
//landing route
router.get('/',(req,res)=>res.send(`<h1>Health Connect Backend</h1>`))

//signup handlers
const signUp = require('../controllers/SignUp');
router.post('/signup',signUp.signup);

//login handlers
const {login} = require('../controllers/login');
router.post('/login',login);

//forget password
const {resetPasswordToken,resetPassword} = require('../controllers/resetPassword');
router.post('/reset-password-token',resetPasswordToken);
router.put('/reset-password',resetPassword);

//getting hospital data for checking
// router.get('/get-hospital-data', async (req,res)=>{
//     try{
//         let data = await Hospital.find({State:"Punjab"});
//         res.status(200).json(data);
//     }catch(err)
//     {
//         console.log(err);
//         res.status(500).send({
//             message:"Failed",
//         });
//     }
// });
const {authentication,isPatient,isDoctor} = require('../middleware/authentication');
const {getHospitalData} = require('../controllers/getHospitalData');
// router.get('/get-hospital-data',authentication,getHospitalData);
router.get('/get-hospital-data',getHospitalData);

router.get('/test',authentication,isPatient,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Welcome to protected route for Patient"
    })
})

module.exports = router;