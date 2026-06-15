import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Filter, X, Info, Coins, Smile } from 'lucide-react';
import { PROJECTS_DATA } from '../data';









export const Projects = ({
  onApplyForProject,
  onDonateToProject,
  selectedProjectId,
  onClearSelectedProjectId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [modalProject, setModalProject] = useState(null);

  // Auto-respond to project selection triggers from other pages
  React.useEffect(() => {
    if (selectedProjectId) {
      const match = PROJECTS_DATA.find((p) => p.id === selectedProjectId);
      if (match) {
        setModalProject(match);
      }
    }
  }, [selectedProjectId]);

  const handleCloseModal = () => {
    setModalProject(null);
    onClearSelectedProjectId();
  };

  const handleApplyClick = (projectTitle) => {
    handleCloseModal();
    onApplyForProject(projectTitle);
  };

  const handleDonateClick = (projectTitle) => {
    handleCloseModal();
    onDonateToProject(projectTitle);
  };

  // Filter projects
  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    const matchesSearch = proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proj.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proj.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || proj.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const categories = ['All', 'Community', 'Environment', 'Culture'];
  const locations = [
  { label: 'All Locales', value: 'All' },
  { label: 'Domestic (Malaysia)', value: 'Local' },
  { label: 'Abroad (International)', value: 'International' }];


  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header Hero Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4 px-6">
        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest block">The Campaign Index</span>
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-slate-900 tracking-tight">
          Active Co-Created Initiatives
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Explore our local program tracks inside Malaysia, alongside reciprocal youth campaigns abroad. Every project represents safe, pre-audited, self-funded structural programs built together with community stewards.
        </p>
      </section>

      {/* 2. Interactive Search & Filter Console */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-50 border border-slate-200/50 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Search Box */}
            <div className="lg:col-span-6 relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                id="project-search-input"
                type="text"
                placeholder="Search projects by country, keyword, or village name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-sm" />
              
            </div>

            {/* Region Selectors */}
            <div className="lg:col-span-6 flex flex-wrap gap-3 sm:justify-end">
              {locations.map((loc) =>
              <button
                key={loc.value}
                id={`filter-loc-${loc.value}`}
                onClick={() => setSelectedLocation(loc.value)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide border cursor-pointer transition ${
                selectedLocation === loc.value ?
                'bg-emerald-600 border-emerald-600 text-white' :
                'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`
                }>
                
                  {loc.label}
                </button>
              )}
            </div>
          </div>

          {/* Categorical Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200/50">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 inline-flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) =>
              <button
                key={cat}
                id={`filter-cat-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition ${
                selectedCategory === cat ?
                'bg-slate-900 border-slate-900 text-white shadow-sm' :
                'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`
                }>
                
                  {cat === 'All' ? 'All Focus Areas' : cat}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Catalog Grid */}
      <section className="max-w-7xl mx-auto px-6">
        {filteredProjects.length === 0 ?
        <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-sans">No matching campaigns found</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Try adjusting your focus filters or search for another term (such as "Sabah", "Water", "Orang Asli", or "Culture").
            </p>
            <button
            id="reset-filters-btn"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedLocation('All');
            }}
            className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition">
            
              Reset All Filters
            </button>
          </div> :

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) =>
          <div
            key={proj.id}
            className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl hover:border-emerald-100/50 transition duration-350 flex flex-col justify-between group">
            
                <div>
                  <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                    <img
                  src={proj.image}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full group-hover:scale-102 transition duration-500" />
                
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold text-slate-700 flex items-center gap-1 border border-slate-200/40">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{proj.country}</span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-[17px] font-extrabold text-slate-950 font-sans tracking-tight group-hover:text-emerald-700 transition">
                      {proj.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="grid grid-cols-2 gap-2 text-center py-3.5 px-2 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-medium text-slate-500 mb-5">
                    <div>
                      <span className="block text-[10px] uppercase text-slate-400 font-bold">Duration</span>
                      <strong className="text-slate-800">{proj.duration}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-slate-400 font-bold">Spots Left</span>
                      <strong className="text-rose-600 font-bold">{proj.spotsLeft} vacancy</strong>
                    </div>
                  </div>

                  <button
                id={`view-card-detail-${proj.id}`}
                onClick={() => setModalProject(proj)}
                className="w-full text-center bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 font-semibold py-3 rounded-2xl transition duration-250 border border-emerald-100/60 cursor-pointer">
                
                    View Operational Plan
                  </button>
                </div>
              </div>
          )}
          </div>
        }
      </section>

      {/* 4. Detailed Modal Overlay */}
      {modalProject &&
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-[2rem] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-100">
          
            {/* Close Button */}
            <button
            id="close-modal-btn"
            onClick={handleCloseModal}
            className="absolute top-5 right-5 z-10 w-9 h-9 bg-white/90 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-full flex items-center justify-center cursor-pointer transition shadow-sm"
            aria-label="Close details">
            
              <X className="w-5 h-5" />
            </button>

            {/* Banner element */}
            <div className="relative h-64 sm:h-72 bg-slate-100">
              <img
              src={modalProject.image}
              alt={modalProject.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" />
            
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 pr-6 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-emerald-600 text-white text-[10px] uppercase font-extrabold px-3 py-1 rounded-full">
                    {modalProject.category}
                  </span>
                  <span className="bg-amber-400 text-slate-950 text-[10px] uppercase font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{modalProject.country}</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-sans text-white leading-tight">
                  {modalProject.title}
                </h2>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Core description block */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-600" />
                  <span>Strategic Operational Brief</span>
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {modalProject.details}
                </p>
              </div>

              {/* Partners and Skills list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="space-y-2">
                  <span className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider">Co-Creation Local Partner</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
                    <span className="text-sm font-semibold text-slate-800">{modalProject.partnerName}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider">Required Volunteer Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {modalProject.skillsNeeded.map((skill, i) =>
                  <span key={i} className="bg-slate-200/60 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-md">
                        {skill}
                      </span>
                  )}
                  </div>
                </div>
              </div>

              {/* self funded cost and budget clarity */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border border-emerald-100 bg-emerald-50/40 rounded-2xl">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Coins className="w-4 h-4 text-emerald-700" />
                    <span>Cost contribution fee</span>
                  </span>
                  <span className="text-base sm:text-lg font-bold text-emerald-800 block">
                    {modalProject.cost}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal max-w-xs">
                  MOVE operates on absolute program neutrality. Fees directly buy wood, sand-filters, seed kits, and local host family meals. We never budget administration overhead from voluntary fees. Check FAQ for details.
                </p>
              </div>

              {/* Modal footer CTAs */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                id="modal-apply-btn"
                onClick={() => handleApplyClick(modalProject.title)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-center cursor-pointer transition shadow-md shadow-emerald-600/10 active:scale-98 text-sm">
                
                  Apply as Volunteer for Project
                </button>
                <button
                id="modal-donate-btn"
                onClick={() => handleDonateClick(modalProject.title)}
                className="bg-white border border-rose-200 hover:bg-rose-50 hover:border-rose-300 text-rose-700 font-bold py-3.5 rounded-2xl text-center cursor-pointer transition text-sm flex items-center justify-center gap-1.5 shadow-sm">
                
                  <Smile className="w-4 h-4 fill-rose-100" />
                  <span>Sponsor with a Donation</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      }
    </div>);

};