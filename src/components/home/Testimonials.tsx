import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import testimonialsData from '../../data/testimonials.json';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../utils/i18n';

export default function Testimonials() {
  const { language } = useLanguage();

  const testimonialsList = testimonialsData.testimonials;
  // Duplicate for seamless infinite scroll
  const displayList = [...testimonialsList, ...testimonialsList];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {language === 'kin' ? 'Abantu Bacu Baraguhujje' : 'What Our Customers Say'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            {language === 'kin'
              ? 'Mbere y'ibibazo, andika ku WhatsApp +250 722 248 567'
              : 'Join over 1,200 satisfied customers trading with confidence'}
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
          <motion.div
            className="flex gap-6"
            initial={{ x: 0 }}
            animate={{ x: '-50%' }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ willChange: 'transform' }}
          >
            {displayList.map((testimonial, idx) => (
              <motion.div
                key={`${testimonial.id}-${idx}`}
                className="flex-shrink-0 w-80"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-slate-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-400 h-full flex flex-col justify-between">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-red-600 text-red-600"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-slate-700 dark:text-slate-300 italic mb-6 text-lg leading-relaxed font-medium">
                    "{language === 'kin' ? testimonial.quoteKin : testimonial.quoteEng}"
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
          </motion.div>
        </div>
      </div>

      {/* CTA below testimonials */}
      <div className="mt-16 text-center">
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          {language === 'kin'
            ? 'Witeguye gutangira urugendo rwawe rwa digital?'
            : 'Ready to start your digital journey?'}
        </p>
        <a
          href={`https://wa.me/250722248567?text=${encodeURIComponent(
            language === 'kin'
              ? 'Muraho Gura Nawe, nshaka kwiyunguruza imiceri yanjye ya digital.'
              : 'Hello Gura Nawe, I want to explore your digital assets.'
          )}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-red-600/40 transition-all hover:scale-105"
        >
          {language === 'kin' ? 'Twandikire ku WhatsApp' : 'Chat on WhatsApp'}
        </a>
      </div>
    </section>
  );
}
