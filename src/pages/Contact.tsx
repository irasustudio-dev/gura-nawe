import { useState } from 'react';
import { 
  Mail, Phone, MapPin, MessageCircle, Instagram, 
  Facebook, Twitter, Send, Clock, ShieldCheck, AlertCircle 
} from 'lucide-react';
import { motion } from 'motion/react';
import marketplaceData from '../data/marketplace.json';
import SectionHeader from '../components/shared/SectionHeader';
import { contactFormSchema, validateForm } from '../utils/validation';
import { notifySuccess, notifyError } from '../utils/notifications';

export default function Contact() {
  const { store } = marketplaceData;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Buying an Account',
    message: '',
  });

  const contactMethods = [
    { 
      label: "Support WhatsApp", 
      value: store.phone, 
      icon: MessageCircle, 
      color: "text-emerald-500",
      link: `https://wa.me/${store.whatsapp}`
    },
    { 
      label: "Official Email", 
      value: store.email, 
      icon: Mail, 
      color: "text-blue-500",
      link: `mailto:${store.email}`
    },
    { 
      label: "Business Office", 
      value: store.address, 
      icon: MapPin, 
      color: "text-red-500",
      link: "#"
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const result = await validateForm(contactFormSchema, formData);
      
      if (!result.valid) {
        setErrors(result.errors || {});
        notifyError('Please fix the errors in the form');
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1500));

      notifySuccess('Message sent! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: 'Buying an Account', message: '' });
    } catch (error) {
      notifyError('Failed to send message. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-5">
             <SectionHeader 
               title="Get in Touch" 
               subtitle="Have a question about a product or service? Our team is active and ready to help you scale your business."
             />

             <div className="space-y-6 mb-12">
               {contactMethods.map((m, i) => (
                 <a 
                  key={i} 
                  href={m.link} 
                  className="flex items-center gap-6 p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-red-500/30 transition-all group"
                 >
                   <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 ${m.color} group-hover:scale-110 transition-transform`}>
                     <m.icon size={28} />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{m.label}</p>
                     <p className="text-lg font-bold text-slate-900 dark:text-white break-all">{m.value}</p>
                   </div>
                 </a>
               ))}
             </div>

             <div className="p-8 rounded-[40px] bg-red-600 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Clock size={20} /> Response Time
                  </h3>
                  <p className="text-red-100 mb-6 leading-relaxed">
                    We usually respond on WhatsApp within <span className="font-bold text-white underline decoration-white/30 decoration-2">5-10 minutes</span> during business hours (8AM - 10PM CAT).
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <ShieldCheck size={18} className="text-emerald-400" /> Premium Priority Support
                  </div>
                </div>
                {/* Decorative bits */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
             </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-[48px] p-10 md:p-16 border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-20 -mt-20" />
               
               <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 relative z-10">Send a Quick Message</h2>
               <p className="text-slate-500 dark:text-slate-400 mb-10 relative z-10 font-medium">Or use the form below to reach us via email.</p>

               <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-slate-900 dark:text-white appearance-none">
                      <option>Buying an Account</option>
                      <option>Selling my Assets</option>
                      <option>Growth Services inquiry</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                    <textarea 
                      rows={5} 
                      placeholder="How can we help you?" 
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 py-4 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-slate-900 dark:text-white resize-none"
                    ></textarea>
                  </div>

                  <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 shadow-2xl transition-all hover:bg-red-600 dark:hover:bg-red-500 hover:text-white group active:scale-[0.98]">
                    Send Message <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
               </form>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-slate-400">
               <a href={store.socialLinks.instagram} className="hover:text-red-600 transition-colors"><Instagram size={28} /></a>
               <a href={store.socialLinks.facebook} className="hover:text-red-600 transition-colors"><Facebook size={28} /></a>
               <a href="#" className="hover:text-red-600 transition-colors"><Twitter size={28} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
