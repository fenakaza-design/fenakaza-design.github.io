import { useState, useEffect, useRef } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

// ─── Types ────────────────────────────────────────────────────────────────────

type Page = 'home' | 'about' | { type: 'case-study'; id: string }

// ─── Data ─────────────────────────────────────────────────────────────────────

const caseStudies = [
  {
    id: 'validmind',
    number: '01',
    title: 'AI Governance Platform',
    client: 'ValidMind',
    category: 'Enterprise SaaS · AI Governance',
    year: '2026',
    tagline: 'Designing end-to-end features, a Figma design system, and AI-augmented workflows for an enterprise AI governance platform.',
    swatchHex: '#1A3A5C',
    password: 'portfolio2026!',
    overview: '',
    context: '',
    role: '',
    approach: '',
    keyDecisions: [],
  },
  {
    id: 'multilot',
    number: '01',
    title: 'Multilot 50/50 App',
    client: 'Multilot',
    category: 'Mobile app · WebGL game · Live sports entertainment',
    year: '2024',
    tagline: 'A mobile raffle and browser-based WebGL experience that brought personalized game moments to live sports events.',
    swatchHex: '#3D1A6B',
    overview:
      'Multilot 50/50 was created for online raffles during sports games. The experience combined a mobile lottery flow with a browser-based WebGL game. Players could use a selfie to generate a 3D animation that could be displayed on the venue jumbotron.',
    context:
      'The product needed to make a 50/50 raffle more engaging in a live sports setting while complying with local gambling regulations. The experience needed to support both the practical requirements of a regulated lottery flow and an entertaining, venue-scale game moment.',
    role: 'Lead Product Designer',
    approach:
      'I mapped the raffle journey and supporting states, then translated the flow into low-fidelity wireframes and final UX/UI concepts. The work connected the mobile lottery experience with a selfie-based WebGL interaction and a jumbotron display.',
    keyDecisions: [
      'Create a structured mobile raffle flow — The experience was documented as a detailed lottery journey, including key user paths and supporting states.',
      'Turn participation into a personalized live-event moment — The WebGL game used a player\'s selfie to generate a 3D animation that could be displayed on the jumbotron.',
      'Design within a regulated product context — The product needed to comply with local gambling regulations while maintaining an engaging sports-event experience.',
    ],
    images: {
      hero: '/images/multilot/hero.png',
      flow: '/images/multilot/flow.png',
      wireframes: '/images/multilot/wireframes.png',
      annotated: '/images/multilot/annotated.png',
    },
  },
  {
    id: 'flightdeck',
    number: '02',
    title: 'Flightdeck Estimator',
    client: 'Staples',
    category: 'Enterprise · B2B Tool',
    year: '2019',
    tagline: 'Redesigning a complex estimation tool for retail operations teams spread across North America.',
    swatchHex: '#2C4A7C',
    overview:
      'The Flightdeck Estimator is an internal tool used by Staples operations managers to forecast staffing and resource needs for retail locations. When I joined the project, the process relied on a patchwork of spreadsheets, tribal knowledge, and manual reconciliation across hundreds of stores.',
    context:
      'The existing workflow caused systematic errors that compounded over quarters. Store managers were spending up to 45 minutes per estimation cycle — time taken away from floor operations. Regional leads had no confidence in the numbers they were approving.',
    role: 'Senior Product Designer. End-to-end responsibility across research, information architecture, interaction design, and contribution to the internal design system.',
    approach:
      'I embedded with the operations team for two weeks, shadowing managers through their actual estimation cycles. The key insight was that errors originated not from bad data, but from a disconnect between the mental model of estimating and the structure of the spreadsheet. The redesign preserved the familiar structure while eliminating the ambiguity that caused errors.',
    keyDecisions: [
      'Structured form flow over spreadsheet metaphor — broke estimation into discrete, guided steps to reduce the cognitive load of holding many variables in mind simultaneously.',
      'Inline validation with smart defaults — historical location data pre-populated likely values, with clear affordances for override. Errors surfaced in context, not at submission.',
      'Role-aware views — store managers and regional leads had meaningfully different needs from the same tool. We introduced view switching rather than building two separate tools.',
    ],
    outcomes:
      'Average estimation time fell from 45 minutes to under 12 minutes in the first quarter post-launch. The error rate that triggered regional review dropped by 68%. Regional leads reported a meaningful increase in confidence in the numbers they were approving.',
    learnings:
      'The hardest problem was not the redesign — it was earning trust from a team that had adapted to a broken system over years. The users were not resistant to change; they were resistant to losing the workarounds they had built to survive the old system. Designing for that required preserving enough familiarity that the new tool felt like an improvement, not a replacement.',
  },
  {
    id: 'msn-news',
    number: '03',
    title: 'MSN News App',
    client: 'Microsoft',
    category: 'Consumer · Mobile',
    year: '2017',
    tagline: 'Reimagining a daily news companion to surface relevant content through context, not just recency.',
    swatchHex: '#8B1A1A',
    password: 'design',
    overview:
      'A new concept for the MSN News app — a daily news companion designed to give users easy, contextual access to MSN Weather, Sports, and Money content alongside the core news feed. The brief was to increase engagement beyond the first open.',
    context:
      'Usage data showed that the vast majority of sessions were single-surface: users opened the app, scanned the main feed, and left. The breadth of content MSN offered was invisible to most users. The challenge was not adding more content — it was making the right content findable at the right moment.',
    role: 'Product Designer. Concept through handoff: user journey mapping, wireframing, visual design, and prototype delivery.',
    approach:
      'I began with a journey mapping exercise with the product team, mapping the rhythm of a typical user day: the commute, the lunch break, the late evening check-in. Each moment had different content needs. From those moments, I designed a topic navigation model and a daily briefing module as two entry points, then tested both with users through a series of prototype sessions.',
    keyDecisions: [
      'Topic-led navigation replaced flat category tabs — users could orient around what they cared about, not how MSN organized its content internally.',
      'Daily briefing module for first-open — a contextual snapshot that changed through the day, designed to create a habit of opening the app without a specific intent.',
      'Image quality as a design constraint — editorial cropping and image proportions were treated as first-class design decisions rather than engineering defaults.',
    ],
    outcomes:
      'The concept was adopted as the directional north star for the 2018 redesign cycle. The topic navigation and briefing module shipped in the next major release.',
    learnings:
      'Designing for passive consumption is fundamentally different from designing for task completion. The goal is not to help the user do something — it is to make them feel something was worth their time. That requires a different measure of success and a different kind of craft.',
  },
  {
    id: 'love-mondays',
    number: '04',
    title: 'Love Mondays',
    client: 'Glassdoor',
    category: 'Consumer · Web & Mobile',
    year: '2016',
    tagline: 'Building a trusted workplace review platform for the Brazilian market from the ground up.',
    swatchHex: '#1A4A2E',
    password: 'design',
    overview:
      'Love Mondays is a Brazilian workplace review platform, a Glassdoor product built specifically for the local market. The brief was not to translate the Glassdoor product — it was to build something Brazilians would actually trust.',
    context:
      'Brazilian job seekers lacked a reliable, trustworthy source of authentic company culture information. The existing Glassdoor product, translated to Portuguese, felt foreign. Our task was to understand what trust looks like in this context and design a system that could earn it.',
    role: 'Lead Designer. Responsible for responsive web design, native app design, user research, and brand alignment with the Glassdoor parent brand.',
    approach:
      'I led a research phase in São Paulo with recent job changers, HR professionals, and job seekers at different career stages. The defining insight was that trust in this market was not built through data volume — it was built through specificity and through the feeling that the platform understood you as a Brazilian professional, not as a generic user.',
    keyDecisions: [
      'Simplified review submission flow — reduced the number of required fields and reframed questions to match how Brazilians naturally discuss their workplace experience.',
      'Warmer visual tone — moved away from the Glassdoor green-on-grey palette toward something more conversational and humanized, while keeping enough brand alignment for credibility.',
      'Offline-capable mobile states — connectivity was a real constraint for a meaningful segment of our users. We designed graceful degradation rather than treating connectivity as a given.',
    ],
    outcomes:
      "The platform reached 500,000 reviews in its first year. The mobile app launched with a 4.6 rating. Love Mondays became one of Glassdoor's fastest-growing international markets.",
    learnings:
      'Localization is not translation. The deepest work was understanding what trust means in a different cultural context — and discovering that it often requires designing against your own assumptions about what a trustworthy product looks like.',
  },
]

// ─── Shared UI Primitives ─────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] tracking-[0.2em] uppercase text-[#767676] font-medium">
      {children}
    </p>
  )
}

function Divider() {
  return <div className="border-t border-[#E6E6E6]" />
}

// ─── Password Gate ─────────────────────────────────────────────────────────────

type GateState = 'idle' | 'error' | 'success'

function PasswordGate({
  study,
  onUnlock,
  onBack,
}: {
  study: (typeof caseStudies)[0]
  onUnlock: () => void
  onBack: () => void
}) {
  const [value, setValue] = useState('')
  const [state, setState] = useState<GateState>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const attempt = () => {
    if (value.trim().toLowerCase() === study.password) {
      setState('success')
      setTimeout(onUnlock, 600)
    } else {
      setState('error')
      setValue('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-[360px]">
        {/* Project metadata */}
        <div className="mb-10">
          <SectionLabel>{study.number} — {study.client}</SectionLabel>
          <h1
            className="text-[28px] md:text-[34px] font-light text-[#3B3B3B] mt-3 mb-3 leading-tight"
          >
            {study.title}
          </h1>
          <p className="text-base text-[#4A4A4A] leading-relaxed">{study.tagline}</p>
        </div>

        <Divider />

        {/* Form */}
        <div className="pt-8">
          <label className="block mb-4">
            <SectionLabel>Access code required</SectionLabel>
          </label>

          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setState('idle')
            }}
            onKeyDown={(e) => e.key === 'Enter' && attempt()}
            placeholder="Enter password"
            className={[
              'w-full bg-transparent border-b py-2.5 text-base text-[#3B3B3B] outline-none',
              'placeholder-[#9B9B9B] transition-colors duration-200',
              state === 'error'
                ? 'border-[#D6006D]'
                : state === 'success'
                ? 'border-[#1A6B3C]'
                : 'border-[#9B9B9B] focus:border-[#3B3B3B]',
            ].join(' ')}
          />

          {/* Status messages */}
          <div className="h-5 mt-2">
            {state === 'error' && (
              <p className="text-[12px] text-[#D6006D] tracking-wide">
                Incorrect password — please try again.
              </p>
            )}
            {state === 'success' && (
              <p className="text-[12px] text-[#1A6B3C] tracking-wide">
                Access granted.
              </p>
            )}
          </div>

          <button
            onClick={attempt}
            className="mt-6 w-full py-3.5 bg-[#3B3B3B] text-white text-[12px] tracking-[0.18em] uppercase font-medium hover:bg-[#D6006D] transition-colors duration-300"
          >
            View Case Study
          </button>

          <button
            onClick={onBack}
            className="mt-4 w-full py-2 text-[12px] tracking-[0.18em] uppercase text-[#767676] hover:text-[#3B3B3B] transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 inline mr-1" /> Back to Work
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Case Study Content ────────────────────────────────────────────────────────

function ContentSection({
  label,
  children,
  wide = false,
}: {
  label: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 py-14 border-b border-[#E6E6E6]">
      <div className="pt-0.5">
        <SectionLabel>{label}</SectionLabel>
      </div>
      <div className={wide ? '' : 'max-w-2xl'}>{children}</div>
    </div>
  )
}

function ImagePlaceholder({
  ratio = '16/9',
  className = '',
  swatchHex = '#F1F1F1',
}: {
  ratio?: string
  className?: string
  swatchHex?: string
}) {
  return (
    <div
      className={`w-full ${className}`}
      style={{
        aspectRatio: ratio,
        backgroundColor: `${swatchHex}18`,
        borderTop: `3px solid ${swatchHex}30`,
      }}
    />
  )
}

function CaseStudyContent({
  study,
  onBack,
  onNext,
  nextStudy,
}: {
  study: (typeof caseStudies)[0]
  onBack: () => void
  onNext: () => void
  nextStudy: (typeof caseStudies)[0] | null
}) {
  return (
    <article>
      {/* ── Hero header ── */}
      <div className="px-6 md:px-12 pt-14 pb-12 md:pt-20 md:pb-16 border-b border-[#E6E6E6]">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>{study.number} — {study.client} · {study.category} · {study.year}</SectionLabel>
          <h1 className="text-[36px] md:text-[52px] lg:text-[60px] font-light text-[#3B3B3B] leading-[1.08] mt-5 mb-6">
            {study.title}
          </h1>
          <p className="text-base md:text-lg text-[#4A4A4A] leading-relaxed max-w-xl">
            {study.tagline}
          </p>
        </div>
      </div>

      {/* ── Hero image ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-10 pb-4">
        {study.images?.hero ? (
          <img
            src={study.images.hero}
            alt={`${study.title} hero`}
            className="w-full object-cover"
            style={{ aspectRatio: '16/9' }}
          />
        ) : (
          <ImagePlaceholder ratio="16/9" swatchHex={study.swatchHex} />
        )}
      </div>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Overview + sidebar metadata */}
        <div className="grid md:grid-cols-[1fr_220px] gap-12 py-14 border-b border-[#E6E6E6]">
          <div>
            <SectionLabel>Overview</SectionLabel>
            <p className="text-base text-[#4A4A4A] leading-relaxed mt-5">{study.overview}</p>
          </div>
          <div className="space-y-7 md:border-l md:border-[#E6E6E6] md:pl-10">
            <div>
              <SectionLabel>Role</SectionLabel>
              <p className="text-base text-[#4A4A4A] leading-relaxed mt-2">{study.role}</p>
            </div>
            <div>
              <SectionLabel>Category</SectionLabel>
              <p className="text-base text-[#4A4A4A] mt-2">{study.category}</p>
            </div>
            <div>
              <SectionLabel>Year</SectionLabel>
              <p className="text-base text-[#4A4A4A] mt-2">{study.year}</p>
            </div>
          </div>
        </div>

        <ContentSection label="Context">
          <p className="text-base text-[#4A4A4A] leading-relaxed">{study.context}</p>
        </ContentSection>

        {/* Mid image — flow / lottery journey */}
        <div className="py-12">
          {study.images?.flow ? (
            <img src={study.images.flow} alt="End-to-end lottery flow" className="w-full object-contain" />
          ) : (
            <ImagePlaceholder ratio="3/2" swatchHex={study.swatchHex} />
          )}
        </div>

        <ContentSection label="Approach">
          <p className="text-base text-[#4A4A4A] leading-relaxed">{study.approach}</p>
        </ContentSection>

        {/* Second mid image — wireframes + annotated screens */}
        <div className="py-12">
          {study.images?.wireframes || study.images?.annotated ? (
            <div className="flex flex-col gap-8">
              {study.images.wireframes && (
                <img src={study.images.wireframes} alt="Low-fidelity wireframes" className="w-full object-contain" />
              )}
              {study.images.annotated && (
                <img src={study.images.annotated} alt="Annotated mobile UI screens" className="w-full object-contain" />
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <ImagePlaceholder ratio="4/3" swatchHex={study.swatchHex} />
              <ImagePlaceholder ratio="4/3" swatchHex={study.swatchHex} />
            </div>
          )}
        </div>

        <ContentSection label="Key Decisions">
          <ul className="space-y-7">
            {study.keyDecisions.map((d, i) => (
              <li key={i} className="flex gap-5">
                <span
                  className="shrink-0 text-[12px] font-medium mt-1"
                  style={{ color: study.swatchHex }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-base text-[#4A4A4A] leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </ContentSection>

        {study.outcomes && (
          <ContentSection label="Outcomes">
            <p className="text-base text-[#4A4A4A] leading-relaxed">{study.outcomes}</p>
          </ContentSection>
        )}

        {study.learnings && (
          <ContentSection label="Learnings">
            <p className="text-base text-[#4A4A4A] leading-relaxed italic">{study.learnings}</p>
          </ContentSection>
        )}

        {/* ── Navigation ── */}
        <div className="py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <button
            onClick={onBack}
            className="text-[12px] tracking-[0.18em] uppercase text-[#767676] hover:text-[#D6006D] transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 inline mr-1" /> All Work
          </button>
          {nextStudy && (
            <button
              onClick={onNext}
              className="text-right group"
            >
              <SectionLabel>Next Case Study</SectionLabel>
              <p className="text-lg font-light text-[#3B3B3B] mt-1 group-hover:text-[#D6006D] transition-colors">
                {nextStudy.title} <ArrowRightIcon className="w-4 h-4 inline ml-1" />
              </p>
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

// ─── Case Study Page (gate → content) ────────────────────────────────────────

function CaseStudyPage({
  id,
  onBack,
  navigate,
}: {
  id: string
  onBack: () => void
  navigate: (p: Page) => void
}) {
  const index = caseStudies.findIndex((s) => s.id === id)
  const study = caseStudies[index]
  const nextStudy = caseStudies[index + 1] ?? null
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!study) return null

  if (!unlocked && study.password) {
    return (
      <PasswordGate
        study={study}
        onUnlock={() => setUnlocked(true)}
        onBack={onBack}
      />
    )
  }

  return (
    <CaseStudyContent
      study={study}
      onBack={onBack}
      onNext={() =>
        nextStudy && navigate({ type: 'case-study', id: nextStudy.id })
      }
      nextStudy={nextStudy}
    />
  )
}

// ─── Home ─────────────────────────────────────────────────────────────────────

function CaseStudyRow({
  study,
  index,
  onClick,
}: {
  study: (typeof caseStudies)[0]
  index: number
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const flip = index % 2 !== 0

  return (
    <div className="border-b border-[#E6E6E6]">
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="w-full text-left"
      >
        <div
          className={`max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
            flip ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* Text block */}
          <div className="w-full">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#767676]">
                {study.client}
              </span>
              <span className="text-[12px] text-[#E6E6E6]">·</span>
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#767676]">
                {study.year}
              </span>
            </div>

            <h2
              className="text-[26px] md:text-[32px] font-light leading-tight mb-3 transition-colors duration-200"
              style={{ color: hovered ? study.swatchHex : '#3B3B3B' }}
            >
              {study.title}
            </h2>

            <p className="text-base text-[#4A4A4A] leading-relaxed max-w-sm mb-7">
              {study.tagline}
            </p>

            <span className="flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase transition-colors duration-200"
              style={{ color: hovered ? study.swatchHex : '#D6006D' }}
            >
              <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200" style={{ transform: hovered ? 'translateX(2px)' : 'translateX(0)' }} />
              View Case Study
            </span>
            {study.password && (
              <p className="text-[11px] text-[#767676] mt-2 tracking-wide">Password required</p>
            )}
          </div>

          {/* Image */}
          <div
            className="w-full aspect-[4/3] transition-opacity duration-500"
            style={{
              backgroundColor: `${study.swatchHex}12`,
              borderTop: `3px solid ${study.swatchHex}${hovered ? '60' : '25'}`,
              opacity: hovered ? 1 : 0.8,
            }}
          />
        </div>
      </button>
    </div>
  )
}

function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <main>
      {/* ── Intro ── */}
      <section className="pt-20 pb-20 md:pt-28 md:pb-[136px] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-white/70" />
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
          <div className="max-w-4xl">
            <p className="text-[22px] md:text-[36px] lg:text-[44px] text-[#4A4A4A] font-light leading-tight">
              Olá! I'm Fernanda.
            </p>
            <h1 className="text-[32px] font-light leading-[1.1] mt-1" style={{ color: '#D6006D' }}>
              I help teams simplify complex workflows<br />through thoughtful product design.
            </h1>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Work index ── */}
      <section>
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <SectionLabel>Selected Work</SectionLabel>
          <span className="text-[12px] tracking-[0.18em] uppercase text-[#767676]">
            {caseStudies.length} Case Studies
          </span>
        </div>
        <Divider />
        {caseStudies.map((study, i) => (
          <CaseStudyRow
            key={study.id}
            study={study}
            index={i}
            onClick={() => navigate({ type: 'case-study', id: study.id })}
          />
        ))}
      </section>
    </main>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutPage() {
  const [expExpanded, setExpExpanded] = useState(false)
  return (
    <main className="min-h-[calc(100vh-56px)]">
      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-20 pb-24 md:pt-28">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-start gap-10 md:gap-14">
          <img
            src="/images/profile-img.png"
            alt="Fernanda Nakaza"
            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover object-top flex-shrink-0"
          />
          <div className="max-w-2xl">
            <SectionLabel>About</SectionLabel>
            <h1 className="text-[38px] md:text-[52px] font-light text-[#3B3B3B] leading-tight mt-5 mb-6">
              Fernanda Nakaza
            </h1>
            <p className="text-lg text-[#4A4A4A] leading-relaxed">
              Senior Product Designer with 20+ years of experience creating thoughtful, scalable digital products across enterprise SaaS, AI-enabled platforms, and consumer experiences.
            </p>
            <a
              href="/FernandaNakaza-Resume2026.pdf"
              download
              className="inline-flex items-center gap-2 mt-4 group"
            >
              <span className="text-base text-[#D6006D] group-hover:opacity-70 transition-opacity">
                Download Resume
              </span>
              <ArrowRightIcon className="w-4 h-4 text-[#D6006D] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <Divider />

        {/* Two-column body */}
        <div className="grid md:grid-cols-[1fr_240px] gap-12 md:gap-16 py-14">
          <div className="space-y-5">
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              I'm Japanese Brazilian and based in British Columbia, Canada. I've worked remotely with global teams since 2020.
            </p>
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              My work is based on research, systems thinking, and close collaboration to make complex products easier to understand and use. I enjoy working with product managers, engineers, and subject-matter experts to turn ideas into clear, practical experiences.
            </p>
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              I've worked with both startups and large enterprises, including Unity, Microsoft, and Yahoo!, across enterprise software, e-commerce, media, and entertainment. Working across different industries and team sizes has helped me stay flexible and understand what each product and team needs.
            </p>
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              I enjoy taking on complex problems, asking the right questions, and finding a clear path forward. My goal is to create products that feel simple and intuitive for the people who use them.
            </p>
          </div>

          <div className="space-y-9">
            <div>
              <SectionLabel>Practice Areas</SectionLabel>
              <ul className="mt-3 space-y-1.5 text-sm text-[#4A4A4A] leading-relaxed">
                {[
                  'Product Design',
                  'Design Systems',
                  'User Research',
                  'Information Architecture',
                  'Design Leadership',
                  'Design Strategy',
                ].map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>

            <div>
              <SectionLabel>Experience</SectionLabel>
              <ul className="mt-3 space-y-2 text-sm text-[#4A4A4A]">
                {[
                  { company: 'ValidMind', start: '2024', end: '2026' },
                  { company: 'Unity / Capgemini', start: '2020', end: '2024' },
                  { company: 'Galvanize / Diligent', start: '2019', end: '2020' },
                  { company: 'PNI Media / Staples', start: '2016', end: '2019' },
                  { company: 'Microsoft', start: '2016', end: '' },
                  ...(expExpanded ? [
                    { company: 'Glassdoor Brasil', start: '2014', end: '2015' },
                    { company: 'Elo7 / Etsy', start: '2012', end: '2014' },
                    { company: 'Yahoo!', start: '2007', end: '2012' },
                    { company: 'RedeTV!', start: '2005', end: '2007' },
                    { company: 'Lucida Studio', start: '2002', end: '2005' },
                    { company: 'Isobar', start: '2001', end: '2002' },
                    { company: 'Tesla', start: '2000', end: '2001' },
                  ] : []),
                ].map((item) => (
                  <li key={item.company} className="grid grid-cols-[2.2rem_0.75rem_2.8rem_1fr] gap-x-1">
                    <span className="text-[#767676]">{item.start}</span>
                    <span className="text-[#767676] text-center">{item.end ? '-' : ''}</span>
                    <span className="text-[#767676]">{item.end}</span>
                    <span>{item.company}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setExpExpanded(!expExpanded)}
                className="mt-3 text-xs text-[#D6006D] hover:opacity-70 transition-opacity"
              >
                {expExpanded ? <>Show less <ChevronUpIcon className="w-3.5 h-3.5 inline" /></> : <>Show more <ChevronDownIcon className="w-3.5 h-3.5 inline" /></>}
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Nav({
  page,
  navigate,
}: {
  page: Page
  navigate: (p: Page) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  const isHome = page === 'home'
  const isAbout = page === 'about'

  const navLinkClass = (active: boolean) =>
    [
      'text-[12px] tracking-[0.18em] uppercase transition-colors duration-200',
      active ? 'text-white font-bold' : 'text-white/80 hover:text-white font-normal',
    ].join(' ')

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#6E6577]/80 backdrop-blur-md backdrop-saturate-150">
        <div className="max-w-5xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          {/* Logo / name */}
          <button
            onClick={() => { navigate('home'); setMenuOpen(false) }}
            className="text-[12px] tracking-[0.22em] uppercase font-medium text-white hover:text-white/60 transition-colors"
          >
            FE NAKAZA <span className="text-white/30 font-light">|</span> SENIOR PRODUCT DESIGNER
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('home')} className={navLinkClass(isHome)}>
              Work
            </button>
            <button onClick={() => navigate('about')} className={navLinkClass(isAbout)}>
              About
            </button>

          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1.5"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation"
          >
            <span
              className={`block w-[18px] h-px bg-white transition-all origin-center ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-[18px] h-px bg-white transition-all ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-[18px] h-px bg-white transition-all origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-48' : 'max-h-0'
          }`}
        >
          <div className="border-t border-white/20 bg-[#6E6577] px-6 py-6 space-y-5">
            {[
              { label: 'Work', action: () => { navigate('home'); setMenuOpen(false) } },
              { label: 'About', action: () => { navigate('about'); setMenuOpen(false) } },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="block w-full text-left text-[12px] tracking-[0.18em] uppercase text-white/80 hover:text-white py-1.5 min-h-[44px] flex items-center transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Backdrop to close mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#D6006D] py-8">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-[12px] text-white/80 tracking-wide">
          © 2026 Fernanda Nakaza
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: 'LinkedIn', href: 'https://linkedin.com/in/fenakaza' },
            { label: 'Email', href: 'mailto:fernanda.nakaza@gmail.com' },
            { label: 'Resume', href: '/FernandaNakaza-Resume2026.pdf', download: true },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.download ? { download: true } : {})}
              className="text-[12px] tracking-[0.18em] uppercase text-white hover:text-white/70 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Routing helpers ──────────────────────────────────────────────────────────

function pageToPath(page: Page): string {
  if (page === 'home') return '/'
  if (page === 'about') return '/about'
  return `/work/${page.id}`
}

function pathToPage(path: string): Page {
  // Handle GitHub Pages 404 redirect
  const redirected = new URLSearchParams(window.location.search).get('p')
  if (redirected) {
    window.history.replaceState(null, '', redirected)
    return pathToPage(redirected)
  }
  if (path === '/about') return 'about'
  const match = path.match(/^\/work\/(.+)$/)
  if (match) return { type: 'case-study', id: match[1] }
  return 'home'
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>(() => pathToPage(window.location.pathname))

  const navigate = (p: Page) => {
    window.history.pushState(null, '', pageToPath(p))
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  useEffect(() => {
    const handlePop = () => {
      setPage(pathToPage(window.location.pathname))
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="bg-white min-h-screen"
    >
      <Nav page={page} navigate={navigate} />

      <div className="pt-14">
        {page === 'home' && <HomePage navigate={navigate} />}
        {page === 'about' && <AboutPage />}
        {typeof page === 'object' && page.type === 'case-study' && (
          <CaseStudyPage
            id={page.id}
            onBack={() => navigate('home')}
            navigate={navigate}
          />
        )}
      </div>

      <Footer />
    </div>
  )
}
