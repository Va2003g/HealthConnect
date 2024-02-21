const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"Kindly provide complete details"
            })
        }
        
        let existedUser = await User.findOne({email});
        console.log(existedUser)
        if(!existedUser)
        {
            return res.status(400).json({
                success:false,
                message:"Sorry!! Kindly signup first"
            })
        }
        if(await bcrypt.compare(password,existedUser.password))
        {
            return res.status(200).json({
                success:true,
                message:`${existedUser.name} logged successfully`
            })
        }
        else
        {
            return res.status(400).json({
                success:false,
                message:"Wrong Password",
            })
        }

    }catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Can't able to sign up. Try after some time."
        })
    }
};