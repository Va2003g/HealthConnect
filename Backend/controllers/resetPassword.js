const User = require('../models/User');
const sendMail = require('../utilities/mailSender');
const bcrypt = require('bcrypt');
exports.resetPasswordToken = async (req,res)=>
{
    try{
        const {email} = req.body;
        console.log(email);
        // console.log(req);
        const findUser = await User.findOne({email});
        if(!findUser)
        {
            return res.status(400).json({
                success:false,
                message:"You are not registered with us."
            })
        }
        let time = Date.now() + 1*60*1000;
        let id = findUser._id + '.' + time;
        console.log(id);
        const url = `https://healthconnect-e0t5.onrender.com/Reset_Password/${id}`;
        // const url = `http://localhost:3000/Reset_Password/${id}`;
        

        const emailBody = `Hi ${findUser.name},<br><br>Kindly click this <a href="${url}">link</a> to reset your password.`;
        await sendMail(email, 'Reset Password', emailBody);
        return res.status(200).json({
            success:true,
            message:"Email send successfully"
        })
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"Error in reset your password. Try after some time."
        })
    }

}

//resetPassword

exports.resetPassword = async (req,res)=>
{
    try{
        const {password,confirmPassword,id} = req.body;
        console.log(password,confirmPassword,id);
        if(password!=confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Passwords do not match."
            })
        }

        let temp = id.split('.');
        let time = temp[1];
        let newId = temp[0];
        console.log(id);
        console.log(time);
        let checkUser = await User.findById(newId);
        if(!checkUser)
        {
            return res.status(400).json({
                success:false,
                message:"Invalid Link"
            })
        }

        if(Date.now() > time)
        {
            return res.status(400).json({
                success:false,
                message:"Link Expired!!"
            })
        }
        let encryptedPassword;
        try
        {
            encryptedPassword = await bcrypt.hash(password,10);
        }
        catch(err)
        {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Error in hashing password"
            })
        }

        await User.findByIdAndUpdate(newId,{password:encryptedPassword});

        return res.status(200).json({
            success:true,
            message:"Successfully Reset Your Password. Kindly Login Again!!"
        })

    }catch (err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to reset the password. Try again after some time."
        })
    }
}