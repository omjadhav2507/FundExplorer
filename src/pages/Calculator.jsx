import React, { useState } from "react";
import SIP from "./SIP";
import Lumpsum from "./Lumpsum";

function Calculator() {
  const [calculatorType, setCalculatorType] = useState("sip");

  const handleSipClick = () => {
    setCalculatorType("sip");
  };

  const handleLumpsumClick = () => {
    setCalculatorType("lumpsum");
  };

  return (
    <div className="bg-gray-0 py-2 mx-auto my-5  flex flex-col items-center justify-center">
      <div className="flex gap-6 mb-4">
        <button
          onClick={handleSipClick}
          className={`text-black-200 ${calculatorType === "sip" ? "font-bold border-b-2 border-blue-500 pb-1" : ""} px-4 py-2 hover:text-blue-600 focus:outline-none`}
        >
          SIP
        </button>
        <button
          onClick={handleLumpsumClick}
          className={`text-black-200 ${calculatorType === "lumpsum" ? "font-bold border-b-2 border-blue-500 pb-1" : ""} px-4 py-2 hover:text-blue-600 focus:outline-none`}
        >
          Lumpsum
        </button>
      </div>
      {calculatorType === "sip" && <SIP />}
      {calculatorType === "lumpsum" && <Lumpsum />}
    </div>
  );
}

export default Calculator;
