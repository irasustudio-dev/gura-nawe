import SectionHeader from '../components/shared/SectionHeader';
import { 
  Users, Target, Award, Heart, MessageCircle, 
  MapPin, CheckCircle2, ShoppingBag, Zap, ShieldCheck
} from 'lucide-react';
import marketplaceData from '../data/marketplace.json';

export default function About() {
  const stats = [
    { label: "Active Buyers", value: "2K+", icon: Users },
    { label: "Accounts Sold", value: "500+", icon: ShoppingBag },
    { label: "Success Rate", value: "99%", icon: Target },
    { label: "Growth Boosted", value: "1M+", icon: Award },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-widest mb-6">
                Our Story
             </div>
             <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
               Empowering African <br /> <span className="text-violet-600">Digital Creators.</span>
             </h1>
             <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
               <p>
                 GURA NAWE was born from a simple realization: the digital economy in Rwanda and Africa is exploding, but the bridge between creators wanting to scale and assets available was broken.
               </p>
               <p>
                 Founded in Kigali, we set out to build a marketplace where trust is the primary currency. No more sketchy WhatsApp groups or unverified deals. We provide a professional platform for buying and selling monetized channels, viral accounts, and growth services.
               </p>
               <p>
                 Our mission is to help 1 million African entrepreneurs find their voice and build their business through digital assets that work.
               </p>
             </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-[64px] overflow-hidden shadow-2xl relative rotate-3 group">
               <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
                alt="Our Team"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
               />
               <div className="absolute inset-0 bg-violet-600/10" />
            </div>
            
            {/* Absolute floating bits */}
            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-2xl border border-slate-100 dark:border-slate-700 animate-bounce-slow">
               <Heart className="text-pink-500 fill-current mb-2" size={32} />
               <p className="font-bold text-slate-900 dark:text-white">Built with Love in Kigali</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {stats.map((s, i) => (
            <div key={i} className="p-10 rounded-[40px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-6 shadow-sm">
                <s.icon size={32} />
              </div>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2">{s.value}</h3>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="mb-32">
           <SectionHeader 
            title="What We Stand For" 
            subtitle="The principles that guide every transaction on our platform."
            centered
           />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Transparency", icon: Zap, color: "text-amber-500" },
                { title: "Security First", icon: ShieldCheck, color: "text-emerald-500" },
                { title: "Creator Centric", icon: Users, color: "text-blue-500" }
              ].map((v, i) => (
                <div key={i} className="p-12 rounded-[48px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center">
                   <div className={`w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center mx-auto mb-8 shadow-inner ${v.color}`}>
                      <v.icon size={40} />
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{v.title}</h3>
                   <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                     Reliability is the foundation of digital trade. We ensure every asset is described accurately.
                   </p>
                </div>
              ))}
           </div>
        </div>

        {/* Connect Box */}
        <div className="bg-slate-900 dark:bg-violet-600 rounded-[56px] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 text-white">
          <div className="max-w-md">
            <h2 className="text-4xl font-black mb-6">Work with the best digital team.</h2>
            <p className="text-slate-400 dark:text-violet-100 text-lg mb-8 leading-relaxed">
              Whether you are looking to sell your channel or buy growth services, our team is ready to help you 24/7.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 dark:border-violet-600 bg-slate-800 flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                    </div>
                 ))}
              </div>
              <p className="text-sm font-bold">12 Active support agents</p>
            </div>
          </div>
          <div className="shrink-0 flex flex-col gap-4 w-full md:w-auto">
             <a 
              href={`https://wa.me/${marketplaceData.store.whatsapp}`}
              target="_blank" 
              rel="noreferrer"
              className="px-10 py-5 rounded-[24px] bg-[#0cf862] text-white font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/20"
             >
               <MessageCircle size={28} /> Chat on WhatsApp
             </a>
             <div className="flex items-center justify-center gap-4 text-slate-400 dark:text-violet-200">
                <div className="flex items-center gap-1.5"><MapPin size={16} /> Kigali, Rwanda</div>
                <div className="h-4 w-px bg-white/20" />
                <div className="flex items-center gap-1.5"><CheckCircle2 size={16} /> Certified Market</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
