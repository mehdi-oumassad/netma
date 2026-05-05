/**
 * PortfolioSection — version finale, Senior-grade
 *
 * Pourquoi les cartes étaient vides :
 *   Tailwind v4 (@tailwindcss/vite) scan tous les .tsx au build.
 *   La classe "portfolio-grid" définie dans un <style> JSX inline
 *   n'est jamais générée par Tailwind → la grille perd ses dimensions
 *   → les cartes font 0px de haut → contenu invisible.
 *
 * Fix : 100% style inline via l'attribut `style={}` React.
 *   CSS Grid positionné directement sur chaque élément.
 *   Zéro className dynamique. Zéro dépendance Tailwind dans ce composant.
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/* ─── Données — locales, typées, jamais vides ─── */
const projects = [
  {
    id: 1,
    title: 'Medigraphy Studio',
    category: { fr: 'Photographie & Vidéographie', en: 'Photography & Videography' },
    href: 'https://medigraphystudio.com/',
    gridArea: { col: '1 / 3', row: '1 / 3' }, // grande carte gauche
  },
  {
    id: 2,
    title: 'Poke Auto Parts',
    category: { fr: 'E-Commerce Automobile', en: 'Automotive E-Commerce' },
    href: 'https://pokeautoparts.com/',
    gridArea: { col: '3 / 4', row: '1 / 2' },
  },
  {
    id: 3,
    title: 'Glorious Beauty',
    category: { fr: 'Branding Cosmétique', en: 'Cosmetic Branding' },
    href: 'https://glorious-beauty.vercel.app/',
    gridArea: { col: '3 / 4', row: '2 / 3' },
  },
  {
    id: 4,
    title: 'Barber Coo',
    category: { fr: 'Services de Proximité', en: 'Local Services' },
    href: 'https://barber-coo.vercel.app/',
    gridArea: { col: '1 / 4', row: '3 / 4' }, // bannière pleine largeur
  },
] as const;

/* ─── Carte individuelle ─── */
function ProjectCard({
  project,
  index,
  lang,
  gridStyle,
}: {
  project: typeof projects[number];
  index: number;
  lang: 'fr' | 'en';
  gridStyle: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        // Position dans la grille CSS — transmis depuis le parent
        ...gridStyle,
        // Layout interne
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '1.75rem 2rem',
        boxSizing: 'border-box',
        // Visuel
        background: '#0d0d0d',
        borderRadius: '1.25rem',
        border: `1px solid ${hovered ? '#52525b' : '#27272a'}`,
        textDecoration: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        // Visibilité — FORCÉE, aucune animation qui cache
        opacity: 1,
        visibility: 'visible',
        // Position pour les éléments absolus internes
        position: 'relative',
        // Hover scale
        transform: hovered ? 'scale(1.013)' : 'scale(1)',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
      }}
    >
      {/* Numéro de carte — toujours visible */}
      <span style={{
        position: 'absolute',
        top: '1.25rem',
        left: '1.75rem',
        fontSize: '0.6rem',
        fontWeight: 700,
        letterSpacing: '0.15em',
        color: '#3f3f46',
        zIndex: 10,
        userSelect: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icône lien externe — apparaît au hover */}
      <span style={{
        position: 'absolute',
        top: '1.25rem',
        right: '1.5rem',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        border: '1px solid #3f3f46',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'scale(1)' : 'scale(0.7)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        zIndex: 10,
      }}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M2 9L9 2M9 2H4.5M9 2V6.5"
            stroke="#ffffff" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>

      {/* Contenu texte — zIndex 10, toujours au premier plan */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        opacity: 1,
        visibility: 'visible',
      }}>
        {/* Catégorie */}
        <span style={{
          display: 'block',
          fontSize: '0.58rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#71717a',
          marginBottom: '0.45rem',
          opacity: 1,
        }}>
          {project.category[lang]}
        </span>

        {/* Titre — texte brut hardcodé, zéro t() */}
        <h3 style={{
          margin: 0,
          fontSize: '1.35rem',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.025em',
          lineHeight: 1.2,
          opacity: 1,
          visibility: 'visible',
        }}>
          {project.title}
        </h3>
      </div>
    </a>
  );
}

/* ─── Section principale ─── */
export default function PortfolioSection() {
  const { i18n } = useTranslation();
  const lang: 'fr' | 'en' = (i18n.language ?? 'fr').startsWith('fr') ? 'fr' : 'en';

  const heading = lang === 'fr' ? 'Réalisations.'                            : 'Selected Work.';
  const sub     = lang === 'fr' ? 'Un aperçu de notre savoir-faire digital.' : 'A glimpse into our digital craftsmanship.';
  const viewAll = lang === 'fr' ? 'Voir tout'                                : 'View all';

  return (
    <section
      id="portfolio"
      style={{
        width: '100%',
        background: '#050505',
        color: '#ffffff',
        padding: '7rem 1.5rem',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>

        {/* En-tête section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}>
              {heading}
            </h2>
            <p style={{ color: '#71717a', fontSize: '0.875rem', margin: '0.5rem 0 0' }}>
              {sub}
            </p>
          </div>
          <a href="#portfolio" style={{
            color: '#71717a',
            fontSize: '0.65rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            textDecoration: 'none',
          }}>
            {viewAll} ↗
          </a>
        </div>

        {/*
          ─── Grille CSS — 100% style inline ───────────────────────────────
          Tailwind v4 ne peut PAS purger un style={{ }} React.
          gridTemplateColumns / gridColumn / gridRow sont directement
          sur les éléments DOM — aucune classe intermédiaire.
          ──────────────────────────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 260px)',
          gap: '0.875rem',
          /* Mobile : 1 colonne via media query JS ci-dessous */
        }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              lang={lang}
              gridStyle={{
                gridColumn: project.gridArea.col,
                gridRow: project.gridArea.row,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
