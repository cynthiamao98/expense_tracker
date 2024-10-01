import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./App.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [amount, setAmount] = useState("");
  const [totalSpent, setTotalSpent] = useState(0);
  const [transactionType, setTransactionType] = useState("");
  const transactionTypes = ["Food", "Transport", "Entertainment"];
  const [transactionTypeTotals, setTransactionTypeTotals] = useState<
    Record<string, number>
  >({});

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionType(e.target.value);
  };

  const handleSubmit = () => {
    const amountNum = parseFloat(amount);
    if (!isNaN(amountNum) && transactionType) {
      setTotalSpent((prevTotal) => prevTotal + amountNum);
      setTransactionTypeTotals((prevTotals) => ({
        ...prevTotals,
        [transactionType]: (prevTotals[transactionType] || 0) + amountNum,
      }));
      console.log(`Submitting transaction: $${amount} for ${transactionType}`);
      console.log(`New total spent: $${(totalSpent + amountNum).toFixed(2)}`);
      setAmount("");
      setTransactionType("");
    } else {
      console.error("Invalid amount or transaction type not selected");
    }
  };

  const chartData = {
    labels: transactionTypes,
    datasets: [
      {
        data: transactionTypes.map((type) => transactionTypeTotals[type] || 0),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const isButtonDisabled = !amount || !transactionType;

  return (
    <div className="App">
      <h1 className="app-header">Expense Tracker</h1>
      <div className="main-content">
        <div className="input-section">
          <div className="input-group">
            <div className="input-container">
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter dollar amount"
              />
              <select value={transactionType} onChange={handleTypeChange}>
                <option value="">Select type</option>
                {transactionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isButtonDisabled}
              className={isButtonDisabled ? "disabled" : ""}
            >
              Enter Expense
            </button>
          </div>
        </div>
        <div className="chart-section">
          <h2>Spending Summary:</h2>
          <p>Total amount spent: ${totalSpent.toFixed(2)}</p>
          <div className="chart-container">
            <Pie data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
