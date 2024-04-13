import React from 'react';

function Tracker() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Fund Tracker</h1>
      <div className="w-3/4 md:w-1/4">
        <img
          src="https://img.freepik.com/free-vector/investment-data-concept-illustration_114360-5159.jpg?t=st=1713033241~exp=1713036841~hmac=0467a4c6b8953b227b166a2a8a69519ac51ad272b41be4d553b5b84bc9f06253&w=740"
          alt="Investment Data"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default Tracker;
