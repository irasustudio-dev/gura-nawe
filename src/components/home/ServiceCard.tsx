import { 
  Users, Eye, Clock, MessageCircle, CheckCircle2, Zap,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Service } from '../../types';
import { generateServiceLink } from '../../utils/whatsapp';
import { formatPrice, cn } from '../../utils/utils';
import type { FC } from 'react';

interface ServiceCardProps {
  service: Service;
}

const iconMap: Record<string, LucideIcon> = {
  Users,
  Eye,
  Clock,
  Zap,
};

const ServiceCard: FC<ServiceCardProps> = ({ service }) => {
  const Icon = iconMap[service.icon] || Zap;
  const whatsappUrl = generateServiceLink(service.name, service.priceRWF);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 hover:border-red-500 group transition-all duration-500 hover:shadow-2xl shadow-sm flex flex-col h-full"
    >
      {service.isPopular && (
        <div className="absolute -top-3 left-8 z-10 bg-gradient-to-r from-red-600 to-orange-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg shadow-red-600/30 ring-4 ring-white dark:ring-slate-900">
          Most Popular
        </div>
      )}

      <div className="mb-8 flex items-start justify-between">
        <div className={cn(
          "w-16 h-16 rounded-[22px] flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110",
          service.isPopular ? "bg-red-100 text-red-600 dark:bg-red-900/30" : "bg-slate-100 text-slate-600 dark:bg-slate-800"
        )}>
          <Icon size={32} />
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 leading-none">Starting from</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {formatPrice(service.priceRWF)} <span className="text-xs font-bold">RWF</span>
          </p>
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-red-600 transition-colors">
          {service.name}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          {service.description}
        </p>

        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
            <CheckCircle2 size={18} className="text-emerald-500" />
            Reliable Delivery
          </li>
          <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
            <CheckCircle2 size={18} className="text-emerald-500" />
            {service.deliveryTime} TAT
          </li>
          <li className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
            <CheckCircle2 size={18} className="text-emerald-500" />
            24/7 Support Active
          </li>
        </ul>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 dark:from-red-700 dark:to-orange-700 text-white py-4 rounded-2xl font-bold transition-all group-hover:translate-y-[-4px] active:translate-y-0 shadow-lg shadow-red-600/20"
      >
        <MessageCircle size={20} className="group-hover:animate-bounce" />
        Order on WhatsApp
      </a>
    </motion.div>
  );
};

export default ServiceCard;
