import React from "react";
import styles from "../pages/Dashboard.module.css";
function TransactionCard({ balance, income, expense }) {
  return (
    <div>
      <div className={styles["balance-card"]}>
        <p>Current Balance</p>
        <h1>₹{balance}</h1>
      </div>

      <div className={styles["summary-cards"]}>
        <div className={styles["income-card"]}>
          <p>Total Income</p>
          <h3 className="income">₹{income}</h3>
        </div>

        <div className={styles["expense-card"]}>
          <p>Total Expense</p>
          <h3 className="expense">₹{expense}</h3>
        </div>
      </div>
    </div>
  );
}

export default TransactionCard;
