import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const { t } = useTranslation();
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Effet magnétique du bouton
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setHoverPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => setHoverPosition({ x: 0, y: 0 });

  // Gestion de l'envoi du formulaire (Facile & Efficace)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const formData = new FormData(e.currentTarget);
    // Remplace par ta clé Web3Forms (gratuite sur web3forms.com)
    formData.append("access_key", "8f376ff6-f687-453c-bc4a-dfc6681f8387");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset le message de succès après 5 secondes
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

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
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic">
            {t('contact.title')}
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl font-medium mb-16">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Champ Nom */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <input
                type="text"
                name="name" // Attribut requis pour l'envoi
                id="name"
                required
                className="w-full bg-transparent border-b border-zinc-800 py-4 px-0 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors peer"
                placeholder="Name"
              />
              <label htmlFor="name" className="absolute left-0 top-4 text-zinc-500 text-sm font-medium transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-valid:-top-4 peer-valid:text-xs peer-valid:text-zinc-400">
                {t('contact.name_label')}
              </label>
            </motion.div>

            {/* Champ Email */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <input
                type="email"
                name="email" // Attribut requis
                id="email"
                required
                className="w-full bg-transparent border-b border-zinc-800 py-4 px-0 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors peer"
                placeholder="Email"
              />
              <label htmlFor="email" className="absolute left-0 top-4 text-zinc-500 text-sm font-medium transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-valid:-top-4 peer-valid:text-xs peer-valid:text-zinc-400">
                {t('contact.email_label')}
              </label>
            </motion.div>
          </div>

          {/* Champ Message */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group mt-4"
          >
            <textarea
              name="message" // Attribut requis
              id="message"
              required
              rows={4}
              className="w-full bg-transparent border-b border-zinc-800 py-4 px-0 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors peer resize-none"
              placeholder="Message"
            />
            <label htmlFor="message" className="absolute left-0 top-4 text-zinc-500 text-sm font-medium transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-valid:-top-4 peer-valid:text-xs peer-valid:text-zinc-400">
              {t('contact.message_label')}
            </label>
          </motion.div>

          {/* Bouton Magnétique & Status */}
          <div className="flex flex-col items-center mt-12 gap-4">
            <motion.button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: hoverPosition.x, y: hoverPosition.y }}
              className={`relative flex items-center justify-center w-40 h-40 rounded-full font-bold tracking-wide uppercase text-sm transition-all duration-300 ease-out
                ${isSubmitting ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-white text-black hover:scale-110 active:scale-95'}`}
            >
              {isSubmitting ? '...' : t('contact.send')}
            </motion.button>

            {/* Messages de retour client */}
            {status === 'success' && (
              <p className="text-green-500 font-medium animate-pulse">Message envoyé avec succès !</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 font-medium">Une erreur est survenue. Réessayez.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}