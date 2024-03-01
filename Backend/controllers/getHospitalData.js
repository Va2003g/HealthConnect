const Hospital = require('../models/Hospital');

exports.getHospitalData = async (req,res)=>
{
    try
    {
        const {state,district} = req.query;

        if(!state || !district)
        {
            return res.status(400).json({
                success:false,
                message:"Provide Both State and District"
            })
        }

        const data = await Hospital.find({State:state,District:district});

        console.log(data.length);
        return res.status(200).json({
            success:true,
            Data:data,
            Count:data.length
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to fetch Hospital Data. Try again after some time"
        })
    }
}