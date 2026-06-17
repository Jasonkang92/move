import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { NGO_DETAILS } from "../../data.js";

export default function Footer() {
  return (
    <footer className="bg-[#0a1128] text-white pt-20 pb-10 border-t-4 border-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center mb-6">
              <img
                src="/logo.jpg"
                alt="MOVE Logo"
                className="h-14 md:h-16 object-contain bg-white p-2 rounded-xl"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              We connect local Malaysian partners with global voluntary
              structures to co-create sustainable solutions. Reciprocity over
              charity.
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
              {["About", "FAQ"].map((link) => (
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
