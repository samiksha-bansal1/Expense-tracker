import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import styles from "./NoTransactions.module.css";
function NoTransactions() {
  return (
    <div className={styles["no-transactions"]}>
      <FaFileInvoiceDollar className={styles["no-transactions-icon"]} />
      <h3>No Transactions Found</h3>
      <p>Add some transactions to see reports and analysis.</p>
    </div>
  );
}

export default NoTransactions;
