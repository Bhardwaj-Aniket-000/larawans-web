import React from "react";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import Stats from "../components/Stats";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";

function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Stats />
      <Services />
      <Gallery />
      <Testimonials />
      <CTA />
    </>
  );
}

export default Home;
