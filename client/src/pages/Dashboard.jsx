import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import TransactionCard from "../components/TransactionCard";
import RecentTransaction from "../components/RecentTransaction";

const categories = [
  "Salary",
  "Groceries",
  "Dining",
  "Transport",
  "Entertainment",
  "Others",
];
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import NoTransactions from "../components/NoTransactions";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const [maxExpense, setMaxExpense] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:9000/get-all-transactions")
      .then((res) => {
        // console.log(res.data.transactions);
        // existingTransactions = res.data.transactions;
        // storedTransactions = res.data.transactions;
        setTransactions(res.data.transactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
    // const existingTransactions =
    //   JSON.parse(localStorage.getItem("transactions")) || [];
    // setTransactions(existingTransactions);
  }, []);
  useEffect(() => {
    if (transactions.length === 0) return;

    let income = 0;
    let expense = 0;
    let categoryBreakDown = {};
    let highestExpense = 0;
    categories.forEach((cat) => {
      categoryBreakDown[cat] = 0;
    });
    transactions.forEach((data) => {
      if (data.type == "income" || data.type == "Income") {
        income = income + data.amount;
      } else {
        expense = expense + data.amount;
        categoryBreakDown[data.category] =
          (categoryBreakDown[data.category] || 0) + data.amount;
        if (categoryBreakDown[data.category] > highestExpense) {
          highestExpense = categoryBreakDown[data.category];
        }
      }
    }, []);

    setTotalExpense(expense);
    setTotalIncome(income);
    setBalance(income - expense);
    setCategoryData(categoryBreakDown);
    setMaxExpense(highestExpense);
    console.log(totalIncome, totalExpense, balance);
  }, [transactions]);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses per Category",
        data: categories.map((cat) => categoryData[cat] || 0),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#9966FF",
          "#FFA07A",
        ],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: maxExpense > 0 ? maxExpense * 1.2 : 10,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles["dashboard-inner"]}>
        <h2>Dashboard</h2>
        <button
          className={styles["add-transaction"]}
          onClick={() => navigate("/add-transaction")}
        >
          + Add transaction
        </button>
      </div>
      <TransactionCard
        balance={balance}
        income={totalIncome}
        expense={totalExpense}
      ></TransactionCard>
      <div className={styles["transactions-chart-row"]}>
        <div className={`${styles["transactions"]} half-width`}>
          <h3>Recent Transactions</h3>
          {transactions.length == 0 ? (
            <NoTransactions></NoTransactions>
          ) : (
            <RecentTransaction transactions={transactions}></RecentTransaction>
          )}
        </div>
        <div className={`${styles["expense-chart"]} half-width`}>
          <h3>Expense by Category</h3>
          {chartData.datasets[0].data.every((value) => value === 0) ? (
            <NoTransactions />
          ) : (
            <div className={styles["chart-container"]}>
              <Bar data={chartData} options={chartOptions}></Bar>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
