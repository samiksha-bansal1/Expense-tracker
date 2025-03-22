import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTransaction } from "../TransactionContext";

import styles from "./AddTransaction.module.css";
import { useLocation, useNavigate } from "react-router-dom";

function AddTransaction() {
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { handleAddTransaction, handleUpdateTransaction } = useTransaction();
  function handleOnAmountChange(e) {
    // console.log(e.target.value);
    setAmount(e.target.value);
  }

  function handleOnDescriptionChange(e) {
    // console.log(e.target.value);
    setDescription(e.target.value);
  }

  function handleOnCategoryChange(e) {
    setCategory(e.target.value);
  }

  useEffect(() => {
    // console.log(location.state);
    // const existingTransactions =
    //   JSON.parse(localStorage.getItem("transactions")) || [];
    // setTransactions(existingTransactions);
    if (location.state?.transaction) {
      const transaction = location.state.transaction.editTransaction;
      // console.log(transaction);
      const formattedDate = new Date(transaction.date)
        .toISOString()
        .split("T")[0];
      setAmount(transaction.amount);
      setCategory(transaction.category);
      setDate(formattedDate);
      setDescription(transaction.description);
      setType(transaction.type);
      setEditIndex(transaction._id);
    }
  }, [location.state]);
  async function handleSubmitForm(e) {
    e.preventDefault();
    if (!amount || !category || !date) {
      return alert("All fields are required");
    }
    const transactionData = {
      type,
      amount: parseFloat(amount),
      description,
      category,
      date,
    };
    let success;
    if (editIndex !== null) {
      success = await handleUpdateTransaction(editIndex, transactionData);
    } else {
      success = await handleAddTransaction(transactionData);
    }

    if (success) navigate("/");

    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
    setType("Expense");
    setEditIndex(null);
  }
  // async function handleSubmitForm(e) {
  //   // e.preventDefault();
  //   if (!amount || !category || !date) {
  //     return alert("All fields are required");
  //   }

  //   // console.log(type, amount, date, description, category);

  //   // const existingTransactions =
  //   //   JSON.parse(localStorage.getItem("transactions")) || [];

  //   const currentTransaction = {
  //     type: type,
  //     amount: parseFloat(amount),
  //     description: description,
  //     category: category,
  //     date: date,
  //   };

  //   // let newTransactions;
  //   // if (editIndex == null) {
  //   //   newTransactions = [...transactions, currentTransaction];
  //   // } else {
  //   //   newTransactions = [...transactions];
  //   //   newTransactions[editIndex] = currentTransaction;
  //   // }
  //   try {
  //     if (editIndex !== null) {
  //       console.log(editIndex);
  //       //update transaction
  //       await axios.put(
  //         `http://localhost:9000/transaction/update-transaction/${editIndex}`,
  //         currentTransaction,
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       alert("Transaction updated succesfully");
  //     } else {
  //       await axios.post(
  //         "http://localhost:9000/transaction/add-transaction",
  //         currentTransaction,
  //         {
  //           withCredentials: true,
  //           headers: {
  //             "Content-Type": "application/json", // Ensure JSON format
  //             Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token if needed
  //           },
  //         }
  //       );
  //       alert("Transaction added succesfully");
  //     }
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err.response.data.message);
  //     if (err.response.data.message == "Unauthorized: No Token Provided") {
  //       alert("Login to save transaction");
  //       navigate("/login");
  //     } else {
  //       alert("Failed to save transaction");
  //     }
  //   }
  //   // setTransactions(newTransactions);
  //   // console.log(currentTransaction);
  //   // console.log(existingTransactions);
  //   // console.log(newTransactions);

  //   // localStorage.setItem("transactions", JSON.stringify(newTransactions));
  //   // if (editIndex !== null) {
  //   //   alert(`${type} updated successfully`);
  //   // } else {
  //   //   alert(`${type} added successfully`);
  //   // }
  //   setAmount("");
  //   setCategory("");
  //   setDate("");
  //   setDescription("");
  //   setType("Expense");
  //   setEditIndex(null);
  // }

  return (
    <div className={styles["add-transaction-container"]}>
      <h2> {editIndex == null ? "Add Transaction" : "Update Transaction"}</h2>
      <div className={styles["transaction-box"]}>
        <div className={styles["transaction-type"]}>
          <label>
            <input
              type="radio"
              value="Expense"
              checked={type === "Expense"}
              onChange={(e) => {
                setType("Expense");
                // console.log(type);
              }}
            />
            Expense
          </label>
          <label>
            <input
              type="radio"
              value="Income"
              checked={type === "Income"}
              onChange={(e) => {
                setType("Income");
                // console.log(type);
              }}
            />
            Income
          </label>
        </div>
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => {
            handleOnAmountChange(e);
          }}
        />
        <select value={category} onChange={handleOnCategoryChange}>
          <option value="">Select a category</option>
          <option value="Salary">Salary</option>
          <option value="Groceries">Groceries</option>
          <option value="Dining">Dining</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>
        <textarea
          value={description}
          placeholder="Description"
          onChange={(e) => {
            handleOnDescriptionChange(e);
          }}
        ></textarea>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSubmitForm}>
          {editIndex == null ? "Add Transaction" : "Update Transaction"}
        </button>
      </div>
    </div>
  );
}

export default AddTransaction;
