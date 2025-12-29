import React, { useState, useEffect } from "react";
import banner1 from "../../assets/banner/banner1.jpeg";
import banner2 from "../../assets/banner/banner2.jpeg";
import banner3 from "../../assets/banner/banner3.jpeg";
import banner4 from "../../assets/banner/banner4.jpeg";

const Hero = () => {
  const bannerImages = [banner1, banner2, banner3, banner4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % bannerImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <div className="relative pt-36 pb-20 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] md:w-[800px] h-[300px] sm:h-[500px] md:h-[800px] bg-purple-200 rounded-full blob-shape translate-x-1/4 -translate-y-1/4 mix-blend-multiply opacity-60 animate-float"></div>
      <div className="absolute top-40 -left-20 w-[250px] sm:w-[400px] md:w-[600px] h-[250px] sm:h-[400px] md:h-[600px] bg-cyan-100 rounded-full blob-shape mix-blend-multiply opacity-70 animate-float-delayed"></div>
      <div className="absolute bottom-0 right-1/3 w-[200px] sm:w-[350px] md:w-[500px] h-[200px] sm:h-[350px] md:h-[500px] bg-pink-100/60 rounded-full blob-shape mix-blend-multiply opacity-50 blur-3xl"></div>

      <svg
        className="absolute top-0 right-0 h-full w-1/2 -z-10 opacity-[0.03]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <pattern
          id="diagonalHatch"
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
        >
          <path
            d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2"
            stroke="#000"
            strokeWidth="1"
          ></path>
        </pattern>
        <rect width="100%" height="100%" fill="url(#diagonalHatch)"></rect>
      </svg>

      <svg
        className="absolute top-24 right-0 w-[15rem] sm:w-[25rem] md:w-[40rem] h-[15rem] sm:h-[25rem] md:h-[40rem] text-primary/5 -z-10 animate-float-delayed"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.9,32C59.6,42.5,48.3,50.6,36.6,58.3C24.9,66,12.8,73.4,-0.7,74.6C-14.2,75.8,-27.1,70.8,-39.7,63.6C-52.3,56.4,-64.6,47,-73.2,34.8C-81.8,22.6,-86.7,7.6,-84.3,-6.2C-81.9,-20,-72.1,-32.6,-61.2,-42.6C-50.3,-52.6,-38.3,-60,-25.9,-68.2C-13.5,-76.4,-0.7,-85.4,12.5,-85.2C25.7,-85,30.5,-83.6,44.7,-76.4Z"
          fill="currentColor"
          transform="translate(100 100)"
        ></path>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto mb-20 relative">
          <svg
            className="absolute -top-10 -left-10 w-32 h-32 text-secondary/20 animate-bounce hidden sm:block"
            fill="none"
            style={{ animationDuration: "3s" }}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 50 C 20 20, 40 20, 50 50 C 60 80, 80 80, 80 50"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="8"
            ></path>
          </svg>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-primary text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
            Digital Agency
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            <span className="text-gradient">Here Creativity</span> <br />
            <span className="text-gradient relative inline-block">
              Meets Technology
              <svg
                className="absolute w-[110%] h-4 -bottom-5 -left-[5%] text-secondary opacity-40"
                preserveAspectRatio="none"
                viewBox="0 0 200 9"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.00025 6.99996C2.00025 6.99996 46.5002 1.50001 99.5003 3.00001C152.5 4.50001 198.001 8.5 198.001 8.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="4"
                ></path>
              </svg>
            </span>
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed font-light">
            A full-service digital agency delivering design, development, and
            digital growth solutions.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <a
              className="inline-flex items-center px-10 py-4 border border-transparent text-base font-bold rounded-full shadow-xl shadow-indigo-200 text-white bg-primary hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
              href="#projects"
            >
              View Our Work
            </a>
            <a
              className="inline-flex items-center px-10 py-4 border border-slate-200 text-base font-bold rounded-full text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm"
              href="#"
            >
              <span className="material-symbols-outlined mr-2 text-2xl filled">
                play_circle
              </span>
              Our Story
            </a>
            {/* <a
              className="inline-flex items-center px-10 py-4 border border-transparent text-base font-bold rounded-full text-white bg-secondary hover:bg-pink-600 transition-all duration-300 shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1"
              href="#learn-more"
            >
              Learn More
            </a> */}
          </div>
        </div>

        <div className="relative mt-16 mx-auto max-w-6xl">
          <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-[4rem] transform -rotate-2 z-0 scale-105"></div>
          <div className="absolute -inset-4 bg-gradient-to-bl from-accent/20 to-primary/10 rounded-[4rem] transform rotate-1 z-0 scale-105"></div>

          <div className="relative rounded-[4rem] rounded-tr-[10rem] rounded-bl-[10rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-100 z-10 group">
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
              {bannerImages.map((image, index) => (
                <img
                  key={index}
                  alt={`Banner ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover md:object-contain bg-slate-100 transform group-hover:scale-105 transition-all duration-1000 ${
                    index === currentImageIndex
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                  src={image}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/30 to-transparent opacity-90 transition-opacity duration-300 flex items-end justify-start p-8 sm:p-16">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-8 rounded-3xl max-w-md transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                <p className="text-white text-lg sm:text-xl font-bold tracking-wide mb-2">
                  Bringing visions to life together
                </p>
                <p className="text-slate-100 text-sm sm:text-base font-light">
                  Our diverse team of experts collaborates to deliver
                  exceptional results.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-16 -left-16 w-56 h-56 pattern-dots text-primary/30 z-20 animate-float hidden lg:block">
            <svg width="100%" height="100%">
              <defs>
                <pattern
                  id="dots"
                  patternUnits="userSpaceOnUse"
                  width="20"
                  height="20"
                  x="0"
                  y="0"
                >
                  <circle
                    className="text-primary/30"
                    cx="2"
                    cy="2"
                    r="2.5"
                    fill="currentColor"
                  ></circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)"></rect>
            </svg>
          </div>

          <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-secondary to-pink-400 rounded-full mix-blend-multiply opacity-80 animate-pulse z-0 blur-xl hidden lg:block"></div>

          <div className="absolute top-1/2 -right-24 w-48 h-48 bg-white border border-slate-100 shadow-xl rounded-[2rem] -z-10 overflow-hidden rotate-12 hidden lg:flex lg:items-center lg:justify-center">
            <div className="w-[200%] h-[200%] pattern-diagonal rotate-45"></div>
          </div>
        </div>
      </div>

      <section className="py-10 relative bg-dark overflow-hidden mt-20">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
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
            </div>

            <div className="text-center group relative p-6">
              <div className="absolute inset-0 bg-white/5 rounded-3xl transform -rotate-2 scale-90 group-hover:scale-100 group-hover:-rotate-3 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            </div>

            <div className="text-center group relative p-6">
              <div className="absolute inset-0 bg-white/5 rounded-3xl transform rotate-1 scale-90 group-hover:scale-100 group-hover:rotate-2 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            </div>

            <div className="text-center group relative p-6">
              <div className="absolute inset-0 bg-white/5 rounded-3xl transform -rotate-3 scale-90 group-hover:scale-100 group-hover:-rotate-6 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
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
    </div>
  );
};

export default Hero;
