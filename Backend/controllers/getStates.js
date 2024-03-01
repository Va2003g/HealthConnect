const Hospital = require('../models/Hospital');

const getUniqueStates = async (req, res) => {
  try {
    const uniqueStates = await Hospital.distinct('State');

    res.json(uniqueStates);
  } catch (error) {
   
    console.error("Error fetching unique states:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUniqueStates
};
