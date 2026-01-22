import React from 'react';
import { motion } from 'framer-motion';
import { Play, Image, MapPin, Globe, Film, Calendar } from 'lucide-react';

/**
 * ProjectDetailCard - Displays film project information
 * Uses data from projectDetail.json mock structure
 */
const ProjectDetailCard = ({ project }) => {
    if (!project) return null;

    const statusColors = {
        active: 'bg-green-500/20 text-green-400 border-green-500/30',
        completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden"
        >
            {/* Hero Poster */}
            <div className="relative aspect-video">
                <img
                    src={project.media_assets?.poster}
                    alt={project.project_name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Play Trailer Button */}
                {project.media_assets?.trailer && (
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all border border-white/30">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </button>
                )}

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${statusColors[project.status] || statusColors.pending}`}>
                        {project.status}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Title & Type */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Film className="w-4 h-4 text-colestia-purple" />
                        <span className="text-xs text-gray-400 uppercase tracking-wider">{project.project_type}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{project.project_name}</h2>
                </div>

                {/* Genre Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.genre?.map((g, idx) => (
                        <span key={idx} className="px-3 py-1 bg-colestia-purple/20 text-colestia-purple text-xs font-medium rounded-full border border-colestia-purple/30">
                            {g}
                        </span>
                    ))}
                </div>

                {/* Synopsis */}
                <p className="text-gray-400 text-sm leading-relaxed">
                    {project.synopsis}
                </p>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase">Production Stage</p>
                            <p className="text-sm text-white font-medium">{project.production_stage}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase">Country</p>
                            <p className="text-sm text-white font-medium">{project.country}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase">Language</p>
                            <p className="text-sm text-white font-medium">{project.language}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Image className="w-4 h-4 text-gray-500" />
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase">Target Audience</p>
                            <p className="text-sm text-white font-medium truncate">{project.target_audience}</p>
                        </div>
                    </div>
                </div>

                {/* Gallery Preview */}
                {project.media_assets?.gallery?.length > 0 && (
                    <div className="pt-4 border-t border-white/10">
                        <p className="text-xs text-gray-500 uppercase mb-3">Gallery</p>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {project.media_assets.gallery.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Still ${idx + 1}`}
                                    className="w-24 h-16 object-cover rounded-lg border border-white/10 flex-shrink-0"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectDetailCard;
