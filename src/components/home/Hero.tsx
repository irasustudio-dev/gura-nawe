import { motion } from 'motion/react';
import { 
  ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, 
  Zap, Star, PlayCircle, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import marketplaceData from '../../data/marketplace.json';
import { cn } from '../../utils/utils';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../utils/i18n';

const stats = [
  { icon: ShieldCheck, label: 'hero.secureDeal', color: 'text-red-600' },
  { icon: Users, label: 'hero.sellers', color: 'text-slate-700 dark:text-slate-200' },
  { icon: Star, label: 'hero.rating', color: 'text-red-500' },
  { icon: Zap, label: 'hero.instantConnect', color: 'text-red-600' },
];

export default function Hero() {
  const { language } = useLanguage();
  return (
    <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
      {/* Background Blobs - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none will-change-none" />
      <div className="hidden lg:block absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none will-change-none" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm border border-red-200 dark:border-red-800">
              <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
              {t('hero.badge', language)}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.2] mb-4 sm:mb-6">
              {t('hero.title', language).split(' ').slice(0, 2).join(' ')} <br />
              <span className="text-red-600 relative inline-block">
                {t('hero.title', language).split(' ').slice(2).join(' ')}
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-red-400/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-lg mb-8 sm:mb-10 leading-relaxed">
              {t('hero.subtitle', language)}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/marketplace"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-red-600/25 transition-all hover:-translate-y-1 active:translate-y-0"
              >
                <ShoppingBag size={22} />
                {t('hero.browseMarketplace', language)}
              </Link>
              <a
                href={`https://wa.me/${marketplaceData.store.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg border border-slate-100 dark:border-slate-700 transition-all hover:-translate-y-1 active:translate-y-0"
              >
                <MessageCircle size={22} className="text-[#0cf862]" />
                {t('hero.whatsappUs', language)}
              </a>
            </div>

            <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
              {stats.map((stat, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center sm:items-start text-center sm:text-left"
                >
                  <stat.icon className={cn("w-6 h-6 mb-2", stat.color)} />
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">{t(stat.label, language)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Visual Elements */}
            <div className="relative z-10 w-full aspect-video sm:aspect-square max-w-md sm:max-w-lg mx-auto rounded-3xl sm:rounded-[48px] overflow-hidden shadow-lg sm:shadow-[0_40px_120px_rgba(220,38,38,0.18)] border-4 sm:border-8 border-white dark:border-slate-800 sm:rotate-3">
              <img 
                src="https://images.unsplash.com/photo-1559027615-0f4b5ea4b7bb?q=80&w=1200&auto=format&fit=crop"
                alt="Digital growth 3D"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <PlayCircle className="text-red-500" />
                  <span className="font-bold text-lg">{t('hero.newSale', language)}</span>
                </div>
                <p className="text-sm text-white/80">{language === 'kin' ? 'Imishinga ikomeye y’ikoranabuhanga ku isoko rya Gura Nawe' : 'Premium digital growth assets for modern creators.'}</p>
              </div>
            </div>

            {/* Floating Cards - Hidden on mobile */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:block absolute -top-6 -right-6 z-20 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 will-change-transform"
            >
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600">
                <ArrowRight size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">New Sale</p>
                <p className="text-sm font-bold text-slate-800 dark:text-white">TikTok (45K Subs)</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden lg:block absolute -bottom-10 -left-10 z-20 bg-red-600 p-4 rounded-3xl shadow-xl shadow-red-600/30 flex items-center gap-4 text-white will-change-transform"
            >
              <div className="text-right">
                <p className="text-xl font-black">4000Hrs</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{t('hero.watchHours', language)}</p>
              </div>
              <div className="h-10 w-px bg-white/20"></div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-black text-xs">
                DONE
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
