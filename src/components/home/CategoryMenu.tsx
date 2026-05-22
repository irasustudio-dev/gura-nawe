import { Link } from 'react-router-dom';
import { 
  Youtube, Music2, Instagram, Facebook, Book, Zap, ArrowRight 
} from 'lucide-react';
import { motion } from 'motion/react';
import marketplaceData from '../../data/marketplace.json';
import { cn } from '../../utils/utils';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../utils/i18n';

const iconMap: Record<string, any> = {
  Youtube, Music2, Instagram, Facebook, Book, Zap
};

export default function CategoryMenu() {
  const { language } = useLanguage();

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10 md:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2">
              {t('marketplace.title', language)}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
              {t('marketplace.subtitle', language)}
            </p>
          </div>
          <Link 
            to="/marketplace" 
            className="group inline-flex items-center gap-2 text-red-600 font-bold hover:gap-3 transition-all"
          >
            {t('marketplace.viewAll', language)} <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {marketplaceData.categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Zap;
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
                  className="group flex flex-col items-center p-8 rounded-[32px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all text-center"
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
                    {t(`categories.${cat.id}`, language)}
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
