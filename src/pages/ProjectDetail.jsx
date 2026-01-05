import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import ExternalLinkModal from '../components/ExternalLinkModal';
import { ArrowLeft, Play, AlertCircle, ExternalLink, X } from 'lucide-react';
import heroVideo from '../assets/hero.mp4'; // Using same video as mock trailer for now

// Mock Data Database
const projectData = {
    1: {
        title: "Velcurve House",
        tagline: "The Future of Digital Production Spaces",
        category: "Real Estate Tokenization",
        description: "Fractional ownership of the premier production house studio in Bangkok. Velcurve House isn't just a studio; it's a creative ecosystem powered by blockchain. Investors gain exposure to the rising demand for high-quality digital content production facilities.",
        details: [
            { label: "Location", value: "Bangkok, Thailand" },
            { label: "Asset Value", value: "$5,000,000" },
            { label: "Token Type", value: "Asset-Backed (Real Estate)" },
            { label: "Yield", value: "8-12% APY (Est.)" }
        ],
        videoPoster: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
        link: "https://th-ico-portal.com/project/velcurve"
    },
    2: {
        title: "EcoEnergy Grid",
        tagline: "Powering Tomorrow, Decentralized.",
        category: "Sustainable Tech",
        description: "A blockchain-powered renewable energy distribution network allowing peer-to-peer energy trading. This project aims to democratize energy access in Southeast Asia.",
        details: [
            { label: "Location", value: "Regional (SEA)" },
            { label: "Type", value: "Utility & Governance" },
            { label: "Stage", value: "Seed Round" }
        ],
        videoPoster: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000&auto=format&fit=crop",
        link: "https://investax.io/project/eco"
    },
    3: {
        title: "NextGen Media",
        tagline: "Creators First.",
        category: "Media & Entertainment",
        description: "Decentralized content creation platform for independent artists, cutting out the middlemen and ensuring fair revenue share via smart contracts.",
        details: [
            { label: "Platform", value: "Web3 App" },
            { label: "Token", value: "Utility" }
        ],
        videoPoster: "https://images.unsplash.com/photo-1598899134739-967b867b7463?q=80&w=2000&auto=format&fit=crop",
        link: "https://th-ico-portal.com/project/media"
    }
};

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projectData[id];
    const [modalOpen, setModalOpen] = useState(false);
    const [trailerOpen, setTrailerOpen] = useState(false);

    if (!project) return <div className="pt-32 text-center text-white">Project not found</div>;

    return (
        <div className="min-h-screen bg-colestia-bg pb-20">
            {/* 1. Cinematic Header */}
            <div className="relative h-[70vh] w-full group overflow-hidden">
                {/* Background Image */}
                <img
                    src={project.videoPoster}
                    alt={project.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-colestia-bg via-colestia-bg/60 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
                    <div className="container mx-auto">
                        <Link to="/products" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                            <ArrowLeft size={20} className="mr-2" /> Back to Showcase
                        </Link>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <span className="bg-colestia-purple/20 text-colestia-purple border border-colestia-purple/50 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                                {project.category}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-2">
                                {project.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 italic mb-8 max-w-2xl font-light">
                                "{project.tagline}"
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setTrailerOpen(true)}
                                    className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                                >
                                    <Play size={20} fill="currentColor" /> Watch Trailer
                                </button>
                                <Button variant="primary" onClick={() => setModalOpen(true)}>
                                    Go to Investment Portal <ExternalLink size={18} />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 2. Content Section */}
            <div className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
                {/* Main Info */}
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            {project.description}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">The Opportunity</h2>
                        <p className="text-gray-400 leading-relaxed">
                            This project represents a unique opportunity in the {project.category} space.
                            By leveraging blockchain technology, {project.title} aims to solve key industry inefficiencies.
                        </p>
                    </section>
                </div>

                {/* Sidebar Stats */}
                <div className="bg-[#111] p-8 rounded-2xl border border-white/5 h-fit">
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Project Data</h3>
                    <div className="space-y-6">
                        {project.details.map((detail, idx) => (
                            <div key={idx}>
                                <p className="text-gray-500 text-sm uppercase tracking-wider">{detail.label}</p>
                                <p className="text-white font-medium text-lg">{detail.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                        <div className="flex items-start gap-3 bg-colestia-blue/10 p-4 rounded-lg">
                            <AlertCircle className="text-colestia-blue shrink-0" size={20} />
                            <p className="text-xs text-colestia-blue/80">
                                Colestia provides this data for educational purposes only. Always conduct your own research.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* External Link Compliance Modal */}
            <ExternalLinkModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                destination="the Licensed ICO Portal"
                url={project.link}
            />

            {/* Video Trailer Modal */}
            <AnimatePresence>
                {trailerOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setTrailerOpen(false)}
                    >
                        <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setTrailerOpen(false)}
                                className="absolute top-4 right-4 z-20 text-white/50 hover:text-white bg-black/50 rounded-full p-2 transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <video
                                src={heroVideo}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectDetail;
