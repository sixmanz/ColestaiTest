import React, { useState, useEffect } from "react";

const InteractiveGrid = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Grid Pattern */}
            <div
                className="w-full h-full opacity-20"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
                    backgroundSize: "50px 50px",
                }}
            />

            {/* Mouse Gradient Follower */}
            <div
                className="absolute w-[400px] h-[400px] bg-colestia-purple/20 rounded-full blur-[100px] transition-transform duration-75 ease-out"
                style={{
                    left: mousePos.x - 200,
                    top: mousePos.y - 200,
                }}
            />
        </div>
    );
};

export default InteractiveGrid;
