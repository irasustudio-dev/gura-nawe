import { useParams, Link } from 'react-router-dom';
import { 
  Star, ShieldCheck, MessageCircle, ArrowLeft, 
  CheckCircle2, Share2, Info, ChevronRight, PlayCircle
} from 'lucide-react';
import marketplaceData from '../data/marketplace.json';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { formatPrice, cn } from '../utils/utils';
import { motion } from 'motion/react';
import ProductCard from '../components/home/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = marketplaceData.products.find(p => p.id === id);

  if (!product) {
    return (
        <div className="pt-40 pb-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link to="/marketplace" className="text-red-600 hover:underline">Return to Marketplace</Link>
      </div>
    );
  }

  const whatsappUrl = generateWhatsAppLink(product.name, product.priceRWF);
  const relatedProducts = marketplaceData.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
          <Link to="/" className="hover:text-red-600">Home</Link>
          <ChevronRight size={14} />
          <Link to="/marketplace" className="hover:text-red-600">Marketplace</Link>
          <ChevronRight size={14} />
          <span className="text-slate-600 dark:text-slate-300 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="aspect-[16/10] bg-slate-100 dark:bg-slate-900 rounded-[40px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xl relative group"
            >
              <img 
                src={product.thumbnail} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={product.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex flex-col justify-end p-8">
                 <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white text-sm font-bold border border-white/20 self-start">
                   <PlayCircle size={18} />
                    Verified Preview
                 </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-red-500 transition-all opacity-60 hover:opacity-100">
                  <img src={product.thumbnail} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-32"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                {product.category} Market
              </div>
              
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star fill="currentColor" size={20} />
                  <span className="font-bold text-lg">{product.rating}</span>
                </div>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                <div className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                  <ShieldCheck size={20} className="text-blue-500" />
                  Verified Seller
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div>
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Price Info</p>
                   <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-slate-900 dark:text-white">{formatPrice(product.priceRWF)}</span>
                      <span className="text-slate-500 font-bold">RWF</span>
                   </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-[32px] border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-4">Core Stats & Info</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Platform</span>
                      <span className="font-bold text-slate-900 dark:text-white">{product.platform}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Stats</span>
                      <span className="font-bold text-emerald-600">{product.stats}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Delivery</span>
                      <span className="font-bold text-slate-900 dark:text-white">Instant / WhatsApp</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#0cf862] hover:bg-[#07c24c] text-white py-5 rounded-[24px] font-black text-xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle size={28} />
                  Buy on WhatsApp
                </a>
                
                <button className="flex items-center justify-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-bold text-sm">
                  <Share2 size={18} /> Share Product Link
                </button>
              </div>

              <div className="mt-8 flex items-center gap-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30">
                 <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <Info size={20} />
                 </div>
                 <p className="text-xs text-amber-800 dark:text-amber-200 font-medium">
                  Be aware of identity spoofing. We only handle transactions through our official WhatsApp contact listed on this site.
                 </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs / Content Section */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-8">
             <div className="flex border-b border-slate-100 dark:border-slate-800 mb-10 overflow-x-auto scrollbar-none">
                <button className="px-8 py-4 border-b-2 border-red-600 text-red-600 font-bold whitespace-nowrap">Description</button>
                <button className="px-8 py-4 text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold whitespace-nowrap">Features list</button>
                <button className="px-8 py-4 text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold whitespace-nowrap">Reviews (12)</button>
             </div>

             <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {product.description}
                </p>
                
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">What makes this account special?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800">
                      <div className="mt-0.5">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                      </div>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <div className="flex justify-between items-end mb-12">
               <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Related for you</h2>
               <Link to="/marketplace" className="text-red-600 font-bold hover:underline">View All Category</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
