import React, { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import movieApi from '../api/movieAPI';

const AuthStateContext = createContext(null); 
const AuthDispatchContext = createContext(null);

const initialAuth = {
  currentUser: null,
  loading: false,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return { ...state, loading: false, currentUser: action.payload, error: null };
    case "FAIL":
      return { ...state, loading: false, error: action.payload || "Đăng nhập thất bại" };
    case "LOGOUT":
      return { ...state, currentUser: null };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuth);

  // Load từ localStorage
  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (raw) {
      try {
        const u = JSON.parse(raw);
        dispatch({ type: "SUCCESS", payload: u });
      } catch {}
    }
  }, []);

  const login = useCallback(async (identifier, password) => {
    dispatch({ type: "START" });
    try {
      const isEmail = /\S+@\S+\.\S+/.test(identifier);
      const params = isEmail ? { email: identifier, password } : { username: identifier, password };
      const { data } = await movieApi.get("/accounts", { params });
      if (Array.isArray(data) && data.length > 0) {
        const user = data[0];
        localStorage.setItem("auth_user", JSON.stringify(user));
        dispatch({ type: "SUCCESS", payload: user });
        return { ok: true, user };
      }
      dispatch({ type: "FAIL", payload: "Sai thông tin đăng nhập" });
      return { ok: false };
    } catch (e) {
      dispatch({ type: "FAIL", payload: "Lỗi hệ thống" });
      return { ok: false };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_user");
    dispatch({ type: "LOGOUT" });
  }, []);

  const dispatchValue = { login, logout };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatchValue}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuth = () => useContext(AuthDispatchContext);
