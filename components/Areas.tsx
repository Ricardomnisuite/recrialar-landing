'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const areas = [
  'Setúbal',
  'Tróia',
  'Comporta',
  'Palmela',
  'Azeitão',
  'Sesimbra',
  'Distrito de Setúbal',
];

const AREAS_IMAGE =
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=80';

export default function Areas() {
  return (
    <section
      id="areas"
      className="py-10 lg:py-14 bg-parchment-50"
      aria-labelledby="areas-heading"
    >
      <div className="container-wide section-padding">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="font-sans text-xs font-medium tracking-[0.18em] text-brass uppercase mb-3"
            >
              Onde trabalhamos
            </motion.p>
            <motion.h2
              id="areas-heading"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-display text-3xl lg:text-5xl font-light text-ink leading-[1.12] mb-4 text-balance"
            >
              Obras em{' '}
              <span className="italic">Setúbal e toda a região</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="font-sans text-sm text-ink-muted leading-relaxed mb-6 max-w-lg"
            >
              Prestamos serviços de obras, remodelações, pintura e manutenção em Setúbal,
              Tróia, Comporta, Palmela, Azeitão, Sesimbra e arredores.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="Áreas de atuação"
            >
              {areas.map((area) => (
                <span
                  key={area}
                  role="listitem"
                  className="inline-flex items-center gap-1.5 bg-white border border-parchment-300 text-ink-subtle font-sans text-sm px-3.5 py-1.5 tracking-wide hover:border-brass/50 transition-colors duration-200"
                >
                  <MapPin
                    size={11}
                    strokeWidth={1.5}
                    className="text-brass"
                    aria-hidden="true"
                  />
                  {area}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Real image */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
            aria-hidden="true"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={AREAS_IMAGE}
                alt="Interior moderno remodelado com acabamentos premium pela Recrialar"
                fill
                className="object-cover object-[center_40%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-ink/10" />
            </div>

            {/* Floating label */}
            <div className="absolute bottom-4 right-4 bg-ink/80 backdrop-blur-sm px-4 py-2.5">
              <p className="font-display text-base font-light text-parchment-100 leading-tight">
                Distrito de Setúbal
              </p>
              <p className="font-sans text-[10px] tracking-widest text-parchment-400 uppercase mt-0.5">
                Portugal
              </p>
            </div>

            {/* Brass corner accent */}
            <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-2 border-l-2 border-brass/60" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
