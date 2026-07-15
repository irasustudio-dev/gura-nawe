import { motion } from 'motion/react';
import {
  Radio,
  RotateCcw,
  TrendingUp,
  AlertTriangle,
  Zap,
  ShieldCheck,
  BarChart3,
  Rocket,
  MessageCircle,
} from 'lucide-react';
import SectionHeader from '../components/shared/SectionHeader';
import SolutionCard from '../components/home/SolutionCard';
import ServiceCard from '../components/home/ServiceCard';
import { useSEO } from '../utils/seo';
import { getMarketplaceData } from '../utils/marketplaceStore';

export default function Services() {
  const { services, store } = getMarketplaceData();

  useSEO({
    title: 'Social Media Solutions - GURA NAWE',
    description: 'Professional help with YouTube monetization, account recovery, social media growth, and copyright issue resolution.',
  });

  const solutionServices = [
    {
      icon: Radio,
      title: 'YouTube Monetization',
      description: 'Grow your YouTube channel to 4000 watch hours and 1000 subscribers for monetization.',
      whatsappMessage: 'Hello GURA NAWE, I need help monetizing my YouTube channel.',
    },
    {
      icon: RotateCcw,
      title: 'Account Recovery',
      description: 'We help you regain access to your hacked or lost social media accounts.',
      whatsappMessage: 'Hello GURA NAWE, I need help recovering my social media account.',
    },
    {
      icon: TrendingUp,
      title: 'Growth & Compliance',
      description: 'Grow your social media presence and fix account issues across all platforms.',
      whatsappMessage: 'Hello GURA NAWE, I need support with social media growth and compliance.',
    },
    {
      icon: AlertTriangle,
      title: 'Copyright Resolution',
      description: 'We guide you through copyright strike appeals and community strike resolutions.',
      whatsappMessage: 'Hello GURA NAWE, I need help resolving a copyright issue.',
    },
  ];

  const features = [
    { 
      title: 'Real & Active Growth', 
      desc: 'We prioritize quality over quantity. All services use legal and organic methods.',
      icon: BarChart3,
      color: 'text-blue-500'
    },
    { 
      title: 'Fast Delivery', 
      desc: 'Most services start within 24 hours. We understand that time is money.',
      icon: Zap,
      color: 'text-amber-500'
    },
    { 
      title: 'Secure Payments', 
      desc: 'Order via WhatsApp and pay using trusted local payment methods.',
      icon: ShieldCheck,
      color: 'text-emerald-500'
    }
  ];

  return (
    <div className="pt-32 pb-24">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 border-b border-red-200 dark:border-red-900/30 mb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Need Help with Your Social Media?
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We provide professional solutions for all your social media challenges. Available 24/7 on WhatsApp.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Problem Solutions Grid */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Problems We Solve
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutionServices.map((service, idx) => (
              <SolutionCard
                key={idx}
                icon={service.icon}
                title={service.title}
                description={service.description}
                whatsappMessage={service.whatsappMessage}
              />
            ))}
          </div>
        </section>

        {/* Features Row */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Secure, reliable, and fast social media services built for creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-10 shadow-xl"
              >
                <div className={`w-16 h-16 rounded-3xl bg-red-50 text-red-600 flex items-center justify-center mb-6 shadow-sm ${feature.color}`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeader
            title="Our Premium Packages"
            subtitle="Choose from premium packages built for fast, secure growth."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[48px] bg-red-600 text-white p-12 md:p-16 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_45%)]" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.6fr_1fr] items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm uppercase tracking-[0.25em] font-bold text-white/90 mb-4">
                <Rocket size={18} /> Custom Order
              </span>
              <h2 className="text-4xl font-black mb-4 leading-tight">
                Custom packages built for your goals
              </h2>
              <p className="text-red-100 max-w-2xl leading-relaxed mb-8">
                Need a custom campaign? Send us the brief and we will build a growth package for your brand.
              </p>
              <a
                href={`https://wa.me/${store.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-white text-red-600 px-8 py-4 rounded-3xl font-bold shadow-xl shadow-white/20 transition-all hover:scale-105"
              >
                <MessageCircle size={22} /> Talk to our Sales Team
              </a>
            </div>

            <div className="relative">
              <div className="absolute -right-10 top-1/2 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <div className="relative rounded-[40px] bg-white/10 p-8 text-slate-100 border border-white/20">
                <p className="text-lg font-semibold">24/7 Support</p>
                <p className="mt-4 text-red-100 text-sm leading-relaxed">
                  We provide secure, fast responses with priority support.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
