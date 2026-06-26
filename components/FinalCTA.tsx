'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

function scrollToWizard() {
  document.getElementById('wizard')?.scrollIntoView({ behavior: 'smooth' });
}

export default function FinalCTA() {
  return (
    <section className="py-10 lg:py-14 bg-ink" aria-labelledby="cta-heading">
      <div className="container-wide section-padding">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="font-sans text-xs font-medium tracking-[0.18em] text-brass uppercase mb-4"
            >
              Pronto para começar?
            </motion.p>
            <motion.h2
              id="cta-heading"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-parchment-100 leading-[1.1] text-balance"
            >
              Transforme o seu espaço com{' '}
              <span className="italic">rigor e qualidade</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="font-sans text-sm text-parchment-400 leading-relaxed mb-7">
              Orçamento gratuito, visita sem compromisso e acompanhamento do início ao fim.
              Fale connosco hoje.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
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
                href="https://wa.me/351966104885"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-parchment-400/50 text-parchment-200 px-7 py-4 text-sm font-medium tracking-wide hover:bg-parchment-100/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parchment-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                aria-label="Contactar a Recrialar pelo WhatsApp"
              >
                <Phone size={15} strokeWidth={1.5} />
                966 104 885
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
