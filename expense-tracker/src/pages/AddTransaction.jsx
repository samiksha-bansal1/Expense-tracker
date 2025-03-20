import React, { useState, useEffect } from "react";
import styles from "./AddTransaction.module.css";
import { useLocation } from "react-router-dom";
function AddTransaction() {
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const location = useLocation();

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

  function handleSubmitForm(e) {
    if (!amount || !category || !date) {
      return alert("All fields are required");
    }

    // console.log(type, amount, date, description, category);

    // const existingTransactions =
    //   JSON.parse(localStorage.getItem("transactions")) || [];

    const currentTransaction = {
      type: type,
      amount: parseFloat(amount),
      description: description,
      category: category,
      date: date,
    };

    let newTransactions;
    if (editIndex == null) {
      newTransactions = [...transactions, currentTransaction];
    } else {
      newTransactions = [...transactions];
      newTransactions[editIndex] = currentTransaction;
    }

    setTransactions(newTransactions);
    // console.log(currentTransaction);
    // console.log(existingTransactions);
    // console.log(newTransactions);

    localStorage.setItem("transactions", JSON.stringify(newTransactions));
    if (editIndex !== null) {
      alert(`${type} updated successfully`);
    } else {
      alert(`${type} added successfully`);
    }
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
    setType("Expense");
  }

  useEffect(() => {
    // console.log(location.state);
    const existingTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(existingTransactions);
    if (location.state && location.state.transaction) {
      const transaction = location.state.transaction;
      setAmount(transaction.amount);
      setCategory(transaction.category);
      setDate(transaction.date);
      setDescription(transaction.description);
      setType(transaction.type);
      setEditIndex(transaction.index);
    }
  }, [location.state]);

  return (
    <div className={styles["add-transaction-container"]}>
      <h2>Add Transaction</h2>
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
