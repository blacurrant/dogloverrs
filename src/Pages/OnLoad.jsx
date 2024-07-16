import React from "react";
import { Link } from "react-router-dom";

const OnLoad = () => {
  return (
    <div className=" container mx-auto flex flex-col gap-10 items-center text-2xl font-bold h-[90vh]">
      <div className="h-[10vh] w-full flex justify-between py-5">
        <h1 className="text-3xl font-bold text-gray-300">doglovers.</h1>
        <Link
          className="flex gap-2 font-light
                 items-center justify-center py-2 appearance-none border border-gray-200 w-fit px-5 rounded-md"
          to="/login"
        >
          Login
        </Link>
      </div>
      <div className="h-full w-full flex justify-center items-center border border-gray-200">landingpage.jsx</div>
    </div>
  );
};

export default OnLoad;
