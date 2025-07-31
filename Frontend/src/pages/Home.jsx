import React from "react";
import { Button } from "../components/ui/button";
import { CalendarDays, ShieldCheck, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* Hero Section */}
      <div className="flex flex-col items-center mb-10 w-full max-w-2xl mx-auto py-16 px-4 bg-white/90 dark:bg-blue-950/80 rounded-2xl border border-blue-100 dark:border-blue-900">
        <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full p-6 mb-4 shadow-sm">
          <CalendarDays className="text-black dark:text-blue-300 w-12 h-12 animate-bounce" />
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">Welcome to TimeLapse</h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-xl mb-6 font-normal">
          Your all-in-one solution for effortless attendance and schedule management.
        </p>
        <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg shadow-sm transition">Get Started</Button>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mb-12 mt-8">
        <div className="flex flex-col items-center bg-gradient-to-br from-secondary/60 to-primary/20 rounded-2xl shadow-lg p-7 border-2 border-primary/20 hover:scale-105 transition-transform">
          <BarChart3 className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-2">Easy Attendance</h3>
          <p className="text-gray-600 dark:text-gray-300 text-base">Mark your presence in seconds with a simple, intuitive interface.</p>
        </div>
        <div className="flex flex-col items-center bg-gradient-to-br from-accent/40 to-secondary/20 rounded-2xl shadow-lg p-7 border-2 border-accent/20 hover:scale-105 transition-transform">
          <CalendarDays className="w-12 h-12 text-accent mb-4" />
          <h3 className="text-2xl font-bold mb-2">Schedule Overview</h3>
          <p className="text-gray-600 dark:text-gray-300 text-base">View your monthly and weekly schedules at a glance, anytime.</p>
        </div>
        <div className="flex flex-col items-center bg-gradient-to-br from-primary/40 to-accent/20 rounded-2xl shadow-lg p-7 border-2 border-primary/20 hover:scale-105 transition-transform">
          <ShieldCheck className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-2">Secure Login</h3>
          <p className="text-gray-600 dark:text-gray-300 text-base">Your data is protected with industry-leading security standards.</p>
        </div>
      </div>

      {/* Motivational Quote */}
      <blockquote className="italic text-xl text-gray-800 dark:text-gray-200 max-w-2xl mx-auto border-l-4 border-primary pl-6 py-4 bg-white/60 dark:bg-primary/20 rounded-xl shadow-md mt-8">
        "Success is the sum of small efforts, repeated day in and day out." <br />
        <span className="text-base text-gray-500">- Robert Collier</span>
      </blockquote>
    </section>
  );
} 