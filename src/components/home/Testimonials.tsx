import { motion } from 'motion/react';
import { Star, ShieldCheck } from 'lucide-react';
import testimonialsData from '../../data/testimonials.json';
import { getMarketplaceData } from '../../utils/marketplaceStore';

export default function Testimonials() {
  const { store } = getMarketplaceData();
  const testimonialsList = testimonialsData.testimonials;
  // Duplicate for seamless infinite scroll
  const displayList = [...testimonialsList, ...testimonialsList];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            Trusted by premium creators
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
            Trusted by creators across Rwanda for secure digital trading.
          </p>
        </div>
      </div>

      {/* Infinite Scroll Testimonials */}
      <div className="relative">
        {/* Gradient overlay for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling container */}
        <div className="overflow-hidden">
          <div className="marquee flex gap-6">
            {displayList.map((testimonial, idx) => (
              <motion.div
                key={`${testimonial.id}-${idx}`}
                className="flex-shrink-0 w-80"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-slate-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-400 h-full flex flex-col justify-between">
                  {/* Rating */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-600/10 text-red-700 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] shadow-sm">
                      <ShieldCheck size={14} /> Verified
                    </span>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="fill-red-600 text-red-600"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-slate-700 dark:text-slate-300 italic mb-6 text-lg leading-relaxed font-medium">
                    "{testimonial.quoteEng}"
                  </p>

                  {/* Red accent bar */}
                  <div className="h-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mb-4"></div>

                  {/* Author info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full border-2 border-red-600"
                    />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {testimonial.platform}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA below testimonials */}
      <div className="mt-16 text-center">
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Ready to start your digital journey?
        </p>
        <a
          href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent('Hello Gura Nawe, I want to explore your digital assets.')}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-red-600/40 transition-all hover:scale-105"
        >
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}
