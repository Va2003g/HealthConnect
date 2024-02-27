import React, { useContext } from "react";
import StateData from "../../../Assets/states-and-districts.json";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

const Book_Appointement_District_Data = () => {
  const { state } = useContext(AppContext);
  const stateObject = StateData.states.find((item) => item.state === state);
  const districts = stateObject ? stateObject.districts : [];

  return (
    <div className="h-[73vh] overflow-scroll">
      <div className="text-2xl text-center">Select District</div>
      <div>
        {console.log(state)};
        {districts.map((name, index) => (
          <button
            key={index}
            className="w-[47%] text-centre m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Book_Appointement_District_Data;
