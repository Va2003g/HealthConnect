import React from "react";
import ShowAllUserAppointements from "../Components/Home/Book_Appointement/showAllUserAppointements";
import ShowAllUserAppointementsByHospital from "../Components/Home/Book_Appointement/showAllUserAppointementsByHospital";

const ViewAppointements = () => {
  return (
    <div>
      <div className="text-2xl text-center">Scheduled Appointements</div>
      <div className="text-2xl text-center">Appointements as Per Doctor</div>
      <ShowAllUserAppointements />
      <div className="text-2xl text-center">Appointements as Per Hospital</div>
      <ShowAllUserAppointementsByHospital />
    </div>
  );
};

export default ViewAppointements;
