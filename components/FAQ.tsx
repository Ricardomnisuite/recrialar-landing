'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Como funciona o pedido de orçamento?',
    answer:
      'Preenche o formulário de orçamento nesta página com os detalhes do seu projeto. Analisamos o pedido e entramos em contacto através do WhatsApp ou por telefone para agendar uma visita gratuita ao local.',
  },
  {
    question: 'A visita ao local tem algum custo?',
    answer:
      'Não. A visita ao local e a elaboração do orçamento são completamente gratuitas e sem qualquer compromisso da sua parte.',
  },
  {
    question: 'Qual é o prazo para receber o orçamento?',
    answer:
      'Após a visita ao local, entregamos o orçamento detalhado por escrito em até 48 horas. Em situações de urgência, tentamos ser ainda mais rápidos.',
  },
  {
    question: 'Trabalham em zonas fora de Setúbal?',
    answer:
      'Trabalhamos em todo o Distrito de Setúbal, incluindo Tróia, Comporta, Palmela, Azeitão e Sesimbra. Para projetos noutras zonas, consulte-nos — dependendo da dimensão do trabalho podemos deslocar-nos.',
  },
  {
    question: 'Que tipos de obras realizam?',
    answer:
      'Realizamos remodelações completas, pintura interior e exterior, pintura em altura e rapel, instalação de pladur e tetos falsos, colocação de chão flutuante, barramento, pequenas reparações domésticas e manutenção de imóveis.',
  },
  {
    question: 'É possível enviar fotografias antes da visita?',
    answer:
      'Sim. Pode enviar fotografias do espaço pelo WhatsApp para termos uma primeira noção do trabalho antes da visita. Isso ajuda-nos a ser mais precisos no primeiro contacto.',
  },
  {
    question: 'Os materiais estão incluídos no orçamento?',
    answer:
      'O orçamento pode incluir ou excluir materiais consoante a sua preferência. Apresentamos sempre as duas opções para que possa escolher o que melhor se adapta à sua situação.',
  },
  {
    question: 'Como é feito o pagamento?',
    answer:
      'As condições de pagamento são definidas caso a caso no orçamento. Geralmente trabalhamos com um sinal no início da obra e o restante na entrega. Aceitamos transferência bancária e MB Way.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-parchment-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
        aria-expanded={open}
      >
        <span className="font-sans text-base font-medium text-ink leading-snug">{question}</span>
        <span className="flex-shrink-0 mt-0.5 text-brass" aria-hidden="true">
          {open ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="font-sans text-sm text-ink-muted leading-relaxed pb-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-10 lg:py-14 bg-white"
      aria-labelledby="faq-heading"
    >
      <div className="container-wide section-padding">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
          {/* Sidebar */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-sans text-xs font-medium tracking-[0.18em] text-brass uppercase mb-4"
            >
              Dúvidas frequentes
            </motion.p>
            <motion.h2
              id="faq-heading"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl lg:text-4xl font-light text-ink leading-[1.2] text-balance mb-4"
            >
              Perguntas{' '}
              <span className="italic">frequentes</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans text-sm text-ink-muted leading-relaxed"
            >
              Não encontra resposta à sua dúvida?{' '}
              <a
                href="https://wa.me/351966104885"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-2 hover:text-ink-soft transition-colors"
              >
                Fale connosco pelo WhatsApp
              </a>
              .
            </motion.p>
          </div>

          {/* FAQ list */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="border-t border-parchment-300">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
