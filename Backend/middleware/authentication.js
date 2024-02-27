const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authentication = (req,res,next)=>{

    try{

        const token = req.cookies.authToken || req.header("Authorization");
        console.log(token);

        if(!token || token==undefined)
        {
            return res.status(400).json({
                success:false,
                message:"Token Not Found"
            })
        }

        try{
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
            console.log(decodedToken);
        }catch(err){
            console.log(err);
            return res.status(400).json({
                success:false,
                messsage:"Token is not Valid"
            })
        }
    }catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Server error while token verification"
        })
    }
    next();
}