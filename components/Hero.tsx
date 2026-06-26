'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';

const HERO_IMAGE = '/hero-recrialar-premium.png';

const localities = [
  'Setúbal', 'Tróia', 'Comporta', 'Palmela', 'Azeitão', 'Sesimbra',
  'Lisboa', 'Montijo', 'Pinhal Novo', 'Barreiro', 'Almada', 'Moita', 'Alcochete',
];

function scrollToWizard() {
  document.getElementById('wizard')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-16"
      aria-label="Apresentação"
    >
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Interior renovado com acabamentos de qualidade pela Recrialar"
        fill
        priority
        quality={85}
        className="object-cover object-[center_30%]"
        sizes="100vw"
      />

      {/* Dark gradient overlay — left-weighted for text, right opens to show image */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(110deg, rgba(23,20,18,0.88) 0%, rgba(23,20,18,0.68) 45%, rgba(23,20,18,0.30) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle vertical brass line accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-brass/60 hidden lg:block"
        aria-hidden="true"
      />

      <div className="container-wide section-padding relative z-10">
        <div className="max-w-3xl py-10 lg:py-16 lg:-mt-8">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-xs font-medium tracking-[0.2em] text-brass uppercase mb-5"
          >
            Obras · Remodelações · Acabamentos
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-light leading-[1.08] text-parchment-50 mb-6"
          >
            Remodelações e acabamentos com{' '}
            <em className="font-medium not-italic text-parchment-100">
              rigor profissional
            </em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="font-sans text-base lg:text-lg text-parchment-400 leading-relaxed max-w-xl mb-9"
          >
            Obras, pintura, pladur, chão flutuante e reparações domésticas em{' '}
            <strong className="text-parchment-200 font-medium">
              Setúbal, Tróia, Comporta
            </strong>{' '}
            e arredores.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mb-7"
          >
            <button
              onClick={scrollToWizard}
              className="group inline-flex items-center justify-center gap-2 bg-brass hover:bg-brass-dark text-white px-7 py-4 text-sm font-medium tracking-wide transition-all duration-200 shadow-[0_2px_16px_rgba(183,146,90,0.35)] hover:shadow-[0_4px_24px_rgba(183,146,90,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Pedir Orçamento Grátis
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>
            <a
              href="tel:+351966104885"
              className="inline-flex items-center justify-center gap-2 border border-parchment-400 text-parchment-100 px-7 py-4 text-sm font-medium tracking-wide hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parchment-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              aria-label="Ligar agora para a Recrialar"
            >
              <Phone size={15} strokeWidth={1.5} />
              Ligar Agora
            </a>
          </motion.div>

          {/* Microcopy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.68 }}
            className="font-sans text-xs text-parchment-500 tracking-wide"
          >
            Orçamento gratuito &middot; Resposta rápida &middot; Sem compromisso
          </motion.p>
        </div>
      </div>

      {/* Bottom location strip */}
      <div
        className="absolute bottom-0 left-0 right-0 py-3 bg-gradient-to-t from-ink/80 to-transparent"
        aria-hidden="true"
      >
        <div className="container-wide section-padding">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {localities.map((loc) => (
              <span key={loc} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-brass/80" />
                <span className="font-sans text-[10px] tracking-[0.12em] text-parchment-500 uppercase">
                  {loc}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
