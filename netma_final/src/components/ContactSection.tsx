import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const { t } = useTranslation();
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setHoverPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => setHoverPosition({ x: 0, y: 0 });

  return (
    <section id="contact" className="relative w-full py-32 px-6 lg:px-12 bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">{t('contact.title')}</h2>
          <p className="text-zinc-500 text-lg md:text-xl font-medium mb-16">{t('contact.subtitle')}</p>
        </motion.div>

        <form className="flex flex-col gap-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <input
                type="text"
                id="name"
                required
                className="w-full bg-transparent border-b border-zinc-800 py-4 px-0 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors peer"
                placeholder="Name"
              />
              <label
                htmlFor="name"
                className="absolute left-0 top-4 text-zinc-500 text-sm font-medium transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-valid:-top-4 peer-valid:text-xs peer-valid:text-zinc-400"
              >
                {t('contact.name_label')}
              </label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <input
                type="email"
                id="email"
                required
                className="w-full bg-transparent border-b border-zinc-800 py-4 px-0 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors peer"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-4 text-zinc-500 text-sm font-medium transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-valid:-top-4 peer-valid:text-xs peer-valid:text-zinc-400"
              >
                {t('contact.email_label')}
              </label>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative group mt-4"
          >
            <textarea
              id="message"
              required
              rows={4}
              className="w-full bg-transparent border-b border-zinc-800 py-4 px-0 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors peer resize-none"
              placeholder="Message"
            />
            <label
              htmlFor="message"
              className="absolute left-0 top-4 text-zinc-500 text-sm font-medium transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-valid:-top-4 peer-valid:text-xs peer-valid:text-zinc-400"
            >
              {t('contact.message_label')}
            </label>
          </motion.div>

          <div className="flex justify-center mt-12">
            <motion.button
              ref={buttonRef}
              type="submit"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              animate={{ x: hoverPosition.x, y: hoverPosition.y }}
              className="relative flex items-center justify-center w-40 h-40 rounded-full bg-white text-black font-bold tracking-wide uppercase text-sm hover:scale-105 transition-transform duration-300 ease-out"
            >
              {t('contact.send')}
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
}
