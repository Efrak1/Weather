import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion';

export const Hello = () => {
  return (
    <section className='flex flex-col justify-center mt-32 items-center'>
      <h1 className='text-[30px]'>Здравствуй, <br /> это сайт с прогнозом погоды</h1>
      <motion.div
      className='mt-16 '
      whileHover={{boxShadow:'0 0 60px white'}}
      >
        <Link href='/weather' className='p-6 rounded-xl text-[25px]'>Погода</Link>
      </motion.div>
    </section>
  )
}
