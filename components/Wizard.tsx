'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, MessageCircle, Phone, ExternalLink } from 'lucide-react';

interface WizardData {
  service: string;
  serviceOther: string;
  location: string;
  locationOther: string;
  propertyType: string;
  size: string;
  startDate: string;
  photos: string;
  description: string;
  source: string;
  contactPreference: string;
  name: string;
  phone: string;
}

const initialData: WizardData = {
  service: '',
  serviceOther: '',
  location: '',
  locationOther: '',
  propertyType: '',
  size: '',
  startDate: '',
  photos: '',
  description: '',
  source: '',
  contactPreference: '',
  name: '',
  phone: '',
};

type StepKey =
  | 'service'
  | 'location'
  | 'propertyType'
  | 'size'
  | 'startDate'
  | 'photos'
  | 'description'
  | 'source'
  | 'contactPreference'
  | 'name'
  | 'phone'
  | 'confirmation';

function generateWhatsAppURL(data: WizardData): string {
  const now = new Date().toLocaleString('pt-PT', {
    timeZone: 'Europe/Lisbon',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const message = `Olá Recrialar, quero pedir um orçamento.

Serviço:
${data.service}

Serviço descrito:
${data.service === 'Outro' ? data.serviceOther || '-' : '-'}

Localização:
${data.location}

Outra localização:
${data.location === 'Outro' ? data.locationOther || '-' : '-'}

Tipo de imóvel:
${data.propertyType}

Dimensão:
${data.size}

Prazo pretendido:
${data.startDate}

Fotografias:
${data.photos}

Descrição:
${data.description || 'Não especificado'}

Como encontrou:
${data.source}

Preferência de contacto:
${data.contactPreference}

Nome:
${data.name}

Telefone:
${data.phone}

Enviado em:
${now}`;

  return `https://wa.me/351966104885?text=${encodeURIComponent(message)}`;
}

interface OptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function Option({ label, selected, onClick }: OptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-5 py-4 border font-sans text-sm font-medium tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-1 ${selected
          ? 'border-ink bg-ink text-parchment-50'
          : 'border-parchment-300 bg-white text-ink hover:border-ink-muted hover:bg-parchment-50'
        }`}
      aria-pressed={selected}
    >
      <span className="flex items-center justify-between gap-3">
        {label}
        {selected && <Check size={14} strokeWidth={2} aria-hidden="true" />}
      </span>
    </button>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="mb-8" aria-label={`Passo ${current} de ${total}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-sans text-xs text-ink-muted tracking-wide">
          Passo {current} de {total}
        </span>
        <span className="font-sans text-xs text-brass font-medium">{pct}%</span>
      </div>
      <div className="h-0.5 bg-parchment-300 rounded-full overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <motion.div
          className="h-full bg-brass rounded-full"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 32 : -32,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -32 : 32,
    opacity: 0,
  }),
};

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 py-3 border-b border-parchment-200 last:border-none">
      <span className="font-sans text-xs text-ink-muted tracking-wide uppercase flex-shrink-0">
        {label}
      </span>
      <span className="font-sans text-sm text-ink font-medium text-right">{value}</span>
    </div>
  );
}

function WizardInner() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<WizardData>(initialData);
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<Partial<Record<keyof WizardData, string>>>({});
  const [skipSource, setSkipSource] = useState(false);

  useEffect(() => {
    const gclid = searchParams.get('gclid');
    const utmSource = searchParams.get('utm_source');
    if (gclid || utmSource === 'google') {
      setSkipSource(true);
      setData((prev) => ({ ...prev, source: 'Google Ads' }));
    }
  }, [searchParams]);

  useEffect(() => {
    function handleSelectService(e: Event) {
      const service = (e as CustomEvent<string>).detail;
      setData({ ...initialData, service });
      setStepIndex(1);
      setDirection(1);
      setErrors({});
    }
    window.addEventListener('wizard:selectService', handleSelectService);
    return () => window.removeEventListener('wizard:selectService', handleSelectService);
  }, []);

  const allSteps: StepKey[] = [
    'service',
    'location',
    'propertyType',
    'size',
    'startDate',
    'photos',
    'description',
    'source',
    'contactPreference',
    'name',
    'phone',
    'confirmation',
  ];

  const visibleSteps: StepKey[] = allSteps.filter(
    (s) => !(s === 'source' && skipSource)
  );

  const currentStep = visibleSteps[stepIndex];
  const totalSteps = visibleSteps.length;

  function update(field: keyof WizardData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof WizardData, string>> = {};

    if (currentStep === 'service') {
      if (!data.service) newErrors.service = 'Selecione um serviço.';
      if (data.service === 'Outro' && !data.serviceOther.trim())
        newErrors.serviceOther = 'Por favor descreva o serviço.';
    }
    if (currentStep === 'location') {
      if (!data.location) newErrors.location = 'Selecione uma localização.';
      if (data.location === 'Outro' && !data.locationOther.trim())
        newErrors.locationOther = 'Por favor indique a localização.';
    }
    if (currentStep === 'propertyType' && !data.propertyType)
      newErrors.propertyType = 'Selecione o tipo de imóvel.';
    if (currentStep === 'size' && !data.size)
      newErrors.size = 'Selecione a dimensão aproximada.';
    if (currentStep === 'startDate' && !data.startDate)
      newErrors.startDate = 'Selecione um prazo.';
    if (currentStep === 'photos' && !data.photos)
      newErrors.photos = 'Selecione uma opção.';
    if (currentStep === 'source' && !data.source)
      newErrors.source = 'Selecione uma opção.';
    if (currentStep === 'contactPreference' && !data.contactPreference)
      newErrors.contactPreference = 'Selecione a sua preferência.';
    if (currentStep === 'name' && !data.name.trim())
      newErrors.name = 'O seu nome é obrigatório.';
    if (currentStep === 'phone') {
      if (!data.phone.trim()) newErrors.phone = 'O seu telefone é obrigatório.';
      else if (!/^[+\d\s\-()]{7,}$/.test(data.phone))
        newErrors.phone = 'Introduza um número de telefone válido.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function goNext(autoSelect?: string, field?: keyof WizardData) {
    if (autoSelect !== undefined && field) {
      const updatedData = { ...data, [field]: autoSelect };
      setData(updatedData);
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      setDirection(1);
      setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
      return;
    }
    if (!validate()) return;
    setDirection(1);
    setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  }

  function goBack() {
    setDirection(-1);
    setStepIndex((prev) => Math.max(prev - 1, 0));
    setErrors({});
  }

  function selectOption(
    field: keyof WizardData,
    value: string,
    autoAdvance = true,
    needsExtra = false
  ) {
    update(field, value);
    if (autoAdvance && !needsExtra) {
      setTimeout(() => {
        goNext(value, field);
      }, 200);
    }
  }

  function renderStep() {
    switch (currentStep) {
      case 'service':
        return (
          <div>
            <StepHeader title="Que serviço procura?" subtitle="Selecione o serviço principal" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {[
                'Remodelação completa',
                'Pintura interior',
                'Pintura em altura / rapel',
                'Pladur / tetos falsos',
                'Chão flutuante',
                'Barramento',
                'Pequenas reparações domésticas',
                'Manutenção de imóveis',
                'Outro',
              ].map((opt) => (
                <Option
                  key={opt}
                  label={opt}
                  selected={data.service === opt}
                  onClick={() => selectOption('service', opt, true, opt === 'Outro')}
                />
              ))}
            </div>
            {data.service === 'Outro' && (
              <div className="mt-3">
                <label htmlFor="serviceOther" className="block font-sans text-xs font-medium text-ink-muted tracking-wide uppercase mb-2">
                  Descreva o serviço que procura *
                </label>
                <textarea
                  id="serviceOther"
                  value={data.serviceOther}
                  onChange={(e) => update('serviceOther', e.target.value)}
                  rows={3}
                  className="w-full border border-parchment-300 bg-white px-4 py-3 font-sans text-sm text-ink placeholder-ink-muted/50 focus:outline-none focus:border-ink transition-colors resize-none"
                  placeholder="Ex: Limpeza de fachada, colocação de azulejos..."
                />
                {errors.serviceOther && <p className="mt-1 text-xs font-sans text-red-600">{errors.serviceOther}</p>}
              </div>
            )}
            {errors.service && <p className="mt-2 text-xs font-sans text-red-600">{errors.service}</p>}
            <StepNav onNext={() => goNext()} onBack={stepIndex > 0 ? goBack : undefined} />
          </div>
        );

      case 'location':
        return (
          <div>
            <StepHeader title="Onde fica o imóvel?" subtitle="Selecione a localização" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {['Setúbal', 'Tróia', 'Comporta', 'Palmela', 'Azeitão', 'Sesimbra', 'Outro'].map((opt) => (
                <Option
                  key={opt}
                  label={opt}
                  selected={data.location === opt}
                  onClick={() => selectOption('location', opt, true, opt === 'Outro')}
                />
              ))}
            </div>
            {data.location === 'Outro' && (
              <div className="mt-3">
                <label htmlFor="locationOther" className="block font-sans text-xs font-medium text-ink-muted tracking-wide uppercase mb-2">
                  Indique a localização *
                </label>
                <input
                  id="locationOther"
                  type="text"
                  value={data.locationOther}
                  onChange={(e) => update('locationOther', e.target.value)}
                  className="w-full border border-parchment-300 bg-white px-4 py-3 font-sans text-sm text-ink placeholder-ink-muted/50 focus:outline-none focus:border-ink transition-colors"
                  placeholder="Ex: Alcácer do Sal"
                />
                {errors.locationOther && <p className="mt-1 text-xs font-sans text-red-600">{errors.locationOther}</p>}
              </div>
            )}
            {errors.location && <p className="mt-2 text-xs font-sans text-red-600">{errors.location}</p>}
            <StepNav onNext={() => goNext()} onBack={goBack} />
          </div>
        );

      case 'propertyType':
        return (
          <div>
            <StepHeader title="Tipo de imóvel" subtitle="Selecione o tipo" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['Apartamento', 'Moradia', 'Condomínio', 'Loja / Espaço comercial', 'Escritório', 'Outro'].map((opt) => (
                <Option key={opt} label={opt} selected={data.propertyType === opt} onClick={() => selectOption('propertyType', opt)} />
              ))}
            </div>
            {errors.propertyType && <p className="mt-3 text-xs font-sans text-red-600">{errors.propertyType}</p>}
            <StepNav onNext={() => goNext()} onBack={goBack} />
          </div>
        );

      case 'size':
        return (
          <div>
            <StepHeader title="Dimensão aproximada" subtitle="Selecione a área de intervenção" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {['Pequena intervenção', 'Até 30 m²', '30–60 m²', '60–100 m²', 'Mais de 100 m²', 'Não sei'].map((opt) => (
                <Option key={opt} label={opt} selected={data.size === opt} onClick={() => selectOption('size', opt)} />
              ))}
            </div>
            {errors.size && <p className="mt-3 text-xs font-sans text-red-600">{errors.size}</p>}
            <StepNav onNext={() => goNext()} onBack={goBack} />
          </div>
        );

      case 'startDate':
        return (
          <div>
            <StepHeader title="Quando pretende iniciar?" subtitle="Selecione o prazo desejado" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {['Urgente', 'Esta semana', 'Este mês', '1–3 meses', 'Só quero orçamento'].map((opt) => (
                <Option key={opt} label={opt} selected={data.startDate === opt} onClick={() => selectOption('startDate', opt)} />
              ))}
            </div>
            {errors.startDate && <p className="mt-3 text-xs font-sans text-red-600">{errors.startDate}</p>}
            <StepNav onNext={() => goNext()} onBack={goBack} />
          </div>
        );

      case 'photos':
        return (
          <div>
            <StepHeader title="Tem fotografias do espaço?" subtitle="Fotos ajudam-nos a preparar um orçamento mais preciso" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {['Sim, posso enviar pelo WhatsApp', 'Ainda não tenho'].map((opt) => (
                <Option key={opt} label={opt} selected={data.photos === opt} onClick={() => selectOption('photos', opt)} />
              ))}
            </div>
            {errors.photos && <p className="mt-3 text-xs font-sans text-red-600">{errors.photos}</p>}
            <StepNav onNext={() => goNext()} onBack={goBack} />
          </div>
        );

      case 'description':
        return (
          <div>
            <StepHeader title="Descrição do trabalho" subtitle="Opcional — quanto mais detalhe, melhor o orçamento" />
            <label htmlFor="description" className="block font-sans text-xs font-medium text-ink-muted tracking-wide uppercase mb-2">
              Descreva o trabalho (opcional)
            </label>
            <textarea
              id="description"
              value={data.description}
              onChange={(e) => update('description', e.target.value)}
              rows={5}
              className="w-full border border-parchment-300 bg-white px-4 py-3 font-sans text-sm text-ink placeholder-ink-muted/50 focus:outline-none focus:border-ink transition-colors resize-none"
              placeholder="Ex: Preciso pintar o apartamento, trocar chão flutuante e fazer pequenas reparações."
            />
            <StepNav onNext={() => goNext()} onBack={goBack} nextLabel="Continuar" />
          </div>
        );

      case 'source':
        return (
          <div>
            <StepHeader title="Como nos encontrou?" subtitle="Ajuda-nos a perceber como chega até nós" />
            <div className="grid grid-cols-2 gap-2">
              {['Google', 'Recomendação', 'Facebook', 'Outro'].map((opt) => (
                <Option key={opt} label={opt} selected={data.source === opt} onClick={() => selectOption('source', opt)} />
              ))}
            </div>
            {errors.source && <p className="mt-3 text-xs font-sans text-red-600">{errors.source}</p>}
            <StepNav onNext={() => goNext()} onBack={goBack} />
          </div>
        );

      case 'contactPreference':
        return (
          <div>
            <StepHeader title="Como prefere ser contactado?" subtitle="Entramos em contacto assim que recebermos o pedido" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {['WhatsApp', 'Chamada'].map((opt) => (
                <Option key={opt} label={opt} selected={data.contactPreference === opt} onClick={() => selectOption('contactPreference', opt)} />
              ))}
            </div>
            {errors.contactPreference && <p className="mt-3 text-xs font-sans text-red-600">{errors.contactPreference}</p>}
            <StepNav onNext={() => goNext()} onBack={goBack} />
          </div>
        );

      case 'name':
        return (
          <div>
            <StepHeader title="O seu nome" subtitle="Para personalizarmos o contacto" />
            <label htmlFor="name" className="block font-sans text-xs font-medium text-ink-muted tracking-wide uppercase mb-2">
              Nome *
            </label>
            <input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => update('name', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && goNext()}
              autoComplete="given-name"
              className="w-full border border-parchment-300 bg-white px-4 py-3 font-sans text-sm text-ink placeholder-ink-muted/50 focus:outline-none focus:border-ink transition-colors"
              placeholder="O seu nome"
            />
            {errors.name && <p className="mt-1 text-xs font-sans text-red-600">{errors.name}</p>}
            <StepNav onNext={() => goNext()} onBack={goBack} />
          </div>
        );

      case 'phone':
        return (
          <div>
            <StepHeader title="O seu telefone" subtitle="Usamos apenas para responder ao seu pedido" />
            <label htmlFor="phone" className="block font-sans text-xs font-medium text-ink-muted tracking-wide uppercase mb-2">
              Telefone / WhatsApp *
            </label>
            <input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => update('phone', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && goNext()}
              autoComplete="tel"
              className="w-full border border-parchment-300 bg-white px-4 py-3 font-sans text-sm text-ink placeholder-ink-muted/50 focus:outline-none focus:border-ink transition-colors"
              placeholder="+351 9XX XXX XXX"
            />
            <p className="mt-2 font-sans text-xs text-ink-muted">
              Usamos este contacto apenas para responder ao seu pedido de orçamento.
            </p>
            {errors.phone && <p className="mt-1 text-xs font-sans text-red-600">{errors.phone}</p>}
            <StepNav onNext={() => goNext()} onBack={goBack} nextLabel="Ver resumo" />
          </div>
        );

      case 'confirmation':
        return (
          <div>
            <StepHeader title="Confirme o seu pedido" subtitle="Reveja os dados antes de enviar" />
            <div className="bg-parchment-50 border border-parchment-200 p-5 mb-6">
              <SummaryRow label="Serviço" value={data.service === 'Outro' ? `Outro — ${data.serviceOther}` : data.service} />
              <SummaryRow label="Localização" value={data.location === 'Outro' ? data.locationOther : data.location} />
              <SummaryRow label="Tipo de imóvel" value={data.propertyType} />
              <SummaryRow label="Dimensão" value={data.size} />
              <SummaryRow label="Prazo" value={data.startDate} />
              <SummaryRow label="Fotografias" value={data.photos} />
              {data.description && <SummaryRow label="Descrição" value={data.description} />}
              <SummaryRow label="Como encontrou" value={data.source} />
              <SummaryRow label="Contacto preferido" value={data.contactPreference} />
              <SummaryRow label="Nome" value={data.name} />
              <SummaryRow label="Telefone" value={data.phone} />
            </div>

            <a
              href={generateWhatsAppURL(data)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 font-sans text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 mb-3"
              aria-label="Enviar pedido de orçamento pelo WhatsApp"
            >
              <MessageCircle size={18} strokeWidth={1.5} />
              Enviar Pedido pelo WhatsApp
              <ExternalLink size={14} strokeWidth={1.5} className="opacity-60" />
            </a>

            {data.contactPreference === 'Chamada' && (
              <a
                href="tel:+351966104885"
                className="flex items-center justify-center gap-2 w-full border border-ink text-ink py-4 font-sans text-sm font-medium tracking-wide hover:bg-parchment-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 mb-3"
              >
                <Phone size={16} strokeWidth={1.5} />
                Ligar Agora
              </a>
            )}

            <p className="font-sans text-xs text-ink-muted text-center leading-relaxed">
              Ao enviar, será redirecionado para o WhatsApp com a mensagem pré-preenchida.
            </p>

            <div className="mt-6 pt-4 border-t border-parchment-200">
              <button
                type="button"
                onClick={goBack}
                className="flex items-center gap-1.5 font-sans text-sm text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
              >
                <ChevronLeft size={14} strokeWidth={1.5} />
                Voltar e editar
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="py-10 lg:py-14 bg-ink relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/3 w-px h-full bg-ink-subtle/40" />
        <div className="absolute top-0 left-2/3 w-px h-full bg-ink-subtle/40" />
      </div>

      <div className="container-wide section-padding relative z-10">
        <div className="text-center mb-10 lg:mb-12 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="font-sans text-xs font-medium tracking-[0.18em] text-brass uppercase mb-3"
          >
            Orçamento gratuito · Sem compromisso
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display text-3xl lg:text-5xl font-light text-parchment-100 leading-[1.12] text-balance"
          >
            Peça o seu{' '}
            <span className="italic text-parchment-200">orçamento personalizado</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="max-w-2xl mx-auto bg-parchment-50 p-6 sm:p-8 lg:p-10 border-l-[3px] border-brass"
        >
          <ProgressBar current={stepIndex + 1} total={totalSteps} />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-sans text-sm text-parchment-400 leading-relaxed text-center mt-6 max-w-md mx-auto"
        >
          Responda a algumas perguntas rápidas e envie o seu pedido pelo WhatsApp. Respondemos em menos de 24 horas.
        </motion.p>
      </div>
    </div>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h3 className="font-display text-2xl lg:text-3xl font-light text-ink mb-1 leading-tight">
        {title}
      </h3>
      {subtitle && (
        <p className="font-sans text-sm text-ink-muted">{subtitle}</p>
      )}
    </div>
  );
}

function StepNav({
  onNext,
  onBack,
  nextLabel = 'Continuar',
}: {
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-parchment-200">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 font-sans text-sm text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-sm"
        >
          <ChevronLeft size={14} strokeWidth={1.5} />
          Voltar
        </button>
      ) : (
        <div />
      )}
      <button
        type="button"
        onClick={onNext}
        className="bg-ink text-parchment-50 px-6 py-3 font-sans text-sm font-medium tracking-wide hover:bg-ink-soft transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
      >
        {nextLabel}
      </button>
    </div>
  );
}

export default function Wizard() {
  return <WizardInner />;
}
