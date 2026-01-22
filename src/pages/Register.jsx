import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import Spotlight from '../components/Spotlight';
import { useLanguage } from '../context/LanguageContext';

const Register = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError(t('msg_password_match_error'));
            return;
        }
        if (formData.password.length < 6) {
            setError(t('msg_password_length_error'));
            return;
        }
        if (!agreedToTerms) {
            setError(t('msg_agree_terms_error'));
            return;
        }

        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            await updateProfile(userCredential.user, {
                displayName: formData.fullName
            });

            alert(t('msg_registration_success'));
            navigate('/login');
        } catch (err) {
            switch (err.code) {
                case 'auth/email-already-in-use':
                    setError('Email already in use');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email format');
                    break;
                case 'auth/weak-password':
                    setError('Password is too weak');
                    break;
                default:
                    setError('Error: ' + err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#050505] text-white overflow-hidden relative">
            {/* Background Ambient Glow */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-colestia-gold/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-colestia-purple/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Left Side - Cinematic Text (Hidden on Mobile) */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center bg-black"
            >
                <div className="absolute inset-0 bg-gradient-radial from-colestia-purple/20 to-black z-0" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=2508&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />

                <div className="relative z-10 text-center px-12 max-w-xl">
                    <h1 className="text-5xl font-display font-bold text-white mb-6 leading-tight">
                        {t('auth_start_journey')}
                    </h1>
                    <p className="text-lg text-gray-400 leading-relaxed mb-8">
                        {t('auth_start_quote')}
                    </p>

                    {/* Feature List */}
                    <div className="space-y-4 text-left inline-block">
                        {[t('auth_feature_1'), t('auth_feature_2'), t('auth_feature_3'), t('auth_feature_4')].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                    <ArrowRight size={12} className="text-colestia-gold" />
                                </div>
                                <span className="text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Right Side - Register Form */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10"
            >
                <div className="w-full max-w-md">
                    <div className="lg:hidden mb-8 text-center">
                        <Link to="/" className="inline-flex items-center gap-2">
                            <span className="text-2xl font-display font-bold text-white">Colestia</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-display font-bold text-white mb-2">{t('auth_create_account')}</h2>
                        <p className="text-gray-400">{t('auth_join_revolution')}</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Spotlight className="rounded-xl bg-white/5 border border-white/10" size={300}>
                            <div className="relative p-1">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder={t('auth_fullname_placeholder')}
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-white pl-12 pr-4 py-4 rounded-xl outline-none placeholder:text-gray-600"
                                    required
                                />
                            </div>
                        </Spotlight>

                        <Spotlight className="rounded-xl bg-white/5 border border-white/10" size={300}>
                            <div className="relative p-1">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={t('auth_email_placeholder')}
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-white pl-12 pr-4 py-4 rounded-xl outline-none placeholder:text-gray-600"
                                    required
                                />
                            </div>
                        </Spotlight>

                        <Spotlight className="rounded-xl bg-white/5 border border-white/10" size={300}>
                            <div className="relative p-1">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder={t('auth_phone_placeholder')}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-white pl-12 pr-4 py-4 rounded-xl outline-none placeholder:text-gray-600"
                                    required
                                />
                            </div>
                        </Spotlight>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Spotlight className="rounded-xl bg-white/5 border border-white/10" size={300}>
                                <div className="relative p-1">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder={t('auth_password_placeholder')}
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-transparent text-white pl-12 pr-10 py-4 rounded-xl outline-none placeholder:text-gray-600"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </Spotlight>
                            <Spotlight className="rounded-xl bg-white/5 border border-white/10" size={300}>
                                <div className="relative p-1">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder={t('auth_confirm_placeholder')}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full bg-transparent text-white pl-12 pr-10 py-4 rounded-xl outline-none placeholder:text-gray-600"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </Spotlight>
                        </div>

                        <div className="flex items-start gap-3 mt-2">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="mt-1 w-5 h-5 rounded border-gray-600 bg-white/5 text-colestia-purple focus:ring-colestia-purple focus:ring-offset-0"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-400">
                                {t('auth_agree_terms')} <Link to="/terms" className="text-white hover:text-colestia-purple underline decoration-white/30">Terms of Service</Link> {t('and')} <Link to="/privacy" className="text-white hover:text-colestia-purple underline decoration-white/30">Privacy Policy</Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !agreedToTerms}
                            className="w-full py-4 bg-gradient-to-r from-colestia-purple to-colestia-gold text-black font-bold rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                                <>
                                    {t('auth_create_account')} <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-500">
                        {t('auth_already_have_account')}{' '}
                        <Link to="/login" className="text-white font-semibold hover:text-colestia-gold transition-colors">
                            {t('auth_sign_in')}
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
