import React, { useState, useEffect, useRef } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

const TextScramble = ({ text, className = "" }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef(null);

    const scramble = () => {
        let iteration = 0;

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(prev =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current);
            }

            iteration += 1 / 3;
        }, 30);
    };

    // Scramble on mount
    useEffect(() => {
        scramble();
        return () => clearInterval(intervalRef.current);
    }, [text]);

    const handleMouseEnter = () => {
        if (!isHovered) {
            setIsHovered(true);
            scramble();
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <span
            className={`inline-block cursor-default ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {displayText}
        </span>
    );
};

export default TextScramble;
