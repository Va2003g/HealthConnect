const Hospital = require("../models/Hospital");
exports.Get_NearBy_Hospitals = async (req, res) => {
  try {
    console.log("Request received:", req.query);

    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Provide Both Coordinates",
      });
    }

    console.log("Fetching hospitals from database...");
    const allHospitals = await Hospital.find({ Location_Coordinates: { $exists: true } });

    console.log("Filtering nearby hospitals...");
    const nearbyHospitals = allHospitals.filter((hospital) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        hospital.Location_Coordinates
      );
      return distance <= 30;
    });

    console.log("Sending response...");
    return res.status(200).json({
      success: true,
      Data: {
        nearbyHospitals,
      },
      Count: nearbyHospitals.length,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch hospital data. Try again after some time",
    });
  }
};

function calculateDistance(lat1, lon1, coordinates) {
    if (!coordinates) {
      // Handle case where coordinates are null or undefined
      return 10000000; // Or any other suitable value indicating invalid coordinates
    }
  
    const [hospitalLat, hospitalLon] = coordinates.split(",").map(parseFloat);
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (hospitalLat - lat1) * (Math.PI / 180);
    const dLon = (hospitalLon - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(hospitalLat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }
  