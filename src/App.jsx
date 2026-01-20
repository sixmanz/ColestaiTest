import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Construction, ArrowRight } from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';
import Products from './pages/Products';
import ProjectDetail from './pages/ProjectDetail';
import AboutUs from './pages/AboutUs';
import Education from './pages/Education';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminArticles from './pages/admin/AdminArticles';
import AdminUsers from './pages/admin/AdminUsers';
import AdminDirectors from './pages/admin/AdminDirectors';
import AdminTeam from './pages/admin/AdminTeam';
import AdminNews from './pages/admin/AdminNews';
import AdminEducation from './pages/admin/AdminEducation';

// New Pages
import News from './pages/News';
import Services from './pages/Services';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ForgotPassword from './pages/ForgotPassword';

// Placeholder content for simple pages
const PlaceholderPage = ({ title }) => (
  <div className="pt-32 pb-20 min-h-[60vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
    {/* Background Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-colestia-purple/20 rounded-full blur-[100px] pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 max-w-lg w-full shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
    >
      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-colestia-purple to-colestia-blue rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3">
        <Construction className="text-white w-10 h-10" />
      </div>
      <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 mb-4">{title}</h1>
      <p className="text-gray-400 mb-8 leading-relaxed">
        We are crafting something amazing here. <br />
        This page is currently under development.
      </p>
      <div className="inline-flex items-center gap-2 text-colestia-purple font-semibold bg-colestia-purple/10 px-4 py-2 rounded-full border border-colestia-purple/20">
        <span>Coming Soon</span>
        <div className="w-2 h-2 bg-colestia-purple rounded-full animate-pulse" />
      </div>
    </motion.div>
  </div>
);

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const App = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Hide navbar/footer on login, register, and admin pages
  const hideNavFooter = pathname === '/login' || pathname === '/register' || pathname.startsWith('/admin') || pathname === '/forgot-password';

  return (
    <div className="min-h-screen bg-colestia-bg text-white selection:bg-colestia-gold selection:text-black">
      <ScrollManager>
        {!hideNavFooter && <Navbar />}
        {!hideNavFooter && <ScrollProgress />}

        <main>
          <AnimatePresence mode="wait">
            <Routes location={pathname} key={pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
              <Route path="/project/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
              <Route path="/education" element={<PageTransition><Education /></PageTransition>} />
              <Route path="/about-us" element={<PageTransition><AboutUs /></PageTransition>} />
              <Route path="/login" element={<PageTransition><Login /></PageTransition>} />

              {/* Functional Pages (Previously Placeholders) */}
              <Route path="/service" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/news" element={<PageTransition><News /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
              <Route path="/terms" element={<PageTransition><TermsOfService /></PageTransition>} />
              <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
              <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="articles" element={<AdminArticles />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="directors" element={<AdminDirectors />} />
                <Route path="team" element={<AdminTeam />} />
                <Route path="news" element={<AdminNews />} />
                <Route path="education" element={<AdminEducation />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </main>

        {!hideNavFooter && <Footer />}
      </ScrollManager>
    </div>
  );
};

export default App;
