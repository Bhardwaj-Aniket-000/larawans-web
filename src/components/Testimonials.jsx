import React, { useRef } from "react";

const Testimonials = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <section className="py-24 bg-light relative overflow-hidden">
      <div className="absolute top-0 right-0 w-2/3 h-full bg-white rounded-l-[5rem] shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.02)] z-0"></div>
      <div className="absolute left-0 bottom-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-secondary/10 rounded-tr-[100%] z-0"></div>
      <div
        className="absolute right-20 top-20 w-32 h-32 opacity-20 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-dark leading-tight">
            Voices of <br />
            Satisfaction
          </h2>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          <div className="bg-light md:bg-white p-8 rounded-[2.5rem] rounded-tr-none shadow-xl border border-slate-100 relative group hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-primary to-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-2xl">
                format_quote
              </span>
            </div>
            <div className="mb-6 flex gap-1 text-yellow-400">
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
            </div>
            <p className="text-slate-600 mb-8 italic text-lg leading-relaxed">
              "The team at Larawans transformed our digital presence completely.
              Their attention to detail and creative strategy is unmatched in
              the industry."
            </p>
            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                SJ
              </div>
              <div>
                <h4 className="font-bold text-dark text-lg">Sarah Jenkins</h4>
                <p className="text-xs text-primary font-bold uppercase tracking-wider">
                  CEO, TechStart
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dark p-8 rounded-[2.5rem] shadow-2xl border border-slate-700 relative group hover:-translate-y-4 transition-transform duration-300 md:-mt-8">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-secondary to-pink-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-pink-900/50 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-2xl">
                format_quote
              </span>
            </div>
            <div className="mb-6 flex gap-1 text-yellow-400">
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
            </div>
            <p className="text-slate-300 mb-8 italic text-lg leading-relaxed">
              "Working with Larawans was a game-changer. They delivered a robust
              platform that scaled with our user growth seamlessly. Highly
              recommended."
            </p>
            <div className="flex items-center gap-4 border-t border-slate-700 pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                MR
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Michael Ross</h4>
                <p className="text-xs text-secondary font-bold uppercase tracking-wider">
                  CTO, FinWave
                </p>
              </div>
            </div>
          </div>

          <div className="bg-light md:bg-white p-8 rounded-[2.5rem] rounded-bl-none shadow-xl border border-slate-100 relative group hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-accent to-cyan-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-cyan-200 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-2xl">
                format_quote
              </span>
            </div>
            <div className="mb-6 flex gap-1 text-yellow-400">
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
              <span className="material-symbols-outlined filled text-sm">
                star
              </span>
            </div>
            <p className="text-slate-600 mb-8 italic text-lg leading-relaxed">
              "Their data-driven approach to marketing helped us double our
              leads in just three months. A truly professional and
              results-oriented agency."
            </p>
            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                EL
              </div>
              <div>
                <h4 className="font-bold text-dark text-lg">Emma Liu</h4>
                <p className="text-xs text-accent font-bold uppercase tracking-wider">
                  Director, EcoLife
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Slider View */}
        <div className="md:hidden relative">
          {/* Slider Navigation Buttons */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={() => scroll("left")}
              className="bg-white border border-slate-200 text-slate-700 p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined text-xl">
                chevron_left
              </span>
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-white border border-slate-200 text-slate-700 p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined text-xl">
                chevron_right
              </span>
            </button>
          </div>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex-shrink-0 w-[85vw] snap-center bg-dark p-8 rounded-[2.5rem] shadow-2xl border border-slate-700 relative group">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-secondary to-pink-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-pink-900/50 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl">
                  format_quote
                </span>
              </div>
              <div className="mb-6 flex gap-1 text-yellow-400">
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
              </div>
              <p className="text-slate-300 mb-8 italic text-base leading-relaxed">
                "Working with Larawans was a game-changer. They delivered a
                robust platform that scaled with our user growth seamlessly.
                Highly recommended."
              </p>
              <div className="flex items-center gap-4 border-t border-slate-700 pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  MR
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Michael Ross</h4>
                  <p className="text-xs text-secondary font-bold uppercase tracking-wider">
                    CTO, FinWave
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-[85vw] snap-center bg-white p-8 rounded-[2.5rem] rounded-tr-none shadow-xl border border-slate-100 relative group">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-primary to-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl">
                  format_quote
                </span>
              </div>
              <div className="mb-6 flex gap-1 text-yellow-400">
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
              </div>
              <p className="text-slate-600 mb-8 italic text-base leading-relaxed">
                "The team at Larawans transformed our digital presence
                completely. Their attention to detail and creative strategy is
                unmatched in the industry."
              </p>
              <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  SJ
                </div>
                <div>
                  <h4 className="font-bold text-dark text-lg">Sarah Jenkins</h4>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider">
                    CEO, TechStart
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 w-[85vw] snap-center bg-white p-8 rounded-[2.5rem] rounded-bl-none shadow-xl border border-slate-100 relative group">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-accent to-cyan-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-cyan-200 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl">
                  format_quote
                </span>
              </div>
              <div className="mb-6 flex gap-1 text-yellow-400">
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
                <span className="material-symbols-outlined filled text-sm">
                  star
                </span>
              </div>
              <p className="text-slate-600 mb-8 italic text-base leading-relaxed">
                "Their data-driven approach to marketing helped us double our
                leads in just three months. A truly professional and
                results-oriented agency."
              </p>
              <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  EL
                </div>
                <div>
                  <h4 className="font-bold text-dark text-lg">Emma Liu</h4>
                  <p className="text-xs text-accent font-bold uppercase tracking-wider">
                    Director, EcoLife
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
