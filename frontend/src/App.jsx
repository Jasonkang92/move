import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Globe, Menu, X, Landmark } from 'lucide-react';
import { AppStateProvider } from './context/StateContext';
import { Home } from './components/Home';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { VolunteerForm } from './components/VolunteerForm';
import { ContactUs } from './components/ContactUs';
import { NGO_DETAILS } from './data.js';



function MainApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track pre-filled target projects from the catalog
  const [prefilledProject, setPrefilledProject] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Cross-navigation hooks
  const handleApplyForProject = (projectTitle) => {
    setPrefilledProject(projectTitle);
    setActiveTab('volunteer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  const handleSelectProjectAndView = (projectId) => {
    setSelectedProjectId(projectId);
    setActiveTab('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTab = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-slate-800 antialiased font-sans">
      
      {/* 1. TOP GLOBAL PROMOTIONAL TICKER */}
      <div className="bg-emerald-950 text-emerald-100/90 text-[10px] sm:text-xs font-semibold py-2 px-6 border-b border-emerald-900 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          <span>Officially Registered Malaysian NGO (Registry Ref: {NGO_DETAILS.regNo})</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-emerald-200">
          <span>Co-Created Partnerships in Malaysia & Indo-Pacific</span>
        </div>
      </div>

      {/* 2. NAVIGATION BAR CONTAINER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Visual Logo Branding */}
          <div
            id="logo-brand-click"
            onClick={() => navigateToTab('home')}
            className="flex items-center gap-3 cursor-pointer group">
            
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/10 transition group-hover:scale-105">
              <Globe className="w-6 h-6 animate-spin-slow text-amber-100" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-sans font-black text-xl sm:text-2xl text-slate-900 tracking-tight leading-none flex items-center gap-1">
                <span>{NGO_DETAILS.name}</span>
                <span className="text-emerald-700">.</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-extrabold tracking-widest uppercase mt-0.5 max-w-[180px] sm:max-w-none truncate leading-none">
                HARAPAN MALAYSIA
              </span>
            </div>
          </div>

          {/* Desktop Links Suite */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About Us' },
            { id: 'projects', label: 'Projects' },
            { id: 'contact', label: 'Contact Us' }].
            map((link) =>
            <button
              key={link.id}
              id={`nav-${link.id}`}
              onClick={() => navigateToTab(link.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === link.id ?
              'text-emerald-800 bg-emerald-50/50' :
              'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
              }>
              
                {link.label}
              </button>
            )}
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3.5">
            <button
              id="desktop-nav-volunteer"
              onClick={() => navigateToTab('volunteer')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
              activeTab === 'volunteer' ?
              'bg-emerald-50 border-emerald-200 text-emerald-850' :
              'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`
              }>
              
              Volunteer Form
            </button>
          </div>

          {/* Mobile Menu Action Hamburger */}
          <button
            id="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-50 border border-slate-200/50 hover:bg-slate-100 text-slate-700 cursor-pointer"
            aria-label="Toggle Menu">
            
            {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </header>

      {/* 3. MOBILE SYSTEM DRAWER OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen &&
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="fixed inset-x-0 top-20 z-35 bg-white border-b border-slate-200 shadow-xl p-6 lg:hidden space-y-4">
          
            <div className="grid grid-cols-2 gap-2">
              {[
            { id: 'home', label: 'Home Page' },
            { id: 'about', label: 'About Us' },
            { id: 'projects', label: 'Active Projects' },
            { id: 'contact', label: 'Contact Us' },
            { id: 'volunteer', label: 'Volunteer Form' }].
            map((link) =>
            <button
              key={link.id}
              id={`mob-nav-${link.id}`}
              onClick={() => navigateToTab(link.id)}
              className={`p-3 text-left rounded-xl text-xs font-bold transition cursor-pointer block border ${
              activeTab === link.id ?
              'bg-emerald-50 border-emerald-100 text-emerald-850' :
              'bg-slate-50/50 border-slate-100 text-slate-700'}`
              }>
              
                  {link.label}
                </button>
            )}
            </div>


          </motion.div>
        }
      </AnimatePresence>

      {/* 4. MAIN LAYOUT AND TRANSITION CHASSIS */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-8 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}>
            
            {activeTab === 'home' &&
            <Home
              onNavigate={navigateToTab}
              onSelectProject={handleSelectProjectAndView} />

            }
            
            {activeTab === 'about' && <About />}
            
            {activeTab === 'projects' &&
            <Projects
              onApplyForProject={handleApplyForProject}
              selectedProjectId={selectedProjectId}
              onClearSelectedProjectId={() => setSelectedProjectId(null)} />

            }

            
            {activeTab === 'volunteer' &&
            <VolunteerForm
              prefilledProjectTitle={prefilledProject}
              onClearPrefilledProject={() => setPrefilledProject(null)} />

            }
            
            {activeTab === 'contact' && <ContactUs />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 5. DIGNIFIED NGO FOOTER */}
      <footer className="bg-slate-900 text-slate-450 border-t border-slate-800 pt-16 pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Colon 1: Title and Profile */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                M
              </div>
              <div>
                <span className="block font-sans font-bold text-base text-white tracking-tight">{NGO_DETAILS.name} Collective</span>
                <span className="block text-[8px] text-slate-500 font-extrabold tracking-wider">{NGO_DETAILS.fullName}</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We connect local Malaysian partners with global voluntary structures to co-create sustainable water grids, youth networks, and organic gardens. We prioritize reciprocity over standard top-down charity formats.
            </p>

            <div className="text-[10px] text-slate-450 flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 max-w-sm">
              <Landmark className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Registrar of Societies ID: <strong>{NGO_DETAILS.regNo}</strong></span>
            </div>
          </div>

          {/* Colon 2: Link suites */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-sans font-extrabold text-xs text-slate-250 uppercase tracking-widest">Navigation</h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400">
              {[
              { id: 'home', label: 'Home Page' },
              { id: 'about', label: 'Organization Biography' },
              { id: 'projects', label: 'Active Projects' },
              { id: 'volunteer', label: 'Apply to Volunteer' },
              { id: 'contact', label: 'Partnership Channels' }].
              map((link) =>
              <button
                key={link.id}
                id={`footer-link-${link.id}`}
                onClick={() => navigateToTab(link.id)}
                className="text-left hover:text-emerald-400 transition">
                
                  {link.label}
                </button>
              )}
            </div>
          </div>

          {/* Colon 3: HQ coordinates summary */}
          <div className="md:col-span-4 space-y-4 text-xs text-slate-400 leading-normal">
            <h4 className="font-sans font-extrabold text-xs text-slate-250 uppercase tracking-widest mb-1">HQ Kuala Lumpur</h4>
            <div className="space-y-3">
              <p>{NGO_DETAILS.address}</p>
              <p>
                <strong>Tel:</strong> {NGO_DETAILS.phone} <br />
                <strong>Email:</strong> <a href={`mailto:${NGO_DETAILS.email}`} className="hover:text-emerald-400 transition">{NGO_DETAILS.email}</a>
              </p>
            </div>
          </div>

        </div>

        {/* Legal block */}
        <div className="max-w-7xl mx-auto px-6 border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500">
          <span>&copy; {new Date().getFullYear()} Pertubuhan Sukarelawan Harapan Malaysia (MOVE). All Rights Reserved.</span>
          <div className="flex gap-4">
            <span>Code: PPM-023-14-12112015</span>
            <span>•</span>
            <span>Self-Funded Reciprocal Model</span>
            <span>•</span>
            <span>Co-Created in Malaysia</span>
          </div>
        </div>
      </footer>

    </div>);

}

export default function App() {
  return (
    <AppStateProvider>
      <MainApp />
    </AppStateProvider>);

}