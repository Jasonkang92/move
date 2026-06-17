import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { FAQS_DATA } from "../../data.js";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">
            Got Questions?
          </h2>
          <h3 className="text-4xl font-black text-slate-900">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {FAQS_DATA.map((faq, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIdx === idx ? "border-primary shadow-md bg-white" : "border-slate-100 bg-bg-light hover:border-slate-200"}`}
            >
              <button
                className="w-full text-left px-6 py-5 font-bold text-slate-900 flex justify-between items-center"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                {faq.q}
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${openIdx === idx ? "rotate-180 text-primary" : "text-slate-400"}`}
                />
              </button>

              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
