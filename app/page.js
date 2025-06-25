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

export default function Home() {
  return (
  <div>
    <Banner></Banner>
    <Feature></Feature>
    <HowItWorks></HowItWorks>
    <Testmonalsection></Testmonalsection>
     <Doctors></Doctors>
    <Priceing></Priceing>
    <Contact></Contact>
 
    {/* <ServicesSection></ServicesSection>
    <About></About> */}
  </div>
  );
}
