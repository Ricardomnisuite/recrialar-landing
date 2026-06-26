'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-24 right-4 sm:bottom-8 sm:right-6 z-40 flex flex-col items-end gap-2">
          {/* Tooltip */}
          <AnimatePresence>
            {tooltipOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="bg-ink text-parchment-50 px-4 py-2.5 font-sans text-sm font-medium shadow-lg max-w-[220px] text-right relative"
              >
                <p>Fale connosco pelo WhatsApp</p>
                <p className="text-xs text-parchment-400 mt-0.5">Resposta rápida</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex items-center gap-2"
          >
            {/* Dismiss tooltip */}
            {tooltipOpen && (
              <button
                onClick={() => setTooltipOpen(false)}
                className="w-8 h-8 bg-parchment-200 border border-parchment-300 flex items-center justify-center text-ink-muted hover:text-ink transition-colors focus-visible:outline-none rounded-sm"
                aria-label="Fechar"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            )}

            <a
              href="https://wa.me/351966104885"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center shadow-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 rounded-full"
              aria-label="Contactar Recrialar pelo WhatsApp"
              onMouseEnter={() => setTooltipOpen(true)}
              onFocus={() => setTooltipOpen(true)}
            >
              <MessageCircle size={24} strokeWidth={1.5} className="text-white" />
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
