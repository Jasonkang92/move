import React from "react";

export default function GetInvolved() {
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
                info.mymove05@gmail.com
              </span>
            </p>
            <p>
              <span className="font-bold text-white block text-base mb-1">
                Low Kok-Chang (Mr.)
              </span>
              <span className="text-white/80">Co-Founder</span>{" "}
              <span className="mx-2 text-white/20">|</span>{" "}
              <span className="font-mono text-secondary text-base">
                info.mymove05@gmail.com
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
