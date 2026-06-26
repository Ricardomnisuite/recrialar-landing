'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#areas', label: 'Áreas' },
  { href: '#processo', label: 'Como Trabalhamos' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToWizard(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById('wizard')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-black/35 backdrop-blur-md border-b border-white/10 shadow-[0_1px_8px_rgba(0,0,0,0.10)]'
          : 'bg-transparent'
        }`}
    >
      <div className="container-wide section-padding pt-3 lg:pt-4">
        <div className="flex items-center justify-between h-24 lg:h-32">
          <a
            href="#"
            aria-label="Recrialar — Página inicial"
            className="flex-shrink-0 transition-transform duration-200 hover:scale-[1.03]"
          >
            <span className="relative block w-[260px] h-[73px] sm:w-[320px] sm:h-[90px] lg:w-[400px] lg:h-[112px]">
              <Image
                src="/recrialar-logo.png"
                alt="Recrialar"
                fill
                sizes="(max-width: 639px) 260px, (max-width: 1023px) 320px, 400px"
                className="object-contain object-left select-none"
                priority
              />
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium tracking-wide text-white hover:text-white/75 hover:scale-[1.04] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/351966104885"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-white hover:text-white/75 hover:scale-[1.04] transition-all duration-200"
              aria-label="Contactar a Recrialar pelo WhatsApp"
            >
              <Phone size={14} strokeWidth={1.5} />
              <span className="tracking-wide">966 104 885</span>
            </a>

            <button
              type="button"
              onClick={scrollToWizard}
              className="px-5 py-2.5 text-sm font-medium tracking-wide border border-white/50 text-white hover:bg-white/15 hover:scale-[1.04] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
            >
              Pedir Orçamento
            </button>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 rounded-sm text-white hover:text-white/80 transition-all duration-200 hover:scale-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="lg:hidden bg-parchment-50 border-t border-parchment-300 overflow-hidden"
          >
            <nav
              className="section-padding py-6 flex flex-col gap-4"
              aria-label="Menu de navegação móvel"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-base font-medium text-ink hover:text-brass transition-colors duration-200 py-1"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4 flex flex-col gap-3 border-t border-parchment-300">
                <a
                  href="https://wa.me/351966104885"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-ink-muted"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Contactar a Recrialar pelo WhatsApp"
                >
                  <Phone size={15} strokeWidth={1.5} />
                  <span>966 104 885</span>
                </a>

                <button
                  type="button"
                  onClick={scrollToWizard}
                  className="w-full bg-brass hover:bg-brass-dark text-white py-3.5 text-sm font-medium tracking-wide transition-colors duration-200"
                >
                  Pedir Orçamento Grátis
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
