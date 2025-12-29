import React from "react";

const Services = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc] font-display text-[#0f172a] antialiased">
      <section className="relative bg-white pb-24 pt-10 lg:pt-20 clip-diagonal">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>
        <div className="layout-container px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="layout-content-container max-w-[960px] flex flex-col items-center text-center gap-6">
            <div className="inline-flex items-center rounded-full border border-[#4f46e5]/20 bg-[#4f46e5]/5 px-3 py-1 text-sm font-medium text-[#4f46e5]">
              <span className="material-symbols-outlined mr-1 text-[16px]">bolt</span>
              Innovation-First Approach
            </div>
            <h1 className="text-[#0f172a] text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em] max-w-3xl">
              Expertise that Drives <span className="text-[#4f46e5]">Digital Growth</span>
            </h1>
            <p className="text-[#475569] text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
              We blend creative strategy with technical excellence to build modern, scalable, and impactful digital experiences for forward-thinking brands.
            </p>
            <div className="flex gap-4 mt-4">
              <button className="flex h-12 px-6 items-center justify-center rounded-lg bg-[#4f46e5] text-white text-base font-bold shadow-xl shadow-[#4f46e5]/30 hover:bg-[#4f46e5]/90 transition-all hover:-translate-y-1">
                Explore Services
              </button>
              <button className="flex h-12 px-6 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#0f172a] text-base font-bold hover:bg-gray-50 transition-colors">
                View Portfolio
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-12 w-full max-w-4xl opacity-90">
              <div className="aspect-[4/3] rounded-xl bg-gray-100 bg-cover bg-center translate-y-8 shadow-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSCgfB8KQRSRTN-ZXkbzCUzWKOqetN-fzoLqa0weFEMyyVpflK-xQU9vknbkXaS_TsXmskGD0P4FCoeoqiGyjiA6tGUhqi5DSUnbxOAx6p1NrwG2WsmY3L7Yx_r3u_OnY5OGjq_w5k_tvi5imj9vBpASFHkO8F7-M1JslVjZ_BjzRJmwPfJjsRlPY-MnzhgaqTASIrkZPhBtPvTALNACghFN25YnD-zHE0nkMuGSbVGXIgpSfcNZUNzL-4k7XtLG0XS1XNcIEKKY0')" }}></div>
              <div className="aspect-[4/3] rounded-xl bg-gray-100 bg-cover bg-center shadow-lg z-10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5sxdnbCttKYki3zGoTXp_GbogdJfzuMAFqLg9go4Q-Ibw7K_STXmeE5UfOUivJNLngpT2RBIvDtlGqB06QmoJ-udH-GsTZqfAoOZPG3ujFGx-j56PKZ3ssw-33CpuEajt7pCcPhPc9S9sHQ949CLY5ybni5vBM-DCXPJ5s4Th3nu0RvMbk5e6kfd91KG6Rl3yCF7ualsy1-7fWuXb4bK5D4OTcolHq9R8g8DtusiTu7QkSIXcMmnUWxA80wY9aZTx8ADXdiKP8u8')" }}></div>
              <div className="aspect-[4/3] rounded-xl bg-gray-100 bg-cover bg-center translate-y-8 shadow-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBi0QmiuWGOYPt6-I4K6K4vYwFXitXcr6myWA5JM9jJ_6NbTf0uwSzPONfY8Zkn7AAwthli3af_BrY0ihT1quaAmNgRBFca6Q7gVUv-jqpzXeZu_WwsAT686bB0s2YhBIRsv8Ghd91G1m96IKupV67VPX1KxYY2PtE8I5Xmj95_2A_dnRB0rJ_QWO4xbH_w6zjqIOdmCjU9iD0wpP-FpxGNMLa_k0YbrQR0bQQFT3gKnBYdy7NVZtSmi2e4Xki90CCiVtph4I4n-7I')" }}></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-10">
        <div className="px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="max-w-[960px] flex-1">
            <div className="flex flex-col items-center justify-center mb-8">
              <h2 className="text-[#0f172a] text-2xl font-bold mb-2">Our Capabilities</h2>
              <div className="h-1 w-12 bg-[#4f46e5] rounded-full"></div>
            </div>
            <div className="flex justify-center border-b border-[#e2e8f0] pb-1 overflow-x-auto">
              <div className="flex gap-8 px-4 min-w-max">
                <a className="group flex flex-col items-center justify-center pb-3 border-b-[3px] border-[#4f46e5] cursor-pointer" href="#">
                  <p className="text-[#4f46e5] text-sm font-bold tracking-[0.015em]">All Services</p>
                </a>
                <a className="group flex flex-col items-center justify-center pb-3 border-b-[3px] border-transparent hover:border-[#4f46e5]/30 cursor-pointer" href="#">
                  <p className="text-[#475569] group-hover:text-[#0f172a] text-sm font-bold tracking-[0.015em] transition-colors">Development</p>
                </a>
                <a className="group flex flex-col items-center justify-center pb-3 border-b-[3px] border-transparent hover:border-[#4f46e5]/30 cursor-pointer" href="#">
                  <p className="text-[#475569] group-hover:text-[#0f172a] text-sm font-bold tracking-[0.015em] transition-colors">Design</p>
                </a>
                <a className="group flex flex-col items-center justify-center pb-3 border-b-[3px] border-transparent hover:border-[#4f46e5]/30 cursor-pointer" href="#">
                  <p className="text-[#475569] group-hover:text-[#0f172a] text-sm font-bold tracking-[0.015em] transition-colors">Marketing</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] pb-20">
        <div className="px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="max-w-[960px] flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
              <div className="group flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-transparent hover:border-[#4f46e5]/10 hover:shadow-xl hover:shadow-[#4f46e5]/5 transition-all duration-300 hover:-translate-y-1">
                <div className="size-12 rounded-xl bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center group-hover:bg-[#4f46e5] group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl">code</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#0f172a] text-lg font-bold">Development</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">
                    Robust, scalable coding solutions including custom web apps, e-commerce platforms, and seamless CMS integration for optimal performance.
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <a className="inline-flex items-center text-sm font-bold text-[#4f46e5] group-hover:translate-x-1 transition-transform" href="#">
                    Learn more <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="group flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-transparent hover:border-[#4f46e5]/10 hover:shadow-xl hover:shadow-[#4f46e5]/5 transition-all duration-300 hover:-translate-y-1">
                <div className="size-12 rounded-xl bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center group-hover:bg-[#4f46e5] group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl">brush</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#0f172a] text-lg font-bold">Web Design</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">
                    User-centric design strategies that turn complex problems into intuitive, beautiful interfaces that drive user engagement.
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <a className="inline-flex items-center text-sm font-bold text-[#4f46e5] group-hover:translate-x-1 transition-transform" href="#">
                    Learn more <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="group flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-transparent hover:border-[#4f46e5]/10 hover:shadow-xl hover:shadow-[#4f46e5]/5 transition-all duration-300 hover:-translate-y-1">
                <div className="size-12 rounded-xl bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center group-hover:bg-[#4f46e5] group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl">campaign</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#0f172a] text-lg font-bold">Digital Marketing</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">
                    Data-driven campaigns across SEO, PPC, and social media to amplify your brand's voice and significantly expand your market reach.
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <a className="inline-flex items-center text-sm font-bold text-[#4f46e5] group-hover:translate-x-1 transition-transform" href="#">
                    Learn more <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="group flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-transparent hover:border-[#4f46e5]/10 hover:shadow-xl hover:shadow-[#4f46e5]/5 transition-all duration-300 hover:-translate-y-1">
                <div className="size-12 rounded-xl bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center group-hover:bg-[#4f46e5] group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl">smartphone</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#0f172a] text-lg font-bold">Mobile Apps</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">
                    Native and cross-platform mobile applications designed for maximum engagement and high performance on both iOS and Android devices.
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <a className="inline-flex items-center text-sm font-bold text-[#4f46e5] group-hover:translate-x-1 transition-transform" href="#">
                    Learn more <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="group flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-transparent hover:border-[#4f46e5]/10 hover:shadow-xl hover:shadow-[#4f46e5]/5 transition-all duration-300 hover:-translate-y-1">
                <div className="size-12 rounded-xl bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center group-hover:bg-[#4f46e5] group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#0f172a] text-lg font-bold">Branding</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">
                    Comprehensive branding workshops and strategic identity design to position your business as a recognizable market leader.
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <a className="inline-flex items-center text-sm font-bold text-[#4f46e5] group-hover:translate-x-1 transition-transform" href="#">
                    Learn more <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="group flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-transparent hover:border-[#4f46e5]/10 hover:shadow-xl hover:shadow-[#4f46e5]/5 transition-all duration-300 hover:-translate-y-1">
                <div className="size-12 rounded-xl bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center group-hover:bg-[#4f46e5] group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl">analytics</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#0f172a] text-lg font-bold">Analytics &amp; Growth</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">
                    Advanced tracking, real-time reporting, and conversion optimization strategies to maximize your ROI continuously.
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <a className="inline-flex items-center text-sm font-bold text-[#4f46e5] group-hover:translate-x-1 transition-transform" href="#">
                    Learn more <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full text-white fill-current">
        <svg className="block w-full h-[60px] md:h-[100px]" preserveAspectRatio="none" viewBox="0 0 1440 320">
          <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#ffffff" fillOpacity="1"></path>
        </svg>
      </div>

      <section className="bg-white py-16">
        <div className="px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="max-w-[960px] flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="flex-1 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-[#4f46e5] font-bold uppercase tracking-wider text-sm">
                <span className="w-8 h-[2px] bg-[#4f46e5]"></span>
                Development
              </div>
              <h2 className="text-[#0f172a] text-3xl md:text-4xl font-black leading-tight">
                Building the Foundation of Your Digital Empire
              </h2>
              <p className="text-[#475569] text-lg leading-relaxed">
                Our development team doesn't just write code; we engineer solutions. From blazing-fast static sites to complex web applications, we ensure your digital infrastructure is secure, scalable, and built for the future.
              </p>
              <p className="text-[#475569] text-lg leading-relaxed">
                We employ a rigorous agile methodology, incorporating continuous integration and automated testing to maintain high standards of code quality. Whether upgrading legacy systems or building from scratch, our focus remains on performance, maintainability, and future-proofing your technology stack.
              </p>
              <ul className="flex flex-col gap-3 mt-2">
                <li className="flex items-center gap-3 text-[#0f172a] font-medium">
                  <span className="material-symbols-outlined text-[#4f46e5]">check_circle</span>
                  Full-Stack Web Applications
                </li>
                <li className="flex items-center gap-3 text-[#0f172a] font-medium">
                  <span className="material-symbols-outlined text-[#4f46e5]">check_circle</span>
                  Headless CMS Implementation
                </li>
                <li className="flex items-center gap-3 text-[#0f172a] font-medium">
                  <span className="material-symbols-outlined text-[#4f46e5]">check_circle</span>
                  API Development &amp; Integration
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-4 bg-[#4f46e5]/5 rounded-full blur-2xl z-0"></div>
              <div className="relative z-10 w-full aspect-square md:aspect-[4/5] rounded-2xl bg-cover bg-center shadow-2xl" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfLnIvXprXaTQA3odp1hfMaSxqF1CoacxZ4zMt6mDNKWG48L7VJYs9G7UDRd_8gaorIbJeAI2kPby_6hnk0Vqpglt54ntkYAO4ScA6TgJ7MPS3u9NiL94l55WYYYF0XrJD1wwHW_KQ5kfBKAnzt1AxBBFYSyr9xwkyMv15s2Of9vnPovEuczrVM-OHs7M5uZRSoWlF8S7UNEPwz20TQEPhgwfCg9EA49hDc7Hdb2hSFEXQm1tjG6ossKKwBKRAF_gwkPmgHCWQ1xo')" }}>
              </div>
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">speed</span>
                  </div>
                  <span className="font-bold text-sm">Performance</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[98%] bg-green-500 rounded-full"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-right">98/100 Score</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-24 w-full bg-white relative z-10 clip-diagonal-reverse bg-[#f8fafc] -mt-px"></div>

      <section className="bg-[#f8fafc] py-16 relative">
        <div className="px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="max-w-[960px] flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
            <div className="flex-1 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-[#4f46e5] font-bold uppercase tracking-wider text-sm">
                <span className="w-8 h-[2px] bg-[#4f46e5]"></span>
                Web Design
              </div>
              <h2 className="text-[#0f172a] text-3xl md:text-4xl font-black leading-tight">
                Crafting Experiences that Users Love
              </h2>
              <p className="text-[#475569] text-lg leading-relaxed">
                Great design is invisible. We focus on creating intuitive, user-friendly interfaces that guide your customers effortlessly toward their goals. We combine aesthetics with behavioral psychology to drive engagement.
              </p>
              <p className="text-[#475569] text-lg leading-relaxed">
                Our creative process involves iterative feedback loops and user testing to refine interactions. By balancing visual hierarchy with functional clarity, we ensure that every pixel serves a purpose, creating memorable digital journeys that convert visitors into loyal customers.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-white border border-[#e2e8f0] rounded-full text-sm font-medium text-gray-600">Wireframing</span>
                <span className="px-3 py-1 bg-white border border-[#e2e8f0] rounded-full text-sm font-medium text-gray-600">Prototyping</span>
                <span className="px-3 py-1 bg-white border border-[#e2e8f0] rounded-full text-sm font-medium text-gray-600">Design Systems</span>
                <span className="px-3 py-1 bg-white border border-[#e2e8f0] rounded-full text-sm font-medium text-gray-600">User Research</span>
              </div>
              <button className="self-start mt-4 text-[#4f46e5] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                View Design Case Studies <span className="material-symbols-outlined">arrow_right_alt</span>
              </button>
            </div>
            <div className="flex-1 relative">
              <div className="absolute top-10 -left-10 w-20 h-20 border-4 border-[#4f46e5]/10 rounded-full"></div>
              <div className="absolute bottom-10 -right-10 w-32 h-32 bg-[#4f46e5]/5 rounded-full blur-xl"></div>
              <div className="relative z-10 w-full aspect-square md:aspect-[4/5] rounded-2xl bg-cover bg-center shadow-2xl overflow-hidden group" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWvO7f8-8baTynnlszWJ69yBOFIQZXIsARHdMI3tA5NzWbqUWfKFRXZUHg9pPoR7S1nscgT3kGSs1VUzr2I5YiGsPVzM94y5Q0VoyYCScM__0tdw9IBC5qvLtuu7hMlgyFDMrh7cmobbvRwc7aJ9EO5r-PA5JsmhLm4nCyTtIjWLSvvjCX_KK6f3yLpZ4Tvctce0cZwXExmjShZ5l1E6Eo55M9wTufeFClNTYZfEYxtxsW9C7onw3XTYnCe9qNL6KFoc3pUm3aq5Q')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full text-[#f8fafc] fill-current bg-white">
        <svg className="block w-full h-[60px] md:h-[100px] rotate-180" preserveAspectRatio="none" viewBox="0 0 1440 320">
          <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fillOpacity="1"></path>
        </svg>
      </div>

      <section className="bg-white py-16">
        <div className="px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="max-w-[960px] flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="flex-1 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-[#4f46e5] font-bold uppercase tracking-wider text-sm">
                <span className="w-8 h-[2px] bg-[#4f46e5]"></span>
                Digital Marketing
              </div>
              <h2 className="text-[#0f172a] text-3xl md:text-4xl font-black leading-tight">
                Strategies that Amplify Your Reach
              </h2>
              <p className="text-[#475569] text-lg leading-relaxed">
                In a crowded digital landscape, visibility is everything. We deploy data-driven marketing strategies across SEO, social media, and paid channels to ensure your brand gets noticed by the right audience at the right time.
              </p>
              <p className="text-[#475569] text-lg leading-relaxed">
                We go beyond vanity metrics, focusing on ROI and customer lifetime value. Our team continuously monitors campaign performance, adjusting targeting and creative assets in real-time to optimize spend and maximize impact across the entire marketing funnel.
              </p>
              <ul className="flex flex-col gap-3 mt-2">
                <li className="flex items-center gap-3 text-[#0f172a] font-medium">
                  <span className="material-symbols-outlined text-[#4f46e5]">check_circle</span>
                  SEO &amp; Content Strategy
                </li>
                <li className="flex items-center gap-3 text-[#0f172a] font-medium">
                  <span className="material-symbols-outlined text-[#4f46e5]">check_circle</span>
                  Performance Marketing (PPC)
                </li>
                <li className="flex items-center gap-3 text-[#0f172a] font-medium">
                  <span className="material-symbols-outlined text-[#4f46e5]">check_circle</span>
                  Social Media Management
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-4 bg-[#4f46e5]/5 rounded-full blur-2xl z-0"></div>
              <div className="relative z-10 w-full aspect-square md:aspect-[4/5] rounded-2xl bg-cover bg-center shadow-2xl" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSCgfB8KQRSRTN-ZXkbzCUzWKOqetN-fzoLqa0weFEMyyVpflK-xQU9vknbkXaS_TsXmskGD0P4FCoeoqiGyjiA6tGUhqi5DSUnbxOAx6p1NrwG2WsmY3L7Yx_r3u_OnY5OGjq_w5k_tvi5imj9vBpASFHkO8F7-M1JslVjZ_BjzRJmwPfJjsRlPY-MnzhgaqTASIrkZPhBtPvTALNACghFN25YnD-zHE0nkMuGSbVGXIgpSfcNZUNzL-4k7XtLG0XS1XNcIEKKY0')" }}>
              </div>
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                  </div>
                  <span className="font-bold text-sm">Growth</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[#0f172a]">+124%</span>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-24 w-full bg-white relative z-10 clip-diagonal-reverse bg-[#f8fafc] -mt-px"></div>

      <section className="bg-[#f8fafc] py-16 relative">
        <div className="px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="max-w-[960px] flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
            <div className="flex-1 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-[#4f46e5] font-bold uppercase tracking-wider text-sm">
                <span className="w-8 h-[2px] bg-[#4f46e5]"></span>
                Branding
              </div>
              <h2 className="text-[#0f172a] text-3xl md:text-4xl font-black leading-tight">
                Identities that Leave a Mark
              </h2>
              <p className="text-[#475569] text-lg leading-relaxed">
                Your brand is more than just a logo. It's the story you tell and the feeling you evoke. We craft cohesive brand identities that resonate with your customers and distinguish you from the competition.
              </p>
              <p className="text-[#475569] text-lg leading-relaxed">
                From defining your brand archetypes to creating comprehensive style guides, we establish a consistent voice and look for your business. We help you articulate your unique value proposition, ensuring your brand communicates effectively across print, web, and social media.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-white border border-[#e2e8f0] rounded-full text-sm font-medium text-gray-600">Brand Identity</span>
                <span className="px-3 py-1 bg-white border border-[#e2e8f0] rounded-full text-sm font-medium text-gray-600">Visual Guidelines</span>
                <span className="px-3 py-1 bg-white border border-[#e2e8f0] rounded-full text-sm font-medium text-gray-600">Tone of Voice</span>
                <span className="px-3 py-1 bg-white border border-[#e2e8f0] rounded-full text-sm font-medium text-gray-600">Rebranding</span>
              </div>
              <button className="self-start mt-4 text-[#4f46e5] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                View Brand Stories <span className="material-symbols-outlined">arrow_right_alt</span>
              </button>
            </div>
            <div className="flex-1 relative">
              <div className="absolute top-10 -right-10 w-20 h-20 border-4 border-[#4f46e5]/10 rounded-full"></div>
              <div className="absolute bottom-10 -left-10 w-32 h-32 bg-[#4f46e5]/5 rounded-full blur-xl"></div>
              <div className="relative z-10 w-full aspect-square md:aspect-[4/5] rounded-2xl bg-cover bg-center shadow-2xl overflow-hidden group" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5sxdnbCttKYki3zGoTXp_GbogdJfzuMAFqLg9go4Q-Ibw7K_STXmeE5UfOUivJNLngpT2RBIvDtlGqB06QmoJ-udH-GsTZqfAoOZPG3ujFGx-j56PKZ3ssw-33CpuEajt7pCcPhPc9S9sHQ949CLY5ybni5vBM-DCXPJ5s4Th3nu0RvMbk5e6kfd91KG6Rl3yCF7ualsy1-7fWuXb4bK5D4OTcolHq9R8g8DtusiTu7QkSIXcMmnUWxA80wY9aZTx8ADXdiKP8u8')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full text-[#f8fafc] fill-current bg-white">
        <svg className="block w-full h-[60px] md:h-[100px] rotate-180" preserveAspectRatio="none" viewBox="0 0 1440 320">
          <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fillOpacity="1"></path>
        </svg>
      </div>

      <section className="bg-white py-16">
        <div className="px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="max-w-[960px] flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="flex-1 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-[#4f46e5] font-bold uppercase tracking-wider text-sm">
                <span className="w-8 h-[2px] bg-[#4f46e5]"></span>
                Mobile Apps
              </div>
              <h2 className="text-[#0f172a] text-3xl md:text-4xl font-black leading-tight">
                Seamless Experiences on Every Device
              </h2>
              <p className="text-[#475569] text-lg leading-relaxed">
                In a mobile-first world, your application needs to be more than just functional—it needs to be delightful. We engineer native and cross-platform mobile experiences that keep users engaged and coming back for more.
              </p>
              <p className="text-[#475569] text-lg leading-relaxed">
                Whether you need a high-performance iOS app, a scalable Android solution, or a unified cross-platform product using React Native or Flutter, our team delivers pixel-perfect interfaces backed by robust logic.
              </p>
              <ul className="flex flex-col gap-3 mt-2">
                <li className="flex items-center gap-3 text-[#0f172a] font-medium">
                  <span className="material-symbols-outlined text-[#4f46e5]">check_circle</span>
                  iOS &amp; Android Development
                </li>
                <li className="flex items-center gap-3 text-[#0f172a] font-medium">
                  <span className="material-symbols-outlined text-[#4f46e5]">check_circle</span>
                  Cross-Platform Solutions (Flutter/React Native)
                </li>
                <li className="flex items-center gap-3 text-[#0f172a] font-medium">
                  <span className="material-symbols-outlined text-[#4f46e5]">check_circle</span>
                  App Store Optimization &amp; Launch
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-4 bg-[#4f46e5]/5 rounded-full blur-2xl z-0"></div>
              <div className="relative z-10 w-full aspect-square md:aspect-[4/5] rounded-2xl bg-cover bg-center shadow-2xl" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBi0QmiuWGOYPt6-I4K6K4vYwFXitXcr6myWA5JM9jJ_6NbTf0uwSzPONfY8Zkn7AAwthli3af_BrY0ihT1quaAmNgRBFca6Q7gVUv-jqpzXeZu_WwsAT686bB0s2YhBIRsv8Ghd91G1m96IKupV67VPX1KxYY2PtE8I5Xmj95_2A_dnRB0rJ_QWO4xbH_w6zjqIOdmCjU9iD0wpP-FpxGNMLa_k0YbrQR0bQQFT3gKnBYdy7NVZtSmi2e4Xki90CCiVtph4I4n-7I')" }}>
              </div>
              <div className="absolute -bottom-6 -right-6 z-20 bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">devices</span>
                  </div>
                  <span className="font-bold text-sm">Compatibility</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400 text-sm">check</span>
                  <span className="text-xs text-gray-500">iOS Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-400 text-sm">check</span>
                  <span className="text-xs text-gray-500">Android Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-24 w-full bg-white relative z-10 clip-diagonal-reverse bg-[#f8fafc] -mt-px"></div>

      <section className="bg-[#f8fafc] py-16 relative">
        <div className="px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="max-w-[960px] flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
            <div className="flex-1 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-[#4f46e5] font-bold uppercase tracking-wider text-sm">
                <span className="w-8 h-[2px] bg-[#4f46e5]"></span>
                Analytics &amp; Growth
              </div>
              <h2 className="text-[#0f172a] text-3xl md:text-4xl font-black leading-tight">
                Turning Data into Actionable Insights
              </h2>
              <p className="text-[#475569] text-lg leading-relaxed">
                Data without interpretation is just noise. We implement advanced analytics frameworks that give you a 360-degree view of your user behavior, helping you make informed decisions that drive sustainable growth.
              </p>
              <p className="text-[#475569] text-lg leading-relaxed">
                Our growth experts constantly analyze key performance indicators to identify bottlenecks and opportunities. Through rigorous A/B testing and conversion rate optimization (CRO), we fine-tune every aspect of your funnel for maximum ROI.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-white border border-[#e2e8f0] rounded-full text-sm font-medium text-gray-600">Custom Dashboards</span>
                <span className="px-3 py-1 bg-white border border-[#e2e8f0] rounded-full text-sm font-medium text-gray-600">User Tracking</span>
                <span className="px-3 py-1 bg-white border border-[#e2e8f0] rounded-full text-sm font-medium text-gray-600">A/B Testing</span>
                <span className="px-3 py-1 bg-white border border-[#e2e8f0] rounded-full text-sm font-medium text-gray-600">Funnel Analysis</span>
              </div>
              <button className="self-start mt-4 text-[#4f46e5] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Explore Growth Solutions <span className="material-symbols-outlined">arrow_right_alt</span>
              </button>
            </div>
            <div className="flex-1 relative">
              <div className="absolute top-10 -left-10 w-20 h-20 border-4 border-[#4f46e5]/10 rounded-full"></div>
              <div className="absolute bottom-10 -right-10 w-32 h-32 bg-[#4f46e5]/5 rounded-full blur-xl"></div>
              <div className="relative z-10 w-full aspect-square md:aspect-[4/5] rounded-2xl bg-cover bg-center shadow-2xl overflow-hidden group" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSCgfB8KQRSRTN-ZXkbzCUzWKOqetN-fzoLqa0weFEMyyVpflK-xQU9vknbkXaS_TsXmskGD0P4FCoeoqiGyjiA6tGUhqi5DSUnbxOAx6p1NrwG2WsmY3L7Yx_r3u_OnY5OGjq_w5k_tvi5imj9vBpASFHkO8F7-M1JslVjZ_BjzRJmwPfJjsRlPY-MnzhgaqTASIrkZPhBtPvTALNACghFN25YnD-zHE0nkMuGSbVGXIgpSfcNZUNzL-4k7XtLG0XS1XNcIEKKY0')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full text-[#f8fafc] fill-current bg-white">
        <svg className="block w-full h-[60px] md:h-[100px] rotate-180" preserveAspectRatio="none" viewBox="0 0 1440 320">
          <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fillOpacity="1"></path>
        </svg>
      </div>

      <section className="bg-white py-20">
        <div className="px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="relative w-full max-w-[960px] overflow-hidden rounded-3xl bg-[#4f46e5] px-8 py-16 text-center text-white shadow-2xl md:px-16">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="max-w-xl text-lg text-indigo-100 font-medium">
                Let's collaborate to build something extraordinary. Our team is ready to turn your vision into reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
                <button className="h-12 px-8 rounded-lg bg-white text-[#4f46e5] text-base font-bold hover:bg-gray-50 transition-colors shadow-lg">
                  Start a Project
                </button>
                <button className="h-12 px-8 rounded-lg bg-transparent border-2 border-white text-white text-base font-bold hover:bg-white/10 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
