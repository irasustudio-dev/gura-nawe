import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import marketplaceData from '../../data/marketplace.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { store } = marketplaceData;

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
              <ShoppingBag className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
              {store.name}
            </span>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
            {store.tagline}. The most trusted marketplace for African digital creators.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href={store.socialLinks.instagram} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 transition-all shadow-sm"
            >
              <Instagram size={20} />
            </a>
            <a 
              href={store.socialLinks.facebook} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 transition-all shadow-sm"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-6">Marketplace</h4>
          <ul className="space-y-4">
            <li>
              <Link to="/marketplace?cat=youtube" className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                YouTube Channels
              </Link>
            </li>
            <li>
              <Link to="/marketplace?cat=tiktok" className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                TikTok Accounts
              </Link>
            </li>
            <li>
              <Link to="/marketplace?cat=instagram" className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                Instagram Accounts
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                Promotion Services
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4">
            <li>
              <Link to="/about" className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                Contact Support
              </Link>
            </li>
            <li>
              <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="text-slate-900 dark:text-white font-bold mb-6">Contact Us</h4>
          <div className="flex items-start gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all shrink-0">
              <Phone size={16} />
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Phone</p>
              <p className="text-sm font-medium">{store.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all shrink-0">
              <Mail size={16} />
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Email</p>
              <p className="text-sm font-medium">{store.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all shrink-0">
              <MapPin size={16} />
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Location</p>
              <p className="text-sm font-medium">{store.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {currentYear} {store.name}. All rights reserved.
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 italic">
          Designed for Digital Entrepreneurs in Rwanda with IRASU .
        </p>
      </div>
    </footer>
  );
}
