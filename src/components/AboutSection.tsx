import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="relative w-full py-32 px-6 lg:px-12 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="w-full lg:w-1/2">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tighter"
          >
            {t('about.title_line1')} <br className="hidden md:block" />
            <span className="text-zinc-500">{t('about.title_line2')}</span> <br className="hidden md:block" />
            {t('about.title_line3')}
          </motion.h2>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <p
              className="text-lg text-zinc-400 font-medium leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('about.p1') }}
            />
            <p className="text-base text-zinc-500 leading-relaxed">{t('about.p2')}</p>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-px bg-zinc-800 my-4"
          />

          <div className="grid grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h4 className="text-4xl font-bold text-white mb-2">99<span className="text-zinc-600">%</span></h4>
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest">{t('about.stat1_label')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h4 className="text-4xl font-bold text-white mb-2">0<span className="text-zinc-600">Day</span></h4>
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest">{t('about.stat2_label')}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
