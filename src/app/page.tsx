'use client'
import Weather from "@/components/Weather/Weather";
import React from "react";
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      className="bg-cover bg-center h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Weather/>
    </motion.div>
  );
}
