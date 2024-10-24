"use client"
import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
            <motion.div
                className="h-[1px] bg-green"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }} // Adjust duration as needed
            />
        </div>
    );
};

export default Loader;