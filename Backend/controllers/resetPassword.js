const User = require('../models/User');
const sendMail = require('../utilities/mailSender');
exports.resetPasswordToken = async (req,res)=>{
    try{
        const {email} = req.body;
        const findUser = await User.findOne({email});
        if(!findUser)
        {
            res.status(400).json({
                success:false,
                message:"You are not registered with us."
            })
        }

        await sendMail(email,'Reset Password',`Hi ${findUser.name}, Kindly click the link to reset your password.`);

        return res.status(200).json({
            success:true,
            message:"Email send successfully"
        })
    }catch(error)
    {
        res.status(500).json({
            success:false,
            message:"Error is reseting the password. Try after some time."
        })
    }

}

//resetPassword