import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] text-white py-12 px-6 lg:px-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="h-8">
              <img
                src="/2.png"
                alt="Netmaroc"
                className="h-full w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const sib = e.currentTarget.nextElementSibling as HTMLElement | null;
                  sib?.classList.remove('hidden');
                }}
              />
              <span className="hidden text-xl font-bold tracking-tight">NETMAROC</span>
            </div>
            <p className="text-zinc-500 text-sm font-medium">
              {t('footer.tagline')}<br />{t('footer.location')}
            </p>
          </div>

          <div className="flex gap-12 text-sm font-medium text-zinc-400">
            <div className="flex flex-col gap-3 items-center md:items-start">
              <span className="text-white mb-1">{t('footer.company')}</span>
              <a href="#about" className="hover:text-white transition-colors">{t('footer.about')}</a>
              <a href="#services" className="hover:text-white transition-colors">{t('footer.services')}</a>
              <a href="#portfolio" className="hover:text-white transition-colors">{t('footer.work')}</a>
            </div>
            <div className="flex flex-col gap-3 items-center md:items-start">
              <span className="text-white mb-1">{t('footer.connect')}</span>
              <a href="#contact" className="hover:text-white transition-colors">{t('footer.contact')}</a>
              <a href="mailto:hello@netmaroc.com" className="hover:text-white transition-colors">{t('footer.email')}</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-900 text-xs text-zinc-600 font-medium">
          <p>&copy; {currentYear} Netmaroc. {t('footer.rights')}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.15 }}
                className="hover:text-white transition-colors border border-zinc-800 p-2 rounded-full hover:bg-zinc-800"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
