import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Sun, Moon, ShoppingBag, 
  MessageCircle, Phone, Info, Home as HomeIcon, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/utils';
import marketplaceData from '../../data/marketplace.json';

const navLinks = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
  { name: 'Services', path: '/services', icon: Zap },
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
      scrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg py-2" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <ShoppingBag className="text-white w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white block leading-none">
              {marketplaceData.store.name}
            </span>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-violet-600 dark:text-violet-400">
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
                "text-sm font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400",
                location.pathname === link.path 
                  ? "text-violet-600 dark:text-violet-400 font-semibold" 
                  : "text-slate-600 dark:text-slate-300"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <a
            href={`https://wa.me/${marketplaceData.store.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 bg-[#0cf862]/10 text-[#07c24c] hover:bg-[#0cf862]/20 px-4 py-2 rounded-xl font-semibold transition-all border border-[#0cf862]/20"
          >
            <MessageCircle size={18} />
            <span className="text-sm">WhatsApp</span>
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800 mt-3 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-colors",
                    location.pathname === link.path
                      ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  <link.icon size={20} />
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}
              <hr className="my-2 border-slate-100 dark:border-slate-800" />
              <a
                href={`https://wa.me/${marketplaceData.store.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0cf862] text-white p-3 rounded-xl font-bold shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle size={20} />
                <span>Contact on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
