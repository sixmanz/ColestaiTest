import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Spotlight from '../components/Spotlight';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/admin'); // Redirect to admin dashboard
        } catch (error) {
            alert('Failed to login: ' + error.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#050505] text-white overflow-hidden relative">
            {/* Background Ambient Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-colestia-purple/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-colestia-blue/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Left Side - Login Form */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10"
            >
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <Link to="/" className="inline-flex items-center gap-3 mb-12 group">
                        <div className="w-10 h-10 bg-gradient-to-r from-colestia-purple to-colestia-blue rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-white font-bold font-display">C</span>
                        </div>
                        <span className="text-2xl font-display font-bold text-white tracking-wide">Colestia</span>
                    </Link>

                    {/* Title */}
                    <div className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                            {t('auth_welcome_back')}
                        </h1>
                        <p className="text-gray-400">
                            {t('auth_enter_credentials')}
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Spotlight className="rounded-xl bg-white/5 border border-white/10" size={300}>
                            <div className="relative p-1">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="email"
                                    placeholder={t('auth_email_placeholder')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent text-white pl-12 pr-4 py-4 rounded-xl outline-none placeholder:text-gray-600"
                                    required
                                />
                            </div>
                        </Spotlight>

                        <Spotlight className="rounded-xl bg-white/5 border border-white/10" size={300}>
                            <div className="relative p-1">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={t('auth_password_placeholder')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent text-white pl-12 pr-12 py-4 rounded-xl outline-none placeholder:text-gray-600"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </Spotlight>

                        <div className="flex justify-end">
                            <Link to="/forgot-password" className="text-sm text-colestia-purple hover:text-colestia-magenta transition-colors font-medium">
                                {t('auth_forgot_password')}
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gradient-to-r from-colestia-purple to-colestia-blue rounded-xl font-bold text-white shadow-lg shadow-colestia-purple/25 hover:shadow-colestia-purple/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {t('auth_sign_in')} <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-gray-600 text-sm font-medium">{t('auth_or')}</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => alert(t('msg_coming_soon'))}
                            className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-white font-medium text-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Google
                        </button>
                        <button
                            type="button"
                            onClick={() => alert(t('msg_coming_soon'))}
                            className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-white font-medium text-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 384 512" fill="white"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                            Apple
                        </button>
                    </div>

                    <p className="mt-8 text-center text-gray-500">
                        {t('auth_no_account')}{' '}
                        <Link to="/register" className="text-white font-semibold hover:text-colestia-purple transition-colors">
                            {t('auth_sign_up')}
                        </Link>
                    </p>
                </div>
            </motion.div>

            {/* Right Side - Cinematic Visual */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center bg-black"
            >
                {/* Background Image/Gradient */}
                <div className="absolute inset-0 bg-gradient-radial from-colestia-purple/20 to-black z-0" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />

                <div className="relative z-10 text-center px-12 max-w-xl">
                    <h2 className="text-5xl font-display font-bold text-white mb-6 leading-tight">
                        {t('auth_login_image_title')}
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        {t('auth_login_image_desc')}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
