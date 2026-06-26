'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    renovationImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    renovationAlt: 'Cozinha renovada com acabamentos premium',
    initials: 'MC',
    name: 'Maria Cardoso',
    location: 'Setúbal',
    service: 'Remodelação Completa',
    text: 'Transformaram completamente o meu apartamento. Equipa pontual, limpa e muito profissional. O resultado superou todas as expectativas. Recomendo sem hesitar.',
  },
  {
    id: 2,
    renovationImage:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    renovationAlt: 'Sala remodelada com chão flutuante e paredes pintadas',
    initials: 'JP',
    name: 'João Pereira',
    location: 'Palmela',
    service: 'Pintura Interior + Pladur',
    text: 'Trabalho impecável. Fizeram a pintura e os tetos falsos em toda a moradia. Cumpriram o prazo, o orçamento e deixaram tudo limpo. Voltarei a contratar com certeza.',
  },
  {
    id: 3,
    renovationImage:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    renovationAlt: 'Quarto renovado com chão flutuante e acabamentos',
    initials: 'AS',
    name: 'Ana Santos',
    location: 'Comporta',
    service: 'Remodelação + Chão Flutuante',
    text: 'Remodelei a minha casa de férias em Comporta com a Recrialar. Profissionalismo de alto nível, materiais de qualidade e um acabamento que impressiona qualquer visita.',
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 estrelas">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className="fill-brass text-brass"
          strokeWidth={0}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full bg-ink-soft flex items-center justify-center flex-shrink-0"
      aria-hidden="true"
    >
      <span className="font-display text-sm font-medium text-parchment-300 leading-none">
        {initials}
      </span>
    </div>
  );
}

export default function Reviews() {
  return (
    <section
      className="py-10 lg:py-14 bg-parchment-200"
      aria-labelledby="reviews-heading"
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
            Clientes satisfeitos
          </motion.p>
          <motion.h2
            id="reviews-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display text-3xl lg:text-5xl font-light text-ink leading-[1.12] text-balance"
          >
            O que dizem os nossos{' '}
            <span className="italic">clientes</span>
          </motion.h2>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {reviews.map((review, i) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-parchment-300 overflow-hidden group hover:border-parchment-400 transition-colors duration-200"
            >
              {/* Renovation photo */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={review.renovationImage}
                  alt={review.renovationAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                {/* Service badge */}
                <div className="absolute top-3 left-3 bg-ink/75 backdrop-blur-sm px-2.5 py-1">
                  <span className="font-sans text-[10px] font-medium tracking-wide text-parchment-300 uppercase">
                    {review.service}
                  </span>
                </div>
              </div>

              {/* Review body */}
              <div className="p-5">
                {/* Stars */}
                <div className="mb-3">
                  <StarRating />
                </div>

                {/* Text */}
                <blockquote className="font-sans text-sm text-ink-muted leading-relaxed mb-4">
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-parchment-200">
                  <Avatar initials={review.initials} />
                  <div>
                    <p className="font-sans text-sm font-medium text-ink leading-tight">
                      {review.name}
                    </p>
                    <p className="font-sans text-xs text-ink-muted tracking-wide">
                      {review.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
