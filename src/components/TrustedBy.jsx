import React from "react";
import logo from "../../assets/logo/logo.jpeg";

const TrustedBy = () => {
  return (
    <section className="py-12 bg-light relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-10">
          Trusted by industry leaders
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
          <div className="h-24 md:h-28 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer bg-white px-10 py-4 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transform hover:scale-105">
            <img
              alt="Larawans Official Logo"
              className="h-full w-auto object-contain"
              src={logo}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
