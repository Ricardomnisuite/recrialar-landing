'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Clock, MapPin, MessageCircle } from 'lucide-react';

const items = [
  {
    icon: ShieldCheck,
    label: 'Equipa especializada',
    description: 'Profissionais com experiência comprovada',
  },
  {
    icon: Clock,
    label: 'Resposta em 24h',
    description: 'Orçamento enviado rapidamente',
  },
  {
    icon: MapPin,
    label: 'Setúbal e arredores',
    description: 'Cobertura em todo o Distrito',
  },
  {
    icon: MessageCircle,
    label: 'Contacto direto',
    description: 'Direto com a equipa via WhatsApp',
  },
];

export default function TrustBar() {
  return (
    <section className="bg-ink-soft py-7 lg:py-9" aria-label="Razões para nos escolher">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-start gap-3"
            >
              <item.icon
                size={18}
                strokeWidth={1.5}
                className="text-brass mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="font-sans text-sm font-medium text-parchment-100 leading-tight mb-0.5">
                  {item.label}
                </p>
                <p className="font-sans text-xs text-parchment-400 leading-relaxed hidden lg:block">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
