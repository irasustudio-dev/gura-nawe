import { useSEO } from '../utils/seo';
import Hero from '../components/home/Hero';
import CategoryMenu from '../components/home/CategoryMenu';
import ProductCard from '../components/home/ProductCard';
import ServiceCard from '../components/home/ServiceCard';
import Testimonials from '../components/home/Testimonials';
import SectionHeader from '../components/shared/SectionHeader';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Zap, Upload } from 'lucide-react';
import { getMarketplaceData } from '../utils/marketplaceStore';

export default function Home() {
  const { store, products, services } = getMarketplaceData();
  useSEO({
    title: 'GURA NAWE - Premium Digital Assets & Software Marketplace',
    description: 'GURA NAWE is a premium digital assets and software marketplace for creator accounts, social media properties, and growth services with trusted WhatsApp support.',
  });

  const featuredProducts = products.slice(0, 4);
  const featuredServices = services.slice(0, 3);

  const whatsappMessage = encodeURIComponent("Hello GURA NAWE, I want to sell my digital asset. Here are the details...");
  const sellLink = `https://wa.me/${store.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="pt-10">
      <Hero />
      
      {/* Sell Your Asset CTA - Prominent Button */}
      <section className="py-8 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/10 dark:to-red-900/10 border-y border-red-200 dark:border-red-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">Sell your digital asset</h3>
              <p className="text-slate-600 dark:text-slate-300">List your account or channel securely and connect with serious buyers in minutes.</p>
            </div>
            <a
              href={sellLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-7 py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-red-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <Upload size={22} />
              Start Selling
            </a>
          </div>
        </div>
      </section>

      <CategoryMenu />

      {/* Featured Products - Moved to top */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <SectionHeader 
              title="Premium Marketplace" 
              subtitle="Curated digital assets, creator accounts, and growth services for ambitious brands."
              className="mb-0"
            />
            <Link to="/marketplace" className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 font-bold flex items-center gap-2 text-red-600 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 transition-all shadow-sm">
              Browse All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Services Section */}
      <section className="py-24 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[600px] bg-red-600/5 -skew-y-3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <SectionHeader 
            title="Accelerate Your Growth" 
            subtitle="Professional services designed to boost your social presence instantly and organically."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {featuredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-bold hover:underline">
              View All Boosting Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-24 bg-slate-900 border-y border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-400">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-4xl font-black mb-2 tracking-tighter">1,200+</h3>
              <p className="text-slate-400 font-medium">Successful Deals Completed</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-400">
                <Star size={40} />
              </div>
              <h3 className="text-4xl font-black mb-2 tracking-tighter">4.9/5</h3>
              <p className="text-slate-400 font-medium">Customer Satisfaction Rate</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400">
                <Zap size={40} />
              </div>
              <h3 className="text-4xl font-black mb-2 tracking-tighter">24/7</h3>
              <p className="text-slate-400 font-medium">Fast WhatsApp Support</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <Testimonials />

      {/* Final CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative bg-gradient-to-br from-red-600 to-red-700 rounded-[48px] p-12 lg:p-20 overflow-hidden text-center text-white">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-400/30 via-transparent to-transparent opacity-50" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Ready to Start Your Digital Journey?</h2>
              <p className="text-xl text-red-100 mb-10 leading-relaxed">
                Join thousands of creators who successfully sold and bought digital accounts through GURA NAWE. Safe, fast, and professional.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/marketplace" className="w-full sm:w-auto bg-white text-red-600 px-10 py-5 rounded-[24px] font-bold text-lg shadow-2xl transition-all hover:scale-105 active:scale-95">
                  Browse Store
                </Link>
                <a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-slate-900/40 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-[24px] font-bold text-lg shadow-xl transition-all hover:bg-slate-900/60 active:scale-95">
                  Chat With Us
                </a>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-red-900/50 rounded-full blur-3xl opacity-30" />
          </div>
        </div>
      </section>
    </div>
  );
}
