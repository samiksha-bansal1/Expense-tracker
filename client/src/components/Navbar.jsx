import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../components/Navbar.module.css";
import axios from "axios";
import { useTransaction } from "../TransactionContext";
import AuthContext from "../AuthContext";
import { RiUser5Fill } from "react-icons/ri";
function Navbar() {
  const location = useLocation();
  const [quote, setQuote] = useState(null);
  const [isModalOpen, setIsModelOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { handleReset } = useTransaction();
  const dropdownRef = useRef(null);
  // const [isLogin, setIsLogin] = useState(false);
  // const [reset, setReset] = useState(false);
  const navigate = useNavigate();

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://quotes-api-self.vercel.app/quote");
      const data = await response.json();
      // console.log(data);
      setQuote(data.quote);
      setIsModelOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     setIsLogin(false);
  //   } else {
  //     setIsLogin(true);
  //   }
  // }, []);

  // const handleLogin = () => {
  // if (!isLogin) {
  //   navigate("/login");

  //   setIsLogin(false);
  // } else {
  //   navigate("/");
  //   setIsLogin(true);
  // }
  // navigate("/login");
  // };

  // async function handleReset() {
  //   // localStorage.clear();
  //   try {
  //     const res = await axios.delete(
  //       "http://localhost:9000/transaction/delete-all-transactions",
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     alert(res.data.message);
  //     navigate(0);
  //   } catch (err) {
  //     console.log(err);
  //     alert("Failed to reset");
  //     navigate("/");
  //   }
  // }
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
          <div
            className="reset-btn"
            onClick={() => {
              handleReset();
              navigate("/");
            }}
          >
            🔄 Reset
          </div>
        </li>
        <li
          className={`${styles["user-section"]} ${
            location.pathname == "/login" ? styles.active : ""
          }`}
        >
          {user ? (
            <div
              div
              ref={dropdownRef}
              className={styles["user-container"]}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <span className={styles["user-icon"]}>
                <RiUser5Fill />
              </span>
              <span className={styles["user-name"]}>{user.name}</span>
              <span className={styles["dropdown-arrow"]}>⏷</span>
              {isDropdownOpen && (
                <div className={styles["dropdown-menu"]}>
                  <button className={styles["logout-btn"]} onClick={logout}>
                    🔓 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login"> 🔐 Login</Link>
            // <div className={styles["login-btn"]} onClick={handleLogin}>
            // </div>
          )}
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
