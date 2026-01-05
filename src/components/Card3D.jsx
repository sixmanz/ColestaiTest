import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Card3D = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }} className="h-full">
                {children}
            </div>
            {/* Gloss Effect */}
            <motion.div
                style={{
                    transform: "translateZ(40px)",
                    background: useTransform(
                        mouseX,
                        [-0.5, 0.5],
                        ["linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 100%)", "linear-gradient(to left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 100%)"]
                    )
                }}
                className="absolute inset-0 rounded-2xl pointer-events-none"
            />
        </motion.div>
    );
};

export default Card3D;
