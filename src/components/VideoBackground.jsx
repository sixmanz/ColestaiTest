import React from 'react';
import heroVideo from '../assets/hero.mp4';

const VideoBackground = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay for text readability */}

            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
            >
                <source src={heroVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Cinematic Gradient at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-colestia-bg to-transparent z-10" />
        </div>
    );
};

export default VideoBackground;
