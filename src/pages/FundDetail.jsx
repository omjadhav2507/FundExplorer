import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fund from "../components/Data";
import Chart from "chart.js/auto";

function FundDetail() {
  const { name } = useParams();
  const fund = Fund.find((item) => item.fund_name === name);

  const chartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    if (fund) {
      const labels = fund.trailing_returns.periods.map(
        (period) => period.period
      );
      const thisFundData = fund.trailing_returns.periods.map((period) =>
        parseFloat(period.this_fund.replace("%", ""))
      );
      const categoryAverageData = fund.trailing_returns.periods.map((period) =>
        parseFloat(period.category_average.replace("%", ""))
      );

      const ctx = document.getElementById("returnChart");

      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "This Fund",
              data: thisFundData,
              fill: false,
              borderColor: "#4CAF50",
              tension: 0.1,
            },
            {
              label: "Category Average",
              data: categoryAverageData,
              fill: false,
              borderColor: "#FF5722",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          },
        },
      });
    }
  }, [fund]);

  const drawChart = (investedAmount, returns) => {
    const ctx = document.getElementById("myChart").getContext("2d");

    if (window.myChart instanceof Chart) {
      window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Invested Amount", "Estimated Returns"],
        datasets: [
          {
            label: "Invested Amount",
            data: [investedAmount, 0], // Set returns to 0 for the invested amount
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderWidth: 1,
          },
          {
            label: "Estimated Returns",
            data: [0, returns], // Set invested amount to 0 for the returns
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Investment Visualization",
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
  };

  const [monthlyInvestment, setMonthlyInvestment] = useState(1000);
  const [investmentDuration, setInvestmentDuration] = useState(3);
  const [expectedReturns, setExpectedReturns] = useState(0);
  const [totalInvestedAmount, setTotalInvestedAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (fund) {
      const durationYears = investmentDuration >= 1 ? investmentDuration : 1;
      const period = fund.trailing_returns.periods.find(
        (period) => period.period === `${durationYears} years`
      );
      if (period) {
        setExpectedReturns(parseFloat(period.this_fund.replace("%", "")));
      }
    }
  }, [investmentDuration, fund]);

  const calculateInvestment = () => {
    if (expectedReturns !== 0) {
      const monthlyRate = expectedReturns / 12 / 100;
      const totalMonths = investmentDuration * 12;

      const futureValue =
        monthlyInvestment *
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

      const totalInvested = monthlyInvestment * totalMonths;

      const returns = futureValue - totalInvested;

      setTotalInvestedAmount(totalInvested);
      setEstimatedReturns(returns);
      setTotalValue(futureValue);
    }
  };

  useEffect(() => {
    drawChart(totalInvestedAmount, estimatedReturns);
  }, [totalInvestedAmount, investmentDuration]);

  useEffect(() => {
    calculateInvestment();
    drawPieChart();
  });

  const drawPieChart = () => {
    if (fund && fund.asset_allocation) {
      const { equity, debt, other } = fund.asset_allocation;

      const assetLabels = ["Equity", "Debt", "Other"];
      const assetValues = [
        parseFloat(equity.replace("%", "")),
        parseFloat(debt.replace("%", "")),
        parseFloat(other.replace("%", "")),
      ];

      const ctx = document.getElementById("pieChart");

      if (pieChartRef.current !== null) {
        pieChartRef.current.destroy();
      }

      pieChartRef.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: assetLabels,
          datasets: [
            {
              label: "Asset Allocation",
              data: assetValues,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Asset Allocation",
            },
          },
        },
      });
    } else {
      console.error(
        "Asset allocation data is missing or not in the correct format."
      );
    }
  };

  useEffect(() => {
 
    const destroyChart = (canvasId) => {
      const chartInstance = Chart.getChart(canvasId);
      if (chartInstance) {
        chartInstance.destroy();
      }
    };

    const topCategories = Fund.map((fund) => ({
      category: fund.category,
      percentage: parseFloat(fund.asset_allocation.equity.replace("%", "")),
    }));

    topCategories.sort((a, b) => b.percentage - a.percentage);

   
    const topSectors = Fund.reduce((acc, fund) => {
      fund.top_sectors.forEach((sector) => {
        const existingSector = acc.find(
          (item) => item.sector === sector.sector
        );
        if (existingSector) {
          existingSector.percentage += parseFloat(
            sector.percentage.replace("%", "")
          );
        } else {
          acc.push({
            sector: sector.sector,
            percentage: parseFloat(sector.percentage.replace("%", "")),
          });
        }
      });
      return acc;
    }, []);

   
    topSectors.sort((a, b) => b.percentage - a.percentage);

    
    const categoryCanvas = document.getElementById("categoryChart");
    destroyChart("categoryChart"); 
    new Chart(categoryCanvas, {
      type: "bar",
      data: {
        labels: topCategories.map((category) => category.category),
        datasets: [
          {
            label: "Percentage",
            data: topCategories.map((category) => category.percentage),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Percentage",
            },
          },
          x: {
            title: {
              display: true,
              text: "Category",
            },
          },
        },
      },
    });


    const sectorCanvas = document.getElementById("sectorChart");
    destroyChart("sectorChart"); 
    new Chart(sectorCanvas, {
      type: "bar",
      data: {
        labels: topSectors.map((sector) => sector.sector),
        datasets: [
          {
            label: "Percentage",
            data: topSectors.map((sector) => sector.percentage),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Percentage",
            },
          },
          x: {
            title: {
              display: true,
              text: "Sector",
            },
          },
        },
      },
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <div className="flex flex-col items-center justify-center mt-5  w-full">
        <section className="w-3/4">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-8 lg:px-6">
            <div className="max-w-screen-lg">
              <h2 className="mb-4 text-2xl font-semibold dark:black-white">
                {fund.fund_name}
              </h2>

              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    Equity
                  </button>

                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    {fund.category}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center justify-center mt-5 w-full ">
        <section className="w-3/4 flex flex-row">
          <div className="w-1/2 ">
            <div className="p-8 -mt-10">
              <h2 className="text-xl font-bold mb-4">Fund Overview</h2>
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td className="border px-6 py-4 text-base font-medium">
                      VRO Rating
                    </td>
                    <td className="border px-6 py-4 text-base">
                      {fund.fund_overview.VRO_rating}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-6 py-4 text-base font-medium">
                      Expense Ratio
                    </td>
                    <td className="border px-6 py-4 text-base">
                      {fund.fund_overview.expense_ratio}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-6 py-4 text-base font-medium">
                      Exit Load
                    </td>
                    <td className="border px-6 py-4 text-base">
                      {fund.fund_overview.exit_load}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-6 py-4 text-base font-medium">
                      AUM
                    </td>
                    <td className="border px-6 py-4 text-base">
                      {fund.fund_overview.AUM}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-6 py-4 text-base font-medium">
                      Lock-in
                    </td>
                    <td className="border px-6 py-4 text-base">
                      {fund.fund_overview.lock_in}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-6 py-4 text-base font-medium">
                      Age
                    </td>
                    <td className="border px-6 py-4 text-base">
                      {fund.fund_overview.age}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-6 py-4 text-base font-medium">
                      Benchmark
                    </td>
                    <td className="border px-6 py-4 text-base">
                      {fund.fund_overview.benchmark}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-6 py-4 text-base font-medium">
                      Minimum Investment
                    </td>
                    <td className="border px-6 py-4 text-base">
                      {fund.fund_overview.min_investment}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-6 py-4 text-base font-medium">
                      Risk
                    </td>
                    <td className="border px-6 py-4 text-base">
                      {fund.fund_overview.risk}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-1/2">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-8 lg:px-6">
              <canvas
                id="returnChart"
                width="200"
                height="200"
                style={{ border: "1px solid #ccc" }}
              ></canvas>
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center justify-center mt-5 w-full">
        <div className="max-w-4xl w-full px-8 py-4 rounded-lg border border-solid border-gray-400">
          <div className="flex justify-between">
            <div className="w-3/4 pr-4">
              <h2 className="text-2xl font-semibold mb-4">
                Returns calculator
              </h2>
              <div className="mb-4">
                <label className="block mb-1">
                  Monthly Investment Amount (₹):
                </label>
                <input
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) =>
                    setMonthlyInvestment(parseFloat(e.target.value))
                  }
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">
                  Investment Duration (Years):
                </label>
                <input
                  type="number"
                  value={investmentDuration}
                  onChange={(e) =>
                    setInvestmentDuration(parseFloat(e.target.value))
                  }
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <button
                onClick={calculateInvestment}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Calculate
              </button>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Results:</h3>
                <p>Invested Amount: ₹{totalInvestedAmount.toFixed(0)}</p>
                <p>Estimated Returns: ₹{estimatedReturns.toFixed(0)}</p>
                <p>Total Value: ₹{totalValue.toFixed(0)}</p>
              </div>
            </div>
            <div className="w-1/2 pl-8 mt-5">
              <canvas id="myChart" width="400" height="400"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-5 w-full">
        <section className="w-3/4">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-8 lg:px-6">
            <div className="max-w-screen-lg">
              <h2 className="mb-4 text-2xl font-bold dark:black-white">
                Asset allocation
              </h2>

              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <p className="mb-4 text-1xl font-semibold dark:black-white">
                  {fund.asset_allocation.as_on}
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-2 gap-2" style={{width:"85%"}}>
          <div className="col-span-1 w-3/6">
            <canvas
              id="pieChart"
              className="w-full h-full "
              width="300"
              height="600"
            ></canvas>
          </div>

          <div className="col-span-1">
            <div className="w-full mt-5">
              <canvas id="categoryChart" width="400" height="200"></canvas>
            </div>

            <div className="w-full mt-5">
              <canvas id="sectorChart" width="400" height="200"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundDetail;