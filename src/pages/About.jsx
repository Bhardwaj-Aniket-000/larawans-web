import React from "react";

const About = () => {
  return (
    <div className="bg-background-alt text-text-main font-display overflow-x-hidden">
      <section className="relative flex min-h-[600px] w-full flex-col justify-center overflow-hidden bg-[#f8fafc] pb-20 pt-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-transparent to-[#f8fafc] z-10"></div>
          <div
            className="h-full w-full bg-cover bg-center opacity-[0.07] grayscale"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAorgR9eCaA95O16vDkGL52gsEp1i3fR7gexbZEd8VneFUJBLvWvu5ITgCy7YBhAeWT8iVwuwtLwgvhfUAwRTX3myD8L1N46zoDIpzl5ceCBUD_VZ7nRF-S07AWvUfwrmji7_PtgXLuWR3FI2VxJTm9v-v-vxaaO7cZZCFGNcP_ofqMTGWTcg01uRXW3RSZb5ZaLRgU3CN3TZfsJij5_7Bd1aEsLbauxQR1TQVEay40pEFfeOFLNbGr0qcAKjRFwT_4uPMTdIbB8jY')",
            }}
          ></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-6">
              We are digital pioneers
            </div>
            <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              Crafting the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                Future
              </span>{" "}
              of Digital Experience
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 md:text-xl leading-relaxed">
              We are a team of strategists, designers, and developers united by
              a single mission: to build digital products that matter.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block h-[60px] w-[calc(100%+1.3px)] sm:h-[100px]"
            data-name="Layer 1"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-white"
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            ></path>
          </svg>
        </div>
      </section>

      <section className="relative w-full bg-white py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl shadow-slate-200">
                <img
                  alt="Team Collaboration"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwtLChVDqvj3ZB9ZwExcnrKFlrf76wunVEoqYkMpHUBmsmHTHCRsXBzuQRQt7FlqeaX12Z3B3Su1Pzm5ySF6L6BANLN49ow9-A-taApun1dtK91xN6ILs0imZzVHhHYbra7sgspTfgjFXRxYk3g0tdIgd-IDxAzU4R9D65gA5dtMpxJwLhvF-JM3tWLvZBvd-o4SiqC5In9Ntj_2p7DnDyJzxLZMPWMcENM_D4pMV5PzuPOKcPFVbebbZ2huOGONUKcw4gwgt39Mk"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Our Mission
              </h2>
              <p className="mb-6 text-lg text-slate-600">
                At Vortex, we believe that technology should serve humanity, not
                the other way around. Our mission is to humanize the digital
                landscape through intuitive design and robust engineering.
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex size-12 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                    <span className="material-symbols-outlined">lightbulb</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Innovation First
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      We don't just follow trends; we set them by experimenting
                      with new technologies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex size-12 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                    <span className="material-symbols-outlined">groups</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      People Centric
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Every pixel we push is designed with the end-user in mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block h-[80px] w-full"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-[#f8fafc]"
              d="M1200 120L0 16.48V0h1200v120z"
            ></path>
          </svg>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/60 to-transparent pointer-events-none"></div>
        <div className="absolute -left-40 top-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-24 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl mb-6">
              Our Journey Through Time
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              From a humble garage startup to a global powerhouse, explore the
              key moments that defined our path and shaped our vision for the
              future.
            </p>
          </div>
          <div className="relative w-full max-w-7xl mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent -translate-y-1/2 hidden md:block"></div>
            <div className="absolute top-0 bottom-0 left-8 w-px bg-gradient-to-b from-slate-200 via-slate-300 to-transparent md:hidden"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-0 relative">
              <div className="group relative md:h-96">
                <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 w-5 h-5 rounded-full bg-white border-4 border-primary shadow-lg md:-translate-x-1/2 md:-translate-y-1/2 z-20 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="md:hidden absolute left-[2.5rem] top-2.5 w-10 h-px bg-slate-200"></div>
                <div className="pl-24 md:pl-0 md:absolute md:left-3 md:right-3 md:bottom-[50%] md:mb-12">
                  <div className="hidden md:block absolute left-1/2 -translate-x-px w-px h-12 bg-slate-200 -bottom-12 group-hover:bg-primary/50 transition-colors"></div>
                  <div className="bg-white p-6 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-100 group-hover:border-primary/20 group-hover:-translate-y-2 transition-all duration-300 relative overflow-hidden h-full">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold tracking-wide">
                        2015
                      </span>
                      <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-xl">
                          garage
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      The Beginning
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Two friends, one garage, and a shared vision to
                      revolutionize web design. Vortex was born.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative md:h-96">
                <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 w-5 h-5 rounded-full bg-white border-4 border-cyan-500 shadow-lg md:-translate-x-1/2 md:-translate-y-1/2 z-20 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="md:hidden absolute left-[2.5rem] top-2.5 w-10 h-px bg-slate-200"></div>
                <div className="pl-24 md:pl-0 md:absolute md:left-3 md:right-3 md:top-[50%] md:mt-12">
                  <div className="hidden md:block absolute left-1/2 -translate-x-px w-px h-12 bg-slate-200 -top-12 group-hover:bg-cyan-500/50 transition-colors"></div>
                  <div className="bg-white p-6 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-100 group-hover:border-cyan-500/20 group-hover:-translate-y-2 transition-all duration-300 relative overflow-hidden h-full">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/20 group-hover:bg-cyan-500 transition-colors"></div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-xs font-bold tracking-wide">
                        2017
                      </span>
                      <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-cyan-500 transition-colors">
                        <span className="material-symbols-outlined text-xl">
                          handshake
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      First Major Client
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Partnered with TechGlobal to completely redesign their
                      enterprise platform.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative md:h-96">
                <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 w-5 h-5 rounded-full bg-white border-4 border-indigo-500 shadow-lg md:-translate-x-1/2 md:-translate-y-1/2 z-20 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="md:hidden absolute left-[2.5rem] top-2.5 w-10 h-px bg-slate-200"></div>
                <div className="pl-24 md:pl-0 md:absolute md:left-3 md:right-3 md:bottom-[50%] md:mb-12">
                  <div className="hidden md:block absolute left-1/2 -translate-x-px w-px h-12 bg-slate-200 -bottom-12 group-hover:bg-indigo-500/50 transition-colors"></div>
                  <div className="bg-white p-6 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-100 group-hover:border-indigo-500/20 group-hover:-translate-y-2 transition-all duration-300 relative overflow-hidden h-full">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/20 group-hover:bg-indigo-500 transition-colors"></div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-wide">
                        2019
                      </span>
                      <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-indigo-500 transition-colors">
                        <span className="material-symbols-outlined text-xl">
                          code
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Team Growth
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Expanded to 20 full-time specialists, adding dedicated
                      mobile and UX teams.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative md:h-96">
                <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 w-5 h-5 rounded-full bg-white border-4 border-emerald-500 shadow-lg md:-translate-x-1/2 md:-translate-y-1/2 z-20 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="md:hidden absolute left-[2.5rem] top-2.5 w-10 h-px bg-slate-200"></div>
                <div className="pl-24 md:pl-0 md:absolute md:left-3 md:right-3 md:top-[50%] md:mt-12">
                  <div className="hidden md:block absolute left-1/2 -translate-x-px w-px h-12 bg-slate-200 -top-12 group-hover:bg-emerald-500/50 transition-colors"></div>
                  <div className="bg-white p-6 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-100 group-hover:border-emerald-500/20 group-hover:-translate-y-2 transition-all duration-300 relative overflow-hidden h-full">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors"></div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold tracking-wide">
                        2020
                      </span>
                      <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-emerald-500 transition-colors">
                        <span className="material-symbols-outlined text-xl">
                          public
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Going International
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Opened strategic offices in London and Singapore to serve
                      global clients.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative md:h-96">
                <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white ring-4 ring-primary/20 shadow-xl md:-translate-x-1/2 md:-translate-y-1/2 z-20 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="md:hidden absolute left-[2.5rem] top-2.5 w-10 h-px bg-primary/30"></div>
                <div className="pl-24 md:pl-0 md:absolute md:left-3 md:right-3 md:bottom-[50%] md:mb-12">
                  <div className="hidden md:block absolute left-1/2 -translate-x-px w-px h-12 bg-primary/30 -bottom-12"></div>
                  <div className="bg-gradient-to-br from-primary to-[#0e46b5] p-6 rounded-2xl shadow-2xl shadow-primary/25 border border-primary/20 group-hover:-translate-y-2 transition-all duration-300 relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold tracking-wide backdrop-blur-sm border border-white/10">
                        2023
                      </span>
                      <div className="p-1.5 rounded-lg bg-white/20 text-white backdrop-blur-sm">
                        <span className="material-symbols-outlined text-xl">
                          emoji_events
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 relative z-10">
                      Agency of the Year
                    </h3>
                    <p className="text-sm text-white/90 leading-relaxed relative z-10">
                      Recognized globally for excellence in design, technical
                      innovation, and client satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-20 flex justify-center">
              <button className="group flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-lg">
                <span>View Full History</span>
                <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-24">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg
            className="relative block h-[50px] w-[calc(100%+1.3px)]"
            data-name="Layer 1"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-[#f8fafc]"
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            ></path>
          </svg>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Our Core Values
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-xl border border-slate-100 bg-[#f8fafc] p-8 transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:bg-white">
              <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">visibility</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                Transparency
              </h3>
              <p className="text-slate-600">
                We believe in open communication. No hidden fees, no jargon,
                just clear and honest collaboration.
              </p>
            </div>
            <div className="group rounded-xl border border-slate-100 bg-[#f8fafc] p-8 transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:bg-white">
              <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Agility</h3>
              <p className="text-slate-600">
                The digital world moves fast. We adapt quickly to changes,
                ensuring your project stays ahead of the curve.
              </p>
            </div>
            <div className="group rounded-xl border border-slate-100 bg-[#f8fafc] p-8 transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:bg-white">
              <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">palette</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                Creativity
              </h3>
              <p className="text-slate-600">
                We push boundaries. We don't settle for 'good enough'—we strive
                for the extraordinary in every design.
              </p>
            </div>
            <div className="group rounded-xl border border-slate-100 bg-[#f8fafc] p-8 transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:bg-white">
              <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">security</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                Integrity
              </h3>
              <p className="text-slate-600">
                We do what is right, even when no one is watching. Trust is the
                foundation of our partnerships.
              </p>
            </div>
            <div className="group rounded-xl border border-slate-100 bg-[#f8fafc] p-8 transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:bg-white">
              <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Growth</h3>
              <p className="text-slate-600">
                We are committed to the growth of our team and our clients,
                constantly learning and evolving.
              </p>
            </div>
            <div className="group rounded-xl border border-slate-100 bg-[#f8fafc] p-8 transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:bg-white">
              <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">favorite</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Empathy</h3>
              <p className="text-slate-600">
                Understanding the user's feelings and needs is at the heart of
                our design philosophy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-20 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Meet the Minds
              </h2>
              <p className="mt-2 text-slate-600">
                The strategists and creators behind the screen.
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors shadow-sm">
              Join the Team{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group relative overflow-hidden rounded-xl shadow-lg shadow-slate-200">
              <div className="aspect-[4/5] w-full overflow-hidden bg-slate-200">
                <img
                  alt="Alex Morgan"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnpxxPvfOV3yebDC9zJ1_9PZkdoGJaLg6qXo_rBoCb1Idud5FMqwqEX4baIChN-KPi_yPdfEnUYuDBrDYwB55rmhE8NQ4_YBh9QNJeKjzI7-jRMll6j5PXN8Jte0mrfURru7xyKbwVQ1SR1D9s3mHSkAqwKCTS2MOyg1us3lN-9gJr2EC51IjHEPrmGKxYjZRhWE5aQLy5nnZ9AxOYyS4cn4H4qoyBSdLLSJ_sdNyP10BTJQbcHafEMzR8X18EEUbgad782IXKVnM"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/90 to-transparent p-6 pt-20">
                <h3 className="text-lg font-bold text-white">Alex Morgan</h3>
                <p className="text-sm text-[#eff4ff] font-medium">
                  CEO &amp; Founder
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg shadow-slate-200">
              <div className="aspect-[4/5] w-full overflow-hidden bg-slate-200">
                <img
                  alt="Sarah Jenkins"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlnjEUHV09cndQ537K_Jc34xtSaes5SBIfOF-gNgKQFdcyxIqJq3cTlUcSo4APwKVla0M_w9fJN5MyKbW5omuTqy4Yjx39ZzlJha95k85vEIh04zK9vk9lKpLQmtEaKIBfBlkX9DIv3BX6wWguZ_Ae1xV3CZLdTQm-oTdXS6BAzQxHaDvlSKemM-yXHoBM3RFkfaRxohHJ6_4qJwMiNFhxUfWIoevgUa_7zLswc4nLMjd8TfuIAQnOyKnEGvig5DALuv1Z6rfH1VI"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/90 to-transparent p-6 pt-20">
                <h3 className="text-lg font-bold text-white">Sarah Jenkins</h3>
                <p className="text-sm text-[#eff4ff] font-medium">
                  Creative Director
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg shadow-slate-200">
              <div className="aspect-[4/5] w-full overflow-hidden bg-slate-200">
                <img
                  alt="David Chen"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR-zRAUYe6TAJVJJU9FeAsLMwlFV7n68QIVjYOWGm3hcG7Z1jGwayCCrQ485Q6CFGlfQZIm2TOvfDmRlEYGssnUO6gBPA0MRO5_kKOg0MMh_N_BNUokmfolwqE-GzXFe1CX85wH2saXfWC7LmvUEpI_ng6uTxK1tso5FedDfBvZkBpCoIew8xV7Cj4ef7c-zQO47MdcY8BSYjTNiQNYbjeuk9pPFrkoXAAUhzqfEhR0MeHVoOw067xFd02qVOxmnpmJ3gfDemyCU8"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/90 to-transparent p-6 pt-20">
                <h3 className="text-lg font-bold text-white">David Chen</h3>
                <p className="text-sm text-[#eff4ff] font-medium">
                  Lead Developer
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl shadow-lg shadow-slate-200">
              <div className="aspect-[4/5] w-full overflow-hidden bg-slate-200">
                <img
                  alt="Emily Ross"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgV5KKdLATAAjYcPA40iQ1Q_wcncAmfK6QN6qCyz-wKFMW7oQlplPK1GaxlxWA4SyyIolb-jo0MIxAYewIxBXAlEhor4FkeabW23UMVaLAuXe6p8E_K8FtUG8im7tC3Lf1g2bf4FMjgrJVzQJkAEEQvLzV5ufRNf0BgVtVa1pNJzim6vbIDK8EdM5pjH0vc5iejDocij0OIyVGsuT6LdvlLIQ4UHCK8wnikza296VnEqk3ioiJA_UlSLU5rOcmVYfT8VTw-gtqdX8"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/90 to-transparent p-6 pt-20">
                <h3 className="text-lg font-bold text-white">Emily Ross</h3>
                <p className="text-sm text-[#eff4ff] font-medium">
                  Strategy Lead
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-primary py-20 text-center text-white">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-black blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">
            Ready to transform your brand?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-white/90">
            Let's create something extraordinary together. Schedule a
            consultation with our team.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="h-12 min-w-[160px] rounded-lg bg-white px-6 font-bold text-primary transition-transform hover:scale-105 shadow-xl">
              Let's Talk
            </button>
            <button className="h-12 min-w-[160px] rounded-lg border border-white/40 bg-white/10 px-6 font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
              View Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
