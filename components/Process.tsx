'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Pedido de Orçamento',
    description:
      'Preencha o formulário com os detalhes da obra. Analisamos o pedido e contactamos em menos de 24h.',
  },
  {
    number: '02',
    title: 'Visita e Diagnóstico',
    description:
      'A nossa equipa visita o local gratuitamente para avaliar o trabalho e elaborar um orçamento detalhado.',
  },
  {
    number: '03',
    title: 'Aprovação e Calendarização',
    description:
      'Aprovado o orçamento, definimos a data de início e enviamos um plano de trabalhos por escrito.',
  },
  {
    number: '04',
    title: 'Execução com Rigor',
    description:
      'Realizamos a obra com profissionalismo e pontualidade. Entregamos o espaço pronto e impecável.',
  },
];

export default function Process() {
  return (
    <section
      id="processo"
      className="py-10 lg:py-14 bg-ink-soft"
      aria-labelledby="process-heading"
    >
      <div className="container-wide section-padding">

        {/* Header */}
        <div className="max-w-xl mb-8 lg:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="font-sans text-xs font-medium tracking-[0.18em] text-brass uppercase mb-3"
          >
            Como trabalhamos
          </motion.p>
          <motion.h2
            id="process-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display text-3xl lg:text-5xl font-light text-parchment-100 leading-[1.12] text-balance"
          >
            Um processo <span className="italic">simples e transparente</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="relative lg:pr-8 lg:border-r lg:border-ink-subtle/40 last:border-none"
            >
              {/* Number + dot */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-4xl font-light text-ink-muted/50 leading-none select-none">
                  {step.number}
                </span>
                <div
                  className="w-2 h-2 bg-brass rounded-full flex-shrink-0"
                  aria-hidden="true"
                />
              </div>

              <h3 className="font-display text-xl font-medium text-parchment-100 mb-2 leading-tight">
                {step.title}
              </h3>
              <p className="font-sans text-sm text-parchment-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
