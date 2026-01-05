import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
    const baseStyle = "px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 justify-center relative overflow-hidden group";

    const variants = {
        // Primary: The Main Gradient
        primary: "bg-colestia-gradient text-white shadow-[0_0_20px_rgba(122,30,166,0.5)] hover:shadow-[0_0_40px_rgba(201,43,141,0.8)] hover:scale-110 active:scale-95 border border-transparent",

        // Outline: White border, gradient text on hover
        outline: "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/5",

        // Ghost: Simple text
        ghost: "bg-transparent text-gray-400 hover:text-white pl-0",

        // Danger (for Compliance)
        danger: "bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>

            {/* Hover Shine Effect */}
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            )}
        </motion.button>
    );
};

export default Button;
