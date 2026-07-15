import { Link } from 'react-router-dom';
import { Star, TrendingUp, MessageCircle, ArrowUpRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../../types';
import { generateWhatsAppLink } from '../../utils/whatsapp';
import { formatPrice } from '../../utils/utils';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../utils/i18n';
import type { FC } from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { language } = useLanguage();
  const whatsappUrl = generateWhatsAppLink(product.name, product.priceRWF);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative h-full overflow-hidden"
    >
      <div className="card-premium relative flex flex-col h-full overflow-hidden shadow-soft-lg hover:shadow-2xl hover:shadow-red-500/50 card-hover-lift">
        {/* Gradient Accent Top */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        
        {/* Badges */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex flex-wrap gap-2">
          {product.isFeatured && (
            <motion.span 
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/30 inline-flex items-center gap-1"
            >
              <Zap size={10} className="hidden sm:block" />
              {t('productCard.featured', language)}
            </motion.span>
          )}
          {product.isNew && (
            <span className="px-2.5 sm:px-3 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-600/30">
              {t('productCard.new', language)}
            </span>
          )}
          {product.stats && (
            <span className="px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[9px] sm:text-[10px] font-bold">
              {product.stats}
            </span>
          )}
        </div>

        {/* Trending Label */}
        {product.isFeatured && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg bg-white/90 dark:bg-slate-800/90 shadow-lg backdrop-blur-sm">
            <TrendingUp size={12} className="text-red-600 animate-pulse-subtle" />
            <span className="text-[9px] sm:text-[10px] font-bold text-red-600 dark:text-red-400">Trending</span>
          </div>
        )}

        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={product.thumbnail}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* CTA Overlay on Hover */}
          <Link
            to={`/product/${product.id}`}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold flex items-center gap-2 shadow-2xl"
            >
              View Details <ArrowUpRight size={16} className="text-red-600" />
            </motion.div>
          </Link>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow relative z-10">
          {/* Platform & Rating */}
          <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
              {product.platform}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                <Star size={13} className="text-amber-500" fill="currentColor" />
                <span className="text-amber-700 dark:text-amber-300 font-bold text-[10px] sm:text-xs">
                  {product.rating}
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3 sm:mb-4 line-clamp-2 min-h-[2rem]">
            {product.description}
          </p>

          <div className="mt-auto pt-3 sm:pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between gap-3 sm:gap-4">
            <div>
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">{t('productCard.price', language)}</p>
              <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {formatPrice(product.priceRWF)} <span className="text-[9px] sm:text-xs font-bold opacity-60">RWF</span>
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#0cf862] hover:bg-[#07c24c] text-white rounded-2xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-125 active:scale-90 will-change-transform"
              aria-label="Buy on WhatsApp"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
