const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authentication = (req,res,next)=>{

    try{
        console.log(req);

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
            //adding this payload to req as user attribute for authorization middleware;
            req.user = decodedToken;
        }catch(err){
            console.log(err);
            return res.status(400).json({
                success:false,
                message:"Token is not Valid"
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

//authorization;
exports.isPatient = (req,res,next) =>{

    try{
        console.log(req.user);
        if(req.user.role!='Patient')
        {
            return res.status(400).json({
                success:false,
                message:"This route is authorized to Patients only"
            })
        }
        next();

    }catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Role is not matching"
        })
    }
}
exports.isDoctor = (req,res,next) =>{

    try{

        if(req.user.role!='Doctor')
        {
            return res.status(400).json({
                success:false,
                message:"This route is authorized to Doctors only"
            })
        }
        next();

    }catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Role is not matching"
        })
    }
}
