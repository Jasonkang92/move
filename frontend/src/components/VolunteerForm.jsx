import React, { useState, useEffect } from 'react';

import { Check, ShieldAlert, Award, Users, UserCheck } from 'lucide-react';
import { PROJECTS_DATA, NGO_DETAILS } from '../data';
import { useAppState } from '../context/StateContext';






export const VolunteerForm = ({
  prefilledProjectTitle,
  onClearPrefilledProject
}) => {
  const { applications, addApplication } = useAppState();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState(22);
  const [nationality, setNationality] = useState('Malaysian');
  const [preference, setPreference] = useState('Both');
  const [selectedProject, setSelectedProject] = useState('General Fund (Any Program Needed)');
  const [motivation, setMotivation] = useState('');
  const [availability, setAvailability] = useState('');

  // Skills checklist state
  const availableSkills = [
  "English/Language Tutoring",
  "Carpentry / Basic Building",
  "Eco-gardening & Sustainable Agriculture",
  "Marine Conservation & Diving",
  "Creative Photography & Writing",
  "Social Media & Campaign Planning",
  "First Aid / Medical Care Support",
  "Malay/Indonesian conversing"];

  const [skillsSelected, setSkillsSelected] = useState([]);

  // Form view stages
  const [submitted, setSubmitted] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Auto pre-populate when route is passed from catalog
  useEffect(() => {
    if (prefilledProjectTitle) {
      setSelectedProject(prefilledProjectTitle);
    }
  }, [prefilledProjectTitle]);

  const handleSkillToggle = (name) => {
    if (skillsSelected.includes(name)) {
      setSkillsSelected(skillsSelected.filter((s) => s !== name));
    } else {
      setSkillsSelected([...skillsSelected, name]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorText('');

    if (!fullName.trim() || !email.trim()) {
      setErrorText('Please specify your name and primary email address.');
      return;
    }
    if (age < 18 || age > 45) {
      setErrorText('Voluntary field campaigns are optimized for young leaders aged 18 to 45 due to physical challenges. Please contact us for support projects if you fall outside this.');
      return;
    }
    if (skillsSelected.length === 0) {
      setErrorText('Please select at least one skill or focus area you can offer.');
      return;
    }
    if (motivation.length < 30) {
      setErrorText('Please share a slightly longer statement of motivation explaining why you wish to co-create with us.');
      return;
    }

    // Submit via Context
    addApplication({
      fullName,
      email,
      phone,
      age,
      nationality,
      skills: skillsSelected,
      preference,
      motivation,
      availability,
      appliedProjectTitle: selectedProject
    });

    setSubmitted(true);
    onClearPrefilledProject();
  };

  const startNewApplication = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setAge(22);
    setNationality('Malaysian');
    setPreference('Both');
    setSelectedProject('General Fund (Any Program Needed)');
    setMotivation('');
    setAvailability('');
    setSkillsSelected([]);
    setErrorText('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16">
      
      {/* LEFT: Application Form */}
      <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-10 shadow-sm relative">
        <div className="absolute top-8 right-8 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-100 px-3.5 py-1 rounded-full flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>Humble Co-Creation</span>
        </div>

        <div className="space-y-4 mb-8">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest block font-sans">Enlist as Volunteer</span>
          <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
            Voluntary Enlistment Form
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
            Complete your profile below to queue for international or Malaysian local projects. Your motivation & skillsets will guide matching committees.
          </p>
        </div>

        {errorText &&
        <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 text-xs font-semibold mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping"></span>
            <span>{errorText}</span>
          </div>
        }

        {!submitted ?
        <form id="action-volunteer-form" onSubmit={handleFormSubmit} className="space-y-6">
            
            {/* Sec 1: General Profile */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">1. Personal Coordinates</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="volt-full-name" className="text-xs font-bold text-slate-700 block">Full Name</label>
                  <input
                  id="volt-full-name"
                  type="text"
                  required
                  placeholder="Enter your registered name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500" />
                
                </div>
                <div className="space-y-2">
                  <label htmlFor="volt-email" className="text-xs font-bold text-slate-700 block">Email Address</label>
                  <input
                  id="volt-email"
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500" />
                
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="volt-phone" className="text-xs font-bold text-slate-700 block">Phone Number (WhatsApp)</label>
                  <input
                  id="volt-phone"
                  type="tel"
                  placeholder="+60 12-3456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500 font-mono" />
                
                </div>
                <div className="space-y-2">
                  <label htmlFor="volt-age" className="text-xs font-bold text-slate-700 block">Age (Must be 18 to 45)</label>
                  <input
                  id="volt-age"
                  type="number"
                  min={18}
                  max={45}
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 18)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500 font-mono" />
                
                </div>
                <div className="space-y-2">
                  <label htmlFor="volt-nationality" className="text-xs font-bold text-slate-700 block">Nationality</label>
                  <input
                  id="volt-nationality"
                  type="text"
                  placeholder="Malaysian, German, etc."
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500" />
                
                </div>
              </div>
            </div>

            {/* Sec 2: Skills & Preference */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">2. Skills & Preferences</h3>
              
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 block">Select your operational skillsets (Check all that apply):</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {availableSkills.map((skill, index) => {
                  const isChecked = skillsSelected.includes(skill);
                  return (
                    <button
                      key={index}
                      id={`skill-toggle-${index}`}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs font-medium cursor-pointer transition ${
                      isChecked ?
                      'border-emerald-500 bg-emerald-50/50 text-emerald-800' :
                      'border-slate-100 hover:border-slate-200 text-slate-650'}`
                      }>
                      
                        <span>{skill}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-200 bg-white'}`
                      }>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                      </button>);

                })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="volt-region" className="text-xs font-bold text-slate-700 block">Desired Locale</label>
                  <select
                  id="volt-region"
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold select-arrow">
                  
                    <option value="Local">Domestic (Inside Malaysia)</option>
                    <option value="International">Abroad (Indo-Pacific Projects)</option>
                    <option value="Both">Both (Whichever matches best)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="volt-project-select" className="text-xs font-bold text-slate-700 block">Specific Project of Interest</label>
                  <select
                  id="volt-project-select"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                  
                    <option value="General Fund (Any Program Needed)">Assign me where most needed</option>
                    {PROJECTS_DATA.map((p) =>
                  <option key={p.id} value={p.title}>{p.title}</option>
                  )}
                  </select>
                </div>
              </div>
            </div>

            {/* Sec 3: Statement & Available schedules */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">3. Statement & Logistics</h3>

              <div className="space-y-2">
                <label htmlFor="volt-motivation" className="text-xs font-bold text-slate-700 block">Why do you wish to join MOVE co-creation programs? (Motivation Statement)</label>
                <textarea
                id="volt-motivation"
                rows={4}
                required
                placeholder="Tell us about yourself, why you value reciprocal co-creation, and what you aim to learn..."
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500">
              </textarea>
                <p className="text-[10px] text-slate-400">Aim for at least 2 sentences. We evaluate motivation letters closely.</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="volt-availability" className="text-xs font-bold text-slate-700 block">General Availability Window</label>
                <input
                id="volt-availability"
                type="text"
                required
                placeholder="e.g. July - September 2026, or 'Every Saturday/Sunday'"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500" />
              
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button
              id="submit-volunteer-application"
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-3.5 rounded-xl cursor-pointer shadow-lg inline-flex items-center gap-2 text-sm">
              
                <UserCheck className="w-4.5 h-4.5" />
                <span>Submit Enlistment Files</span>
              </button>
            </div>
          </form> : (

        /* PASSPORT SUMMARY GRAPHIC CARD FOR SUCCESS ATTAINMENT */
        <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto pb-1 animate-bounce">
              <Check className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-950 font-sans tracking-tight">Enlistment Received!</h2>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
                Thank you, <strong className="text-emerald-700">{fullName}</strong>. Your voluntary passport profile has been compiled and is now queued inside the database list.
              </p>
            </div>

            {/* Volunteer Passport Graphic */}
            <div className="max-w-md mx-auto bg-gradient-to-tr from-emerald-900 to-emerald-950 text-white rounded-[2rem] p-6 text-left border border-emerald-800 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-5 p-12 select-none select-none text-[80px] font-mono text-emerald-100 leading-none">
                M
              </div>

              {/* Tag header */}
              <div className="flex justify-between items-center border-b border-emerald-800 pb-3.5 mb-4">
                <div className="space-y-0.5">
                  <span className="block text-[8px] uppercase tracking-widest text-amber-300 font-bold font-mono">Voluntary Passport ID</span>
                  <span className="block text-xs font-bold leading-normal">{NGO_DETAILS.name} Collective</span>
                </div>
                <div className="bg-amber-400 text-slate-900 font-extrabold text-[9px] px-2.5 py-1 rounded">
                  QUEUED
                </div>
              </div>

              {/* Body stats */}
              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="block text-[9px] text-emerald-300 uppercase tracking-wider">Candidate Name</span>
                  <span className="font-sans font-bold text-sm block mt-0.5">{fullName}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[9px] text-emerald-300 uppercase tracking-wider">Nationality</span>
                    <span className="font-semibold">{nationality} ({age} y/o)</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-emerald-300 uppercase tracking-wider">Assigned Option</span>
                    <span className="font-semibold truncate block">{selectedProject}</span>
                  </div>
                </div>

                <div>
                  <span className="block text-[9px] text-emerald-300 uppercase tracking-wider">Selected Skills</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skillsSelected.map((sk, i) =>
                  <span key={i} className="bg-emerald-850 text-emerald-200 px-2 py-0.5 rounded text-[8px] font-semibold border border-emerald-800">
                        {sk}
                      </span>
                  )}
                  </div>
                </div>
              </div>

              {/* bottom seal */}
              <div className="border-t border-emerald-800/80 pt-4 mt-5 flex justify-between items-center text-[8px] font-mono text-emerald-400">
                <span>SUBMITTED: {new Date().toLocaleDateString()}</span>
                <span>REG: PPM-023-14-12112015</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <button
              id="reset-form-btn"
              onClick={startNewApplication}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl cursor-pointer shadow-md inline-flex text-xs tracking-wider uppercase font-sans">
              
                Register Another Volunteer
              </button>
            </div>
          </div>)
        }
      </div>

      {/* RIGHT: Recruitment Guidelines Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Verification banner */}
        <div className="bg-emerald-950 text-white rounded-3xl p-6 space-y-4 border border-emerald-900 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-20 h-20 bg-amber-400/5 rounded-full blur-xl"></div>
          
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Operational Code</span>
          </h3>
          <p className="text-[11px] text-emerald-200 leading-relaxed">
            Every candidate must adhere to the **MOVE Voluntary Covenant** upon deployment. Read closely before registration:
          </p>

          <ul className="space-y-2.5 text-xs">
            {[
            "Respect local assembly leadership (Tok Batin or district guides).",
            "Maintain absolute humbleness; co-creation is not a holiday, nor is it a savior mission.",
            "Fully participate in cultural exchange evenings and shared meals.",
            "Attend all pre-deployment security & tool training sessions."].
            map((rule, idx) =>
            <li key={idx} className="flex gap-2 text-slate-350">
                <span className="text-amber-400 shrink-0 font-bold">•</span>
                <span className="text-[11px] leading-snug">{rule}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Live Recruitment Pool slots */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Active Queue ({applications.length})</span>
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <div className="space-y-3.5 h-[320px] overflow-y-auto pr-1">
            {applications.map((app) =>
            <div key={app.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1 hover:bg-slate-100/50 transition">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-800">{app.fullName}</span>
                  <span className="text-[9px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded uppercase border border-amber-200/50">
                    {app.status}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {app.nationality} • {app.age} y/o
                </div>
                <div className="text-[10px] text-slate-600 italic truncate max-w-[200px] mt-1 border-t border-slate-200/40 pt-1">
                  "{app.appliedProjectTitle}"
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};