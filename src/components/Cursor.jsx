import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
    const [isPointer, setIsPointer] = useState(false);

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the cursor delay
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);

            // Check if hovering over clickable elements
            const target = e.target;
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button')
            );
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Main Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    scale: isPointer ? 2.5 : 1,
                }}
            />

            {/* Outer Glow / Trail */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] opacity-50 blur-md"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    backgroundColor: isPointer ? '#C92B8D' : '#7A1EA6', // Magenta on hover, Purple otherwise
                    scale: isPointer ? 4 : 1.5,
                }}
                transition={{ duration: 0.2 }}
            />
        </>
    );
};

export default Cursor;
