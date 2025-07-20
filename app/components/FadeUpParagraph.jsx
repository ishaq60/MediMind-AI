"use client";

import { motion } from "framer-motion";

export default function FadeUpParagraph() {
  return (
    <motion.p
      className="text-gray-600 text-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      This paragraph fades in and moves up smoothly using Framer Motion.
    </motion.p>
  );
}
