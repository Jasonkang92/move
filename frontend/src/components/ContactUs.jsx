import React, { useState } from 'react';

import { Mail, Phone, MapPin, Send, CheckCircle2, Building2 } from 'lucide-react';
import { NGO_DETAILS } from '../data';
import { useAppState } from '../context/StateContext';

export const ContactUs = () => {
  const { addMessage, messages } = useAppState();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Initiating Partnership Program');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setErrorText('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorText('Please load all required input fields before sending.');
      return;
    }

    addMessage({
      name,
      email,
      subject,
      message
    });

    setSubmitted(true);
  };

  const startNewMessage = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setSubject('Initiating Partnership Program');
    setMessage('');
    setErrorText('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16">
      
      {/* LEFT: Address and maps */}
      <div className="lg:col-span-4 space-y-8">
        <div className="space-y-4">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest block">Main Coordinates</span>
          <h1 className="text-3xl font-sans font-bold text-slate-900 tracking-tight">Our Clubhouse</h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            Drop by our main offices in Kuala Lumpur for volunteer training, program co-planning, or to share a glass of traditional Orang Asli tea.
          </p>
        </div>

        {/* Address card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-emerald-700 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mailing Address</span>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed mt-1">
                {NGO_DETAILS.address}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start border-t border-slate-100 pt-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-emerald-700 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Telephone Enquiries</span>
              <p className="text-sm font-bold text-slate-800 leading-relaxed mt-1 font-mono">
                {NGO_DETAILS.phone}
              </p>
              <span className="block text-[10px] text-slate-400">Monday - Friday • 9.00am - 5.00pm (GMT+8)</span>
            </div>
          </div>

          <div className="flex gap-4 items-start border-t border-slate-100 pt-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-emerald-700 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Electronic Mail</span>
              <p className="text-sm font-bold text-slate-800 leading-relaxed mt-1 hover:text-emerald-700 transition">
                <a href={`mailto:${NGO_DETAILS.email}`}>{NGO_DETAILS.email}</a>
              </p>
            </div>
          </div>
        </div>

        {/* Mock Map Layout card */}
        <div className="bg-emerald-950 text-white rounded-3xl p-6 relative overflow-hidden h-48 flex items-end">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-10"></div>
          {/* Abstract map lines */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20 -translate-y-4 transform rotate-12"></div>
          <div className="absolute top-0 left-1/3 w-[1px] h-full bg-white/20 transform -rotate-12"></div>
          
          {/* Pulsing map pin marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8 flex flex-col items-center">
            <span className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-slate-900 border-2 border-white shadow-lg animate-bounce">
              <MapPin className="w-4 h-4 fill-slate-900" />
            </span>
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400/80 animate-ping absolute -bottom-1"></span>
          </div>

          <div className="relative z-10 space-y-1">
            <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider block font-mono">MAP MARKER</span>
            <span className="text-xs font-bold font-sans block">Level 3, Bangunan Sukarelawan</span>
            <span className="text-[10px] text-emerald-250 block">Next to National Mosque KL</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Contact Submit Form */}
      <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-10 shadow-sm relative">
        <div className="absolute top-8 right-8 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3.5 py-1 rounded-full flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5" />
          <span>Corporate & Media Desk</span>
        </div>

        <div className="space-y-4 mb-8">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest block font-sans">Partnership Form</span>
          <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 tracking-tight">Co-Create with Us</h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
            Are you a local community council, Orang Asli village coordinator, international exchange agency, or a donor corporation? Load your message below.
          </p>
        </div>

        {errorText &&
        <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 text-xs font-semibold mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping"></span>
            <span>{errorText}</span>
          </div>
        }

        {!submitted ?
        <form id="action-contact-form" onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-xs font-bold text-slate-700 block">Your Name / Representative</label>
                <input
                id="contact-name"
                type="text"
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500" />
              
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-xs font-bold text-slate-700 block">Email Address</label>
                <input
                id="contact-email"
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500" />
              
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-subject" className="text-xs font-bold text-slate-700 block">Reason for Contact</label>
              <select
              id="contact-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold select-arrow">
              
                <option value="Initiating Partnership Program">Initiating a New Community Project</option>
                <option value="Corporate CSR & Giving">Corporate Giving & CSR Sponsor</option>
                <option value="International Exchange Inquiry">International University Affiliation</option>
                <option value="General Ros Inquiry">General Ros Registration Enquiries</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-xs font-bold text-slate-700 block">Your Message</label>
              <textarea
              id="contact-message"
              rows={5}
              required
              placeholder="Describe what community or program ideas you wish to co-create with PERTUBUHAN SUKARELAWAN HARAPAN MALAYSIA..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-emerald-500 focus:border-emerald-500">
            </textarea>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
              id="submit-contact-message"
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-3.5 rounded-xl cursor-pointer shadow-lg inline-flex items-center gap-2 text-sm">
              
                <Send className="w-4 h-4 text-white" />
                <span>Transmit Message File</span>
              </button>
            </div>
          </form> :

        <div className="text-center py-12 space-y-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto pb-1 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-950 font-sans tracking-tight">Transmission Accomplished!</h2>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
                Thank you for reaching out, <strong className="text-emerald-700">{name}</strong>. Your correspondence has been registered dynamically.
              </p>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <button
              id="reset-contact-btn"
              onClick={startNewMessage}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl cursor-pointer shadow-md inline-flex text-xs tracking-wider uppercase font-sans animate-fade-in">
              
                Write Another Message
              </button>
            </div>
          </div>
        }

        {/* Live list block inside contacts to allow testing feedback securely without unrequested routes! */}
        {messages.length > 1 &&
        <div className="mt-12 pt-8 border-t border-slate-200/80 space-y-4">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold font-mono">Dynamically Transmitted Feed Log ({messages.length - 1} User Created)</span>
            <div className="space-y-3">
              {messages.slice(1).map((m) =>
            <div key={m.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{m.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{new Date(m.date).toLocaleTimeString()}</span>
                  </div>
                  <div className="text-emerald-800 font-semibold">{m.subject}</div>
                  <p className="text-slate-600 italic leading-relaxed mt-1">"{m.message}"</p>
                </div>
            )}
            </div>
          </div>
        }
      </div>
    </div>);

};