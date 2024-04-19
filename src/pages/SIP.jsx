import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';

function SIP() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturns, setExpectedReturns] = useState(12);
  const [investmentDuration, setInvestmentDuration] = useState(5); // Default to 1 year
  const [totalInvestedAmount, setTotalInvestedAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    drawChart(totalInvestedAmount, estimatedReturns);
    calculateInvestment()
  }, [totalInvestedAmount, estimatedReturns]);

  const calculateInvestment = () => {
    const monthlyReturnRate = expectedReturns / (12 * 100);
    const totalAmountInvested = monthlyInvestment * investmentDuration * 12;
    const maturityAmount = monthlyInvestment * ((Math.pow((1 + monthlyReturnRate), investmentDuration * 12) - 1) / monthlyReturnRate) * (1 + monthlyReturnRate);

    setTotalInvestedAmount(totalAmountInvested);
    setEstimatedReturns(maturityAmount - totalAmountInvested);
    setTotalValue(maturityAmount);
  };

  const drawChart = (investedAmount, returns) => {
    const ctx = document.getElementById('myChart').getContext('2d');
  
    if (window.myChart instanceof Chart) {
      window.myChart.destroy();
    }
  
    window.myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Invested Amount', 'Estimated Returns'],
        datasets: [{
          label: 'Amount (₹)',
          data: [investedAmount, returns],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Investment Visualization'
          }
        }
      }
    });
  };

  return (
    // <div className="bg-gray-200 py-6 mx-auto my-10 h-screen flex items-center justify-center">
    <div className="max-w-4xl w-full px-8 py-4 bg-white border-2 border-black-500 rounded-lg">
        <div className="flex justify-between">
          <div className="w-1/2 pr-4">
            <h2 className="text-2xl font-semibold mb-4">Investment Calculator for SIP</h2>
            <div className="mb-4">
              <label className="block mb-1">Monthly Investment Amount (₹):</label>
              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(parseFloat(e.target.value))}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Expected Annual Returns (%):</label>
              <input
                type="number"
                value={expectedReturns}
                onChange={(e) => setExpectedReturns(parseFloat(e.target.value))}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Investment Duration (Years):</label>
              <input
                type="number"
                value={investmentDuration}
                onChange={(e) => setInvestmentDuration(parseFloat(e.target.value))}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <button onClick={calculateInvestment} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Calculate
            </button>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Results:</h3>
              <p>Invested Amount: ₹{totalInvestedAmount.toFixed(0)}</p>
              <p>Estimated Returns: ₹{estimatedReturns.toFixed(0)}</p>
              <p>Total Value: ₹{totalValue.toFixed(0)}</p>
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <canvas id="myChart" width="400" height="400"></canvas>
          </div>
        </div>
      </div>
    // </div>
  );
}

export default SIP;
