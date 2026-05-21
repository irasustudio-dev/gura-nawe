import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface SolutionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  whatsappMessage: string;
  whatsappNumber?: string;
}

export default function SolutionCard({
  icon: Icon,
  title,
  description,
  whatsappMessage,
  whatsappNumber = '250722248567',
}: SolutionCardProps) {
  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      '_blank'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-400 h-full flex flex-col">
        {/* Icon container */}
        <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-600/30">
          <Icon className="text-white" size={28} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow">
          {description}
        </p>

        {/* Get Help button */}
        <button
          onClick={handleWhatsApp}
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
        >
          Get Help →
        </button>
      </div>
    </motion.div>
  );
}
