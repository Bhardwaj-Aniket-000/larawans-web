import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.jpeg";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="fixed w-full z-50 transition-all duration-300 top-0 left-0 border-b border-white/20 bg-glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <img
                src={logo}
                alt="Larawans Logo"
                className=" h-10 rounded-xl object-cover shadow-lg"
              />
            </div>

            <div className="hidden md:flex space-x-6 items-center bg-white/50 px-8 py-3 rounded-full border border-white/60 shadow-sm backdrop-blur-sm">
              <Link
                className="text-slate-600 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-slate-600 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                to="/about"
              >
                About
              </Link>
              <Link
                className="text-slate-600 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                to="/services"
              >
                Services
              </Link>
              <a
                className="text-slate-600 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                href="#"
              >
                Gallery
              </a>
              <a
                className="text-slate-600 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                href="#"
              >
                Pricing
              </a>
              <a
                className="text-slate-600 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                href="#"
              >
                FAQ
              </a>
              <a
                className="text-slate-600 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                href="#"
              >
                Contact
              </a>
              <a
                className="text-slate-600 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide"
                href="#"
              >
                Dashboard
              </a>
            </div>

            <div className="hidden md:flex">
              <a
                className="relative overflow-hidden group bg-dark hover:bg-primary text-white px-7 py-3 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
                href="#"
              >
                <span className="relative z-10">Let's Talk</span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button
                className="text-slate-800 hover:text-primary transition-colors p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span className="material-symbols-outlined text-3xl">
                  {mobileMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="Larawans Logo"
                  className="w-8 h-8 rounded-lg object-cover shadow-lg"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-600 hover:text-primary transition-colors p-1"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined text-2xl">
                  close
                </span>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-6 px-4">
              <div className="flex flex-col space-y-1">
                <Link
                  className="text-slate-700 hover:text-primary hover:bg-indigo-50 transition-all text-sm font-bold uppercase tracking-wide py-3 px-4 rounded-xl"
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  className="text-slate-700 hover:text-primary hover:bg-indigo-50 transition-all text-sm font-bold uppercase tracking-wide py-3 px-4 rounded-xl"
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  className="text-slate-700 hover:text-primary hover:bg-indigo-50 transition-all text-sm font-bold uppercase tracking-wide py-3 px-4 rounded-xl"
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <a
                  className="text-slate-700 hover:text-primary hover:bg-indigo-50 transition-all text-sm font-bold uppercase tracking-wide py-3 px-4 rounded-xl"
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gallery
                </a>
                <a
                  className="text-slate-700 hover:text-primary hover:bg-indigo-50 transition-all text-sm font-bold uppercase tracking-wide py-3 px-4 rounded-xl"
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  className="text-slate-700 hover:text-primary hover:bg-indigo-50 transition-all text-sm font-bold uppercase tracking-wide py-3 px-4 rounded-xl"
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </a>
                <a
                  className="text-slate-700 hover:text-primary hover:bg-indigo-50 transition-all text-sm font-bold uppercase tracking-wide py-3 px-4 rounded-xl"
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <a
                  className="text-slate-700 hover:text-primary hover:bg-indigo-50 transition-all text-sm font-bold uppercase tracking-wide py-3 px-4 rounded-xl"
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </a>
              </div>
            </nav>

            {/* CTA Button */}
            <div className="p-4 border-t border-slate-100">
              <a
                className="block bg-gradient-to-r from-primary to-secondary text-white px-6 py-4 rounded-full text-sm font-bold text-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                href="#"
                onClick={() => setMobileMenuOpen(false)}
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
