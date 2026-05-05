import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

interface LanguageSwitcherProps {
  onLanguageChange?: () => void;
}

export default function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);

  const currentLang = i18n.language === 'fr' ? 'FR' : 'EN';
  const nextLang = i18n.language === 'fr' ? 'EN' : 'FR';

  const handleSwitch = async () => {
    if (isChanging) return;
    setIsChanging(true);
    onLanguageChange?.();
    
    // Small delay to let the fade-out animation start
    await new Promise(r => setTimeout(r, 150));
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
    
    await new Promise(r => setTimeout(r, 300));
    setIsChanging(false);
  };

  return (
    <motion.button
      onClick={handleSwitch}
      disabled={isChanging}
      className="relative flex items-center gap-1 rounded-full border border-zinc-700/60 bg-zinc-900/50 px-3 py-1.5 text-xs font-semibold tracking-widest text-zinc-400 backdrop-blur-md transition-all hover:border-zinc-500 hover:text-white"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Passer en ${nextLang}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentLang}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18 }}
          className="text-white"
        >
          {currentLang}
        </motion.span>
      </AnimatePresence>
      <span className="text-zinc-600">|</span>
      <span className="text-zinc-600">{nextLang}</span>
    </motion.button>
  );
}
