import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  ArrowRight,
  Heart,
  Users,
  Globe,
  Sun,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  NGO_DETAILS,
  STATISTICS_DATA,
  CORE_VALUES,
  PROJECTS_DATA,
  FAQS_DATA,
} from "./data.js";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Impact", id: "impact" },
    { name: "FAQ", id: "faq" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo Area */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="/logo.png"
              alt="MOVE Logo"
              className="h-12 md:h-16 object-contain drop-shadow-sm"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm font-bold transition-colors hover:text-secondary ${isScrolled ? "text-slate-600" : "text-slate-800"}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollTo("get-involved")}
              className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              Get Involved
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-2xl font-black text-slate-800 text-left border-b border-slate-100 pb-4"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollTo("get-involved")}
              className="mt-4 bg-primary text-white text-xl font-bold py-4 rounded-2xl w-full text-center"
            >
              Get Involved
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
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

          {/* Floating Stats Badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-primary">4,200+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Volunteers
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
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
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 opacity-90">
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">
                  NVDA
                </span>
                <span className="text-xs text-secondary-light font-bold">
                  Network for Voluntary Development in Asia
                </span>
              </div>
              <div className="hidden md:block w-px h-16 bg-white/20"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">
                  CCIVS
                </span>
                <span className="text-xs text-secondary-light font-bold">
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

function Impact() {
  return (
    <section id="impact" className="py-24 bg-bg-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-24">
          {STATISTICS_DATA.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-secondary mb-2">
                {stat.value}
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
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

function GetInvolved() {
  return (
    <section
      id="get-involved"
      className="py-24 bg-primary relative overflow-hidden text-center"
    >
      {/* Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
          Ready to make a <span className="text-secondary">MOVE?</span>
        </h2>
        <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
          Whether you want to volunteer, partner with us, or support our
          grassroots projects, your involvement creates ripples of positive
          change.
        </p>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 text-left text-white/90 shadow-xl max-w-2xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/20 pb-4 mb-4 gap-4">
            <h3 className="text-xl font-bold text-white">Contact address</h3>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs sm:text-sm text-secondary font-bold hover:text-white transition-colors"
            >
              Back to Table of Contents
            </button>
          </div>

          <p className="text-sm font-medium">
            For inquiries about local logistics, please contact the following
            MOVE staffs.
          </p>

          <div className="space-y-4 text-sm bg-black/20 p-5 rounded-xl">
            <p>
              <span className="font-bold text-white block text-base mb-1">
                Sivasangari Ramasamy (Ms.)
              </span>
              <span className="text-white/80">Founding President</span>{" "}
              <span className="mx-2 text-white/20">|</span>{" "}
              <span className="font-mono text-secondary text-base">
                +6016-3587165
              </span>
            </p>
            <p>
              <span className="font-bold text-white block text-base mb-1">
                Low Kok-Chang (Mr.)
              </span>
              <span className="text-white/80">Co-Founder</span>{" "}
              <span className="mx-2 text-white/20">|</span>{" "}
              <span className="font-mono text-secondary text-base">
                +6012 699 3354
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0a1128] text-white pt-20 pb-10 border-t-4 border-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center mb-6">
              <img
                src="/logo.png"
                alt="MOVE Logo"
                className="h-14 md:h-16 object-contain bg-white p-2 rounded-xl"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              We connect local Malaysian partners with global voluntary
              structures to co-create sustainable water grids, youth networks,
              and organic gardens.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 inline-block">
              <span className="text-[10px] text-slate-400 block uppercase tracking-widest font-bold mb-1">
                Registration ID
              </span>
              <span className="text-sm font-mono text-secondary">
                {NGO_DETAILS.regNo}
              </span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {["About", "Impact", "FAQ"].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const el = document.getElementById(link.toLowerCase());
                    if (el) {
                      const offsetPosition =
                        el.getBoundingClientRect().top + window.scrollY - 80;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="text-left text-slate-400 hover:text-white text-sm transition-colors w-fit"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              HQ Contact
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                <span>{NGO_DETAILS.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span>{NGO_DETAILS.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a
                  href={`mailto:${NGO_DETAILS.email}`}
                  className="hover:text-white transition"
                >
                  {NGO_DETAILS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {NGO_DETAILS.fullName}. All Rights
            Reserved.
          </div>
          <div className="flex gap-4 font-medium">
            <span>Co-Created in Malaysia</span>
            <span>•</span>
            <span>Est. {NGO_DETAILS.foundedYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-slate-800 antialiased font-sans selection:bg-secondary/30">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Impact />
        <FAQ />
        <GetInvolved />
      </main>
      <Footer />
    </div>
  );
}
