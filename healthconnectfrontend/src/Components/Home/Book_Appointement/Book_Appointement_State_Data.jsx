import React from "react";
import StateData from "../../../Assets/states-and-districts.json";
import { useNavigate } from "react-router-dom";

const Book_Appointement_State_Data = () => {
  const stateNames = StateData.states.map((state) => state.state);

  const navigate = useNavigate();
  const handleClickChange = (name) => {
    navigate("/districts", { state: { stateName: name } });
  };

  return (
    <div className="h-[73vh] overflow-scroll">
      <div className="text-2xl text-center">Select State</div>
      <div>
        {stateNames.map((name) => (
          <button
            onClick={() => handleClickChange(name)}
            className="w-[47%] text-centre m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Book_Appointement_State_Data;
