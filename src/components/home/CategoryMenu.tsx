import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Book,
  Facebook,
  Instagram,
  Music2,
  type LucideIcon,
  Youtube,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../utils/utils';
import { getMarketplaceData } from '../../utils/marketplaceStore';

const iconMap: Record<string, LucideIcon> = {
  youtube: Youtube,
  tiktok: Music2,
  instagram: Instagram,
  facebook: Facebook,
  ebooks: Book,
  default: Zap,
};

const categoryLabelMap: Record<string, string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  facebook: 'Facebook',
  ebooks: 'eBooks',
  services: 'Services',
};

export default function CategoryMenu() {
  const { categories } = getMarketplaceData();

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-8 md:mb-10 lg:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-2">
              Premium Marketplace
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
              Curated digital assets, creator accounts, and growth services for ambitious brands.
            </p>
          </div>
          <Link 
            to="/marketplace" 
            className="group inline-flex items-center gap-2 text-red-600 font-bold hover:gap-3 transition-all"
          >
            Browse All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || iconMap.default;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/marketplace?cat=${cat.id}`}
                  className="group flex flex-col items-center p-8 rounded-[32px] bg-white/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50/80 dark:hover:bg-red-900/10 transition-all text-center shadow-sm hover:shadow-xl"
                >
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all scale-100 group-hover:scale-110 group-hover:rotate-6",
                    cat.id === 'youtube' ? "bg-red-100 text-red-600 dark:bg-red-900/20" :
                    cat.id === 'tiktok' ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white" :
                    cat.id === 'instagram' ? "bg-red-100 text-red-600 dark:bg-red-900/20" :
                    cat.id === 'facebook' ? "bg-red-100 text-red-600 dark:bg-red-900/20" :
                    cat.id === 'ebooks' ? "bg-red-100 text-red-600 dark:bg-red-900/20" :
                    "bg-red-100 text-red-600 dark:bg-red-900/20"
                  )}>
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-red-600 transition-colors">
                    {categoryLabelMap[cat.id] ?? cat.name}
                  </h3>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
