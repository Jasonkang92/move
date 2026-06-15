import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Users, Globe, ArrowRight, Quote, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { PROJECTS_DATA, TESTIMONIALS_DATA, CORE_VALUES, NGO_DETAILS } from '../data';
import { useAppState } from '../context/StateContext';






export const Home = ({ onNavigate, onSelectProject }) => {
  const { totalDonationAmount, applications } = useAppState();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Spotlight first 3 projects
  const spotlightProjects = PROJECTS_DATA.slice(0, 3);

  // Format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32 bg-[#FAF9F5]">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-4 py-1.5 rounded-full text-emerald-800 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Pertubuhan Sukarelawan Harapan Malaysia</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-slate-900 leading-tight">
              Co-Creating Sustainable <br className="hidden sm:inline" />
              <span className="text-emerald-700 relative">
                Hope & Empowerment
                <span className="absolute left-0 bottom-1 w-full h-2 bg-amber-200/70 -z-10 rounded"></span>
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              MOVE connects passionate global and local youth with Malaysian rural and international communities. We co-build water filtration houses, solar grids, school reading circles, and sustainable ecosystems that guarantee human dignity.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                id="hero-join-now-btn"
                onClick={() => onNavigate('volunteer')}
                className="inline-flex items-center gap-2.5 bg-emerald-600 text-white font-medium px-7 py-3.5 rounded-full hover:bg-emerald-700 transition duration-300 shadow-md shadow-emerald-600/10 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-98 cursor-pointer">
                
                <span>Join as a Volunteer</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
              <button
                id="hero-donate-btn"
                onClick={() => onNavigate('donate')}
                className="inline-flex items-center gap-2 bg-white text-slate-800 font-medium px-7 py-3.5 rounded-full border border-slate-200 hover:bg-slate-50 transition duration-300 shadow-sm cursor-pointer">
                
                <span>Support Our Projects</span>
                <Heart className="w-4.5 h-4.5 text-rose-500 fill-rose-500" />
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 flex flex-wrap items-center gap-6 border-t border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Registrar of Societies No: {NGO_DETAILS.regNo}</span>
              </div>
              <div className="hidden sm:block text-slate-300">|</div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>Malaysian & Indo-Pacific Projects</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-500 to-amber-500 rounded-3xl blur-md opacity-20 animate-pulse"></div>
            <div className="relative bg-white border border-slate-100 rounded-3xl p-4 shadow-xl">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1000"
                  alt="MOVE Volunteers and Children co-building school supplies"
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full transition duration-700 hover:scale-105" />
                
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Active On-The-Ground</span>
                </div>
              </div>

              {/* Dynamic Overlay card indicating current session's live data feedback */}
              <div className="mt-4 p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl grid grid-cols-2 gap-4 divide-x divide-emerald-100/80 text-center">
                <div>
                  <span className="block text-[11px] font-semibold uppercase text-slate-500 tracking-wider">Live Raised Goal</span>
                  <span className="text-lg font-bold text-emerald-800">{formatCurrency(850000 + totalDonationAmount)}</span>
                </div>
                <div>
                  <span className="block text-[11px] font-semibold uppercase text-slate-500 tracking-wider">Recruits Enqueued</span>
                  <span className="text-lg font-bold text-emerald-800">{applications.length} Active Applicants</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Impact Statistics Ticker */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-emerald-950 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-emerald-600 to-amber-600 rounded-full blur-3xl opacity-10 -z-10 translate-x-12 -translate-y-12"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-800/60">
            <div className="pt-4 md:pt-0">
              <span className="block text-3xl md:text-4xl font-sans font-extrabold text-amber-400">10+</span>
              <span className="block text-xs md:text-sm text-emerald-200 mt-1.5">Years of Service</span>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="block text-3xl md:text-4xl font-sans font-extrabold text-amber-400">{applications.length + 4200}+</span>
              <span className="block text-xs md:text-sm text-emerald-200 mt-1.5">Volunteers Mobilized</span>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="block text-3xl md:text-4xl font-sans font-extrabold text-amber-400">48+</span>
              <span className="block text-xs md:text-sm text-emerald-200 mt-1.5">Impact Projects</span>
            </div>
            <div className="pt-4 md:pt-0">
              <span className="block text-3xl md:text-4xl font-sans font-extrabold text-amber-400">150k+</span>
              <span className="block text-xs md:text-sm text-emerald-200 mt-1.5">Co-creation Hours</span>
            </div>
            <div className="pt-4 md:pt-0 col-span-2 md:col-span-1">
              <span className="block text-3xl md:text-4xl font-sans font-extrabold text-amber-400">
                {formatCurrency(totalDonationAmount)}
              </span>
              <span className="block text-xs md:text-sm text-emerald-200 mt-1.5 italic font-medium">Session Live Portal Fund</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Philosophical Foundations (Core Values) */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest block font-sans">Our True Compass</span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight">
            How We Differ: The Co-Creation Formula
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Standard charitable efforts deposit handouts that foster dependence. At MOVE, we ensure community sovereignty is validated. We focus on continuous equal exchange and co-creation models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_VALUES.map((val, idx) =>
          <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-lg transition duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700">
                  {idx === 0 && <Users className="w-6 h-6" />}
                  {idx === 1 && <Globe className="w-6 h-6" />}
                  {idx === 2 && <Heart className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-sans">{val.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{val.description}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Project Highlights */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest block">Active Initiatives</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-sans tracking-tight">On-The-Ground Spotlights</h2>
          </div>
          <button
            id="spotlight-view-all-projects"
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 text-emerald-700 font-bold hover:text-emerald-800 tracking-wide hover:underline cursor-pointer transition text-sm">
            
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spotlightProjects.map((proj) =>
          <div key={proj.id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl transition duration-350 flex flex-col justify-between group">
              <div>
                <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">
                  <img
                  src={proj.image}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full group-hover:scale-103 transition duration-500" />
                
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-slate-800 flex items-center gap-1 border border-slate-100">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{proj.country}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-emerald-600 px-3 py-1 rounded-full text-[10px] font-semibold uppercase text-white tracking-wider">
                    {proj.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-extrabold text-slate-900 font-sans tracking-tight group-hover:text-emerald-700 transition">
                    {proj.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3">
                    {proj.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 mb-4">
                  <span>Spots left: <strong className="text-rose-600">{proj.spotsLeft}</strong></span>
                  <span>Duration: <strong className="text-emerald-800">{proj.duration}</strong></span>
                </div>
                <button
                id={`home-view-proj-details-${proj.id}`}
                onClick={() => onSelectProject(proj.id)}
                className="w-full text-center bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-semibold py-2.5 rounded-xl transition duration-250 border border-slate-200/50 hover:border-emerald-200 cursor-pointer">
                
                  View Details & Register
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Volunteer Testimonials Slider */}
      <section className="bg-slate-50 py-20 px-6 rounded-[2.5rem] max-w-7xl mx-auto overflow-hidden relative">
        <div className="absolute bottom-0 right-0 p-8 opacity-10 font-bold text-7xl select-none font-mono text-emerald-950">
          MOVE SUKARELAWAN
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest block">In Spoken Words</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans tracking-tight">
              Testimonials from the Collective
            </h2>
          </div>

          <div className="relative min-h-[220px] flex items-center justify-center">
            {TESTIMONIALS_DATA.map((t, idx) =>
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: activeTestimonial === idx ? 1 : 0,
                scale: activeTestimonial === idx ? 1 : 0.95,
                display: activeTestimonial === idx ? 'block' : 'none'
              }}
              transition={{ duration: 0.3 }}
              className="space-y-6">
              
                <div className="flex justify-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Quote className="w-5 h-5 fill-emerald-700" />
                  </div>
                </div>
                <blockquote className="text-lg md:text-xl text-slate-700 italic leading-relaxed max-w-2xl mx-auto">
                  "{t.text}"
                </blockquote>
                <div>
                  <h4 className="font-bold text-slate-900 text-md">{t.name}, {t.age}</h4>
                  <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase mt-1">
                    {t.role} — <span className="text-emerald-700">{t.project}</span>
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Testimonial slider indicators */}
          <div className="flex justify-center gap-3">
            {TESTIMONIALS_DATA.map((_, idx) =>
            <button
              key={idx}
              id={`testimonial-dot-${idx}`}
              onClick={() => setActiveTestimonial(idx)}
              className={`w-3.5 h-3.5 rounded-full transition duration-300 border cursor-pointer ${
              activeTestimonial === idx ?
              'bg-emerald-600 border-emerald-600 scale-110' :
              'bg-white border-slate-300 hover:border-slate-400'}`
              }
              aria-label={`Go to testimonial ${idx + 1}`}>
            </button>
            )}
          </div>
        </div>
      </section>

      {/* 6. Co-creation Action Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-[2.5rem] p-10 md:p-16 text-center space-y-8 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-10"></div>
          
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight">
              Ready to co-create impactful programs with us?
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Whether you are a local Malaysian youth leader, international environmental student, or potential corporate development partner—we have a desk ready for your ideas.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                id="footer-action-apply"
                onClick={() => onNavigate('volunteer')}
                className="bg-amber-400 hover:bg-amber-500 text-emerald-950 px-8 py-3.5 rounded-full font-bold transition cursor-pointer active:scale-98">
                
                Apply as Volunteer
              </button>
              <button
                id="footer-action-contact"
                onClick={() => onNavigate('contact')}
                className="bg-transparent hover:bg-white/10 text-white border border-white/50 px-8 py-3.5 rounded-full font-semibold transition cursor-pointer">
                
                Host a Collaborative Project
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>);

};