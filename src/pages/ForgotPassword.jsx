import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle, ArrowLeft, Loader } from 'lucide-react';
import InteractiveGrid from '../components/InteractiveGrid';
import { useLanguage } from '../context/LanguageContext';

const ForgotPassword = () => {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden p-6">
            <InteractiveGrid />

            <div className="relative z-10 w-full max-w-md">
                <Link to="/login" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Login
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
                >
                    {!isSubmitted ? (
                        <>
                            <div className="mb-8">
                                <h1 className="text-3xl font-display font-bold text-white mb-2">Forgot Password?</h1>
                                <p className="text-gray-400 text-sm">
                                    Enter your email address and we'll send you instructions to reset your password.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="name@example.com"
                                            className="w-full pl-12 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-colestia-purple focus:ring-1 focus:ring-colestia-purple outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-colestia-purple to-colestia-blue text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-colestia-purple/30 transition-all disabled:opacity-50 flex items-center justify-center"
                                >
                                    {isSubmitting ? <Loader className="animate-spin" /> : "Send Reset Link"}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 border border-green-500/20">
                                <CheckCircle size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Check your email</h2>
                            <p className="text-gray-400 text-sm mb-8">
                                We have sent a password reset link to <br />
                                <span className="text-white font-medium">{email}</span>
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-sm text-colestia-purple hover:text-white transition-colors"
                            >
                                Didn't receive the email? Click to resend
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ForgotPassword;
