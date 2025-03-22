import React from "react";
import styles from "../pages/Dashboard.module.css";

function RecentTransaction({ transactions }) {
  // console.log(transactions);
  const categoryEmojis = {
    Salary: "💰",
    Groceries: "🛒",
    Dining: "🍽",
    Transport: "🚗",
    Entertainment: "🎭",
    Others: "📝",
  };
  return (
    <>
      <ul>
        {transactions
          .slice(-10)
          .reverse()
          .map((data, index) => (
            <li key={index}>
              <span>
                {categoryEmojis[data.category]} {data.category}
              </span>
              <span
                className={`${styles["transaction-amount"]} ${
                  data.type === "Income" ? "income" : "expense"
                }`}
              >
                ₹{data.amount.toLocaleString()}
              </span>
            </li>
          ))}
      </ul>
    </>
  );
}

export default RecentTransaction;
