import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/bdfad9d8-9f83-48f9-9f69-fab002e51705/files/6faa78c3-794f-40f5-b22e-b235728c76b5.jpg';

const NAV_ITEMS = [
  { id: 'hero', label: 'ГЛАВНАЯ' },
  { id: 'directions', label: 'НАПРАВЛЕНИЯ' },
  { id: 'services', label: 'УСЛУГИ' },
  { id: 'catalog', label: 'ТЕХНОЛОГИИ' },
  { id: 'partners', label: 'ПАРТНЁРСТВО' },
  { id: 'contacts', label: 'КОНТАКТЫ' },
];

const DIRECTIONS = [
  { icon: 'Waves', title: 'Подводные исследования', desc: 'Разработка автономных подводных аппаратов и систем глубоководного зондирования до 6000 м.', tag: 'DEEP-SEA' },
  { icon: 'Navigation', title: 'Навигационные системы', desc: 'Прецизионные навигационные комплексы с интеграцией ИИ для арктических и шельфовых условий.', tag: 'NAV-SYS' },
  { icon: 'Cpu', title: 'Цифровое судостроение', desc: 'Цифровые двойники судов, предиктивная аналитика технического состояния флота.', tag: 'DIGITAL' },
  { icon: 'Zap', title: 'Энергетика & Экология', desc: 'Гибридные силовые установки, системы утилизации тепла и экологического мониторинга.', tag: 'ECO-PWR' },
  { icon: 'Radio', title: 'Связь & Мониторинг', desc: 'Подводные акустические сети, спутниковые каналы связи и системы дистанционного мониторинга.', tag: 'COMMS' },
  { icon: 'Shield', title: 'Безопасность флота', desc: 'Системы обнаружения угроз, мониторинга целостности корпуса и аварийного реагирования.', tag: 'SECURE' },
];

const SERVICES = [
  { num: '01', title: 'Научно-технические исследования', desc: 'Проведение НИР и ОКР в области морских технологий. Прикладные исследования по заказу промышленных предприятий.' },
  { num: '02', title: 'Инжиниринг и проектирование', desc: 'Полный цикл проектирования морских технических систем от технического задания до рабочей документации.' },
  { num: '03', title: 'Испытания и сертификация', desc: 'Стендовые, натурные и гидродинамические испытания. Сопровождение сертификации по РМРС, GL, DNV.' },
  { num: '04', title: 'Технологический аудит', desc: 'Оценка технологической зрелости, анализ рисков и разработка дорожных карт цифровой трансформации флота.' },
  { num: '05', title: 'Обучение и трансфер технологий', desc: 'Программы повышения квалификации инженеров, лицензирование технологий, создание совместных лабораторий.' },
  { num: '06', title: 'Эксплуатационная поддержка', desc: 'Техническое сопровождение внедрённых систем, обновление программного обеспечения, гарантийный сервис.' },
];

const TECHNOLOGIES = [
  {
    id: 'AUV-X7', name: 'Автономный подводный аппарат AUV-X7', category: 'ПОДВОДНЫЕ СИСТЕМЫ',
    desc: 'Глубоководный автономный аппарат для картографирования дна и мониторинга трубопроводов.',
    specs: [{ label: 'Глубина погружения', value: '6 000 м' }, { label: 'Автономность', value: '72 часа' }, { label: 'Скорость', value: '5 уз' }, { label: 'Полезная нагрузка', value: '40 кг' }],
    status: 'СЕРИЙНОЕ ПРОИЗВОДСТВО',
  },
  {
    id: 'NAVCORE-AI', name: 'Навигационный комплекс NAVCORE-AI', category: 'НАВИГАЦИЯ',
    desc: 'Интегрированная система навигации с нейросетевой компенсацией помех и предиктивным маршрутированием.',
    specs: [{ label: 'Точность', value: '0.5 м' }, { label: 'Отклик', value: '< 50 мс' }, { label: 'Диапазон', value: 'Арктика–45°' }, { label: 'Интерфейсы', value: 'NMEA, AIS' }],
    status: 'ОПЫТНАЯ ЭКСПЛУАТАЦИЯ',
  },
  {
    id: 'TWIN-SHIP', name: 'Цифровой двойник судна TWIN-SHIP', category: 'ЦИФРОВЫЕ ТЕХ.',
    desc: 'Платформа создания цифровых двойников для предиктивного обслуживания и оптимизации эксплуатации.',
    specs: [{ label: 'Параметров', value: '2 400+' }, { label: 'Точность прогноза', value: '94.7%' }, { label: 'Интеграция', value: 'API/REST' }, { label: 'Экономия топлива', value: 'до 12%' }],
    status: 'ГОТОВ К ВНЕДРЕНИЮ',
  },
  {
    id: 'HYDRO-LINK', name: 'Акустическая сеть HYDRO-LINK', category: 'СВЯЗЬ',
    desc: 'Подводная широкополосная акустическая сеть передачи данных для мониторинга морских объектов.',
    specs: [{ label: 'Дальность', value: '15 км' }, { label: 'Скорость', value: '50 кбит/с' }, { label: 'Глубина', value: '4 000 м' }, { label: 'Узлов', value: 'до 32' }],
    status: 'ПАТЕНТ ПОЛУЧЕН',
  },
  {
    id: 'ECO-DRIVE', name: 'Гибридная СЭУ ECO-DRIVE', category: 'ЭНЕРГЕТИКА',
    desc: 'Гибридная судовая энергетическая установка на основе топливных элементов и аккумуляторов.',
    specs: [{ label: 'Мощность', value: '3 МВт' }, { label: 'Снижение CO₂', value: '45%' }, { label: 'КПД', value: '62%' }, { label: 'Класс судна', value: 'до 5 000 DWT' }],
    status: 'РАЗРАБОТКА',
  },
  {
    id: 'HULL-GUARD', name: 'Контроль корпуса HULL-GUARD', category: 'БЕЗОПАСНОСТЬ',
    desc: 'Распределённая пьезоэлектрическая система непрерывного мониторинга целостности корпуса судна.',
    specs: [{ label: 'Датчиков', value: 'до 512' }, { label: 'Обнаружение', value: 'от 0.3 мм' }, { label: 'Тревога', value: '< 2 сек' }, { label: 'Мощность', value: '18 Вт' }],
    status: 'СЕРТИФИКАЦИЯ РМРС',
  },
];

const PARTNERS = [
  { name: 'ОСК', full: 'Объединённая судостроительная корпорация', type: 'Стратегический партнёр' },
  { name: 'ЦНИИ МТ', full: 'Центр технологии судостроения', type: 'Научное сотрудничество' },
  { name: 'Росатом', full: 'Государственная атомная корпорация', type: 'Совместные проекты' },
  { name: 'МГТУ им. Баумана', full: 'Московский технический университет', type: 'Образование & Наука' },
  { name: 'DNV', full: 'Det Norske Veritas (Норвегия)', type: 'Сертификация' },
  { name: 'Газпром Нефть', full: 'Газпром Нефть Шельф', type: 'Заказчик' },
];

const STATS = [
  { val: '27', unit: 'лет', label: 'опыта' },
  { val: '340+', unit: '', label: 'проектов' },
  { val: '18', unit: '', label: 'патентов' },
  { val: '94', unit: '%', label: 'успешных внедрений' },
];

const STATUS_COLOR: Record<string, string> = {
  'СЕРИЙНОЕ ПРОИЗВОДСТВО': '#00e5ff',
  'ОПЫТНАЯ ЭКСПЛУАТАЦИЯ': '#f0b940',
  'ГОТОВ К ВНЕДРЕНИЮ': '#7fff7f',
  'ПАТЕНТ ПОЛУЧЕН': '#bf8fff',
  'РАЗРАБОТКА': '#ff9f7f',
  'СЕРТИФИКАЦИЯ РМРС': '#f0b940',
};

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
          <div className="relative w-10 h-10 flex-shrink-0">
            <div className="absolute inset-0 border border-cyan/30 rounded-full animate-rotate-slow" />
            <div className="absolute w-5 h-5 border border-gold/40 top-2.5 left-2.5 rotate-45" />
            <div className="absolute w-2 h-2 bg-cyan rounded-full top-4 left-4 animate-pulse-glow" />
          </div>
          <div>
            <div className="font-display text-sm font-500 tracking-widest text-cyan leading-none">ЦМТ</div>
            <div className="font-mono text-[8px] text-white/30 tracking-widest">MARITIME TECH CENTER</div>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className={`nav-link font-display text-[11px] tracking-widest transition-colors duration-300 ${active === item.id ? 'text-cyan active' : 'text-white/50 hover:text-white/90'}`}>
              {item.label}
            </button>
          ))}
          <button onClick={() => scrollTo('contacts')}
            className="clip-corner-sm font-display text-[11px] tracking-widest px-5 py-2.5 font-600 transition-all hover:scale-105"
            style={{ background: 'var(--cyan)', color: 'var(--deep)' }}>
            СВЯЗАТЬСЯ
          </button>
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

      {/* Orbs */}
      <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full animate-float pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(0,229,255,.15) 0%,transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute bottom-1/4 left-1/5 w-72 h-72 rounded-full animate-float pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(240,185,64,.12) 0%,transparent 70%)', filter: 'blur(60px)', animationDelay: '2s' }} />

      {/* Decorative ring — desktop only */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
        <div className="relative w-72 h-72">
          <div className="absolute inset-0 border border-cyan/15 rounded-full animate-rotate-slow" />
          <div className="absolute inset-6 border border-gold/10 rounded-full" style={{ animation: 'rotate-slow 14s linear infinite reverse' }} />
          <div className="absolute inset-12 border border-cyan/08 rounded-full animate-rotate-slow" style={{ animationDuration: '8s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="font-mono text-[8px] text-cyan/40 tracking-widest mb-1">СИСТЕМА</div>
              <div className="font-display text-xl text-cyan glow-cyan">ONLINE</div>
              <div className="w-2 h-2 bg-cyan rounded-full mx-auto mt-2 animate-pulse-glow" />
            </div>
          </div>
          {[0,60,120,180,240,300].map((deg,i) => (
            <div key={i} className="absolute w-2 h-2 rounded-full"
              style={{
                background: i%2===0?'var(--cyan)':'var(--gold)',
                top:`calc(50% + ${Math.sin(deg*Math.PI/180)*132}px - 4px)`,
                left:`calc(50% + ${Math.cos(deg*Math.PI/180)*132}px - 4px)`,
                boxShadow:`0 0 6px ${i%2===0?'var(--cyan)':'var(--gold)'}`,
              }} />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex items-center gap-3 mb-8 animate-fade-up" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <div className="w-8 h-px bg-cyan" />
          <span className="font-mono text-xs text-cyan tracking-widest animate-pulse-glow">ЦЕНТР МОРСКИХ ТЕХНОЛОГИЙ</span>
          <div className="w-2 h-2 border border-cyan/50 rotate-45" />
        </div>

        <h1 className="font-display font-700 leading-[0.9] mb-6 animate-fade-up delay-100" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <span className="block text-6xl md:text-8xl text-white">ТЕХНОЛОГИИ</span>
          <span className="block text-6xl md:text-8xl text-cyan glow-cyan">БУДУЩЕГО</span>
          <span className="block text-6xl md:text-8xl text-white">СЕГОДНЯ</span>
        </h1>

        <p className="font-body text-lg text-white/55 max-w-lg mb-12 leading-relaxed animate-fade-up delay-200" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          Передовые разработки в области морских технологий, подводных систем и цифрового судостроения. Двадцать семь лет опыта — от концепции до серийного производства.
        </p>

        <div className="flex flex-wrap gap-4 mb-20 animate-fade-up delay-300" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <button onClick={() => scrollTo('catalog')}
            className="clip-corner font-display text-sm tracking-widest px-8 py-4 font-600 transition-all hover:scale-105"
            style={{ background: 'var(--cyan)', color: 'var(--deep)', boxShadow: '0 0 30px rgba(0,229,255,.3)' }}>
            КАТАЛОГ ТЕХНОЛОГИЙ
          </button>
          <button onClick={() => scrollTo('contacts')}
            className="clip-corner font-display text-sm tracking-widest px-8 py-4 font-400 transition-all hover:scale-105 text-cyan"
            style={{ border: '1px solid rgba(0,229,255,.35)', background: 'rgba(0,229,255,.05)' }}>
            СВЯЗАТЬСЯ С НАМИ
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-up delay-400" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          {STATS.map((s, i) => (
            <div key={i} className="clip-corner-sm p-4 text-center animate-counter-glow"
              style={{ background: 'rgba(0,229,255,.04)', border: '1px solid rgba(0,229,255,.12)' }}>
              <div className="font-display text-3xl text-cyan glow-cyan leading-none">
                {s.val}<span className="text-xl text-gold">{s.unit}</span>
              </div>
              <div className="font-mono text-[10px] text-white/35 tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up delay-600" style={{ opacity: 0, animationFillMode: 'forwards' }}>
        <span className="font-mono text-[8px] text-white/25 tracking-widest">SCROLL</span>
        <div className="w-px h-12 overflow-hidden" style={{ background: 'rgba(0,229,255,.1)' }}>
          <div className="w-px h-6 bg-cyan" style={{ animation: 'scan-line 2s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
}

function DirectionsSection() {
  return (
    <section id="directions" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel label="НАПРАВЛЕНИЯ ДЕЯТЕЛЬНОСТИ" num="02" />
        <h2 className="font-display text-4xl md:text-5xl font-700 text-white mb-3 mt-6">
          ОСНОВНЫЕ <span className="text-cyan glow-cyan">НАПРАВЛЕНИЯ</span>
        </h2>
        <p className="font-body text-white/45 max-w-2xl mb-14">
          Шесть ключевых технологических векторов, определяющих развитие отечественной морской отрасли.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIRECTIONS.map((d, i) => (
            <div key={i} className="tech-card clip-corner p-6 group cursor-default"
              style={{ background: 'rgba(7,18,28,.85)', border: '1px solid rgba(0,229,255,.08)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 clip-corner-sm flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,229,255,.08)', border: '1px solid rgba(0,229,255,.18)' }}>
                  <Icon name={d.icon as 'Waves'} size={20} className="text-cyan" fallback="Anchor" />
                </div>
                <span className="font-mono text-[8px] text-gold/60 tracking-widest border border-gold/15 px-2 py-1">{d.tag}</span>
              </div>
              <h3 className="font-display text-lg font-500 text-white mb-2 group-hover:text-cyan transition-colors">{d.title}</h3>
              <p className="font-body text-sm text-white/45 leading-relaxed">{d.desc}</p>
              <div className="mt-4 w-0 group-hover:w-full h-px transition-all duration-500"
                style={{ background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }} />
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
          ЧТО МЫ <span className="text-gold glow-gold">ПРЕДЛАГАЕМ</span>
        </h2>
        <p className="font-body text-white/45 max-w-2xl mb-14">
          Полный спектр услуг: от первичных исследований до серийного внедрения и сервисной поддержки.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/5">
          {SERVICES.map((s, i) => (
            <button key={i} onClick={() => setActive(active === i ? null : i)}
              className="text-left p-6 border-b border-r border-white/5 group transition-all duration-300"
              style={{
                background: active === i ? 'rgba(0,229,255,.04)' : undefined,
                borderColor: active === i ? 'rgba(0,229,255,.15)' : undefined,
              }}>
              <div className="flex items-start gap-4">
                <span className="font-mono text-3xl font-300 flex-shrink-0 leading-none"
                  style={{ color: active === i ? 'var(--cyan)' : 'rgba(255,255,255,.1)' }}>{s.num}</span>
                <div className="flex-1">
                  <h3 className="font-display text-base font-500 text-white group-hover:text-cyan transition-colors mb-1">{s.title}</h3>
                  <div className={`overflow-hidden transition-all duration-300 ${active === i ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="font-body text-sm text-white/45 leading-relaxed pt-1">{s.desc}</p>
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

function CatalogSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState('ВСЕ');
  const categories = ['ВСЕ', ...Array.from(new Set(TECHNOLOGIES.map(t => t.category)))];
  const filtered = filter === 'ВСЕ' ? TECHNOLOGIES : TECHNOLOGIES.filter(t => t.category === filter);

  return (
    <section id="catalog" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel label="КАТАЛОГ ТЕХНОЛОГИЙ" num="04" />
        <h2 className="font-display text-4xl md:text-5xl font-700 text-white mb-3 mt-6">
          НАШИ <span className="text-cyan glow-cyan">РАЗРАБОТКИ</span>
        </h2>
        <p className="font-body text-white/45 max-w-2xl mb-10">
          Нажмите на карточку для просмотра технических характеристик.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className="font-mono text-[10px] tracking-widest px-4 py-2 transition-all"
              style={{
                background: filter === cat ? 'var(--cyan)' : 'rgba(0,229,255,.04)',
                color: filter === cat ? 'var(--deep)' : 'rgba(0,229,255,.6)',
                border: `1px solid ${filter === cat ? 'var(--cyan)' : 'rgba(0,229,255,.15)'}`,
              }}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(t => (
            <button key={t.id} onClick={() => setSelected(selected === t.id ? null : t.id)}
              className="tech-card clip-corner p-6 text-left group"
              style={{
                background: selected === t.id ? 'rgba(0,229,255,.07)' : 'rgba(7,18,28,.9)',
                border: `1px solid ${selected === t.id ? 'rgba(0,229,255,.35)' : 'rgba(0,229,255,.08)'}`,
                boxShadow: selected === t.id ? '0 0 30px rgba(0,229,255,.12)' : 'none',
              }}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[8px] text-gold/55 tracking-widest">{t.category}</span>
                <span className="font-mono text-[8px] tracking-widest px-2 py-0.5"
                  style={{ color: STATUS_COLOR[t.status] || 'var(--cyan)', border: `1px solid ${STATUS_COLOR[t.status] || 'var(--cyan)'}40` }}>
                  {t.status}
                </span>
              </div>
              <div className="font-mono text-xs text-cyan/40 mb-1">{t.id}</div>
              <h3 className="font-display text-base font-500 text-white mb-2 group-hover:text-cyan transition-colors leading-snug">{t.name}</h3>
              <p className="font-body text-xs text-white/40 leading-relaxed mb-3">{t.desc}</p>

              <div className={`overflow-hidden transition-all duration-400 ${selected === t.id ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="border-t border-cyan/10 pt-4 grid grid-cols-2 gap-2">
                  {t.specs.map((sp, j) => (
                    <div key={j} className="p-2"
                      style={{ background: 'rgba(0,229,255,.04)', border: '1px solid rgba(0,229,255,.08)' }}>
                      <div className="font-mono text-[8px] text-white/25 tracking-widest mb-1">{sp.label}</div>
                      <div className="font-display text-sm text-cyan">{sp.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Icon name={selected === t.id ? 'ChevronUp' : 'ChevronDown'} size={12} className="text-cyan/35" />
                <span className="font-mono text-[8px] text-cyan/35 tracking-widest">
                  {selected === t.id ? 'СВЕРНУТЬ' : 'ХАРАКТЕРИСТИКИ'}
                </span>
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
        <SectionLabel label="ПАРТНЁРСТВО И СОТРУДНИЧЕСТВО" num="05" />
        <h2 className="font-display text-4xl md:text-5xl font-700 text-white mb-3 mt-6">
          НАШИ <span className="text-gold glow-gold">ПАРТНЁРЫ</span>
        </h2>
        <p className="font-body text-white/45 max-w-2xl mb-14">
          Открыты для сотрудничества с промышленными предприятиями, научными организациями и институтами развития.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {PARTNERS.map((p, i) => (
            <div key={i} className="tech-card clip-corner p-6 group"
              style={{ background: 'rgba(7,18,28,.85)', border: '1px solid rgba(240,185,64,.08)' }}>
              <div className="font-mono text-[9px] text-gold/45 tracking-widest mb-2">{p.type}</div>
              <h3 className="font-display text-2xl font-700 text-white group-hover:text-gold transition-colors mb-1">{p.name}</h3>
              <p className="font-body text-sm text-white/35">{p.full}</p>
            </div>
          ))}
        </div>

        <div className="clip-corner p-10 text-center"
          style={{ background: 'rgba(240,185,64,.03)', border: '1px solid rgba(240,185,64,.18)' }}>
          <div className="font-mono text-[9px] text-gold/50 tracking-widest mb-4">СТАТЬ ПАРТНЁРОМ</div>
          <h3 className="font-display text-3xl md:text-4xl font-700 text-white mb-3">
            Готовы к <span className="text-gold glow-gold">сотрудничеству</span>?
          </h3>
          <p className="font-body text-white/45 max-w-lg mx-auto mb-8">
            Рассмотрим совместные НИР, технологическую кооперацию, лицензирование разработок и создание совместных лабораторий.
          </p>
          <button onClick={() => scrollTo('contacts')}
            className="clip-corner font-display text-sm tracking-widest px-10 py-4 font-600 transition-all hover:scale-105"
            style={{ background: 'var(--gold)', color: 'var(--deep)', boxShadow: '0 0 30px rgba(240,185,64,.25)' }}>
            ПРЕДЛОЖИТЬ СОТРУДНИЧЕСТВО
          </button>
        </div>
      </div>
    </section>
  );
}

function ContactsSection() {
  const [form, setForm] = useState({ name: '', org: '', email: '', phone: '', msg: '' });

  return (
    <section id="contacts" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel label="КОНТАКТЫ" num="06" />
        <h2 className="font-display text-4xl md:text-5xl font-700 text-white mb-3 mt-6">
          СВЯЖИТЕСЬ <span className="text-cyan glow-cyan">С НАМИ</span>
        </h2>
        <p className="font-body text-white/45 max-w-2xl mb-14">
          Наша команда готова ответить на вопросы о технологиях, условиях сотрудничества и текущих проектах.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-5 mb-10">
              {[
                { icon: 'MapPin', label: 'АДРЕС', val: 'г. Санкт-Петербург, Большой Смоленский пр., д. 36' },
                { icon: 'Phone', label: 'ТЕЛЕФОН', val: '+7 (812) 000-00-00' },
                { icon: 'Mail', label: 'EMAIL', val: 'info@maritime-tech.ru' },
                { icon: 'Clock', label: 'РЕЖИМ РАБОТЫ', val: 'Пн–Пт: 9:00–18:00' },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 clip-corner-sm flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,229,255,.07)', border: '1px solid rgba(0,229,255,.18)' }}>
                    <Icon name={c.icon as 'MapPin'} size={16} className="text-cyan" fallback="Info" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-cyan/45 tracking-widest mb-0.5">{c.label}</div>
                    <div className="font-body text-white/75">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="clip-corner p-6" style={{ background: 'rgba(0,229,255,.03)', border: '1px solid rgba(0,229,255,.1)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <span className="font-mono text-[8px] text-white/15 ml-2 tracking-widest">SYSTEM_STATUS.SH</span>
              </div>
              <div className="font-mono text-xs space-y-1.5">
                <div><span className="text-cyan/30">$</span> <span className="text-white/50">status --all</span></div>
                <div className="text-green-400/60">✓ Navigation systems: ONLINE</div>
                <div className="text-green-400/60">✓ Research lab: ACTIVE</div>
                <div className="text-green-400/60">✓ Tech support: READY</div>
                <div className="text-cyan/30">$ <span className="animate-blink">_</span></div>
              </div>
            </div>
          </div>

          <div className="clip-corner p-8" style={{ background: 'rgba(7,18,28,.9)', border: '1px solid rgba(0,229,255,.12)' }}>
            <div className="font-mono text-xs text-cyan/40 tracking-widest mb-6">// ФОРМА ОБРАТНОЙ СВЯЗИ</div>
            <div className="space-y-4">
              {[
                { key: 'name', label: 'ИМЯ И ФАМИЛИЯ', type: 'text', ph: 'Иванов Иван Иванович' },
                { key: 'org', label: 'ОРГАНИЗАЦИЯ', type: 'text', ph: 'ООО «Название»' },
                { key: 'email', label: 'EMAIL', type: 'email', ph: 'ivan@company.ru' },
                { key: 'phone', label: 'ТЕЛЕФОН', type: 'tel', ph: '+7 (___) ___-__-__' },
              ].map(f => (
                <div key={f.key}>
                  <label className="font-mono text-[9px] text-cyan/40 tracking-widest block mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={f.ph}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full px-4 py-3 font-body text-sm text-white/75 placeholder-white/15 outline-none transition-all"
                    style={{ background: 'rgba(0,229,255,.04)', border: '1px solid rgba(0,229,255,.1)' }}
                  />
                </div>
              ))}
              <div>
                <label className="font-mono text-[9px] text-cyan/40 tracking-widest block mb-1.5">СООБЩЕНИЕ</label>
                <textarea rows={4} placeholder="Опишите ваш запрос..."
                  value={form.msg}
                  onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
                  className="w-full px-4 py-3 font-body text-sm text-white/75 placeholder-white/15 outline-none resize-none"
                  style={{ background: 'rgba(0,229,255,.04)', border: '1px solid rgba(0,229,255,.1)' }}
                />
              </div>
              <button className="w-full clip-corner font-display text-sm tracking-widest py-4 font-600 transition-all hover:scale-[1.02]"
                style={{ background: 'var(--cyan)', color: 'var(--deep)', boxShadow: '0 0 20px rgba(0,229,255,.2)' }}>
                ОТПРАВИТЬ ЗАПРОС
              </button>
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
          <span className="font-display text-xs tracking-widest text-white/30">ЦЕНТР МОРСКИХ ТЕХНОЛОГИЙ © 2026</span>
        </div>
        <div className="flex items-center gap-6">
          {['ГЛАВНАЯ','ТЕХНОЛОГИИ','УСЛУГИ','КОНТАКТЫ'].map(l => (
            <button key={l} className="font-mono text-[8px] tracking-widest text-white/20 hover:text-cyan/50 transition-colors">{l}</button>
          ))}
        </div>
        <div className="font-mono text-[8px] text-white/15 tracking-widest flex items-center gap-2">
          <span className="text-cyan/25">STATUS:</span> ONLINE
          <span className="w-1.5 h-1.5 bg-green-400/60 rounded-full inline-block animate-pulse-glow" />
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
      <CatalogSection />
      <PartnersSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}
