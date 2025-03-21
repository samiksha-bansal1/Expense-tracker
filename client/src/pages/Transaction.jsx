import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Transaction.module.css";
import NoTransactions from "../components/NoTransactions";
function Transaction() {
  const [transaction, setTransaction] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // const existingTransactions =
    //   JSON.parse(localStorage.getItem("transactions")) || [];
    // setTransaction(existingTransactions);
    axios
      .get("http://localhost:9000/get-all-transactions")
      .then((res) => {
        console.log(res.data.transactions);
        // storedTransactions = res.data.transactions;
        setTransaction(res.data.transactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  const categoryEmojis = {
    Salary: "💰",
    Groceries: "🛒",
    Dining: "🍽",
    Transport: "🚗",
    Entertainment: "🎭",
    Others: "📝",
  };

  function handleEdit(index) {
    const editTransaction = transaction[index];
    console.log(editTransaction);
    navigate("/add-transaction", {
      state: { transaction: { editTransaction } },
    });
  }
  async function handleDelete(index) {
    try {
      const toDeleteTxn = transaction[index];
      const res = await axios.delete(
        `http://localhost:9000/delete-transaction/${toDeleteTxn._id}`
      );

      const updatedTransactions = transaction.filter((data, i) => i !== index);
      setTransaction(updatedTransactions);
      console.log(res);
      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
    // localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  }

  return (
    <div>
      <h2>All Transactions</h2>
      {transaction.length == 0 ? (
        <NoTransactions></NoTransactions>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map((data, index) => (
              <tr key={index}>
                <td>
                  {categoryEmojis[data.category]}
                  {data.category}
                </td>
                <td>{data.description || "No Description"}</td>
                <td className={data.type === "Income" ? "income" : "expense"}>
                  {data.amount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </td>

                <td>{new Date(data.date).toLocaleDateString("en-IN")}</td>
                <td>{data.type}</td>
                <td>
                  <div className={styles["action-buttons"]}>
                    <button
                      className={styles["edit-btn"]}
                      onClick={() => {
                        handleEdit(index);
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className={styles["delete-btn"]}
                      onClick={() => {
                        handleDelete(index);
                      }}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Transaction;
