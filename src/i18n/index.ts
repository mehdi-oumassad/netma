import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      nav: {
        services: 'Services',
        portfolio: 'Portfolio',
        contact: 'Contact',
        about: 'À Propos',
      },
      hero: {
        badge: 'Agence Digitale Créative — Maroc',
        title_line1: 'Élevez Votre',
        title_line2: 'Présence Digitale',
        subtitle:
          'Nous concevons des expériences digitales distinctives, alliant design épuré et technologie de pointe. Faites confiance à Netmaroc pour transformer votre marque.',
        cta_primary: 'Démarrer un Projet',
        cta_secondary: 'Nos Réalisations',
      },
      about: {
        title_line1: 'Ingénierie',
        title_line2: 'Au-Delà du',
        title_line3: 'Design.',
        p1: 'Chez Netmaroc, nous fusionnons un design visuel haut de gamme avec une architecture technique sans compromis. Notre approche <strong>Full Stack & Cybersécurité</strong> garantit que chaque produit digital que nous créons est non seulement esthétique, mais aussi impénétrable.',
        p2: 'Nous construisons des infrastructures évolutives qui permettent aux entreprises d\'opérer en toute confiance. Des expériences web ultra-optimisées aux architectures backend sécurisées, nous ne laissons rien au hasard.',
        stat1_label: 'Disponibilité Garantie',
        stat2_label: 'Failles Zéro Jour',
      },
      services: {
        eyebrow: "Nos Domaines d'Expertise",
        title: 'Capacités.',
        items: [
          {
            title: 'Développement Web 3D',
            description:
              "Des expériences immersives en WebGL et Three.js qui repoussent les limites du navigateur. Nous créons des interfaces qui captivent et convertissent.",
          },
          {
            title: 'Audit Cybersécurité',
            description:
              "Protection proactive et tests d'intrusion. Nous identifions et colmatons les failles avant qu'elles ne soient exploitées, garantissant la sécurité de vos données.",
          },
          {
            title: 'Branding Digital',
            description:
              "Identités visuelles fortes et mémorables. De la conception du logo à l'UI/UX complète, nous forgeons l'âme numérique de votre entreprise.",
          },
        ],
      },
      portfolio: {
        title: 'Réalisations.',
        subtitle: 'Un aperçu de notre savoir-faire digital.',
        view_all: 'Voir tous les projets',
        projects: [
          { title: 'Medigraphy Studio', category: 'Photographie & Vidéographie' },
          { title: 'Poke Auto Parts', category: 'E-Commerce Automobile' },
          { title: 'Glorious Beauty', category: 'Branding Cosmétique' },
          { title: 'Barber Coo', category: 'Services de Proximité' },
        ],
      },
      contact: {
        title: 'Parlons-en.',
        subtitle: 'Parlez-nous de votre projet, nous créons la solution.',
        name_label: 'Votre prénom & nom',
        email_label: 'Votre adresse email',
        message_label: 'Décrivez votre projet',
        send: 'Envoyer',
      },
      footer: {
        tagline: 'Excellence Technique & Craft Digital.',
        location: 'Basé à Rabat, Maroc.',
        company: 'Société',
        connect: 'Connexion',
        about: 'À Propos',
        services: 'Services',
        work: 'Réalisations',
        contact: 'Contact',
        email: 'Nous écrire',
        rights: 'Tous droits réservés.',
      },
    },
  },
  en: {
    translation: {
      nav: {
        services: 'Services',
        portfolio: 'Portfolio',
        contact: 'Contact',
        about: 'About',
      },
      hero: {
        badge: 'Creative Digital Agency — Morocco',
        title_line1: 'Enhance Your',
        title_line2: 'Digital Presence',
        subtitle:
          'We craft distinctive digital experiences that merge clean design with powerful technology. Elevate your brand with Netmaroc.',
        cta_primary: 'Start a Project',
        cta_secondary: 'Our Work',
      },
      about: {
        title_line1: 'Engineering',
        title_line2: 'Beyond the',
        title_line3: 'Surface.',
        p1: 'At Netmaroc, we merge high-end visual design with uncompromising technical architecture. Our approach to <strong>Full Stack & Cybersecurity</strong> ensures that every digital product we create is not only stunning, but impregnable.',
        p2: "We build scalable infrastructures that empower businesses to operate with confidence. From hyper-optimized web experiences to secure backend architectures, we leave nothing to chance.",
        stat1_label: 'Uptime Guaranteed',
        stat2_label: 'Vulnerability Focus',
      },
      services: {
        eyebrow: 'Our Areas of Expertise',
        title: 'Capabilities.',
        items: [
          {
            title: '3D Web Development',
            description:
              'Immersive WebGL and Three.js experiences that push browser boundaries. We create interfaces that captivate and convert.',
          },
          {
            title: 'Cybersecurity Audit',
            description:
              'Proactive protection and penetration testing. We identify and patch vulnerabilities before they are exploited, ensuring the safety of your data.',
          },
          {
            title: 'Digital Branding',
            description:
              'Strong, memorable visual identities. From logo design to complete UI/UX, we forge the digital soul of your company.',
          },
        ],
      },
      portfolio: {
        title: 'Selected Work.',
        subtitle: 'A glimpse into our digital craftsmanship.',
        view_all: 'View all projects',
        projects: [
          { title: 'Medigraphy Studio', category: 'Photography & Videography' },
          { title: 'Poke Auto Parts', category: 'Automotive E-Commerce' },
          { title: 'Glorious Beauty', category: 'Cosmetic Branding' },
          { title: 'Barber Coo', category: 'Local Services' },
        ],
      },
      contact: {
        title: "Let's talk.",
        subtitle: "Tell us about your project, and we'll craft the solution.",
        name_label: "What's your name?",
        email_label: 'Your email address',
        message_label: 'Tell us about your project',
        send: 'Send Request',
      },
      footer: {
        tagline: 'Technical Excellence & Digital Craft.',
        location: 'Based in Rabat, Morocco.',
        company: 'Company',
        connect: 'Connect',
        about: 'About',
        services: 'Services',
        work: 'Work',
        contact: 'Contact',
        email: 'Email Us',
        rights: 'All rights reserved.',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr', // default French for Moroccan audience
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
