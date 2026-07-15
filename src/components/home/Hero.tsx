import { motion } from 'motion/react';
import { 
  ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, 
  Zap, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import marketplaceData from '../../data/marketplace.json';
import { cn } from '../../utils/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const heroTitle = 'Premium digital assets for ambitious brands';
const heroSubtitle = 'Discover curated creator assets, secure listings, and fast WhatsApp delivery.';
const statMetrics = [
  { icon: ShieldCheck, label: 'Secure Deals', value: '1,200+', color: 'from-red-500 to-red-600' },
  { icon: Star, label: 'Verified Sellers', value: '4.9/5', color: 'from-yellow-500 to-yellow-600' },
  { icon: Zap, label: 'Fast Support', value: '24/7', color: 'from-green-500 to-green-600' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-20 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-red-500/20 via-orange-500/10 to-transparent rounded-full blur-[100px] will-change-transform"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="hidden lg:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/15 via-purple-500/10 to-transparent rounded-full blur-[100px] will-change-transform"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-red-400/10 to-pink-400/10 rounded-full blur-[120px] will-change-transform"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="inline-flex">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-500/10 border border-red-200/50 dark:border-red-800/50 backdrop-blur-sm">
                <motion.span
                  className="flex h-2 w-2 rounded-full bg-red-600"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Verified Premium Marketplace
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mt-6 mb-6">
                {heroTitle.split(' ').slice(0, 2).join(' ')} <br />
                <span className="relative inline-block mt-2">
                  <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-600 text-transparent bg-clip-text">
                    {heroTitle.split(' ').slice(2).join(' ')}
                  </span>
                  <motion.svg
                    className="absolute -bottom-3 left-0 w-full h-3"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  >
                    <path
                      d="M0 5 Q 25 0 50 5 T 100 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      className="text-red-400/40"
                    />
                  </motion.svg>
                </span>
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mb-10 leading-relaxed">
              {heroSubtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <Link to="/marketplace">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 via-red-500 to-orange-600 hover:shadow-xl hover:shadow-red-600/40 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-lg shadow-lg shadow-red-600/30 transition-all duration-300 border border-red-400/20"
                >
                  <ShoppingBag size={24} />
                  Browse Marketplace
                  <ArrowRight size={20} className="ml-1" />
                </motion.button>
              </Link>

              <motion.a
                href={`https://wa.me/${marketplaceData.store.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 dark:bg-slate-800/50 backdrop-blur-md text-slate-900 dark:text-white hover:bg-white/20 dark:hover:bg-slate-800/70 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-lg shadow-lg border border-slate-200/30 dark:border-slate-600/30 transition-all duration-300"
              >
                <MessageCircle size={24} className="text-[#0cf862]" />
                Chat on WhatsApp
              </motion.a>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {statMetrics.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={cn(
                    "group relative p-4 sm:p-5 rounded-2xl backdrop-blur-xl border transition-all duration-300",
                    "bg-white/10 dark:bg-slate-800/20 border-white/20 dark:border-slate-600/20",
                    "hover:border-white/40 dark:hover:border-slate-500/40",
                    "hover:bg-white/15 dark:hover:bg-slate-800/30"
                  )}
                >
                  <div className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity",
                    `bg-gradient-to-br ${stat.color}`
                  )} />
                  <div className="relative z-10">
                    <div className={cn(
                      "w-10 h-10 rounded-xl mb-3 flex items-center justify-center",
                      `bg-gradient-to-br ${stat.color}`,
                      "text-white shadow-lg"
                    )}>
                      <stat.icon size={20} />
                    </div>
                    <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 line-clamp-2">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative h-96 sm:h-[500px] lg:h-[600px] flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-purple-500/10 to-blue-500/10 rounded-3xl blur-3xl" />
              <div className="relative w-full h-full rounded-3xl lg:rounded-[40px] overflow-hidden shadow-2xl border-4 sm:border-8 border-white/20 dark:border-slate-700/30 backdrop-blur-xl">
                <img
                  src="https://images.unsplash.com/photo-1559027615-0f4b5ea4b7bb?q=80&w=1200&auto=format&fit=crop"
                  alt="Premium digital marketplace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex items-center gap-2 mb-2"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-red-500"
                    >
                      ?
                    </motion.div>
                    <span className="font-bold text-lg">New Premium Listing</span>
                  </motion.div>
                  <p className="text-sm text-white/80">Premium digital growth assets for modern creators.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -30, 0], x: [0, 10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:block absolute top-12 -right-8 z-20 max-w-xs"
            >
              <div className="bg-white/95 dark:bg-slate-800/80 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/50 dark:border-slate-700/50 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <ArrowRight size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Active Sale</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">YouTube (98K Subs)</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 30, 0], x: [0, -10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden lg:block absolute -bottom-12 -left-12 z-20 max-w-xs"
            >
              <div className="bg-gradient-to-br from-red-600 to-orange-600 p-6 rounded-2xl shadow-2xl shadow-red-600/40 border border-red-400/30 text-white flex items-center gap-4">
                <div className="text-right flex-1">
                  <p className="text-2xl font-black">4K+</p>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-90">Trusted Volume</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center font-black text-sm backdrop-blur">
                  ?
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="lg:hidden flex justify-center mt-12">
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <span className="text-xs font-semibold uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <motion.div animate={{ y: [2, 6, 2] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-2 bg-slate-400 rounded-full mt-1" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
