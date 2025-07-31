import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from '../store/Auth';

const navItems = [
  { name: "Home", to: "/" },
  { name: "Monthly View", to: "/monthly" },
  { name: "Weekly View", to: "/weekly" },
];

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-6">
          <span className="text-2xl font-bold text-primary tracking-tight select-none">TimeLapse</span>
          <div className="hidden md:flex gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary"
                  }`
                }
                end={item.to === "/"}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div>
          {isLoggedIn ? (
            <Button 
              variant="outline" 
              className="font-semibold"
              onClick={() => navigate("/logout")} // Assuming you have a /logout route
            >
              Logout
            </Button>
          ) : (
            <NavLink to="/login">
              <Button variant="outline" className="font-semibold">Login</Button>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}