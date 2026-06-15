import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Eye, HelpCircle, ChevronDown, Award, Building2 } from 'lucide-react';
import { FAQS_DATA, NGO_DETAILS } from '../data';

export const About = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const timelineSteps = [
  {
    year: "2015",
    title: "The Genesis",
    desc: "Founded as Pertubuhan Sukarelawan Harapan Malaysia with the goal to restructure traditional gap-year volunteering models into equal-partnership co-reconstruction work."
  },
  {
    year: "2018",
    title: "First International Co-Creation",
    desc: "Expanded scope to Siem Reap, Cambodia, building the first sand filtration plant powered alongside rural community mechanics."
  },
  {
    year: "2021",
    title: "Orang Asli Sovereignty Focus",
    desc: "Partnered directly with Tok Batins (village chiefs) across Perak to facilitate rural youth-led study camps, shifting leadership to local community educators."
  },
  {
    year: "25+ Countries Served",
    title: "Global Network Expansion",
    desc: "Connecting volunteers from Japan, Russia, Netherlands, and Germany to join local Malaysian youth on equivalent joint initiatives."
  }];


  return (
    <div className="space-y-24 pb-16">
      {/* 1. Header Hero Panel */}
      <section className="bg-emerald-50/50 py-16 px-6 rounded-[2.5rem] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-100 border border-emerald-200 text-xs font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Registration Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-slate-900">
            About {NGO_DETAILS.name}
          </h1>
          <p className="text-sm font-semibold uppercase text-slate-400 tracking-wider font-mono">
            Official Name: {NGO_DETAILS.fullName} <br />
            ID Registered: {NGO_DETAILS.regNo}
          </p>
          <div className="text-slate-600 space-y-4 text-base leading-relaxed">
            <p>
              MOVE is structured around the philosophy that humanity progresses best when we build *with* each other, rather than *for* each other. Founded in 2015 in Kuala Lumpur, Malaysia, we are a passionate network of social planners, environmental biologists, language enthusiasts, and community builders.
            </p>
            <p>
              We provide formal, accredited international voluntary exchanges in Malaysia and across Southeast Asia. Through co-creation, we align underutilized youth energy during breaks to accelerate clean energy grids, educational materials, and marine conservation.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600"
              alt="Volunteers and local children"
              referrerPolicy="no-referrer"
              className="object-cover w-full h-full" />
            
          </div>
          {/* Trust Seal */}
          <div className="absolute -bottom-6 -left-6 bg-white border border-slate-100 rounded-3xl p-4 shadow-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
              <Award className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-800 font-sans">Active NGO</span>
              <span className="block text-[10px] text-slate-400 font-medium">Verified by ROS Registry</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission Pillars */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 space-y-6 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-950 font-sans tracking-tight">Our Core Vision</h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            To cultivate a global canvas where youth, indigenous tribes, and rural citizens co-create collaborative infrastructures, transcending national origins, ethnicity, and socio-economic biases to preserve environmental and educational sovereignty.
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 space-y-6 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-950 font-sans tracking-tight">Our Core Mission</h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We actively coordinate, train, and deposit multidisciplinary teams of voluntary leaders to co-develop localized clean drinking water mechanisms, rural solar libraries, organic crop setups, and intercultural exchanges centered on humility and structural equality.
          </p>
        </div>
      </section>

      {/* 3. Operational Timeline */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest block">The Chronology</span>
          <h2 className="text-3xl font-bold text-slate-900 font-sans tracking-tight">Our Core Journey & Milestones</h2>
          <p className="text-slate-600 text-sm">How we evolved from a small student collective into an international voluntary alliance.</p>
        </div>

        <div className="relative border-l-2 border-emerald-100 ml-4 md:ml-32 space-y-12 py-4">
          {timelineSteps.map((step, idx) =>
          <div key={idx} className="relative pl-8 md:pl-12 group">
              {/* Timeline dot */}
              <div className="absolute left-[-9px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-4 border-emerald-600 group-hover:bg-amber-400 transition duration-300"></div>
              
              {/* Year badge */}
              <div className="absolute left-[-110px] top-1 hidden md:block text-right w-20">
                <span className="text-sm font-extrabold text-slate-800 font-mono tracking-tight">{step.year}</span>
              </div>

              <div className="space-y-2">
                <span className="inline-block md:hidden text-xs font-extrabold text-emerald-700 font-mono tracking-wide">{step.year}</span>
                <h3 className="text-lg font-bold text-slate-950 font-sans transition group-hover:text-emerald-700">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                  {step.desc}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Frequently Asked Questions (FAQ) Accordion */}
      <section className="max-w-4xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 text-amber-800 bg-amber-50 border border-amber-200/50 text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Transparent Answers</span>
          </div>
          <h2 className="text-3xl font-sans font-bold text-slate-950 tracking-tight">FAQ: Understanding Voluntary Work</h2>
          <p className="text-slate-500 text-xs sm:text-sm">Everything you need to know about safety, requirements, and structural contributions.</p>
        </div>

        <div className="space-y-4 border border-slate-100 rounded-3xl p-6 bg-white">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border-b border-slate-100 last:border-b-0 pb-4 last:pb-0 pt-4 first:pt-0">
                <button
                  id={`faq-toggle-btn-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left font-semibold text-slate-900 hover:text-emerald-750 transition text-sm sm:text-base py-2 cursor-pointer">
                  
                  <span className="font-sans pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-emerald-600 transition duration-300 transform shrink-0 ${isOpen ? 'rotate-180 text-amber-500' : ''}`} />
                </button>
                
                {isOpen &&
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed pl-1">
                  
                    {faq.a}
                  </motion.div>
                }
              </div>);

          })}
        </div>
      </section>
    </div>);

};