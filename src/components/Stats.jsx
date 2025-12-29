import React from "react";

const Stats = () => {
  return (
    <section className="py-24 relative bg-dark overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pattern-diagonal-light opacity-10 pointer-events-none"></div>
      <div className="absolute -left-32 top-0 w-[20rem] sm:w-[30rem] md:w-[40rem] h-[20rem] sm:h-[30rem] md:h-[40rem] bg-gradient-to-r from-primary to-indigo-900 rounded-full blur-[100px] opacity-30 mix-blend-screen animate-pulse"></div>
      <div className="absolute -right-32 bottom-0 w-[15rem] sm:w-[20rem] md:w-[30rem] h-[15rem] sm:h-[20rem] md:h-[30rem] bg-gradient-to-l from-secondary to-pink-900 rounded-full blur-[80px] opacity-30 mix-blend-screen animate-float-delayed"></div>

      <svg
        className="absolute top-20 right-10 w-24 h-24 text-accent/20 animate-spin-slow"
        fill="currentColor"
        viewBox="0 0 100 100"
      >
        <path d="M28.4,22.6c13.7-10,31.5-3.3,42.5,9.6c11,12.9,13.1,32,3.3,45.8c-9.8,13.8-29.2,18.4-43,10.6C17.4,80.8,9.7,65.3,9.5,49.2C9.2,33.1,14.7,32.6,28.4,22.6z"></path>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          <div className="text-center group relative p-6">
            <div className="absolute inset-0 bg-white/5 rounded-3xl transform rotate-3 scale-90 group-hover:scale-100 group-hover:rotate-6 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <h3 className="text-5xl md:text-7xl font-extrabold text-white mb-2 tracking-tight group-hover:text-primary-light transition-colors duration-300">
                250+
              </h3>
              <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs md:text-sm mt-4 group-hover:text-white transition-colors">
                Happy Clients
              </p>
            </div>
          </div>

          <div className="text-center group relative p-6">
            <div className="absolute inset-0 bg-white/5 rounded-3xl transform -rotate-2 scale-90 group-hover:scale-100 group-hover:-rotate-3 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <h3 className="text-5xl md:text-7xl font-extrabold text-white mb-2 tracking-tight group-hover:text-secondary transition-colors duration-300">
                420+
              </h3>
              <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs md:text-sm mt-4 group-hover:text-white transition-colors">
                Projects Completed
              </p>
            </div>
          </div>

          <div className="text-center group relative p-6">
            <div className="absolute inset-0 bg-white/5 rounded-3xl transform rotate-1 scale-90 group-hover:scale-100 group-hover:rotate-2 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <h3 className="text-5xl md:text-7xl font-extrabold text-white mb-2 tracking-tight group-hover:text-accent transition-colors duration-300">
                12
              </h3>
              <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs md:text-sm mt-4 group-hover:text-white transition-colors">
                Years of Experience
              </p>
            </div>
          </div>

          <div className="text-center group relative p-6">
            <div className="absolute inset-0 bg-white/5 rounded-3xl transform -rotate-3 scale-90 group-hover:scale-100 group-hover:-rotate-6 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <h3 className="text-5xl md:text-7xl font-extrabold text-white mb-2 tracking-tight group-hover:text-green-400 transition-colors duration-300">
                99%
              </h3>
              <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs md:text-sm mt-4 group-hover:text-white transition-colors">
                Client Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[80px] text-white"
          data-name="Layer 1"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
            opacity="1"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Stats;
