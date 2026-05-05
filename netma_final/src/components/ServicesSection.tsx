import { motion } from 'motion/react';
import { Layers, ShieldCheck, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const icons = [
  <Cpu className="w-6 h-6 text-zinc-100" />,
  <ShieldCheck className="w-6 h-6 text-zinc-100" />,
  <Layers className="w-6 h-6 text-zinc-100" />,
];

export default function ServicesSection() {
  const { t } = useTranslation();
  const services = t('services.items', { returnObjects: true }) as Array<{ title: string; description: string }>;

  return (
    <section id="services" className="relative w-full py-32 px-6 lg:px-12 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col items-center text-center gap-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500"
          >
            {t('services.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight"
          >
            {t('services.title')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md overflow-hidden transition-colors hover:bg-zinc-900/40 hover:border-zinc-700/50"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="mb-8 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 group-hover:bg-zinc-800 transition-colors">
                {icons[index]}
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight">{service.title}</h3>
              <p className="text-sm text-zinc-400 font-medium leading-relaxed group-hover:text-zinc-300 transition-colors">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
