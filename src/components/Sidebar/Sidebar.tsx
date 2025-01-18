'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaMapMarkerAlt, FaCalendarAlt, FaTelegramPlane, FaVk, FaDiscord } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

interface SidebarProps {
    selectedCity: string;
    onCityChange: (city: string) => void;
    cities: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCity, onCityChange, cities }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [textVisible, setTextVisible] = useState<boolean>(false);
    const [areElementsVisible, setAreElementsVisible] = useState(false);

    const handleClick = () => {
        setAreElementsVisible(prevState => !prevState);
    };

    const sidebarVariants = {
        open: { width: "16rem" },
        closed: { width: "4rem" },
    };

    const handleAnimationComplete = () => {
        if (isOpen) {
            setTextVisible(true);
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1 },
        }),
    };

    const textHiden = {
        hidden: { opacity: 0, x: -300 },
        visible: (i: number) => ({
            opacity: 1,
            x: [0, 50, 0],

            transition: { delay: i * 0.2, duration: 0.3 },
        }),
    };

    return (
        <motion.aside
            className="fixed top-0 left-0 xl:h-[92vh] h-[70vh] mt-3 ml-3 mr-3 rounded-3xl bg-slate-900 text-white z-30"
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={sidebarVariants}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => {
                setIsOpen(true);
                setTextVisible(false);
            }}
            onMouseLeave={() => {
                setIsOpen(false);
                setTextVisible(false);
            }}
            onAnimationComplete={handleAnimationComplete}
        >
            <div className="flex flex-col items-center mt-4 p-3">
                <motion.div className="flex items-center p-2 hover:bg-gray-700 w-full cursor-pointer">
                    <FaBars className='w-6 h-6' />
                    {textVisible && (
                        <motion.a href='/' variants={textVariants} initial="hidden" animate="visible" custom={0} className="ml-4">
                            Меню
                        </motion.a>
                    )}
                </motion.div>
                <motion.div className="flex items-center p-2 hover:bg-gray-700 w-full cursor-pointer">
                    <FaMapMarkerAlt className='w-6 h-6' />
                    {textVisible && (

                        <motion.select
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            custom={1}
                            value={selectedCity}
                            onChange={(e) => onCityChange(e.target.value)}
                            className='ml-3 text-white bg-slate-900'
                        >
                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </motion.select>
                    )}
                </motion.div>
                <motion.div className="flex items-center p-2 hover:bg-gray-700 w-full cursor-pointer">
                    <FaCalendarAlt className='w-6 h-6' />
                    {textVisible && (
                        <motion.button
                            className="flex items-center p-2 hover:bg-gray-700 w-full cursor-pointer"
                        >
                            <motion.span variants={textVariants} initial="hidden" animate="visible" custom={2} className="ml-4">
                                Календарь
                            </motion.span>
                        </motion.button>
                    )}
                </motion.div>
                <motion.button
                    className="flex flex-row items-center p-2 hover:bg-gray-700 w-full cursor-pointer"
                    onClick={handleClick}
                >
                    <BiSupport className='w-6 h-6' />
                    {textVisible && <motion.span variants={textVariants} initial="hidden" animate="visible" custom={4} className="ml-4 flex flex-row items-center">
                        Поддержка <IoIosArrowDown className='w-4 h-4 ml-2' />
                    </motion.span>}
                </motion.button>
                {areElementsVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className='w-full'
                    >
                        <motion.div className="flex items-center p-2 hover:bg-gray-700 w-full cursor-pointer">
                            <FaTelegramPlane className='w-6 h-6' />
                            {textVisible && (
                                <motion.a href='https://web.telegram.org/' variants={textHiden} initial="hidden" animate="visible" custom={1} className="ml-4">
                                    Telegram
                                </motion.a>
                            )}
                        </motion.div>
                        <motion.div className="flex items-center p-2 hover:bg-gray-700 w-full cursor-pointer">
                            <FaVk className='w-6 h-6' />
                            {textVisible && (
                                <motion.a href='' variants={textHiden} initial="hidden" animate="visible" custom={2} className="ml-4">
                                    VK
                                </motion.a>
                            )}
                        </motion.div>
                        <motion.div className="flex items-center p-2 hover:bg-gray-700 w-full cursor-pointer">
                            <FaDiscord className='w-6 h-6' />
                            {textVisible && (
                                <motion.a href='' variants={textHiden} initial="hidden" animate="visible" custom={3} className="ml-4">
                                    Discord
                                </motion.a>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </motion.aside >
    );
};

export default Sidebar;
