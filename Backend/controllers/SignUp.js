
const User = require('../models/User');
const bcrypt = require('bcrypt');
exports.signup = async(req,res) => {
    try{
        //fetching data from request body
        const {name , email, password, role}= req.body;
        console.log(name,email,password,role);

        const userFind = await User.findOne({email});
        if(userFind)
        {
            return res.status(400).json({
                success:false,
                message:'You are already registered with us',
            })
        }
        
        //const variable need definition also.
        let encryptedPassword;

        try{
            encryptedPassword = await bcrypt.hash(password,10);
        }catch(err)
        {
            return res.status(500).json({
                success:false,
                message:"Error in hashing password",
            })
        }

        const newUser = await User.create({
            name,
            email,
            password:encryptedPassword,
            role,
        });

        return res.status(200).json({
            success:true,
            message: `Welcome to Health Connect ${name}`,
        })

    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Server Error in signing up. Try after some time",
        })
    }
};