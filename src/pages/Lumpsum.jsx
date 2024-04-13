import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function Lumpsum() {
  const [lumpSumInvestment, setLumpSumInvestment] = useState(50000);
  const [expectedAnnualReturns, setExpectedAnnualReturns] = useState(12);
  const [investmentDuration, setInvestmentDuration] = useState(5); 
  const [totalInvestedAmount, setTotalInvestedAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    calculateInvestment();
  }, [lumpSumInvestment, expectedAnnualReturns, investmentDuration]);

  const calculateInvestment = () => {
    const r = expectedAnnualReturns / 100; 
    const n = 1; 

    const totalAmountInvested = lumpSumInvestment;

    const maturityAmount = totalAmountInvested * Math.pow((1 + r/n), investmentDuration * n);
    const returns = maturityAmount - totalAmountInvested;

    setTotalInvestedAmount(totalAmountInvested);
    setEstimatedReturns(returns);
    setTotalValue(maturityAmount);

    drawChart(totalAmountInvested, returns);
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
    <div className="max-w-4xl w-full px-8 py-4 bg-white border-solid rounded-lg">
      <div className="flex justify-between">
        <div className="w-1/2 pr-4">
          <h2 className="text-2xl font-semibold mb-4">Investment Calculator for Lumpsum</h2>
          <div className="mb-4">
            <label className="block mb-1">Lump Sum Investment Amount (₹):</label>
            <input
              type="number"
              value={lumpSumInvestment}
              onChange={(e) => setLumpSumInvestment(parseFloat(e.target.value))}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Expected Annual Returns (%):</label>
            <input
              type="number"
              value={expectedAnnualReturns}
              onChange={(e) => setExpectedAnnualReturns(parseFloat(e.target.value))}
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
  );
}

export default Lumpsum;
