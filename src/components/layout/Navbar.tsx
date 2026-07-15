import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Sun,
  Moon,
  ShoppingBag,
  MessageCircle,
  Phone,
  Info,
  Home as HomeIcon,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/utils';
import marketplaceData from '../../data/marketplace.json';

const navLinks = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
  { name: 'Services', path: '/services', icon: Zap },
  { name: 'Admin', path: '/admin', icon: ShieldCheck },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Contact', path: '/contact', icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3",
      scrolled ? "glass shadow-soft-lg" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group z-10">
          <motion.div 
            whileHover={{ rotate: 12 }}
            className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-red-glow"
          >
            <ShoppingBag className="text-white w-6 h-6" />
          </motion.div>
          <div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white block leading-none">
              {marketplaceData.store.name}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold text-red-600 dark:text-red-400">
              Digital Market
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                location.pathname === link.path 
                  ? "text-red-600 dark:text-red-400 font-semibold" 
                  : "text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            whileHover={{ rotate: 20 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors backdrop-blur-sm"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </motion.button>
          
          <a
            href={`https://wa.me/${marketplaceData.store.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#0cf862] hover:bg-[#07c24c] text-white px-3 sm:px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
          >
            <MessageCircle size={16} />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors backdrop-blur-sm"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass mt-3 rounded-2xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                      location.pathname === link.path
                        ? "bg-red-500/20 text-red-600 dark:text-red-400 font-medium"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    <link.icon size={18} />
                    <span className="font-medium text-sm">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
              <hr className="my-2 border-slate-100 dark:border-slate-800" />
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${marketplaceData.store.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0cf862] hover:bg-[#07c24c] text-white p-3 rounded-lg font-bold shadow-lg shadow-emerald-500/20 transition-all text-sm"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
