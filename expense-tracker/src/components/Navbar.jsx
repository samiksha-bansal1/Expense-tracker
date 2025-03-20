import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../components/Navbar.module.css";

function Navbar() {
  const location = useLocation();
  const [quote, setQuote] = useState(null);
  const [isModalOpen, setIsModelOpen] = useState(false);
  // const [reset, setReset] = useState(false);
  const navigate = useNavigate();
  const fetchQuote = async () => {
    try {
      const response = await fetch("https://quotes-api-self.vercel.app/quote");
      const data = await response.json();
      console.log(data);
      setQuote(data.quote);
      setIsModelOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  function handleReset() {
    localStorage.clear();
    navigate(0);
  }

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>Expense Tracker</h1>
      <ul className={styles["nav-links"]}>
        <li className={location.pathname == "/" ? styles.active : ""}>
          <Link to={"/"}>📊 Dashboard</Link>
        </li>
        <li
          className={location.pathname == "/transaction" ? styles.active : ""}
        >
          <Link to={"/transaction"}>📄 Transaction</Link>
        </li>
        <li className={location.pathname == "/report" ? styles.active : ""}>
          <Link to={"/report"}>⏳ Reports</Link>
        </li>
        <li>
          <div className={styles["quote-btn"]} onClick={fetchQuote}>
            💡Get Quote
          </div>
        </li>
        <li>
          <div className="reset-btn" onClick={handleReset}>
            🔄 Reset
          </div>
        </li>
      </ul>

      {isModalOpen && (
        <div className={styles["modal-overlay"]}>
          <div className={styles["modal-content"]}>
            <p>{quote}</p>
            <button
              className={styles["close-btn"]}
              onClick={() => {
                setIsModelOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
