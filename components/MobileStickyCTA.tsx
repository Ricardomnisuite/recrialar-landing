'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function scrollToWizard() {
  document.getElementById('wizard')?.scrollIntoView({ behavior: 'smooth' });
}

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      // Show after hero is scrolled past
      setVisible(window.scrollY > 600);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white border-t border-parchment-300 shadow-lg"
        >
          <div className="grid grid-cols-2 divide-x divide-parchment-300">
            <button
              onClick={scrollToWizard}
              className="flex items-center justify-center gap-2 py-4 font-sans text-sm font-medium text-white bg-brass hover:bg-brass-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle size={16} strokeWidth={1.5} />
              Orçamento Grátis
            </button>
            <a
              href="tel:+351966104885"
              className="flex items-center justify-center gap-2 py-4 font-sans text-sm font-medium text-ink hover:bg-parchment-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-ink"
              aria-label="Ligar para a Recrialar"
            >
              <Phone size={16} strokeWidth={1.5} />
              Ligar Agora
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
