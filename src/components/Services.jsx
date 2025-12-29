import React from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate("/services");
  };

  return (
    <section className="relative py-40 bg-white overflow-hidden">
      <div className="absolute inset-0 transform -skew-y-6 origin-top-left bg-slate-50 h-full w-full z-0 border-t border-b border-slate-100 shadow-inner"></div>
      <div className="absolute inset-0 transform skew-y-3 origin-bottom-right bg-gradient-to-b from-transparent to-indigo-50/50 h-full w-full z-0 pointer-events-none"></div>
      <div
        className="absolute top-40 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 border-[3px] border-dashed border-primary/20 rounded-full -translate-x-1/2 animate-spin-slow"
        style={{ animationDuration: "20s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl relative">
            <svg
              className="absolute -left-8 -top-8 w-16 h-16 text-secondary opacity-20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
            </svg>
            <span className="text-primary font-bold tracking-wider uppercase text-sm pl-2">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-dark mt-4 leading-tight">
              Digital mastery for <br />
              modern brands
            </h2>
          </div>
          <p className="text-slate-500 max-w-md text-lg leading-relaxed font-light">
            We provide a full spectrum of digital services to help your business
            thrive in the modern economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div
            onClick={handleServiceClick}
            className="bg-white p-10 rounded-t-[3rem] rounded-br-[3rem] shadow-xl hover:shadow-2xl transition-all duration-300 border-b-8 border-primary group relative overflow-hidden transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-100 to-white rounded-bl-[100%] -mr-0 -mt-0 transition-transform group-hover:scale-125 duration-500 z-0"></div>
            <div
              className="absolute bottom-0 left-0 w-full h-24 opacity-10 z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl rounded-tr-[2rem] flex items-center justify-center mb-8 shadow-lg shadow-indigo-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <span className="material-symbols-outlined text-white text-4xl">
                  palette
                </span>
              </div>
              <h3 className="text-3xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">
                Brand Identity
              </h3>
              <p className="text-slate-500 leading-relaxed mb-6">
                Crafting unique visual identities that resonate with your
                audience and stand the test of time through strategic design
                thinking.
              </p>
              <a
                className="inline-flex items-center text-primary font-bold hover:text-indigo-700 group/link"
                href="#"
              >
                Learn more{" "}
                <span className="material-symbols-outlined ml-2 text-sm group-hover/link:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>

          <div
            onClick={handleServiceClick}
            className="bg-dark p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 border-b-8 border-secondary group relative overflow-hidden transform md:-translate-y-8 hover:md:-translate-y-10 cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-[100%] transition-transform group-hover:scale-125 duration-500 z-0"></div>
            <div
              className="absolute top-0 left-0 w-full h-full opacity-5 z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-1 1l2-2M0 20l20-20M19 21l2-2' stroke='%23FFF' stroke-width='1'/%3E%3C/svg%3E")`,
              }}
            ></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-pink-600 rounded-2xl rounded-tr-[2rem] flex items-center justify-center mb-8 shadow-lg shadow-pink-900/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <span className="material-symbols-outlined text-white text-4xl">
                  code
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Web Development
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Building robust, scalable, and high-performance websites
                tailored to your specific business needs using cutting-edge tech
                stacks.
              </p>
              <a
                className="inline-flex items-center text-secondary font-bold hover:text-pink-400 group/link"
                href="#"
              >
                Learn more{" "}
                <span className="material-symbols-outlined ml-2 text-sm group-hover/link:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>

          <div
            onClick={handleServiceClick}
            className="bg-white p-10 rounded-t-[3rem] rounded-bl-[3rem] shadow-xl hover:shadow-2xl transition-all duration-300 border-b-8 border-accent group relative overflow-hidden transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-50 rounded-bl-[100%] transition-transform group-hover:scale-125 duration-500 z-0"></div>
            <div
              className="absolute bottom-0 left-0 w-full h-24 opacity-10 z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-cyan-600 rounded-2xl rounded-tr-[2rem] flex items-center justify-center mb-8 shadow-lg shadow-cyan-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <span className="material-symbols-outlined text-white text-4xl">
                  trending_up
                </span>
              </div>
              <h3 className="text-3xl font-bold text-dark mb-4 group-hover:text-accent transition-colors">
                Digital Growth
              </h3>
              <p className="text-slate-500 leading-relaxed mb-6">
                Data-driven marketing strategies designed to increase visibility
                and drive meaningful conversions for sustainable growth.
              </p>
              <a
                className="inline-flex items-center text-accent font-bold hover:text-cyan-700 group/link"
                href="#"
              >
                Learn more{" "}
                <span className="material-symbols-outlined ml-2 text-sm group-hover/link:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
