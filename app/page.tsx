import { Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Wizard from '@/components/Wizard';
import Services from '@/components/Services';
import Areas from '@/components/Areas';
import Process from '@/components/Process';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import MapSection from '@/components/MapSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import MobileStickyCTA from '@/components/MobileStickyCTA';

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />

        {/* Wizard is prominent and early — primary conversion point */}
        <section id="wizard" aria-label="Pedido de orçamento">
          <Suspense fallback={<div className="min-h-96 bg-ink" />}>
            <Wizard />
          </Suspense>
        </section>

        <Services />
        <Areas />
        <Process />
        <Reviews />
        <FAQ />
        <FinalCTA />
        <MapSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyCTA />
    </>
  );
}
