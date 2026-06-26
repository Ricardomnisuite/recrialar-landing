import { Phone, MessageCircle } from 'lucide-react';

const links = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#areas', label: 'Áreas' },
  { href: '#processo', label: 'Como Trabalhamos' },
  { href: '#faq', label: 'FAQ' },
  { href: '#wizard', label: 'Pedir Orçamento' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-parchment-300 py-12 lg:py-14 border-t border-ink-subtle/50">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14 mb-10">
          <div>
            <p className="font-display text-2xl font-light text-parchment-100 tracking-[0.12em] uppercase mb-2">
              Recrialar
            </p>
            <p className="font-sans text-xs text-parchment-400 tracking-wide uppercase mb-5">
              Obras & Remodelações Profissionais
            </p>
            <p className="font-sans text-sm text-parchment-400 leading-relaxed max-w-xs">
              Especialistas em remodelações, pintura e acabamentos no Distrito de Setúbal.
              Qualidade e rigor profissional em cada projeto.
            </p>
          </div>

          <div>
            <p className="font-sans text-xs font-medium tracking-[0.15em] text-parchment-400 uppercase mb-5">
              Navegação
            </p>
            <nav aria-label="Rodapé">
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-sans text-sm text-parchment-300 hover:text-parchment-100 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <p className="font-sans text-xs font-medium tracking-[0.15em] text-parchment-400 uppercase mb-5">
              Contacto
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/351966104885"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-sm text-parchment-300 hover:text-parchment-100 transition-colors duration-200"
                aria-label="Contactar a Recrialar pelo WhatsApp"
              >
                <Phone size={14} strokeWidth={1.5} />
                +351 966 104 885
              </a>
              <a
                href="https://wa.me/351966104885"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-sm text-parchment-300 hover:text-parchment-100 transition-colors duration-200"
                aria-label="Contactar Recrialar pelo WhatsApp"
              >
                <MessageCircle size={14} strokeWidth={1.5} />
                WhatsApp
              </a>
              <div className="mt-2">
                <p className="font-sans text-xs text-parchment-400 leading-relaxed">
                  Setúbal · Tróia · Comporta
                  <br />
                  Palmela · Azeitão · Sesimbra
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-ink-muted/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-sans text-xs text-parchment-400">
            &copy; {new Date().getFullYear()} Recrialar — Obras e Remodelações Profissionais.
            Todos os direitos reservados.
          </p>
          <p className="font-sans text-xs text-parchment-400/60">
            Distrito de Setúbal, Portugal
          </p>
        </div>
      </div>
    </footer>
  );
}
