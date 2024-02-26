
const User = require('../models/User');
const bcrypt = require('bcrypt');
exports.signup = async(req,res) => {
    try{
        //fetching data from request body
        const {FirstName, LastName, Email, Password, ConfirmPassword, accountType}= req.body;
        const name = FirstName + " " + LastName;
        console.log(Email);
        
        if(Password!=ConfirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Passwords do not match"
            })
        }

        const userFind = await User.findOne({email:Email});
        console.log(userFind);
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
            encryptedPassword = await bcrypt.hash(Password,10);
        }catch(err)
        {
            return res.status(500).json({
                success:false,
                message:"Error in hashing password",
            })
        }

        const newUser = await User.create({
            name,
            email:Email,
            password:encryptedPassword,
            role:accountType,
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