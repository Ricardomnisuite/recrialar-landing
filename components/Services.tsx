'use client';

import { motion } from 'framer-motion';
import {
  Home,
  Paintbrush,
  Layers,
  Grid3x3,
  Hammer,
  Wrench,
  Building2,
  Mountain,
  PlusCircle,
} from 'lucide-react';

const services = [
  {
    id: 'Remodelação completa',
    icon: Home,
    num: '01',
    title: 'Remodelação Completa',
    description:
      'Transformação total de espaços residenciais e comerciais — do projeto à entrega final.',
  },
  {
    id: 'Pintura interior',
    icon: Paintbrush,
    num: '02',
    title: 'Pintura Interior',
    description:
      'Acabamento perfeito em paredes e tetos, com preparação de superfícies e produtos premium.',
  },
  {
    id: 'Pintura em altura / rapel',
    icon: Mountain,
    num: '03',
    title: 'Pintura em Altura',
    description:
      'Fachadas e zonas de difícil acesso com técnicas de rapel e equipamento especializado.',
  },
  {
    id: 'Pladur / tetos falsos',
    icon: Layers,
    num: '04',
    title: 'Pladur e Tetos Falsos',
    description:
      'Soluções de pladur, tabiques e tetos falsos com acabamento limpo e técnico.',
  },
  {
    id: 'Chão flutuante',
    icon: Grid3x3,
    num: '05',
    title: 'Chão Flutuante',
    description:
      'Colocação de pavimento flutuante e revestimentos com preparação de base incluída.',
  },
  {
    id: 'Barramento',
    icon: Hammer,
    num: '06',
    title: 'Barramento',
    description:
      'Barramento e estuque aplicado com rigor — superfícies lisas prontas a pintar.',
  },
  {
    id: 'Pequenas reparações domésticas',
    icon: Wrench,
    num: '07',
    title: 'Reparações Domésticas',
    description:
      'Resolução de reparações pontuais: infiltrações, fissuras, acabamentos e mais.',
  },
  {
    id: 'Manutenção de imóveis',
    icon: Building2,
    num: '08',
    title: 'Manutenção de Imóveis',
    description:
      'Serviço contínuo para conservar o seu imóvel em perfeitas condições ao longo do tempo.',
  },
  {
    id: 'Outro',
    icon: PlusCircle,
    num: '—',
    title: 'Outro Serviço',
    description:
      'Tem um projeto diferente? Contacte-nos e encontramos a solução certa para si.',
  },
];

function selectServiceAndScroll(service: string) {
  window.dispatchEvent(new CustomEvent('wizard:selectService', { detail: service }));
  setTimeout(() => {
    document.getElementById('wizard')?.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

export default function Services() {
  return (
    <section
      id="servicos"
      className="bg-parchment-300 py-10 lg:py-14"
      aria-labelledby="services-heading"
    >
      <div className="container-wide section-padding">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8 lg:mb-10">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="font-sans text-xs font-medium tracking-[0.18em] text-brass uppercase mb-3"
            >
              O que fazemos
            </motion.p>
            <motion.h2
              id="services-heading"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-display text-3xl lg:text-5xl font-light text-ink leading-[1.12] text-balance"
            >
              Serviços de obras e{' '}
              <span className="italic">acabamentos profissionais</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-sans text-sm text-ink-muted max-w-xs leading-relaxed lg:text-right"
          >
            Clique num serviço para iniciar o pedido de orçamento personalizado.
          </motion.p>
        </div>

        {/* Grid — 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-parchment-400/50">
          {services.map((service, i) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              onClick={() => selectServiceAndScroll(service.id)}
              className="group relative bg-parchment-100 p-6 lg:p-7 text-left hover:bg-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-inset"
              aria-label={`Pedir orçamento para ${service.title}`}
            >
              {/* Number */}
              <span
                className="absolute top-5 right-5 font-display text-sm font-light text-parchment-400 group-hover:text-brass transition-colors duration-200 select-none"
                aria-hidden="true"
              >
                {service.num}
              </span>

              {/* Icon */}
              <service.icon
                size={20}
                strokeWidth={1.25}
                className="text-ink-subtle mb-4 group-hover:text-brass transition-colors duration-200"
                aria-hidden="true"
              />

              <h3 className="font-display text-xl font-medium text-ink mb-2 leading-snug">
                {service.title}
              </h3>
              <p className="font-sans text-sm text-ink-muted leading-relaxed mb-5 pr-6">
                {service.description}
              </p>

              {/* CTA indicator */}
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-brass/70 group-hover:text-brass group-hover:gap-2.5 transition-all duration-200">
                Pedir orçamento
                <span aria-hidden="true">→</span>
              </span>

              {/* Hover accent line */}
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-brass scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                aria-hidden="true"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
