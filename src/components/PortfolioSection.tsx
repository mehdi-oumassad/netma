import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "Medigraphy Studio",
    image: "/images/medi.png", 
    link: "https://medigraphystudio.com/",
    category: "Photography & Creative",
    large: true 
  },
  {
    id: 2,
    title: "Poke Auto Parts",
    image: "/images/poke.png",
    link: "https://pokeautoparts.com/",
    category: "E-commerce"
  },
  {
    id: 3,
    title: "Glorious Beauty",
    image: "/images/glorious.png",
    link: "https://glorious-beauty.vercel.app/",
    category: "Branding"
  },
  {
    id: 4,
    title: "Barber Coo",
    image: "/images/barber.png",
    link: "https://barber-coo.vercel.app/",
    category: "Business Showcase"
  }
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 bg-[#050505] text-white">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-6xl font-bold tracking-tighter mb-4">
            Réalisations<span className="text-zinc-500">.</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-sm font-light">
            Expertise digitale signée Netmaroc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {projects.map((project) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative group overflow-hidden rounded-[2.5rem] bg-zinc-900 flex flex-col justify-end p-10 border border-white/5
                ${project.large ? 'md:col-span-2 md:row-span-2' : 'col-span-1'}`}
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700"
                  onError={(e) => { 
                    const target = e.currentTarget;
                    // Si le .png échoue, on tente le .jpg automatiquement
                    if (target.src.endsWith('.png')) {
                      target.src = target.src.replace('.png', '.jpg');
                    } else if (target.src.endsWith('.jpg')) {
                      target.src = target.src.replace('.jpg', '.PNG'); // Test majuscules
                    } else {
                      target.src = "https://via.placeholder.com/800x600?text=Image+Introuvable";
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-3xl font-bold tracking-tight text-white">
                  {project.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;