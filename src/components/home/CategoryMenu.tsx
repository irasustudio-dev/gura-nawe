import { Link } from 'react-router-dom';
import { 
  Youtube, Music2, Instagram, Facebook, Book, Zap, ArrowRight 
} from 'lucide-react';
import { motion } from 'motion/react';
import marketplaceData from '../../data/marketplace.json';
import { cn } from '../../utils/utils';

const iconMap: Record<string, any> = {
  Youtube, Music2, Instagram, Facebook, Book, Zap
};

export default function CategoryMenu() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Explore Categories</h2>
            <p className="text-slate-500 dark:text-slate-400">Discover a wide range of digital assets and services tailored for your growth.</p>
          </div>
          <Link 
            to="/marketplace" 
            className="group flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold hover:gap-3 transition-all"
          >
            View All Marketplace <ArrowRight size={18} />
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
                  className="group flex flex-col items-center p-8 rounded-[32px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-violet-500 dark:hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/10 transition-all text-center"
                >
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all scale-100 group-hover:scale-110 group-hover:rotate-6",
                    cat.id === 'youtube' ? "bg-red-100 text-red-600 dark:bg-red-900/20" :
                    cat.id === 'tiktok' ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white" :
                    cat.id === 'instagram' ? "bg-pink-100 text-pink-600 dark:bg-pink-900/20" :
                    cat.id === 'facebook' ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20" :
                    cat.id === 'ebooks' ? "bg-amber-100 text-amber-600 dark:bg-amber-900/20" :
                    "bg-violet-100 text-violet-600 dark:bg-violet-900/20"
                  )}>
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-violet-600 transition-colors">
                    {cat.name}
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
