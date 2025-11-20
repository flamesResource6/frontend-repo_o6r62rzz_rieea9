import React, { useEffect, useMemo, useState } from 'react'
import { ArrowRight, BadgeCheck, CheckCircle2, Github, Lock, Menu, Shield, Terminal, X, Zap } from 'lucide-react'

// Simple UI primitives
const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
)

const Button: React.FC<{
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'ghost' | 'soft'
  className?: string
}> = ({ children, onClick, href, variant = 'primary', className = '' }) => {
  const base = 'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-0'
  const styles = {
    primary:
      'bg-cyan-500 text-slate-900 hover:bg-cyan-400 active:bg-cyan-300 shadow-[0_8px_24px_rgba(34,211,238,0.25)]',
    ghost:
      'bg-transparent text-cyan-300/90 hover:text-white hover:bg-slate-800/60 border border-slate-700',
    soft:
      'bg-slate-800/70 text-white hover:bg-slate-800 border border-slate-700',
  } as const

  const content = (
    <span className={`${base} ${styles[variant]} ${className}`}>{children}</span>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick} className="no-underline">
        {content}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  )
}

const SectionTitle: React.FC<{ eyebrow?: string; title: string; subtitle?: string }> = ({ eyebrow, title, subtitle }) => (
  <div className="text-center max-w-3xl mx-auto mb-10">
    {eyebrow && (
      <div className="inline-block rounded-full bg-slate-800/70 border border-slate-700 px-3 py-1 text-xs font-medium tracking-wide text-slate-300 mb-4">
        {eyebrow}
      </div>
    )}
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">{subtitle}</p>
    )}
  </div>
)

const CodeBlock: React.FC<{ lines: string[]; className?: string }> = ({ lines, className = '' }) => (
  <pre className={`relative overflow-hidden rounded-xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-900/40 p-4 sm:p-5 text-[12px] sm:text-[13px] text-slate-200 font-mono shadow-lg ${className}`}>
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1200px_300px_at_100%_0%,rgba(34,211,238,0.08),transparent_60%)]" />
    <code className="grid gap-1" aria-label="Code example">
      {lines.map((ln, i) => (
        <div key={i} className="grid grid-cols-[auto_1fr] gap-3 items-start">
          <span className="select-none text-right w-6 pr-1 text-slate-500">{i + 1}</span>
          <span className="whitespace-pre text-slate-100">{ln}</span>
        </div>
      ))}
    </code>
  </pre>
)

// Sticky Navigation
const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Product', href: '#product' },
    { label: 'How it works', href: '#how' },
    { label: 'Security', href: '#security' },
    { label: 'Docs', href: '#docs' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'GitHub', href: '#github' },
  ]

  const handleScroll = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  return (
    <div className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 ${scrolled ? 'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] border-b border-slate-800/80' : ''}`}>
      <Container className="py-3">
        <div className="flex items-center justify-between">
          <a href="#hero" onClick={(e) => handleScroll(e, '#hero')} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-900 font-black shadow-lg">
              Z
            </div>
            <span className="text-white font-bold tracking-tight">Zerkit</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a key={l.label} href={l.href} onClick={(e) => handleScroll(e, l.href)} className="text-sm text-slate-300 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
            <Button href="#quickstart" onClick={(e) => handleScroll(e, '#quickstart')}>
              Get Zerkit CLI
              <ArrowRight size={16} />
            </Button>
          </div>

          <button className="md:hidden text-slate-200" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-3 border-t border-slate-800 pt-3 space-y-2">
            {links.map((l) => (
              <a key={l.label} href={l.href} onClick={(e) => handleScroll(e, l.href)} className="block text-slate-200/90 py-2">
                {l.label}
              </a>
            ))}
            <Button href="#quickstart" onClick={(e) => handleScroll(e, '#quickstart')} className="w-full justify-center">
              Get Zerkit CLI
            </Button>
          </div>
        )}
      </Container>
    </div>
  )
}

// Hero Section
const Hero: React.FC = () => {
  const code = [
    'curl -sSL https://get.zerkit.sh | sh',
    '',
    'zerkit auth --token <one-time-token>',
    'zerkit status',
    'zerkit run deploy --env=prod',
  ]

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1000px_400px_at_20%_-10%,rgba(56,189,248,0.25),transparent_60%)]" />
      <Container className="py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-200 mb-4">
              <Shield size={14} /> Zero-trust by design
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Secure CLI for zero-trust automation.
            </h1>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Authenticate once with a short one-time token. Every subsequent command is HMAC-signed and verified by the backend — no raw API keys in CI logs, shell history, or config files.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href="#quickstart">
                Install Zerkit
                <ArrowRight size={16} />
              </Button>
              <Button href="#docs" variant="ghost">
                View docs
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
              <BadgeCheck className="text-cyan-300" size={18} />
              Verified requests, short-lived secrets, centralized audit.
            </div>
          </div>

          <div className="relative">
            <CodeBlock lines={code} />
            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-slate-200">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400 mb-2">
                <Lock size={14} /> Request timeline
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 rounded-lg bg-slate-800/70 p-3 text-sm text-slate-300">
                  Client ↔ Zerkit backend
                </div>
                <div className="text-cyan-300 text-xs whitespace-nowrap">HMAC-signed</div>
                <div className="flex items-center gap-1 text-emerald-300 text-sm">
                  <CheckCircle2 size={16} /> Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Before / After
const ProblemCompare: React.FC = () => (
  <section id="product" className="py-16 sm:py-20 lg:py-24">
    <Container>
      <SectionTitle
        eyebrow="Before & After"
        title="Eliminate key sprawl and fragile secrets management"
        subtitle="Replace environment variable chaos with a single short token and signed requests that never expose raw credentials."
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-sm font-semibold text-slate-400 mb-3">Before Zerkit</div>
          <ul className="space-y-3 text-slate-300">
            <li className="flex gap-3"><span className="text-slate-500">$</span> export API_KEY=sk_live_... <span className="ml-2 text-slate-500"># in .bash_history</span></li>
            <li className="flex gap-3"><span className="text-slate-500">$</span> echo $API_KEY <span className="ml-2 text-slate-500"># visible in CI logs</span></li>
            <li className="flex gap-3"><span className="text-slate-500">$</span> cat config.yml <span className="ml-2 text-slate-500"># committed by accident</span></li>
          </ul>
          <div className="mt-4 text-sm text-slate-400">Scattered secrets in shells, scripts, and pipelines. Hard to audit, easy to leak.</div>
        </div>

        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-sm font-semibold text-cyan-300 mb-3">After Zerkit</div>
          <ul className="space-y-3 text-slate-200">
            <li className="flex items-center gap-2"><Terminal size={16} className="text-cyan-300" /> zerkit auth --token <span className="text-slate-400">&lt;one-time-token&gt;</span></li>
            <li className="flex items-center gap-2"><Shield size={16} className="text-cyan-300" /> Derived keys stored securely</li>
            <li className="flex items-center gap-2"><Lock size={16} className="text-cyan-300" /> All commands HMAC-signed automatically</li>
          </ul>
          <div className="mt-4 text-sm text-slate-400">Short-lived token for bootstrap; everything else is signed and verified.</div>
        </div>
      </div>
    </Container>
  </section>
)

// Features Grid
const Features: React.FC = () => {
  const items = [
    { title: 'One-time token auth', desc: 'Authenticate once using a short token. Bootstrap trust without sharing raw API keys.', icon: Zap },
    { title: 'HMAC-signed commands', desc: 'Every CLI call is signed with derived keys; backend validates per request.', icon: Shield },
    { title: 'Zero raw keys in config', desc: 'No secrets in dotfiles, shell profiles, or CI logs. Stop accidental leaks.', icon: Lock },
    { title: 'Cross-platform CLI', desc: 'Runs on Linux, macOS, and Windows with identical UX.', icon: Terminal },
    { title: 'Auditable operations', desc: 'Centralized logs for who ran what, when, and where.', icon: BadgeCheck },
    { title: 'CI/CD friendly', desc: 'Drop into GitHub Actions, GitLab CI, or any pipeline without exposing secrets.', icon: Github },
  ] as const

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionTitle
          eyebrow="Key features"
          title="Security-first by default, developer experience by design"
          subtitle="Everything you need for secure automation and production-grade operations."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {items.map(({ title, desc, icon: Icon }) => (
            <div key={title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-cyan-500/15 text-cyan-300 flex items-center justify-center border border-cyan-500/20">
                  <Icon size={18} />
                </div>
                <h3 className="text-white font-semibold">{title}</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// How it works timeline
const HowItWorks: React.FC = () => {
  const steps = [
    { title: 'Download Zerkit', desc: 'Install the CLI on your laptop via script or package manager.', code: 'curl -sSL https://get.zerkit.sh | sh' },
    { title: 'Authenticate with token', desc: 'Run a one-time token to bootstrap trust.', code: 'zerkit auth --token <one-time-token>' },
    { title: 'Handshake & derived keys', desc: 'Client and server exchange nonces and derive signing keys.', code: 'handshake: ECDH + HKDF → signing keys' },
    { title: 'Signed commands', desc: 'Every subsequent command is HMAC-signed and verified by the backend.', code: 'zerkit run deploy --env=prod' },
  ] as const

  return (
    <section id="how" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionTitle eyebrow="How Zerkit works" title="From bootstrap to verified commands" />
        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <div className="grid lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="absolute -top-3 left-6 h-6 w-6 rounded-full bg-cyan-500/20 border border-cyan-400/40" />
                <div className="text-sm text-cyan-300 font-semibold mb-2">Step {i + 1}</div>
                <div className="text-white font-semibold">{s.title}</div>
                <p className="text-slate-300 text-sm mt-2">{s.desc}</p>
                <div className="mt-4 text-[12px] text-slate-400 font-mono bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2">{s.code}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// Quickstart with tabs
type TabKey = 'basic' | 'ci' | 'audit'
const Quickstart: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('basic')

  const lines = useMemo(() => {
    if (tab === 'basic')
      return [
        '# Authenticate once',
        'zerkit auth --token <one-time-token>',
        '',
        '# List environments',
        'zerkit env list',
        '',
        '# Run a production deployment',
        'zerkit run deploy --env=prod',
      ]
    if (tab === 'ci')
      return [
        '# GitHub Actions example',
        'name: Deploy',
        'on: [push]',
        'jobs:',
        '  deploy:',
        '    runs-on: ubuntu-latest',
        '    steps:',
        '      - uses: actions/checkout@v4',
        '      - name: Install Zerkit',
        '        run: curl -sSL https://get.zerkit.sh | sh',
        '      - name: Authenticate',
        '        run: zerkit auth --token ${{ secrets.ZERKIT_TOKEN }}',
        '      - name: Deploy',
        '        run: zerkit run deploy --env=prod',
      ]
    return [
      '# List recent commands',
      'zerkit audit tail --limit 20',
      '',
      '# Filter by actor, env, or command',
      'zerkit audit query --actor alice --env prod',
      '',
      '# Export for SIEM',
      'zerkit audit export --since 24h --format json',
    ]
  }, [tab])

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'basic', label: 'Basic usage' },
    { key: 'ci', label: 'CI integration' },
    { key: 'audit', label: 'Audit logs' },
  ]

  return (
    <section id="quickstart" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionTitle eyebrow="Quickstart" title="Get secure automation running in minutes" />
        <div className="flex flex-wrap gap-2 mb-4">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                tab === t.key
                  ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200'
                  : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <CodeBlock lines={lines} />
      </Container>
    </section>
  )
}

// Security highlights
const SecurityHighlights: React.FC = () => {
  const items = [
    { title: 'Zero-trust by default', desc: 'Mutual trust is derived, not assumed. Minimal standing privileges.', icon: Shield },
    { title: 'HMAC signing & replay protection', desc: 'Nonces and timestamps on every command prevent replay attacks.', icon: Lock },
    { title: 'Short-lived tokens & revocation', desc: 'Bootstrap tokens expire quickly; keys can be rotated and revoked.', icon: BadgeCheck },
  ] as const

  return (
    <section id="security" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionTitle eyebrow="Security" title="Defensible by design" subtitle="Engineered for regulated environments and production workloads." />
        <div className="grid md:grid-cols-3 gap-6">
          {items.map(({ title, desc, icon: Icon }) => (
            <div key={title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 rounded-lg bg-cyan-500/15 text-cyan-300 flex items-center justify-center border border-cyan-500/20">
                  <Icon size={18} />
                </div>
                <div className="text-white font-semibold">{title}</div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-300">
                <span className="rounded-full border border-slate-700 bg-slate-800/70 px-2 py-0.5">No raw API keys</span>
                <span className="rounded-full border border-slate-700 bg-slate-800/70 px-2 py-0.5">No .env sprawl</span>
                <span className="rounded-full border border-slate-700 bg-slate-800/70 px-2 py-0.5">Signed requests</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Social proof / teams
const SocialProof: React.FC = () => (
  <section className="py-16 sm:py-20 lg:py-24">
    <Container>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
        <div className="text-slate-300 mb-3">Trusted by security-obsessed teams</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-slate-500 text-sm">
          <div className="rounded-lg bg-slate-800/60 p-3">ACME Cloud</div>
          <div className="rounded-lg bg-slate-800/60 p-3">RailOps</div>
          <div className="rounded-lg bg-slate-800/60 p-3">Vector AI</div>
          <div className="rounded-lg bg-slate-800/60 p-3">Northwind</div>
        </div>
        <div className="mt-6 mx-auto max-w-2xl text-slate-300">
          <div className="rounded-xl bg-slate-800/60 border border-slate-700 p-6 text-left">
            <div className="text-white font-semibold mb-1">Designed for DevOps, Platform, and Security teams.</div>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              <li>Centralized policies and approvals</li>
              <li>Fine-grained permissions</li>
              <li>Developer-friendly UX & tooling</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  </section>
)

// Pricing
const Pricing: React.FC = () => (
  <section id="pricing" className="py-16 sm:py-20 lg:py-24">
    <Container>
      <SectionTitle eyebrow="Pricing" title="Simple plans that scale with your team" />
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { name: 'Free', price: '$0', features: ['Secure auth', 'HMAC signing', 'Local usage'], cta: 'Get started' },
          { name: 'Team', price: '$19', suffix: '/user/mo', features: ['Everything in Free', 'Audit logs', 'Policy controls', 'CI/CD integrations'], cta: 'Start trial' },
          { name: 'Enterprise', price: 'Contact us', features: ['SSO/SAML', 'Key management', 'Dedicated support', 'Compliance reporting'], cta: 'Talk to sales' },
        ].map((p, idx) => (
          <div key={p.name} className={`rounded-2xl border p-6 bg-slate-900/60 hover:shadow-lg transition-shadow ${idx === 1 ? 'border-cyan-400/40 shadow-[0_0_0_1px_rgba(34,211,238,0.2)_inset]' : 'border-slate-800'}`}>
            <div className="flex items-center justify-between">
              <div className="text-white font-semibold">{p.name}</div>
              {idx === 1 && (
                <span className="text-[11px] rounded-full bg-cyan-400/10 text-cyan-200 border border-cyan-400/30 px-2 py-0.5">Most popular</span>
              )}
            </div>
            <div className="mt-4 text-3xl font-extrabold text-white">
              {p.price} {p.suffix && <span className="text-base text-slate-400">{p.suffix}</span>}
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-300" /> {f}</li>
              ))}
            </ul>
            <Button className="mt-6 w-full justify-center" variant={idx === 1 ? 'primary' : 'soft'}>
              {p.cta}
            </Button>
          </div>
        ))}
      </div>
    </Container>
  </section>
)

// FAQ accordion
const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0)
  const items = [
    {
      q: 'How does Zerkit store credentials locally?',
      a: 'Derived keys are stored in a secure, OS-native keychain when available. Zerkit never stores the bootstrap token and never writes raw API keys to disk.',
    },
    {
      q: 'Can I use Zerkit in CI/CD without exposing secrets?',
      a: 'Yes. Inject a short-lived one-time token from your secret store. All subsequent commands are signed; no raw credentials appear in logs.',
    },
    {
      q: 'What happens if my laptop is lost?',
      a: 'Admins can revoke derived keys instantly. New commands from that device will fail verification. You can also rotate org keys at any time.',
    },
    {
      q: 'How hard is it to integrate Zerkit with an existing backend?',
      a: 'Zerkit speaks HTTP with HMAC signatures. Use the verification middleware in your backend to validate each request and map to your authorization model.',
    },
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionTitle eyebrow="FAQ" title="Answers for busy engineers" />
        <div className="space-y-3">
          {items.map((it, idx) => {
            const isOpen = open === idx
            return (
              <div key={it.q} className="rounded-xl border border-slate-800 bg-slate-900/60">
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                  onClick={() => setOpen(isOpen ? null : idx)}
                >
                  <span className="text-white font-semibold">{it.q}</span>
                  <span className={`transition-transform text-slate-400 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 -mt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-800">{it.a}</div>
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

// Footer
const SiteFooter: React.FC = () => (
  <footer className="pt-10 pb-14 border-t border-slate-800" id="docs">
    <Container>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-slate-300">
        <div>
          <div className="text-white font-semibold mb-2">Resources</div>
          <ul className="space-y-1">
            <li><a href="#docs" className="hover:text-white">Docs</a></li>
            <li><a href="#docs" className="hover:text-white">API Reference</a></li>
            <li><a href="#security" className="hover:text-white">Security</a></li>
            <li><a href="#" className="hover:text-white">Status</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-2">Community</div>
          <ul className="space-y-1">
            <li><a href="#github" className="hover:text-white flex items-center gap-2"><Github size={16}/> GitHub</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div className="sm:col-span-2">
          <div className="text-white font-semibold mb-2">About Zerkit</div>
          <p className="text-slate-400 text-sm max-w-md">Zerkit is a secure cross-platform CLI for zero-trust automation. Authenticate with a short token, then run HMAC-signed commands that are verified on every request.</p>
        </div>
      </div>
      <div className="mt-8 text-slate-400 text-xs">© Zerkit — Secure automation for modern teams.</div>
    </Container>
  </footer>
)

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-400/30">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(1200px_400px_at_70%_-10%,rgba(34,211,238,0.12),transparent_60%)]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(800px_300px_at_0%_20%,rgba(59,130,246,0.08),transparent_60%)]" />

      <NavBar />
      <Hero />
      <ProblemCompare />
      <Features />
      <HowItWorks />
      <Quickstart />
      <SecurityHighlights />
      <SocialProof />
      <Pricing />
      <FAQ />
      <SiteFooter />

      <a id="github" href="#" className="sr-only">GitHub</a>
    </div>
  )
}

export default App
