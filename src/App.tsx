import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

// ─── Types ────────────────────────────────────────────────────────────────────

type Page = 'home' | 'about' | 'contact' | { type: 'case-study'; id: string }

// ─── Data ─────────────────────────────────────────────────────────────────────

const caseStudies = [
  {
    id: 'validmind',
    number: '01',
    title: 'AI Governance Platform',
    client: 'ValidMind',
    category: 'Enterprise SaaS · AI Governance',
    year: '2026',
    tagline: 'Designing end-to-end features, a Figma design system, and AI-augmented workflows for an enterprise AI-governance platform.',
    swatchHex: '#1A3A5C',
    featured: true,
    password: 'fernanda2026',
    images: { hero: '/images/validmind/validmind-hero.png' },
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
    featured: true,
    password: 'fernanda2026',
    overview:
      'Multilot 50/50 was created for online raffles during sports games. The experience combined a mobile lottery flow with a browser-based WebGL game. Players could use a selfie to generate a 3D animation that could be displayed on the venue jumbotron.',
    context:
      'The product needed to make a 50/50 raffle more engaging in a live sports setting while complying with local gambling regulations. The experience needed to support both the practical requirements of a regulated lottery flow and an entertaining, venue-scale game moment.',
    role: 'Lead Product Designer',
    approach:
      'I mapped the raffle journey and supporting states, then translated the flow into low-fidelity wireframes and final UX/UI concepts. The work connected the mobile lottery experience with a selfie-based WebGL interaction and a jumbotron display. The platform was designed to be customizable for any league or team, with an admin UI for managing the app, raffle settings, selfie moderation, and jumbotron content.',
    keyDecisions: [
      'Create a structured mobile raffle flow — The experience was documented as a detailed lottery journey, including key user paths and supporting states.',
      'Turn participation into a personalized live-event moment — The WebGL game used a player\'s selfie to generate a 3D animation that could be displayed on the jumbotron.',
      'Design within a regulated product context — The product needed to comply with local gambling regulations while maintaining an engaging sports-event experience.',
    ],
    images: {
      hero: '/images/5050.png',
      flow: '/images/multilot/flow.png',
      wireframes: '/images/multilot/wireframes.png',
      annotated: '/images/multilot/annotated.png',
      admin: '/images/multilot/admin.png',
    },
  },
  {
    id: 'flightdeck',
    number: '02',
    title: 'Flightdeck Estimator',
    client: 'Staples',
    images: { hero: '/images/estimator.png' },
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
    images: { hero: '/images/msnnews.png' },
    category: 'Consumer · Mobile',
    year: '2017',
    tagline: 'Reimagining a daily news companion to surface relevant content through context, not just recency.',
    swatchHex: '#8B1A1A',
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
    images: { hero: '/images/lovemondays.png' },
    category: 'Consumer · Web & Mobile',
    year: '2016',
    tagline: 'Building a trusted workplace review platform for the Brazilian market from the ground up.',
    swatchHex: '#1A4A2E',
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
    if (value === study.password) {
      setState('success')
      setTimeout(onUnlock, 600)
    } else {
      setState('error')
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-[360px]">
        {/* Project metadata */}
        <div className="mb-10">
          <SectionLabel>{study.client}</SectionLabel>
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

function ImageCarousel({ images, alt = '' }: { images: string[]; alt?: string }) {
  const [idx, setIdx] = useState(0)
  return (
    <div className="relative">
      <img
        src={images[idx]}
        alt={alt}
        className="w-full object-contain border border-[#F1F1F1]"
      />
      {images.length > 1 && (
        <>
          {idx > 0 && (
            <button
              onClick={() => setIdx(i => i - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/65 rounded-full p-2 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 text-white" />
            </button>
          )}
          {idx < images.length - 1 && (
            <button
              onClick={() => setIdx(i => i + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/65 rounded-full p-2 transition-colors"
            >
              <ArrowRightIcon className="w-5 h-5 text-white" />
            </button>
          )}
          <p className="text-center text-[11px] tracking-[0.2em] uppercase text-[#9A9A9A] mt-3">
            {idx + 1} / {images.length}
          </p>
        </>
      )}
    </div>
  )
}

function ValidMindBody({
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
  const sw = study.swatchHex

  const vmDecisions = [
    {
      n: '01',
      title: 'Establish a design-system foundation in Figma',
      body: 'I created a variable-based Figma design system aligned with Chakra UI, giving the team reusable components, patterns, and templates for more consistent feature delivery.',
      images: ['/images/validmind/Design-system.png', '/images/validmind/Pattern.png'],
    },
    {
      n: '02',
      title: 'Extend the design system into code and AI workflows',
      body: "I expanded my front-end knowledge to turn the Figma design system into realistic live-code prototypes and targeted UI improvements in developers' branches. I also created reusable AI guidance, components, and templates grounded in product, design-system, and codebase conventions—helping the team apply patterns accurately, make focused changes, and deliver more consistently.",
      images: ['/images/validmind/cursor.png'],
    },
  ]

  return (
    <>
    <div className="max-w-5xl mx-auto px-6 md:px-12">
      {/* Confidential callout */}
      <div className="border-l-2 pl-5 py-3 my-10" style={{ borderColor: `${sw}80`, backgroundColor: `${sw}08` }}>
        <p className="text-sm text-[#4A4A4A]">
          <strong className="text-[#3B3B3B]">Confidential.</strong>{' '}
          This case study includes non-public work completed for ValidMind.
        </p>
      </div>

      {/* Overview + sidebar */}
      <div className="grid md:grid-cols-[1fr_220px] gap-12 py-14 border-b border-[#E6E6E6]">
        <div>
          <SectionLabel>Overview</SectionLabel>
          <div className="space-y-4 mt-5">
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              At ValidMind, I worked on a small design team alongside the Director of Design. I owned end-to-end feature design, from stakeholder and subject-matter-expert discovery through workflow definition and final UI. I designed for AI-governance teams with varied structures, responsibilities, and levels of maturity.
            </p>
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              Alongside the Validation Report feature, I also contributed to Developer Documentation, Inbox notifications, Activity Log, and overall platform settings. These projects expanded my experience designing end-to-end enterprise AI-governance workflows while strengthening the shared patterns and systems used across the platform.
            </p>
          </div>
        </div>
        <div className="space-y-7 md:border-l md:border-[#E6E6E6] md:pl-10">
          <div>
            <SectionLabel>Role</SectionLabel>
            <p className="text-base text-[#4A4A4A] leading-relaxed mt-2">Senior Product Designer</p>
          </div>
          <div>
            <SectionLabel>Category</SectionLabel>
            <p className="text-base text-[#4A4A4A] mt-2">Enterprise SaaS · AI governance · Model risk management</p>
          </div>
        </div>
      </div>

      {/* Context — text then full-width image */}
      <div className="border-b border-[#E6E6E6]">
        <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 pt-14 pb-10">
          <div className="pt-0.5"><SectionLabel>Context</SectionLabel></div>
          <div className="max-w-2xl space-y-4">
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              When I joined, the product experience and front-end framework were already established, but the design team did not yet have a shared Figma design system.
            </p>
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              At the same time, the platform supported AI-governance work across organizations of different sizes and levels of maturity. Each feature required a strong understanding of the people involved, their responsibilities, and their approval and review processes.
            </p>
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              The overarching challenge was that teams were managing complex work across multiple roles, processes, and technical and regulatory constraints without a consistently structured product experience.
            </p>
          </div>
        </div>
      </div>

      {/* Approach — text then full-width images */}
      <div className="border-b border-[#E6E6E6]">
        <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 pt-14 pb-10">
          <div className="pt-0.5"><SectionLabel>Approach</SectionLabel></div>
          <div className="max-w-2xl">
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              I grounded each feature in user needs, business goals, governance workflows, and technical constraints. My process combined research, ideation, prototyping, and validation with AI-assisted exploration, structured deliverables, live-code prototypes, and high-level usability checks.
            </p>
          </div>
        </div>
        <div className="pb-14">
          <ImageCarousel
            images={[
              '/images/validmind/userflow.png',
              '/images/validmind/lifecycle.png',
              '/images/validmind/variations.png',
            ]}
          />
        </div>
      </div>

      {/* Key Decisions — each decision: text row then full-width image */}
      <div className="border-b border-[#E6E6E6]">
        {vmDecisions.map(({ n, title, body, images }, idx) => (
          <React.Fragment key={n}>
            <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 pt-14 pb-10">
              <div className="pt-0.5">
                {idx === 0 && <SectionLabel>Key Decisions</SectionLabel>}
              </div>
              <div className="max-w-2xl flex gap-5">
                <span className="shrink-0 text-[12px] font-medium mt-1" style={{ color: sw }}>{n}</span>
                <div>
                  <p className="text-base font-medium text-[#3B3B3B] mb-2">{title}</p>
                  <p className="text-base text-[#4A4A4A] leading-relaxed">{body}</p>
                </div>
              </div>
            </div>
            <div className="pb-14">
              {images && images.length > 0
                ? <ImageCarousel images={images} alt={title} />
                : <ImagePlaceholder ratio="16/9" swatchHex={sw} />
              }
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Feature Spotlight — text rows then full-width images */}
      <div className="border-b border-[#E6E6E6]">
        <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 pt-14 pb-10">
          <div className="pt-0.5"><SectionLabel>Feature Spotlight</SectionLabel></div>
          <div className="max-w-2xl">
            <h2 className="text-[22px] md:text-[26px] font-light text-[#3B3B3B]">Validation Report</h2>
          </div>
        </div>

        {/* The need */}
        <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 pb-10">
          <div className="pt-0.5"><SectionLabel>The need</SectionLabel></div>
          <div className="max-w-2xl">
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              The Validation Report feature supported a key part of the AI-governance workflow: helping users create, organize, review, and act on validation information.
            </p>
          </div>
        </div>
        <div className="pb-14">
          <img src="/images/validmind/vr-intro.png" alt="Validation Report intro" className="w-full object-contain border border-[#F1F1F1]" />
        </div>

        {/* Discovery */}
        <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 pb-10">
          <div className="pt-0.5"><SectionLabel>Discovery</SectionLabel></div>
          <div className="max-w-2xl">
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              I worked with stakeholders and subject matter experts to map the validation process, identify the information needed at each stage, and understand requirements across organizations.
            </p>
          </div>
        </div>
        <div className="pb-14">
          <ImageCarousel images={['/images/validmind/vr-painpoints.png', '/images/validmind/vr-userflow.png']} />
        </div>

        {/* Design approach */}
        <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 pb-10">
          <div className="pt-0.5"><SectionLabel>Design approach</SectionLabel></div>
          <div className="max-w-2xl">
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              I designed the report around the validator's review cycle, making risk information, evidence, and findings easier to access and act on at the report, page, or section level.
            </p>
          </div>
        </div>
        <div className="pb-14">
          <img src="/images/validmind/vr-lofi.png" alt="Design approach lo-fi" className="w-full object-contain border border-[#F1F1F1]" />
        </div>

        {/* Key decisions */}
        <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 pb-10">
          <div className="pt-0.5"><SectionLabel>Key decisions</SectionLabel></div>
          <div className="max-w-2xl">
            <ul className="space-y-6">
              {[
                { title: 'Use a layered, flexible report structure', body: 'I retained the report overview and added section-level spaces for documentation, risk assessments, evidence, and findings. Validators could run AI-assisted features across the full report, a page, or a specific section.' },
                { title: 'Surface configurable related content', body: "Instead of searching across pages, validators received recommendations for evidence to link or information to flag. Relevance settings were configurable to fit each organization's validation process." },
                { title: 'Keep humans in control of AI assistance', body: 'AI helped retrieve risk information, recommend evidence, and generate findings. Users reviewed and approved every suggestion, and each action was recorded for auditability.' },
              ].map(({ title, body }) => (
                <li key={title}>
                  <p className="text-base font-medium text-[#3B3B3B] mb-1">{title}</p>
                  <p className="text-base text-[#4A4A4A] leading-relaxed">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pb-14">
          <img src="/images/validmind/vr-approval.png" alt="Approval workflow" className="w-full object-contain border border-[#F1F1F1]" />
        </div>

        {/* Implementation */}
        <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 pb-10">
          <div className="pt-0.5"><SectionLabel>Implementation and quality</SectionLabel></div>
          <div className="max-w-2xl">
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              I collaborated with engineering to translate the experience into reusable, production-ready components. The AI guidance layer supported targeted code changes within established Chakra UI and product conventions.
            </p>
          </div>
        </div>
        <div className="pb-14">
          <video
            src="/images/validmind/vr-evidence.mp4"
            controls
            className="w-full border border-[#F1F1F1]"
          />
        </div>
      </div>

      {/* Outcomes & Learnings */}
      <ContentSection label="Outcomes & Learnings">
        <div className="space-y-4">
          <p className="text-base text-[#4A4A4A] leading-relaxed">
            The work strengthened alignment between the Figma design system, Chakra UI, and implemented product experiences, while supporting closer collaboration between design and engineering.
          </p>
          <p className="text-base text-[#4A4A4A] leading-relaxed italic">
            AI expanded the speed and range of exploration, but quality still depended on clear user context, reusable patterns, and thoughtful design judgment.
          </p>
        </div>
      </ContentSection>

      {/* Navigation */}
      <div className="py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <button
          onClick={onBack}
          className="text-[12px] tracking-[0.18em] uppercase text-[#767676] hover:text-[#D6006D] transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 inline mr-1" /> All Work
        </button>
        {nextStudy && (
          <button onClick={onNext} className="text-right group">
            <SectionLabel>Next Case Study</SectionLabel>
            <p className="text-lg font-light text-[#3B3B3B] mt-1 group-hover:text-[#D6006D] transition-colors">
              {nextStudy.title} <ArrowRightIcon className="w-4 h-4 inline ml-1" />
            </p>
          </button>
        )}
      </div>
    </div>
    </>
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
      <div className="pt-14 pb-12 md:pt-20 md:pb-16 border-b border-[#E6E6E6]">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <SectionLabel>{study.client} · {study.category} · {study.year}</SectionLabel>
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
            className="w-full border border-[#F1F1F1]"
          />
        ) : (
          <ImagePlaceholder ratio="16/9" swatchHex={study.swatchHex} />
        )}
      </div>

      {/* ── Body ── */}
      {study.id === 'validmind' ? (
        <ValidMindBody study={study} onBack={onBack} onNext={onNext} nextStudy={nextStudy} />
      ) : (
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
            </div>
          </div>

          <ContentSection label="Context">
            <p className="text-base text-[#4A4A4A] leading-relaxed">{study.context}</p>
          </ContentSection>

          {/* Mid image */}
          <div className="py-12">
            {study.images?.flow ? (
              <ImageCarousel
                images={[study.images.flow, study.images.annotated].filter((s): s is string => Boolean(s))}
              />
            ) : (
              <ImagePlaceholder ratio="3/2" swatchHex={study.swatchHex} />
            )}
          </div>

          <ContentSection label="Approach">
            <p className="text-base text-[#4A4A4A] leading-relaxed">{study.approach}</p>
          </ContentSection>

          {/* Second mid image */}
          <div className="py-12">
            {study.images?.wireframes || study.images?.annotated ? (
              <ImageCarousel
                images={[study.images.wireframes, study.images.admin].filter((s): s is string => Boolean(s))}
              />
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
                  <span className="shrink-0 text-[12px] font-medium mt-1" style={{ color: study.swatchHex }}>
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
              <button onClick={onNext} className="text-right group">
                <SectionLabel>Next Case Study</SectionLabel>
                <p className="text-lg font-light text-[#3B3B3B] mt-1 group-hover:text-[#D6006D] transition-colors">
                  {nextStudy.title} <ArrowRightIcon className="w-4 h-4 inline ml-1" />
                </p>
              </button>
            )}
          </div>
        </div>
      )}
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
  const flip = index % 2 !== 0

  return (
    <div className="border-b border-[#E6E6E6]" style={{ '--swatch': study.swatchHex } as React.CSSProperties}>
      {study.featured ? (
        /* Featured layout: full-width image on top, text below */
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {study.images?.hero ? (
            <img
              src={study.images.hero}
              alt={study.title}
              onClick={onClick}
              className="w-full cursor-pointer hover:opacity-90 transition-opacity duration-200 mt-10 md:mt-14 border border-[#F1F1F1]"
            />
          ) : (
            <div
              onClick={onClick}
              className="w-full aspect-[16/9] cursor-pointer hover:opacity-90 transition-opacity duration-200 mt-10 md:mt-14"
              style={{
                backgroundColor: `${study.swatchHex}12`,
                borderTop: `3px solid ${study.swatchHex}30`,
              }}
            />
          )}
          <div className="pt-6 pb-10 md:pb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#767676]">{study.client}</span>
              <span className="text-[12px] text-[#E6E6E6]">·</span>
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#767676]">{study.year}</span>
            </div>
            <h2 className="text-[26px] md:text-[32px] font-light leading-tight mb-3 text-[#3B3B3B]">
              {study.title}
            </h2>
            <p className="text-base text-[#4A4A4A] leading-relaxed max-w-2xl mb-7">{study.tagline}</p>
            <button
              onClick={onClick}
              className="group/link flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-[#D6006D] hover:text-[#A3004F] transition-colors duration-200"
            >
              <ArrowRightIcon className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform duration-200" />
              View Case Study
            </button>
            {study.password && (
              <p className="text-[11px] text-[#767676] mt-2 tracking-wide">Password required</p>
            )}
          </div>
        </div>
      ) : (
        /* Standard layout: text + image side by side */
        <div
          className={`max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
            flip ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div className="w-full">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#767676]">{study.client}</span>
              <span className="text-[12px] text-[#E6E6E6]">·</span>
              <span className="text-[12px] tracking-[0.18em] uppercase text-[#767676]">{study.year}</span>
            </div>
            <h2 className="text-[26px] md:text-[32px] font-light leading-tight mb-3 text-[#3B3B3B]">
              {study.title}
            </h2>
            <p className="text-base text-[#4A4A4A] leading-relaxed max-w-sm mb-7">{study.tagline}</p>
            <button
              onClick={onClick}
              className="group/link flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-[#D6006D] hover:text-[#A3004F] transition-colors duration-200"
            >
              <ArrowRightIcon className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform duration-200" />
              View Case Study
            </button>
            {study.password && (
              <p className="text-[11px] text-[#767676] mt-2 tracking-wide">Password required</p>
            )}
          </div>
          {study.images?.hero ? (
            <img
              src={study.images.hero}
              alt={study.title}
              onClick={onClick}
              className="w-full cursor-pointer hover:opacity-90 transition-opacity duration-200 border border-[#F1F1F1]"
            />
          ) : (
            <div
              onClick={onClick}
              className="w-full aspect-[4/3] cursor-pointer hover:opacity-90 transition-opacity duration-200"
              style={{
                backgroundColor: `${study.swatchHex}12`,
                borderTop: `3px solid ${study.swatchHex}30`,
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}

function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <main>
      {/* ── Intro ── */}
      <section className="pt-10 pb-[120px] md:pt-[72px] md:pb-[176px] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.45) 40%, rgba(255,255,255,0.1) 70%, transparent 100%)' }} />
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
          <div className="max-w-4xl">
            <p className="text-[26px] md:text-[32px] lg:text-[40px] font-light leading-tight" style={{ color: '#D6006D' }}>
              Olá! I'm Fernanda.
            </p>
            <h1 className="text-[18px] md:text-[28px] font-light leading-[1.3] mt-1 text-[#4A4A4A]">
              I help teams simplify complex workflows<br className="hidden md:inline" /> through thoughtful product design.
            </h1>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Work index ── */}
      <section>
        <div className="max-w-5xl mx-auto px-6 md:px-12 pt-5 pb-2">
          <h2 className="text-[16px] tracking-[0.18em] uppercase text-[#767676] font-medium">
            Recent Case Studies
          </h2>
        </div>
        <div className="max-w-5xl mx-auto px-6 md:px-12 pb-5">
          <p className="text-sm text-[#767676] leading-relaxed">
            Selected projects require a password due to confidential product work and internal workflows.{' '}
            <button
              onClick={() => navigate('contact')}
              className="text-[#D6006D] hover:text-[#A3004F] transition-colors"
            >
              Request access
            </button>
          </p>
        </div>
        <Divider />
        {caseStudies.map((study, i) => (
          <React.Fragment key={study.id}>
            {!study.password && (i === 0 || caseStudies[i - 1].password) && (
              <>
                <div className="max-w-5xl mx-auto px-6 md:px-12 py-5">
                  <h2 className="text-[16px] tracking-[0.18em] uppercase text-[#767676] font-medium">
                    Previous Case Studies
                  </h2>
                </div>
                <Divider />
              </>
            )}
            <CaseStudyRow
              study={study}
              index={i}
              onClick={() => navigate({ type: 'case-study', id: study.id })}
            />
          </React.Fragment>
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
  const isContact = page === 'contact'

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
            className="text-[12px] tracking-[0.22em] uppercase font-medium text-white hover:text-white/60 transition-colors truncate min-w-0"
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
            <button onClick={() => navigate('contact')} className={navLinkClass(isContact)}>
              Contact
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
            menuOpen ? 'max-h-64' : 'max-h-0'
          }`}
        >
          <div className="border-t border-white/20 bg-[#6E6577] px-6 py-6 space-y-5">
            {[
              { label: 'Work', action: () => { navigate('home'); setMenuOpen(false) }, active: isHome },
              { label: 'About', action: () => { navigate('about'); setMenuOpen(false) }, active: isAbout },
              { label: 'Contact', action: () => { navigate('contact'); setMenuOpen(false) }, active: isContact },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`block w-full text-left text-[12px] tracking-[0.18em] uppercase py-1.5 min-h-[44px] flex items-center transition-colors ${
                  item.active ? 'text-white font-medium' : 'text-white/60 hover:text-white/80'
                }`}
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

// ─── Contact page ─────────────────────────────────────────────────────────────

function ContactPage() {
  return (
    <main className="min-h-[calc(100vh-56px)]">
      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-20 pb-24 md:pt-28">
        <SectionLabel>Contact</SectionLabel>
        <h1 className="text-[38px] md:text-[52px] font-light text-[#3B3B3B] leading-tight mt-5 mb-6">
          Let's talk. 👋
        </h1>
        <p className="text-lg text-[#4A4A4A] leading-relaxed max-w-xl mb-10">
          Whether you're looking to collaborate, need access to a protected case study, or just want to connect, I'd love to hear from you.
        </p>
        <div className="space-y-4">
          <a
            href="mailto:fernanda.nakaza@gmail.com"
            className="flex items-center gap-3 group w-fit"
          >
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#767676]">Email</span>
            <span className="text-base text-[#3B3B3B] group-hover:text-[#D6006D] transition-colors">
              fernanda.nakaza@gmail.com
            </span>
            <ArrowRightIcon className="w-4 h-4 text-[#D6006D] group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="https://linkedin.com/in/fenakaza"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group w-fit"
          >
            <span className="text-[12px] tracking-[0.18em] uppercase text-[#767676]">LinkedIn</span>
            <span className="text-base text-[#3B3B3B] group-hover:text-[#D6006D] transition-colors">
              linkedin.com/in/fenakaza
            </span>
            <ArrowRightIcon className="w-4 h-4 text-[#D6006D] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </main>
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
  if (page === 'contact') return '/contact'
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
  if (path === '/contact') return 'contact'
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
        {page === 'contact' && <ContactPage />}
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
