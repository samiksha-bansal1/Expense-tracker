import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import API_BASE_URL from "../config";

axios.defaults.withCredentials = true;
const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const [maxExpense, setMaxExpense] = useState(0);
  axios.defaults.withCredentials = true;

  const categories = [
    "Salary",
    "Groceries",
    "Dining",
    "Transport",
    "Entertainment",
    "Others",
  ];
  useEffect(() => {
    if (user) {
      fetchTransactions();
    } else {
      clearTransactions();
    }
  }, [user]);

  // useEffect(() => {
  //   fetchTransactions();
  // }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/transaction/get-all-transactions`,
        {
          withCredentials: true,
        }
      );

      setTransactions(res.data.transactions);
      calculateSummary(res.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const clearTransactions = () => {
    setTransactions([]);
    setTotalIncome(0);
    setTotalExpense(0);
    setBalance(0);
    setCategoryData({});
    setMaxExpense(0);
  };

  const calculateSummary = (transactions) => {
    let income = 0;
    let expense = 0;
    let categoryBreakdown = {};
    let highestExpense = 0;

    categories.forEach((cat) => (categoryBreakdown[cat] = 0));

    transactions.forEach((data) => {
      if (data.type.toLowerCase() === "income") {
        income += data.amount;
      } else {
        expense += data.amount;
        categoryBreakdown[data.category] =
          (categoryBreakdown[data.category] || 0) + data.amount;
        if (categoryBreakdown[data.category] > highestExpense) {
          highestExpense = categoryBreakdown[data.category];
        }
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
    setBalance(income - expense);
    setCategoryData(categoryBreakdown);
    setMaxExpense(highestExpense);
  };

  const handleDelete = async (txnId) => {
    try {
      const res = await axios.delete(
        `${API_BASE_URL}/transaction/delete-transaction/${txnId}`,
        {
          withCredentials: true,
        }
      );
      fetchTransactions();
      alert(res.data.message);
    } catch (err) {
      console.error("Error deleting transaction:", err);
      alert(err.response?.data?.message || "Error deleting transaction");
    }
  };
  const handleAddTransaction = async (transactionData) => {
    try {
      await axios.post(
        `${API_BASE_URL}/transaction/add-transaction`,
        transactionData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Transaction added successfully");
      fetchTransactions();
      return true;
    } catch (err) {
      console.error("Error adding transaction:", err);
      alert("Failed to add transaction");
      if (err.response?.data?.message === "Unauthorized: No Token Provided") {
        alert("Login to save transaction");
        return false;
      }
    }
  };

  const handleUpdateTransaction = async (transactionId, updatedData) => {
    try {
      await axios.put(
        `${API_BASE_URL}/transaction/update-transaction/${transactionId}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      alert("Transaction updated successfully");
      fetchTransactions();
      return true;
    } catch (err) {
      console.error("Error updating transaction:", err);
      alert("Failed to update transaction");
      return false;
    }
  };

  const handleReset = async () => {
    try {
      const res = await axios.delete(
        `${API_BASE_URL}/transaction/delete-all-transactions`,
        {
          withCredentials: true,
        }
      );
      alert(res.data.message);
      fetchTransactions();
    } catch (err) {
      console.log(err);
      alert("Failed to reset");
    }
  };
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        totalExpense,
        totalIncome,
        balance,
        categoryData,
        maxExpense,
        handleDelete,
        fetchTransactions,
        handleAddTransaction,
        handleUpdateTransaction,
        handleReset,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
