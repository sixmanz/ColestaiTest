import React from 'react';
import { motion } from 'framer-motion';
import { User, Star, Film, Verified, ExternalLink } from 'lucide-react';

/**
 * CreatorProfileCard - Displays creator/studio profile
 * Uses data from creatorProfile.json mock structure
 */
const CreatorProfileCard = ({ creator }) => {
    if (!creator) return null;

    const roleColors = {
        studio: 'bg-colestia-purple/20 text-colestia-purple border-colestia-purple/30',
        director: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        producer: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        writer: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    };

    const experienceLevels = {
        professional: { stars: 5, color: 'text-yellow-400' },
        experienced: { stars: 4, color: 'text-yellow-400' },
        intermediate: { stars: 3, color: 'text-gray-400' },
        beginner: { stars: 2, color: 'text-gray-500' }
    };

    const expLevel = experienceLevels[creator.experience_level] || experienceLevels.intermediate;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6"
        >
            {/* Profile Header */}
            <div className="flex items-start gap-4 mb-6">
                {/* Avatar */}
                <div className="w-16 h-16 bg-gradient-to-br from-colestia-purple to-colestia-blue rounded-2xl flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white truncate">{creator.creator_name}</h3>
                        <Verified className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    </div>

                    {/* Role Badge */}
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border capitalize ${roleColors[creator.role] || roleColors.studio}`}>
                        {creator.role}
                    </span>
                </div>
            </div>

            {/* Experience Level */}
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 uppercase">Experience Level</span>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, idx) => (
                            <Star
                                key={idx}
                                className={`w-4 h-4 ${idx < expLevel.stars ? expLevel.color + ' fill-current' : 'text-gray-700'}`}
                            />
                        ))}
                    </div>
                </div>
                <p className="text-white font-medium capitalize mt-1">{creator.experience_level}</p>
            </div>

            {/* Past Projects */}
            {creator.past_projects?.length > 0 && (
                <div>
                    <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Film className="w-3 h-3" /> Past Projects
                    </h4>
                    <div className="space-y-2">
                        {creator.past_projects.map((project, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                                        <Film className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <span className="text-sm text-white">{project}</span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* View Portfolio Button */}
            <button className="mt-6 w-full py-3 bg-gradient-to-r from-colestia-purple to-colestia-blue text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                View Full Portfolio
            </button>
        </motion.div>
    );
};

export default CreatorProfileCard;
