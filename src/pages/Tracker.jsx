import React from "react";
import Fund from "../components/Data";
import { Link } from "react-router-dom";

function Tracker() {
  const SmallCapFunds = Fund.filter((fund) =>
    fund.category.includes("Small-Cap")
  );
  const MidCapFunds = Fund.filter((fund) => fund.category.includes("Mid-Cap"));
  const LargeCapFunds = Fund.filter((fund) =>
    fund.category.includes("Large-Cap")
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen mt-5">
        <div className="table-container mb-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400 border border-black">
              <thead className="text-xs bg-white dark:bg-gray-900 dark:text-white">
                <tr>
                  <th className="px-6 py-3">Small-Cap</th>
                  <th className="px-6 py-3">Fund Size</th>
                  <th className="px-6 py-3">5 years</th>
                  <th className="px-6 py-3">VRO Rating</th>
                  <th className="px-6 py-3">Min. investment</th>
                </tr>
              </thead>
              <tbody>
                {SmallCapFunds.map((fund, index) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-50 dark:odd:bg-gray-800 even:bg-white dark:even:bg-gray-900 border-b border-black"
                  >
                    <td className="px-6 py-4 font-medium">
                      <Link to={`/fund/${encodeURIComponent(fund.fund_name)}`}>
                        {fund.fund_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{fund.fund_overview.AUM}</td>
                    <td className="px-6 py-4">
                      {fund.trailing_returns.periods
                        .filter((p) => p.period === "5 years")
                        .map((period) => `+${period.this_fund}`)}
                    </td>
                    <td className="px-6 py-4">
                      {fund.fund_overview.VRO_rating}
                    </td>
                    <td className="px-6 py-4">
                      {fund.fund_overview.min_investment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="table-container mb-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400 border border-black">
              <thead className="text-xs bg-white dark:bg-gray-900 dark:text-white">
                <tr>
                  <th className="px-6 py-3">Mid-Cap</th>
                  <th className="px-6 py-3">Fund Size</th>
                  <th className="px-6 py-3">5 years</th>
                  <th className="px-6 py-3">VRO Rating</th>
                  <th className="px-6 py-3">Min. investment</th>
                </tr>
              </thead>
              <tbody>
                {MidCapFunds.map((fund, index) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-50 dark:odd:bg-gray-800 even:bg-white dark:even:bg-gray-900 border-b border-black"
                  >
                    <td className="px-6 py-4 font-medium">
                      <Link to={`/fund/${encodeURIComponent(fund.fund_name)}`}>
                        {fund.fund_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{fund.fund_overview.AUM}</td>
                    <td className="px-6 py-4">
                      {fund.trailing_returns.periods
                        .filter((p) => p.period === "5 years")
                        .map((period) => `+${period.this_fund}`)}
                    </td>
                    <td className="px-6 py-4">
                      {fund.fund_overview.VRO_rating}
                    </td>
                    <td className="px-6 py-4">
                      {fund.fund_overview.min_investment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="table-container mb-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400 border border-black">
              <thead className="text-xs bg-white dark:bg-gray-900 dark:text-white">
                <tr>
                  <th className="px-6 py-3">Large-Cap</th>
                  <th className="px-6 py-3">Fund Size</th>
                  <th className="px-6 py-3">5 years</th>
                  <th className="px-6 py-3">VRO Rating</th>
                  <th className="px-6 py-3">Min. investment</th>
                </tr>
              </thead>
              <tbody>
                {LargeCapFunds.map((fund, index) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-50 dark:odd:bg-gray-800 even:bg-white dark:even:bg-gray-900 border-b border-black"
                  >
                    <td className="px-6 py-4 font-medium">
                      <Link to={`/fund/${encodeURIComponent(fund.fund_name)}`}>
                        {fund.fund_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{fund.fund_overview.AUM}</td>
                    <td className="px-6 py-4">
                      {fund.trailing_returns.periods
                        .filter((p) => p.period === "5 years")
                        .map((period) => `+${period.this_fund}`)}
                    </td>
                    <td className="px-6 py-4">
                      {fund.fund_overview.VRO_rating}
                    </td>
                    <td className="px-6 py-4">
                      {fund.fund_overview.min_investment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tracker;
