import React, { useRef } from "react";
import banner2 from "../../assets/banner/banner2.jpeg";
import banner3 from "../../assets/banner/banner3.jpeg";
import banner4 from "../../assets/banner/banner4.jpeg";

const Gallery = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <section className="py-32 bg-light relative" id="projects">
      <div className="absolute left-0 top-1/3 w-[15rem] sm:w-[20rem] md:w-[30rem] h-[15rem] sm:h-[20rem] md:h-[30rem] bg-indigo-200/30 rounded-full blur-3xl z-0 mix-blend-multiply"></div>
      <div className="absolute right-0 bottom-0 w-[20rem] sm:w-[30rem] md:w-[40rem] h-[20rem] sm:h-[30rem] md:h-[40rem] bg-pink-200/30 rounded-full blur-3xl z-0 mix-blend-multiply"></div>

      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[80px] text-white"
          data-name="Layer 1"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="#F8FAFC"
            transform="rotate(180 600 60)"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="relative">
            <div className="absolute -left-6 top-2 w-1 h-12 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-dark mb-4">
              Our Creative{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Gallery
              </span>
            </h2>
            <p className="text-slate-500 text-lg max-w-lg">
              A glimpse into our creative portfolio where strategy meets
              impeccable design.
            </p>
          </div>
          <a
            className="hidden sm:flex items-center px-8 py-4 rounded-full bg-white border border-slate-200 text-dark font-bold hover:bg-dark hover:text-white transition-all shadow-lg hover:shadow-xl"
            href="#"
          >
            View All Projects{" "}
            <span className="material-symbols-outlined ml-2 text-sm">
              arrow_forward
            </span>
          </a>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 auto-rows-[350px]">
          <div className="md:col-span-8 group relative rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl h-full border-[6px] border-white">
            <img
              alt="Office team meeting discussion"
              className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
              src={banner2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/30 to-transparent opacity-90 transition-opacity duration-300 flex flex-col justify-end p-10">
              <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-4 py-1.5 bg-primary/90 backdrop-blur-md text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider border border-white/20">
                  Consulting
                </span>
                <h3 className="text-white text-4xl font-bold mb-2">
                  Strategic Planning
                </h3>
                <p className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-lg text-lg">
                  Reinventing corporate strategy for the digital age.
                </p>
              </div>
            </div>
            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/40">
              <span className="material-symbols-outlined text-white">
                north_east
              </span>
            </div>
          </div>

          <div className="md:col-span-4 group relative rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl h-full border-[6px] border-white">
            <img
              alt="Team working in a sunlit office"
              className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
              src={banner3}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/30 to-transparent opacity-90 transition-opacity duration-300 flex flex-col justify-end p-10">
              <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-4 py-1.5 bg-secondary/90 backdrop-blur-md text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider border border-white/20">
                  Tech
                </span>
                <h3 className="text-white text-3xl font-bold">
                  Innovation Hub
                </h3>
              </div>
            </div>
          </div>

          <div className="md:col-span-12 md:row-span-1 group relative rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl h-full border-[6px] border-white">
            <img
              alt="Design sketches and planning"
              className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
              src={banner4}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/30 to-transparent opacity-90 transition-opacity duration-300 flex flex-col justify-end p-10">
              <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-4 py-1.5 bg-accent/90 backdrop-blur-md text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider border border-white/20">
                  Branding
                </span>
                <h3 className="text-white text-4xl font-bold">
                  Visual Identity System
                </h3>
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
            <div className="flex-shrink-0 w-[85vw] snap-center group relative rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl h-[350px] border-[6px] border-white">
              <img
                alt="Office team meeting discussion"
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                src={banner2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/30 to-transparent opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-4 py-1.5 bg-primary/90 backdrop-blur-md text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider border border-white/20">
                    Consulting
                  </span>
                  <h3 className="text-white text-2xl font-bold mb-2">
                    Strategic Planning
                  </h3>
                  <p className="text-slate-300 text-sm">
                    Reinventing corporate strategy for the digital age.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 w-[85vw] snap-center group relative rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl h-[350px] border-[6px] border-white">
              <img
                alt="Team working in a sunlit office"
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                src={banner3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/30 to-transparent opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-4 py-1.5 bg-secondary/90 backdrop-blur-md text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider border border-white/20">
                    Tech
                  </span>
                  <h3 className="text-white text-2xl font-bold">
                    Innovation Hub
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 w-[85vw] snap-center group relative rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl h-[350px] border-[6px] border-white">
              <img
                alt="Design sketches and planning"
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                src={banner4}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/30 to-transparent opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-4 py-1.5 bg-accent/90 backdrop-blur-md text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider border border-white/20">
                    Branding
                  </span>
                  <h3 className="text-white text-2xl font-bold">
                    Visual Identity System
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center sm:hidden">
          <a
            className="inline-flex items-center px-8 py-4 rounded-full bg-white border border-slate-200 text-dark font-bold shadow-lg"
            href="#"
          >
            View All Projects{" "}
            <span className="material-symbols-outlined ml-2 text-sm">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
