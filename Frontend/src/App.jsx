import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Logout from "./pages/Logout";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));

function Placeholder({ title }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <p className="text-gray-500">Coming soon...</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="pt-6">
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/monthly" element={<Placeholder title="Monthly View" />} />
            <Route path="/weekly" element={<Placeholder title="Weekly View" />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}
