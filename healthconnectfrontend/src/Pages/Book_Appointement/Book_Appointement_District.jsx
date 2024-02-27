import React from "react";
import Book_Appointement_Template from "../../Components/Home/Book_Appointement/Book_Appointement_Template";
import { useLocation } from "react-router-dom";

const Book_Appointement_District = () => {
  const location = useLocation();
  const state = location.state && location.state.stateName;
  {console.log("Book_Appointement_District " + state);}
  return <Book_Appointement_Template type="District"/>;
};

export default Book_Appointement_District;
