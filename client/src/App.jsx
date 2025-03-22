import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Report from "./pages/Report";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import AddTransaction from "./pages/AddTransaction";
import LoginSignup from "./pages/LoginSignup";
import { useState } from "react";
import { AuthProvider } from "./AuthContext";
import { TransactionProvider } from "./TransactionContext";

function App() {
  return (
    <>
      <AuthProvider>
        <TransactionProvider>
          <BrowserRouter>
            <div>
              <Navbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/report" element={<Report />} />
                <Route path="/add-transaction" element={<AddTransaction />} />
                <Route
                  path="/login"
                  element={<LoginSignup type="login" />}
                ></Route>
                <Route
                  path="/signup"
                  element={<LoginSignup type="signup" />}
                ></Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TransactionProvider>
      </AuthProvider>
    </>
  );
}

export default App;
