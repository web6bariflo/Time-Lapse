import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../store/Auth'

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  let navigate = useNavigate();
  const {isLoggedIn, storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", loginData);

      if (res.status === 200) {
        toast.success("Login successful");
        storeTokenInLS(res.data.token);
        setLoginData({
          email: "",
          password: ""
        });
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error(`${error.response?.data.extraDetails || error.message}`);
    }
  };

   useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);


  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-primary/10 to-accent/10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 dark:bg-primary/30 rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-8 border-2 border-primary/20 relative"
      >
        <div className="flex flex-col items-center mb-2">
          <span className="inline-flex items-center justify-center bg-gradient-to-br from-primary to-accent rounded-full p-5 shadow-lg mb-3">
            <svg xmlns='http://www.w3.org/2000/svg' className='w-10 h-10 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 11-8 0 4 4 0 018 0z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z' /></svg>
          </span>
          <h2 className="text-3xl font-extrabold text-primary mb-1 text-center drop-shadow">Employee Login</h2>
          <p className="text-base text-gray-600 dark:text-gray-200 text-center">Sign in to manage your attendance and schedules.</p>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-left font-medium text-gray-700 dark:text-gray-100">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            value={loginData.email}
            onChange={handleInput}
            className="px-4 py-3 rounded-lg border border-primary/30 dark:border-accent/30 bg-gray-50 dark:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary text-lg shadow-sm"
            placeholder="you@email.com"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password" className="text-left font-medium text-gray-700 dark:text-gray-100">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={loginData.password}
            onChange={handleInput}
            className="px-4 py-3 rounded-lg border border-primary/30 dark:border-accent/30 bg-gray-50 dark:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-accent text-lg shadow-sm"
            placeholder="••••••••"
          />
        </div>
        <Button type="submit" size="lg" className="w-full mt-2 text-lg font-semibold shadow-lg transition-transform hover:scale-105">Login</Button>
        <div className="text-center text-sm text-gray-500 dark:text-gray-200 mt-2">
          Don&apos;t have an account? <a href="#" className="text-primary font-medium hover:underline">Contact admin</a>
        </div>
      </form>
    </div>
  );
}