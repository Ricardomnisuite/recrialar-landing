'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

export default function MapSection() {
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97631.33!2d-8.9942!3d38.5243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1939f3c3697c47%3A0x5c2c88d9f7cf73f8!2sSet%C3%BAbal!5e0!3m2!1spt!2spt!4v1700000000000!5m2!1spt!2spt';

  return (
    <section className="py-10 lg:py-14 bg-parchment-100" aria-labelledby="map-heading">
      <div className="container-wide section-padding">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">

          {/* Info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="font-sans text-xs font-medium tracking-[0.18em] text-brass uppercase mb-3"
            >
              Área de atuação
            </motion.p>
            <motion.h2
              id="map-heading"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-display text-2xl lg:text-3xl font-light text-ink leading-[1.2] mb-3 text-balance"
            >
              Setúbal e toda a <span className="italic">região</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="font-sans text-sm text-ink-muted leading-relaxed mb-5"
            >
              A equipa cobre todo o Distrito de Setúbal, incluindo zonas costeiras como Tróia e
              Comporta. Consulte-nos para confirmar disponibilidade.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <a
                href="https://maps.google.com/?q=Setúbal,Portugal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-brass hover:text-brass-dark transition-colors underline underline-offset-2"
              >
                <MapPin size={13} strokeWidth={1.5} />
                Ver no Google Maps
                <ExternalLink size={11} strokeWidth={1.5} />
              </a>
            </motion.div>
          </div>

          {/* Map façade / iframe */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {!mapLoaded ? (
              <div
                className="relative w-full h-64 lg:h-80 bg-parchment-200 flex flex-col items-center justify-center cursor-pointer group border border-parchment-300 hover:border-parchment-400 transition-colors"
                onClick={() => setMapLoaded(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setMapLoaded(true)}
                aria-label="Carregar mapa interativo de Setúbal"
              >
                {/* Grid lines */}
                <svg
                  className="absolute inset-0 w-full h-full text-parchment-300"
                  viewBox="0 0 600 320"
                  fill="none"
                  aria-hidden="true"
                >
                  {[64, 128, 192, 256].map((y) => (
                    <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="currentColor" strokeWidth="1" />
                  ))}
                  {[100, 200, 300, 400, 500].map((x) => (
                    <line key={x} x1={x} y1="0" x2={x} y2="320" stroke="currentColor" strokeWidth="1" />
                  ))}
                </svg>

                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-11 h-11 bg-white border border-parchment-300 flex items-center justify-center group-hover:border-brass/40 transition-colors shadow-sm">
                    <MapPin size={18} strokeWidth={1.5} className="text-ink" />
                  </div>
                  <div className="text-center">
                    <p className="font-display text-base font-medium text-ink">Setúbal, Portugal</p>
                    <p className="font-sans text-xs text-ink-muted mt-1">
                      Clique para ver o mapa interativo
                    </p>
                  </div>
                </div>

                <p className="absolute bottom-3 left-0 right-0 text-center font-sans text-[10px] text-ink-muted/60 px-4">
                  Mapa carregado pelo Google Maps após clicar.
                </p>
              </div>
            ) : (
              <iframe
                src={mapSrc}
                width="100%"
                className="w-full h-64 lg:h-80 border border-parchment-300"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Setúbal e área de atuação da Recrialar"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
