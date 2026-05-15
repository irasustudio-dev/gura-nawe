import SectionHeader from '../components/shared/SectionHeader';
import ServiceCard from '../components/home/ServiceCard';
import marketplaceData from '../data/marketplace.json';
import { 
  Zap, ShieldCheck, CheckCircle2, MessageCircle, BarChart3, Rocket
} from 'lucide-react';

export default function Services() {
  const { services } = marketplaceData;

  const features = [
    { 
      title: "Real & Active Growth", 
      desc: "We prioritize quality over quantity. All boosting is done through legal and organic methods.",
      icon: BarChart3,
      color: "text-blue-500"
    },
    { 
      title: "Fast Delivery", 
      desc: "Most services start within 24 hours. We understand that time is money in the digital world.",
      icon: Zap,
      color: "text-amber-500"
    },
    { 
      title: "Secure Payments", 
      desc: "Order directly via WhatsApp and pay using trusted local methods like Mobile Money.",
      icon: ShieldCheck,
      color: "text-emerald-500"
    }
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Rocket size={14} /> Boost Your Social Media Presence
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            Premium Growth <span className="text-violet-600">Services</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            Take your social media accounts to the next level. We provide safe, reliable, and organic growth services for YouTube, TikTok, and Instagram.
          </p>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl hover:translate-y-[-4px]">
              <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 ${f.color}`}>
                <f.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{f.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <SectionHeader 
          title="CHOOSE A PACKAGE" 
          subtitle="Fixed pricing for reliable growth. No hidden fees."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Custom Order Box */}
        <div className="bg-violet-600 rounded-[48px] p-12 lg:p-20 relative overflow-hidden text-center text-white">
           <div className="relative z-10">
              <h2 className="text-3xl font-black mb-6">Need a Custom Package?</h2>
              <p className="text-lg text-violet-100 max-w-2xl mx-auto mb-10">
                If you need a specific number of followers, views or a custom marketing campaign, feel free to contact us. We offer tailormade solutions for creators and brands.
              </p>
              <a 
                href={`https://wa.me/${marketplaceData.store.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-white text-violet-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:scale-105"
              >
                <MessageCircle size={22} /> Talk to our Sales Team
              </a>
           </div>

           {/* Decorative items */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-400/20 rounded-full -ml-20 -mb-20 blur-3xl opacity-40" />
        </div>
      </div>
    </div>
  );
}
