import { createContext, useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  axios.defaults.withCredentials = true;

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/user/details`);
      setUser(data);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/user/login`, {
        email,
        password,
      });
      console.log(data);
      fetchUserDetails();
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  const signin = async (name, email, password) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/user/signin`, {
        name,
        email,
        password,
      });
      consolce.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/user/logout`);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
