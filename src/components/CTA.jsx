import React from "react";

const CTA = () => {
  return (
    <section className="py-24 px-4 bg-light relative">
      <div className="absolute inset-0 pattern-diagonal opacity-100 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="relative rounded-[4rem] rounded-tl-[8rem] rounded-br-[8rem] overflow-hidden bg-dark shadow-2xl transform transition-transform duration-300 hover:scale-[1.01]">
          <svg
            className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,100 C150,200 300,0 450,100 C600,200 750,0 900,100 C1050,200 1200,0 1350,100"
              fill="none"
              stroke="white"
              strokeWidth="2"
            ></path>
            <path
              d="M0,200 C150,300 300,100 450,200 C600,300 750,100 900,200 C1050,300 1200,100 1350,200"
              fill="none"
              stroke="white"
              strokeWidth="2"
            ></path>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-indigo-900 to-secondary opacity-90"></div>
          <div className="absolute -top-32 -right-32 w-[15rem] sm:w-[20rem] md:w-[30rem] h-[15rem] sm:h-[20rem] md:h-[30rem] bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -left-32 w-[15rem] sm:w-[20rem] md:w-[30rem] h-[15rem] sm:h-[20rem] md:h-[30rem] bg-accent/30 rounded-full blur-3xl"></div>

          <div className="relative z-10 px-8 py-24 md:py-32 text-center">
            <h2 className="text-4xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
              Ready to transform your <br />
              digital presence?
            </h2>
            <p className="text-indigo-100 text-xl md:text-2xl mb-14 max-w-3xl mx-auto font-light">
              Let's collaborate to build something extraordinary. Our team is
              ready to bring your vision to life with passion and precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-white text-primary px-12 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1">
                Start a Project
              </button>
              <button className="flex items-center gap-2 bg-transparent border-2 border-white/30 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm">
                Contact Sales{" "}
                <span className="material-symbols-outlined text-sm">
                  north_east
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
