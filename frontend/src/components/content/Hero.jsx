import React from "react";
import { motion } from "motion/react";
import { Sun, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-bg-light">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold text-primary">
            <Sun className="w-4 h-4 text-secondary" />
            Empowering Communities Since 2005
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Malaysian <br /> Organization of <br />{" "}
            <span className="text-primary">Voluntary</span>{" "}
            <span className="text-secondary relative">
              Exchange
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-secondary/30"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                />
              </svg>
            </span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-lg font-medium">
            We connect local Malaysian partners with global voluntary structures
            to co-create sustainable solutions. Reciprocity over charity.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                const el = document.getElementById("get-involved");
                if (el) {
                  const offsetPosition =
                    el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group"
            >
              Join the Movement
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("about");
                if (el) {
                  const offsetPosition =
                    el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
              className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-8 py-4 rounded-xl font-bold transition-all"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800"
              alt="Volunteers in action"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-32 left-8 right-8 text-white">
              <div className="text-3xl font-black mb-2">Co-Creation</div>
              <p className="text-sm text-white/90 font-medium">
                Building together, learning together.
              </p>
            </div>
          </div>


        </motion.div>
      </div>
    </section>
  );
}
