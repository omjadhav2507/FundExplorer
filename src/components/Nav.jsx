import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav>
      <div className="flex items-center justify-center gap-x-6  mt-[-20px]">
        <Link to="/calculator">
          <button
            onClick={() => handleLinkClick("calculator")}
            className={`text-base sm:text-lg font-semibold leading-8 focus:outline-none ${
              activeLink === "calculator"
                ? "text-blue-700 bg-blue-100 hover:bg-blue-200"
                : "text-gray-900 hover:text-blue-700 hover:bg-gray-200 transition-colors duration-300"
            } rounded-md px-2 py-2`}
          >
            Investment Calculator
          </button>
        </Link>
        <Link to="/tracker">
          <button
            onClick={() => handleLinkClick("tracker")}
            className={`text-base sm:text-lg font-semibold leading-6 focus:outline-none ${
              activeLink === "tracker"
                ? "text-blue-700 bg-blue-100 hover:bg-blue-200"
                : "text-gray-900 hover:text-blue-700 hover:bg-gray-200 transition-colors duration-300"
            } rounded-md px-4 py-2`}
          >
            Fund Tracker
          </button>
        </Link>
        <Link to="/comparison">
          <button
            onClick={() => handleLinkClick("comparison")}
            className={`text-base sm:text-lg font-semibold leading-6 focus:outline-none ${
              activeLink === "comparison"
                ? "text-blue-700 bg-blue-100 hover:bg-blue-200"
                : "text-gray-900 hover:text-blue-700 hover:bg-gray-200 transition-colors duration-300"
            } rounded-md px-4 py-2`}
          >
            Fund Comparison
          </button>
        </Link>
      </div>
    </nav>
  );
}
