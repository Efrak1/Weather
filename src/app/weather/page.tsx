'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { Hello } from '@/components/Menu/Hello';

export const Home2 = () => {
    return (
        <motion.div
            initial={{y: 500, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 1}}
        >
            <Hello/>
        </motion.div>

    )
}

export default Home2;