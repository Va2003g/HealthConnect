const Hospital = require('../models/Hospital');

exports.getDistrict = async (req, res) => {
    try {
      const { state } = req.query;
  
      if (!state) {
        return res.status(400).json({
          success: false,
          message: "Provide Both State and District"
        });
      }
  
      const hospitalsByState = await Hospital.find({ State: state });
  
      // Extract unique districts using Set
      const uniqueDistricts = new Set(hospitalsByState.map(hospital => hospital.District));
  
      return res.status(200).json({
        success: true,
        Data: {
        //   hospitals: hospitalsByState, // Include full hospital data if needed
          uniqueDistricts: [...uniqueDistricts] // Convert Set to an array for easier consumption
        },
        Count: uniqueDistricts.length
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Unable to fetch hospital data. Try again after some time"
      });
    }
  };