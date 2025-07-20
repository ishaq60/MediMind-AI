"use client"
import Image from "next/image";
import Banner from "./components/Banner";
import ServicesSection from "./components/ServicesSection";
import About from "./components/About";
import Feature from "./components/Feature";
import Testmonalsection from "./components/Testmonalsection";
import Priceing from "./components/Priceing";
import HowItWorks from "./components/How It Works";
import Contact from "./components/Contact";
import Doctors from "./components/Doctors";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
  viewport: { once: true },
};

export default function Home() {
  return (
    <div>
      {/* Banner WITHOUT animation */}
      <Banner />

      {/* Animate all other sections */}
      <motion.div {...fadeUp}>
        <Feature />
      </motion.div>

      <motion.div {...fadeUp}>
        <HowItWorks />
      </motion.div>

      <motion.div {...fadeUp}>
        <Testmonalsection />
      </motion.div>

      <motion.div {...fadeUp}>
        <Doctors />
      </motion.div>

      <motion.div {...fadeUp}>
        <Priceing />
      </motion.div>

      <motion.div {...fadeUp}>
        <Contact />
      </motion.div>

      {/* Optional sections commented out */}
      {/* 
      <motion.div {...fadeUp}>
        <ServicesSection />
      </motion.div>

      <motion.div {...fadeUp}>
        <About />
      </motion.div>
      */}
    </div>
  );
}
