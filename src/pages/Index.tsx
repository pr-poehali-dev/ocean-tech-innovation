import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/bdfad9d8-9f83-48f9-9f69-fab002e51705/files/6faa78c3-794f-40f5-b22e-b235728c76b5.jpg';

const NAV_ITEMS = [
  { id: 'hero', label: 'ГЛАВНАЯ' },
  { id: 'directions', label: 'НАПРАВЛЕНИЯ' },
  { id: 'services', label: 'УСЛУГИ' },
  { id: 'partners', label: 'ПАРТНЁРСТВО' },
  { id: 'contacts', label: 'КОНТАКТЫ' },
];

const DIRECTIONS = [
  {
    icon: 'Waves',
    tag: 'НАПРАВЛЕНИЕ 1',
    title: 'Экологический мониторинг',
    desc: 'Разработка и внедрение систем комплексного мониторинга состояния морской среды Дальнего Востока.',
    items: [
      'Мониторинг качества морских вод',
      'Оценка состояния донных экосистем',
      'Оценка влияния хозяйственной деятельности на состояние морей',
      'Прогнозирование изменений морских условий',
    ],
    footer: 'Наши технологии позволяют выявлять экологические проблемы на ранних этапах и принимать обоснованные решения для защиты морской среды.',
  },
  {
    icon: 'Fish',
    tag: 'НАПРАВЛЕНИЕ 2',
    title: 'Исследование и сохранение биоразнообразия',
    desc: 'Фундаментальные и прикладные исследования морских экосистем, направленные на понимание и сохранение биоразнообразия.',
    items: [
      'Изучение видового состава морских организмов',
      'Анализ влияния загрязнений на морскую биоту',
      'Оценка здоровья популяций морских организмов',
      'Развитие методов биоиндикации состояния морской среды',
      'Разработка стратегий сохранения уникальных экосистем',
    ],
    footer: 'Мы помогаем понять, как морская жизнь реагирует на окружающие условия и как мы можем защитить хрупкие экосистемы от современных угроз.',
  },
  {
    icon: 'Cpu',
    tag: 'НАПРАВЛЕНИЕ 3',
    title: 'Искусственный интеллект и анализ данных',
    desc: 'Применение современных методов искусственного интеллекта и машинного обучения для анализа огромных объёмов океанографических данных.',
    items: [
      'Интеллектуальные системы анализа спутниковых данных',
      'Модели прогнозирования изменений морской среды',
      'Алгоритмы автоматического обнаружения аномалий',
      'Инструменты для визуализации сложных данных',
    ],
    footer: 'Данные технологии позволяют выявлять закономерности в больших объёмах информации и делать точные прогнозы о состоянии морской среды.',
  },
  {
    icon: 'Settings',
    tag: 'НАПРАВЛЕНИЕ 4',
    title: 'Разработка специализированного оборудования',
    desc: 'Проектирование и создание инновационных приборов и устройств для морских исследований.',
    items: [
      'Подводные автономные и управляемые аппараты (ROV/AUV)',
      'Высокоточные датчики и сенсоры',
      'Системы сбора и передачи данных в реальном времени',
      'Устройства для отбора проб и научных наблюдений',
    ],
    footer: 'Каждое устройство разрабатывается с учётом суровых условий глубокого и холодного морского окружения.',
  },
  {
    icon: 'Anchor',
    tag: 'НАПРАВЛЕНИЕ 5',
    title: 'Управление и устойчивое развитие морских ресурсов',
    desc: 'Разработка научных основ для ответственного и устойчивого использования морских ресурсов.',
    items: [],
    footer: '',
  },
];

const SERVICES = [
  {
    num: '01',
    title: 'Инженерные изыскания',
    subsections: [
      {
        label: 'ГИДРОМЕТЕОРОЛОГИЧЕСКИЕ ИЗЫСКАНИЯ',
        items: [
          'Наблюдения за параметрами гидрологического режима',
          'Исследование ледового покрова',
          'Метеорологические исследования',
          'Батиметрическая съёмка',
          'Исследование литодинамических процессов',
          'Математическое моделирование гидрометеорологических процессов',
          'Характеристика гидрометеорологического режима акваторий',
        ],
      },
      {
        label: 'ЭКОЛОГИЧЕСКИЕ ИЗЫСКАНИЯ',
        items: [
          'Комплексный мониторинг морской среды',
          'Гидрохимические исследования воды',
          'Геохимические исследования осадков и донных отложений',
          'Радиационные исследования',
          'Исследование биоразнообразия и состояния экосистем',
          'Оценка загрязнения морской среды, донных отложений и морских организмов',
        ],
      },
    ],
  },
  {
    num: '02',
    title: 'Экологический мониторинг',
    subsections: [
      {
        label: '',
        items: [
          'Физико-химические исследования воды',
          'Изучение донных отложений и гидрогеологии',
          'Оценка экологического и биологического состояния экосистемы',
          'Выявление источников загрязнения',
          'Анализ влияния хозяйственной деятельности',
          'Определение видового состава фито-, зоо-, ихтио- и бактерио-планктона',
          'Исследование бентосных организмов',
          'Изучение влияния загрязнений на организмы',
          'Анализ генетического разнообразия',
        ],
      },
    ],
  },
  {
    num: '03',
    title: 'Разработка и испытание оборудования для морских исследований',
    subsections: [
      {
        label: '',
        items: [
          'Консультирование в выборе оборудования',
          'Проектирование специальных приборов',
          'Изготовление прототипов',
          'Полевые испытания в реальных условиях',
          'Оптимизация и финальная доработка',
        ],
      },
    ],
  },
  {
    num: '04',
    title: 'Математическое моделирование гидрометеорологической ситуации и прогнозы',
    subsections: [
      {
        label: '',
        items: [
          'Сбор и организация данных',
          'Статистический и пространственный анализ',
          'Построение численных моделей',
          'Прогнозирование будущих изменений',
          'Визуализация результатов',
        ],
      },
    ],
  },
  {
    num: '05',
    title: 'Консультации и обучение',
    subsections: [],
  },
];

const PARTNERS = [
  { name: 'ЦМИ МГУ', full: 'Общество с ограниченной ответственностью «Центр морских исследований МГУ имени М.В. Ломоносова»' },
  { name: 'АО «МАГЭ»', full: 'Акционерное общество «Морская арктическая геологоразведочная экспедиция»' },
  { name: 'Экоаналитика', full: 'Общество с ограниченной ответственностью «Экоаналитика»' },
  { name: 'Русский Краб', full: 'Акционерное общество «Русский Краб»' },
  { name: 'Фертоинг', full: 'Общество с ограниченной ответственностью «Фертоинг»' },
];

function useScrollSpy() {
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const handler = () => {
      let cur = 'hero';
      for (const n of NAV_ITEMS) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= 120) cur = n.id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return active;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function SectionLabel({ label, num }: { label: string; num: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-display text-5xl font-300 text-white/10 leading-none">{num}</span>
      <div className="flex items-center gap-2">
        <div className="w-6 h-px bg-cyan" />
        <span className="font-mono text-[10px] text-cyan tracking-widest">{label}</span>
      </div>
    </div>
  );
}

function NavBar() {
  const active = useScrollSpy();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'rgba(2,13,20,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,229,255,0.1)' : 'none',
      }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-3">
          <img
            src="https://cdn.poehali.dev/projects/bdfad9d8-9f83-48f9-9f69-fab002e51705/bucket/526f0cb5-347c-4150-9854-25f1d92c2852.png"
            alt="Логотип ИЦ ТОИ ДВО РАН"
            className="w-12 h-12 object-contain flex-shrink-0"
            style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 6px rgba(0,229,255,0.3))' }}
          />
          <div>
            <div className="font-display text-sm font-500 tracking-widest text-cyan leading-none">ИЦ ТОИ ДВО РАН</div>
            <div className="font-mono text-[8px] text-white/30 tracking-widest">ИНЖИНИРИНГОВЫЙ ЦЕНТР</div>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className={`nav-link font-display text-[11px] tracking-widest transition-colors duration-300 ${active === item.id ? 'text-cyan active' : 'text-white/50 hover:text-white/90'}`}>
              {item.label}
            </button>
          ))}
        </div>

        <button className="lg:hidden" style={{ color: 'var(--cyan)' }} onClick={() => setOpen(o => !o)}>
          <Icon name={open ? 'X' : 'Menu'} size={24} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden mt-3 mx-6 p-4 grid gap-3"
          style={{ background: 'rgba(2,13,20,0.98)', border: '1px solid rgba(0,229,255,0.15)', backdropFilter: 'blur(20px)' }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => { scrollTo(item.id); setOpen(false); }}
              className={`font-display text-sm tracking-widest text-left py-2 border-b border-white/5 ${active === item.id ? 'text-cyan' : 'text-white/50'}`}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Морские технологии" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(2,13,20,.95) 0%,rgba(2,13,20,.5) 55%,rgba(2,13,20,.9) 100%)' }} />
      </div>
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Светящиеся орбы */}
      <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full animate-float pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(0,229,255,.15) 0%,transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute bottom-1/4 left-1/5 w-72 h-72 rounded-full animate-float pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(240,185,64,.12) 0%,transparent 70%)', filter: 'blur(60px)', animationDelay: '2s' }} />

      {/* Морская SVG-анимация */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: '220px' }}>
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <defs>
            <linearGradient id="wave1g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,229,255,0.12)" />
              <stop offset="100%" stopColor="rgba(0,229,255,0)" />
            </linearGradient>
            <linearGradient id="wave2g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,180,255,0.08)" />
              <stop offset="100%" stopColor="rgba(0,180,255,0)" />
            </linearGradient>
            <linearGradient id="wave3g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(240,185,64,0.07)" />
              <stop offset="100%" stopColor="rgba(240,185,64,0)" />
            </linearGradient>
          </defs>
          {/* Волна 3 — задний план */}
          <path fill="url(#wave3g)" style={{ animation: 'waveMove3 11s ease-in-out infinite' }}>
            <animate attributeName="d" dur="11s" repeatCount="indefinite"
              values="M0,160 C240,100 480,190 720,140 C960,90 1200,170 1440,130 L1440,220 L0,220 Z;
                      M0,140 C200,180 480,110 720,160 C960,200 1200,120 1440,155 L1440,220 L0,220 Z;
                      M0,160 C240,100 480,190 720,140 C960,90 1200,170 1440,130 L1440,220 L0,220 Z"/>
          </path>
          {/* Волна 2 */}
          <path fill="url(#wave2g)">
            <animate attributeName="d" dur="8s" repeatCount="indefinite"
              values="M0,140 C360,80 720,180 1080,120 C1260,90 1380,150 1440,130 L1440,220 L0,220 Z;
                      M0,120 C300,170 660,100 1000,155 C1200,185 1360,120 1440,145 L1440,220 L0,220 Z;
                      M0,140 C360,80 720,180 1080,120 C1260,90 1380,150 1440,130 L1440,220 L0,220 Z"/>
          </path>
          {/* Волна 1 — передний план */}
          <path fill="url(#wave1g)">
            <animate attributeName="d" dur="6s" repeatCount="indefinite"
              values="M0,170 C180,130 360,195 540,160 C720,125 900,185 1080,150 C1260,115 1380,165 1440,145 L1440,220 L0,220 Z;
                      M0,150 C200,185 400,130 600,170 C800,205 1000,145 1200,175 C1320,190 1400,150 1440,160 L1440,220 L0,220 Z;
                      M0,170 C180,130 360,195 540,160 C720,125 900,185 1080,150 C1260,115 1380,165 1440,145 L1440,220 L0,220 Z"/>
          </path>
          {/* Светящаяся линия-прибой */}
          <path fill="none" stroke="rgba(0,229,255,0.25)" strokeWidth="1.5">
            <animate attributeName="d" dur="6s" repeatCount="indefinite"
              values="M0,170 C180,130 360,195 540,160 C720,125 900,185 1080,150 C1260,115 1380,165 1440,145;
                      M0,150 C200,185 400,130 600,170 C800,205 1000,145 1200,175 C1320,190 1400,150 1440,160;
                      M0,170 C180,130 360,195 540,160 C720,125 900,185 1080,150 C1260,115 1380,165 1440,145"/>
          </path>
        </svg>

        {/* Пузырьки */}
        {[
          { left: '10%', delay: '0s', dur: '7s', size: 3 },
          { left: '25%', delay: '1.5s', dur: '9s', size: 2 },
          { left: '42%', delay: '3s', dur: '6s', size: 4 },
          { left: '58%', delay: '0.8s', dur: '8s', size: 2 },
          { left: '73%', delay: '2.2s', dur: '7s', size: 3 },
          { left: '88%', delay: '4s', dur: '10s', size: 2 },
        ].map((b, i) => (
          <div key={i} className="absolute bottom-4 rounded-full"
            style={{
              left: b.left,
              width: b.size * 4,
              height: b.size * 4,
              background: 'rgba(0,229,255,0.4)',
              boxShadow: '0 0 6px rgba(0,229,255,0.6)',
              animation: `bubbleRise ${b.dur} ease-in ${b.delay} infinite`,
            }} />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">

        <h1 className="font-display font-700 leading-[0.95] mb-6 animate-fade-up delay-100" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <span className="block text-4xl md:text-6xl xl:text-7xl text-white">ИНЖИНИРИНГОВЫЙ</span>
          <span className="block text-4xl md:text-6xl xl:text-7xl text-cyan glow-cyan">ЦЕНТР</span>
          <span className="block text-4xl md:text-6xl xl:text-7xl text-white">ТОИ ДВО РАН</span>
        </h1>

        <p className="font-body text-base text-white/60 max-w-xl mb-2 leading-relaxed animate-fade-up delay-200" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          Инжиниринговый центр развития технологий исследования и освоения ресурсов Мирового океана
        </p>
        <p className="font-body text-base text-white/60 max-w-xl mb-12 leading-relaxed animate-fade-up delay-200" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          Научно-исследовательский центр, специализирующийся на инновационных технологиях для исследования, мониторинга и устойчивого освоения морских ресурсов Дальнего Востока России.
        </p>

        <div className="flex flex-wrap gap-4 mb-16 animate-fade-up delay-300" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <button onClick={() => scrollTo('directions')}
            className="clip-corner font-display text-sm tracking-widest px-8 py-4 font-600 transition-all hover:scale-105"
            style={{ background: 'var(--cyan)', color: 'var(--deep)', boxShadow: '0 0 30px rgba(0,229,255,.3)' }}>
            НАПРАВЛЕНИЯ ДЕЯТЕЛЬНОСТИ
          </button>
        </div>

        <div className="clip-corner p-8 max-w-3xl animate-fade-up delay-400" style={{ opacity: 0, animationFillMode: 'forwards', background: 'rgba(0,229,255,.04)', border: '1px solid rgba(0,229,255,.12)' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-px bg-gold" />
            <span className="font-mono text-[9px] text-gold tracking-widest">МИССИЯ</span>
          </div>
          <p className="font-body text-base text-white/75 leading-relaxed mb-3">
            Инжиниринговый центр создан в ТОИ ДВО РАН с целью обеспечить технологическую безопасность, экономическое развитие и экологическую устойчивость морской деятельности в дальневосточном регионе.
          </p>
          <p className="font-body text-base text-white/60 leading-relaxed">
            Мы объединяем передовые научные исследования с практическими инженерными решениями, создавая технологии, которые помогают обществу лучше понимать, защищать и ответственно использовать богатства Мирового океана.
          </p>
        </div>
      </div>


    </section>
  );
}

function DirectionsSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="directions" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel label="ОСНОВНЫЕ НАПРАВЛЕНИЯ ДЕЯТЕЛЬНОСТИ" num="02" />
        <h2 className="font-display text-4xl md:text-5xl font-700 text-white mb-3 mt-6">
          НАПРАВЛЕНИЯ <span className="text-cyan glow-cyan">ДЕЯТЕЛЬНОСТИ</span>
        </h2>
        <p className="font-body text-base text-white/65 max-w-2xl mb-14 leading-relaxed">
          Пять ключевых направлений работы центра — от экологического мониторинга до разработки специализированного оборудования.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {DIRECTIONS.map((d, i) => (
            <div key={i} className="clip-corner transition-all duration-300"
              style={{
                background: expanded === i ? 'rgba(0,229,255,.06)' : 'rgba(7,18,28,.85)',
                border: `1px solid ${expanded === i ? 'rgba(0,229,255,.3)' : 'rgba(0,229,255,.08)'}`,
              }}>
              <button className="w-full text-left p-6 flex items-start gap-4" onClick={() => setExpanded(expanded === i ? null : i)}>
                <div className="w-12 h-12 clip-corner-sm flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(0,229,255,.08)', border: '1px solid rgba(0,229,255,.18)' }}>
                  <Icon name={d.icon as 'Waves'} size={20} className="text-cyan" fallback="Anchor" />
                </div>
                <div className="flex-1">
                  <div className="font-mono text-[9px] text-gold/55 tracking-widest mb-1">{d.tag}</div>
                  <h3 className="font-display text-lg md:text-xl font-500 text-white transition-colors">{d.title}</h3>
                  <p className="font-body text-base text-white/65 mt-1 leading-relaxed">{d.desc}</p>
                </div>
                <Icon name={expanded === i ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-cyan/40 flex-shrink-0 mt-1" />
              </button>

              <div className={`overflow-hidden transition-all duration-400 ${expanded === i ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {d.items.length > 0 && (
                  <div className="px-6 pb-6" style={{ paddingLeft: '88px' }}>
                    <ul className="space-y-2">
                      {d.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-cyan rounded-full flex-shrink-0 mt-2" />
                          <span className="font-body text-base text-white/70 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    {d.footer && (
                      <p className="font-body text-base text-white/55 leading-relaxed mt-4 italic">{d.footer}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 relative"
      style={{ background: 'linear-gradient(180deg,var(--deep) 0%,#050e18 50%,var(--deep) 100%)' }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel label="УСЛУГИ" num="03" />
        <h2 className="font-display text-4xl md:text-5xl font-700 text-white mb-3 mt-6">
          НАШИ <span className="text-gold glow-gold">УСЛУГИ</span>
        </h2>
        <p className="font-body text-base text-white/65 max-w-2xl mb-14 leading-relaxed">
          Центр предоставляет широкий спектр научных, инженерных и консультационных услуг для государственных органов, промышленных предприятий и научных организаций.
        </p>

        <div className="border border-white/5">
          {SERVICES.map((s, i) => (
            <button key={i} onClick={() => setActive(active === i ? null : i)}
              className="w-full text-left p-6 border-b border-white/5 group transition-all duration-300"
              style={{
                background: active === i ? 'rgba(0,229,255,.04)' : undefined,
                borderColor: active === i ? 'rgba(0,229,255,.15)' : undefined,
              }}>
              <div className="flex items-start gap-4">
                <span className="font-mono text-3xl font-300 flex-shrink-0 leading-none"
                  style={{ color: active === i ? 'var(--cyan)' : 'rgba(255,255,255,.1)' }}>{s.num}</span>
                <div className="flex-1">
                  <h3 className="font-display text-base md:text-lg font-500 text-white group-hover:text-cyan transition-colors">{s.title}</h3>
                  <div className={`overflow-hidden transition-all duration-400 ${active === i ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="mt-4 space-y-5">
                      {s.subsections.map((sub, si) => (
                        <div key={si}>
                          {sub.label && (
                            <div className="font-mono text-[9px] text-cyan/45 tracking-widest mb-2">{sub.label}</div>
                          )}
                          <ul className="space-y-1.5">
                            {sub.items.map((item, ii) => (
                              <li key={ii} className="flex items-start gap-3">
                                <div className="w-1 h-1 bg-cyan/60 rounded-full flex-shrink-0 mt-2" />
                                <span className="font-body text-base text-white/70 leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {s.subsections.length === 0 && (
                        <p className="font-body text-base text-white/55 italic">Подробности уточняйте у специалистов центра.</p>
                      )}
                    </div>
                  </div>
                </div>
                <Icon name={active === i ? 'ChevronUp' : 'ChevronDown'} size={14} className="text-cyan/40 flex-shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section id="partners" className="py-24 relative"
      style={{ background: 'linear-gradient(180deg,var(--deep) 0%,#040c13 100%)' }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel label="ПАРТНЁРСТВО И СОТРУДНИЧЕСТВО" num="04" />
        <h2 className="font-display text-3xl md:text-5xl font-700 text-white mb-3 mt-6">
          РАБОТАЕМ ВМЕСТЕ ДЛЯ <span className="text-gold glow-gold">ОБЩЕГО БУДУЩЕГО</span>
        </h2>
        <p className="font-body text-base text-white/65 max-w-2xl mb-14 leading-relaxed">
          Центр активно сотрудничает с ведущими научными и промышленными организациями, создавая синергию между фундаментальной наукой и реальным сектором экономики.
        </p>

        <div className="font-mono text-[10px] text-cyan/50 tracking-widest mb-6">НАШИ ПАРТНЁРЫ</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PARTNERS.map((p, i) => (
            <div key={i} className="tech-card clip-corner p-6 group"
              style={{ background: 'rgba(7,18,28,.85)', border: '1px solid rgba(240,185,64,.08)' }}>
              <h3 className="font-display text-xl font-700 text-white group-hover:text-gold transition-colors mb-2">{p.name}</h3>
              <p className="font-body text-base text-white/55 leading-relaxed">{p.full}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactsSection() {
  return (
    <section id="contacts" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel label="КОНТАКТЫ" num="05" />
        <h2 className="font-display text-4xl md:text-5xl font-700 text-white mb-3 mt-6">
          СВЯЖИТЕСЬ <span className="text-cyan glow-cyan">С НАМИ</span>
        </h2>
        <p className="font-body text-base text-white/60 max-w-2xl mb-14 leading-relaxed">
          Наша команда готова ответить на вопросы о технологиях, условиях сотрудничества и текущих проектах.
        </p>

        <div className="clip-corner p-10 max-w-2xl" style={{ background: 'rgba(7,18,28,.85)', border: '1px solid rgba(0,229,255,.12)' }}>
          <div className="space-y-7">
            <div>
              <div className="font-mono text-[10px] text-cyan/45 tracking-widest mb-2">ОРГАНИЗАЦИЯ</div>
              <div className="font-body text-base text-white/80 leading-relaxed">
                Инжиниринговый центр развития технологий исследования и освоения ресурсов Мирового океана (Инжиниринговый центр ТОИ ДВО РАН)
              </div>
            </div>
            <div className="w-full h-px" style={{ background: 'rgba(0,229,255,.08)' }} />
            <div>
              <div className="font-mono text-[10px] text-cyan/45 tracking-widest mb-2">АДРЕС</div>
              <div className="font-body text-base text-white/80 leading-relaxed">
                Россия, Приморский Край<br />
                690041, г. Владивосток, ул. Балтийская, 43, ТОИ ДВО РАН
              </div>
            </div>
            <div className="w-full h-px" style={{ background: 'rgba(0,229,255,.08)' }} />
            <div>
              <div className="font-mono text-[10px] text-cyan/45 tracking-widest mb-2">НАУЧНЫЙ РУКОВОДИТЕЛЬ</div>
              <div className="font-body text-base text-white/80">Лобанов Вячеслав Борисович, к.г.н.</div>
              <a href="mailto:lobanov@poi.dvo.ru" className="font-body text-base text-cyan/70 hover:text-cyan transition-colors">lobanov@poi.dvo.ru</a>
            </div>
            <div className="w-full h-px" style={{ background: 'rgba(0,229,255,.08)' }} />
            <div>
              <div className="font-mono text-[10px] text-cyan/45 tracking-widest mb-2">НАЧАЛЬНИК ЦЕНТРА</div>
              <div className="font-body text-base text-white/80">Середа Амртатжути Владимировна</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t" style={{ borderColor: 'rgba(0,229,255,.07)', background: 'rgba(2,13,20,.8)' }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border border-cyan/30 rounded-full" />
          <span className="font-display text-xs tracking-widest text-white/30">ИНЖИНИРИНГОВЫЙ ЦЕНТР ТОИ ДВО РАН © 2026</span>
        </div>
        <div className="flex items-center gap-6">
          {['ГЛАВНАЯ','НАПРАВЛЕНИЯ','УСЛУГИ','КОНТАКТЫ'].map(l => (
            <button key={l} className="font-mono text-[8px] tracking-widest text-white/20 hover:text-cyan/50 transition-colors">{l}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--deep)' }}>
      <NavBar />
      <HeroSection />
      <DirectionsSection />
      <ServicesSection />
      <PartnersSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}