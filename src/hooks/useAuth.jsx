import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState(null);
  const [token, setToken] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUid = localStorage.getItem("uid");
    const getToken = localStorage.getItem("token");
    const getExpiry = localStorage.getItem("expiry");
    if (getUid && getToken && getExpiry) {
      setUid(getUid);
      setToken(getToken);
      setExpiry(getExpiry);
    }
  }, []);

  const login = async ({ ...data }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login-manager`, { ...data });
      if (response.data.check === true) {
        saveAuthInfo(response.data);
        window.notyf.success("Đăng nhập thành công!");
        setTimeout(() => {
          setUid(response.data.uid);
          setToken(response.data.token);
          setExpiry(response.data.expiry);
          setUser(true);
          navigate("/manager", { replace: true });
        }, 2000);
      } else {
        window.notyf.error(response.data.message);
      }
    } catch (error) {
      window.notyf.error(error.response.data.message);
    }
  };

  const logout = async () => {
    setTimeout(() => {
      clearAuthInfo();
      navigate("/dang-nhap", { replace: true });
    }, 2000);
  };

  useEffect(() => {
    const checkExpiration = () => {
      if (token && expiry) {
        const currentTimestamp = Math.floor(new Date().getTime() / 1000);
        if (currentTimestamp >= expiry) {
          localStorage.removeItem("uid");
          localStorage.removeItem("token");
          localStorage.removeItem("expiry");
        }
      }
    };

    const interval = setInterval(checkExpiration, 1000);

    return () => clearInterval(interval);
  }, [token, expiry]);

  const saveAuthInfo = ({ uid, token, expiry }) => {
    localStorage.setItem("uid", uid);
    localStorage.setItem("token", token);
    localStorage.setItem("expiry", expiry);
  };

  const clearAuthInfo = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
  };

  return { user, token, login, logout };
};
