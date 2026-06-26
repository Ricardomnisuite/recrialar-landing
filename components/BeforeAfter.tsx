'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    label: 'Remodelação de Apartamento',
    location: 'Setúbal',
    service: 'Remodelação completa + Pintura interior',
  },
  {
    label: 'Pintura de Fachada',
    location: 'Comporta',
    service: 'Pintura exterior + Reparações',
  },
  {
    label: 'Instalação de Pladur',
    location: 'Palmela',
    service: 'Pladur + Teto falso + Barramento',
  },
];

function PlaceholderPanel({ label, side }: { label: string; side: 'Antes' | 'Depois' }) {
  const isDep = side === 'Depois';
  return (
    <div
      className={`relative flex-1 aspect-[4/3] flex items-center justify-center ${
        isDep ? 'bg-parchment-200' : 'bg-parchment-100 border border-parchment-300'
      }`}
    >
      <div className="text-center">
        <p
          className={`font-display text-sm tracking-[0.15em] uppercase font-medium ${
            isDep ? 'text-ink-soft' : 'text-ink-muted'
          }`}
        >
          {side}
        </p>
      </div>
      {/* corner marks */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-parchment-300" aria-hidden="true" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-parchment-300" aria-hidden="true" />
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section
      className="py-20 lg:py-32 bg-parchment-100"
      aria-labelledby="beforeafter-heading"
    >
      <div className="container-wide section-padding">
        {/* Header */}
        <div className="max-w-2xl mb-14 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs font-medium tracking-[0.18em] text-brass uppercase mb-4"
          >
            Resultados reais
          </motion.p>
          <motion.h2
            id="beforeafter-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl lg:text-5xl font-light text-ink leading-[1.15] text-balance"
          >
            Antes e Depois —{' '}
            <span className="italic">a diferença que fazemos</span>
          </motion.h2>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              {/* Before / After panels */}
              <div className="flex gap-1 mb-4 relative">
                <PlaceholderPanel label={project.label} side="Antes" />

                {/* Arrow divider */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white border border-parchment-300 rounded-full p-1.5" aria-hidden="true">
                  <ArrowRight size={12} strokeWidth={1.5} className="text-ink" />
                </div>

                <PlaceholderPanel label={project.label} side="Depois" />
              </div>

              {/* Project info */}
              <div className="px-1">
                <p className="font-display text-lg font-medium text-ink mb-1">
                  {project.label}
                </p>
                <p className="font-sans text-xs text-ink-muted tracking-wide">
                  {project.location} &middot; {project.service}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-sans text-xs text-ink-muted text-center mt-10 tracking-wide"
        >
          Imagens de projetos reais disponíveis brevemente · Fale connosco para ver exemplos de trabalhos anteriores
        </motion.p>
      </div>
    </section>
  );
}
