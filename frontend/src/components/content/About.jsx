import React from "react";
import { Globe, Heart, Users } from "lucide-react";
import { CORE_VALUES } from "../../data.js";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">
            Our Identity
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            More than charity, it's{" "}
            <span className="text-secondary">exchange.</span>
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Founded in 2005, MOVE bridges ethnic, cultural, and national divides
            to generate lasting global synergy. We believe volunteering is a
            reciprocal growth process.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {CORE_VALUES.map((val, idx) => (
            <div
              key={idx}
              className="bg-bg-light p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary transition-colors">
                {idx === 0 && (
                  <Globe className="w-6 h-6 text-primary group-hover:text-white" />
                )}
                {idx === 1 && (
                  <Heart className="w-6 h-6 text-secondary group-hover:text-white" />
                )}
                {idx === 2 && (
                  <Users className="w-6 h-6 text-primary group-hover:text-white" />
                )}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {val.title}
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                {val.description}
              </p>
            </div>
          ))}
        </div>

        {/* Global Partners */}
        <div className="bg-primary rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h4 className="text-white/80 font-bold uppercase tracking-widest text-sm mb-10">
              Our Global Partners
            </h4>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20 opacity-95">
              <div className="flex flex-col items-center">
                <img src="/nvda-logo.png" alt="NVDA Logo" className="h-16 md:h-24 object-contain bg-white p-3 md:p-4 rounded-2xl mb-4 shadow-xl" />
                <span className="text-xs text-secondary-light font-bold text-center max-w-[200px]">
                  Network for Voluntary Development in Asia
                </span>
              </div>
              <div className="hidden md:block w-px h-24 bg-white/20"></div>
              <div className="flex flex-col items-center">
                <img src="/ccivs-logo.png" alt="CCIVS Logo" className="h-16 md:h-24 object-contain bg-white p-3 md:p-4 rounded-2xl mb-4 shadow-xl" />
                <span className="text-xs text-secondary-light font-bold text-center max-w-[200px]">
                  Coordinating Committee for Intl Voluntary Service
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
