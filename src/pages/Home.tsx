import Hero from '../components/home/Hero';
import CategoryMenu from '../components/home/CategoryMenu';
import ProductCard from '../components/home/ProductCard';
import ServiceCard from '../components/home/ServiceCard';
import SectionHeader from '../components/shared/SectionHeader';
import marketplaceData from '../data/marketplace.json';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  const featuredProducts = marketplaceData.products.slice(0, 4);
  const featuredServices = marketplaceData.services.slice(0, 3);

  return (
    <div className="pt-10">
      <Hero />
      
      <CategoryMenu />

      {/* Featured Products */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <SectionHeader 
              title="Top Digital Assets" 
              subtitle="Recently landed premium accounts and monetized channels ready for take-over."
              className="mb-0"
            />
            <Link to="/marketplace" className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 font-bold flex items-center gap-2 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 transition-all shadow-sm">
              Explore Marketplace <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Growth Services Section */}
      <section className="py-24 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[600px] bg-violet-600/5 -skew-y-3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <SectionHeader 
            title="Accelerate Your Growth" 
            subtitle="Professional services designed to boost your social presence instantly and organically."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold hover:underline">
              View All Boosting Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-24 bg-slate-900 border-y border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-violet-400">
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative bg-violet-600 rounded-[48px] p-12 lg:p-20 overflow-hidden text-center text-white">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-400/30 via-transparent to-transparent opacity-50" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Ready to Start Your Digital Journey?</h2>
              <p className="text-xl text-violet-100 mb-10 leading-relaxed">
                Join thousands of creators who successfully sold and bought digital accounts through GURA NAWE. Safe, fast, and professional.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/marketplace" className="w-full sm:w-auto bg-white text-violet-600 px-10 py-5 rounded-[24px] font-bold text-lg shadow-2xl transition-all hover:scale-105 active:scale-95">
                  Browse Store
                </Link>
                <a href={`https://wa.me/${marketplaceData.store.whatsapp}`} target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-slate-900/40 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-[24px] font-bold text-lg shadow-xl transition-all hover:bg-slate-900/60 active:scale-95">
                  Chat With Us
                </a>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-violet-900/50 rounded-full blur-3xl opacity-30" />
          </div>
        </div>
      </section>
    </div>
  );
}
