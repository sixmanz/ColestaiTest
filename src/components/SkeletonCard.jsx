import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden h-full border border-white/5 relative">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />

            {/* Poster Skeleton */}
            <div className="aspect-[16/9] bg-white/5" />

            {/* Content Skeleton */}
            <div className="p-5 space-y-4">
                {/* Title */}
                <div className="space-y-2">
                    <div className="h-6 w-3/4 bg-white/10 rounded" />
                    <div className="h-4 w-1/2 bg-white/5 rounded" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-4 w-full bg-white/5 rounded" />
                    <div className="h-4 w-5/6 bg-white/5 rounded" />
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 pt-2">
                    <div className="flex justify-end">
                        <div className="h-4 w-8 bg-white/10 rounded" />
                    </div>
                    <div className="h-2.5 bg-white/5 rounded-full" />
                </div>

                {/* Funding Stats */}
                <div className="flex justify-between pt-2">
                    <div className="space-y-1">
                        <div className="h-3 w-12 bg-white/5 rounded" />
                        <div className="h-5 w-20 bg-white/10 rounded" />
                    </div>
                    <div className="space-y-1 text-right">
                        <div className="h-3 w-12 bg-white/5 rounded ml-auto" />
                        <div className="h-5 w-20 bg-white/10 rounded ml-auto" />
                    </div>
                </div>

                {/* Button */}
                <div className="pt-2">
                    <div className="h-12 w-full bg-white/10 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
