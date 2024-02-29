import React from "react";
import Book_Appointement from "../Components/Home/Book_Appointement";
import { Link } from "react-router-dom";
import Brands from "../Components/Home/Brands/Brands";
import Special_Services from "../Components/Home/Special Services/Special_Services";
import Latest_News from "../Components/Home/Latest_News/Latest_News";

const Home = () => {
  return (
    <div>
      <div>
        <Book_Appointement />
        <Brands/>
        <Special_Services/>
        <Latest_News/>
      </div>
    </div>
  );
};

export default Home;
