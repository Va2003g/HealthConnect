import React from "react";
import { FcApproval} from "react-icons/fc";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useContext,useEffect } from "react";
import { AppContext } from "../../Context/AppContext";

const Book_Appointement_DatesData = () => {
  const [value, onChange] = useState(new Date());
  const [datesToColor,setDatesToColor] = useState([]);
  const [monthlyAvailability,setMonthlyAvailability] = useState([]);
  const tileClassName = ({ date, view }) => {
    if (datesToColor.find((coloredDate) => {
      return coloredDate === date.getDate()
      })) {
      return 'text-green-500 underline decoration-3';
    }
    return '';
  }
  const year = new Date().getFullYear();
  const month = new Date().getMonth()+1;
  console.log(year,month);

  const {appointmentData,setAppointmentData} = useContext(AppContext);
  console.log(appointmentData);
  let dataForDates = {
    hospitalName:appointmentData.hospitalName,
    state:appointmentData.state,
    district:appointmentData.district,
    departmentName:appointmentData.departmentName, 
    month, 
    year
  }
  
  dataForDates = JSON.stringify(dataForDates);
  useEffect(()=>{

    const fetchingDates = async ()=>{

      try{
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/get-dates?data=${dataForDates}`,{
            method:"GET",
            header:{
              'content-type':'application/json',
            },
            // body:JSON.stringify(dataForDates)
          }
        )
        console.log(response)
        if(!response.ok)
        {
          console.log('error in fetching details')
          return;
        }
        const responseData = await response.json();
        console.log('responsedata',responseData);
        setMonthlyAvailability(responseData.monthlyAvailability ||responseData.filteredAppointments || responseData.newMonthDates);
      }catch(err)
      {
        console.log(err);
      }
    }
    fetchingDates();
  },[year,month])

  useEffect(()=>{
    filteringMonthlyAvailability();
  },[monthlyAvailability])
  
  function filteringMonthlyAvailability()
  {

      monthlyAvailability.forEach((array)=>{
        // const date = today.date(i).startOf("day").toDate();
        // const formattedDate = today.date(i).format("YYYY-MM-DD");
          console.log(array.DOA);
          datesToColor.push(new Date(array.DOA).getDate());
      })
      setDatesToColor(datesToColor);
      console.log(datesToColor);   
  }
  return (

    <div className="h-[73vh] flex justify-evenly items-center">
        <div className=" h-[70%] w-[30%] shadow-2xl mx-6 flex flex-col gap-y-2 justify-center">
          <div className="flex items-center gap-1 text-xl">
            <FcApproval />
            Select Type
          </div>
          <div className="flex items-center gap-1 text-xl">
            <FcApproval />
            Select State
          </div>
          <div className="flex items-center gap-1 text-xl">
            <FcApproval />
            Select District
          </div>
          <div className="flex items-center gap-1 text-xl">
            <FcApproval />
            Select Hospital
          </div>
          <div className="flex items-center gap-1 text-xl">
            <FcApproval />
            Select Departement
          </div>
          <div className="flex items-center gap-1 text-xl">
            <FcApproval />
            Select Data Of Appointement
          </div>
          <div className="flex items-center gap-1 text-xl">
            <FcApproval />
            Confirmation Message
          </div>
        </div>
      <div className="flex flex-col gap-[2rem]">
        <div>
          <Calendar onChange={onChange} value={value} showNavigation={false} tileClassName={tileClassName}/>
        </div>
      </div>
    </div>
  );
};

export default Book_Appointement_DatesData;
