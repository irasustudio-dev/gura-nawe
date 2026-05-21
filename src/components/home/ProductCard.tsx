import { Link } from 'react-router-dom';
import { Star, TrendingUp, MessageCircle, ArrowUpRight } from 'lucide-react';
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
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-red-500/50 dark:hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 flex flex-col h-full"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
        {product.isFeatured && (
          <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20">
            {t('productCard.featured', language)}
          </span>
        )}
        {product.isNew && (
          <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-600/20">
            {t('productCard.new', language)}
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <Link 
          to={`/product/${product.id}`}
          className="absolute inset-0 z-20 flex items-center justify-center translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
        >
          <div className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-2xl">
            View Details <ArrowUpRight size={18} />
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            {product.platform}
          </span>
          <div className="flex items-center gap-1 text-amber-500 font-bold text-xs ml-auto">
            <Star size={12} fill="currentColor" />
            {product.rating}
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-red-600 transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">{t('productCard.price', language)}</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">
              {formatPrice(product.priceRWF)} <span className="text-xs font-bold opacity-60">RWF</span>
            </p>
          </div>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-[#0cf862] hover:bg-[#07c24c] text-white rounded-2xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-110 active:scale-95"
            aria-label="Buy on WhatsApp"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle size={24} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
