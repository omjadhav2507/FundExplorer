import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-center items-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <Link to='/'><h1 className="text-white text-lg font-semibold ml-2">
            FundExplorer
          </h1></Link>
        </div>
      </nav>

     
    </>
  );
}

export default Header;
