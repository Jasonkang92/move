import React from "react";
import Navbar from "./components/header/Navbar";
import Hero from "./components/content/Hero";
import About from "./components/content/About";
import FAQ from "./components/content/FAQ";
import GetInvolved from "./components/content/GetInvolved";
import Footer from "./components/footer/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-slate-800 antialiased font-sans selection:bg-secondary/30">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <FAQ />
        <GetInvolved />
      </main>
      <Footer />
    </div>
  );
}
