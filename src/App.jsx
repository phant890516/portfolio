import { useState, useEffect, useRef } from 'react'
import {
  Mail, Github, ExternalLink, Globe, Layers, Zap, Cpu,
  Atom, Timer, Server, PencilRuler, Image, Video, Dices,
  Gauge, Menu, X, ArrowRight, Award, Briefcase,
  GraduationCap, MapPin
} from 'lucide-react'
import Swal from 'sweetalert2'
import './index.css'

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILLS_LANG = [
  { name: 'HTML',        icon: <Globe   size={18} color="#e34c26" />, level: 90 },
  { name: 'CSS',         icon: <Layers  size={18} color="#264de4" />, level: 85 },
  { name: 'JavaScript',  icon: <Zap     size={18} color="#c9a500" />, level: 80 },
  { name: 'Python',      icon: <Cpu     size={18} color="#3776ab" />, level: 75 },
  { name: 'React',       icon: <Atom    size={18} color="#61dafb" />, level: 70 },
  { name: 'Tailwind CSS',icon: <Gauge   size={18} color="#06b6d4" />, level: 70 },
  { name: 'GSAP',        icon: <Timer   size={18} color="#88ce02" />, level: 70 },
  { name: 'Flask',       icon: <Server  size={18} color="#94a3b8" />, level: 85 },
]

const SKILLS_TOOL = [
  { name: 'Figma',      icon: <PencilRuler size={18} color="#a259ff" />, level: 85 },
  { name: 'Photoshop',  icon: <Image       size={18} color="#31a8ff" />, level: 90 },
  { name: 'Premiere',   icon: <Video       size={18} color="#9999ff" />, level: 95 },
  { name: 'Maya',       icon: <Dices       size={18} color="#00c2e4" />, level: 85 },
]

const CERTS = [
  { name: 'AWS Certified Cloud Practitioner',      org: 'Amazon Web Services', date: '2025', color: '#FF9900', icon: '☁️' },
  { name: 'AWS Certified AI Practitioner',         org: 'Amazon Web Services', date: '2025', color: '#FF9900', icon: '🤖' },
  { name: 'AWS Full Stack Dev',                    org: 'Amazon Web Services', date: '2025', color: '#FF9900', icon: '⚡' },
  { name: 'AWS Cloud Quest – Developer',           org: 'Amazon Web Services', date: '2025', color: '#FF9900', icon: '🎯' },
  { name: 'Atlassian Teamwork Fundamentals',       org: 'Atlassian',           date: '2025', color: '#0052CC', icon: '🔵' },
  { name: 'Confluence Fundamentals',               org: 'Atlassian',           date: '2025', color: '#0052CC', icon: '📘' },
  { name: 'Jira Fundamentals',                     org: 'Atlassian',           date: '2025', color: '#0052CC', icon: '📋' },
  { name: 'Cloud Essentials',                      org: 'LinkedIn Learning',   date: '2025', color: '#0ea5e9', icon: '🌐' },
  { name: 'Frontend Developer (React)',             org: 'HackerRank',          date: '2025', color: '#22c55e', icon: '⚛️' },
]

const EXPERIENCE = [
  {
    type: 'edu',
    title: 'HAL大阪 Web科',
    org: 'HAL大阪専門学校',
    period: '2023 – 現在',
    desc: 'フルスタックWeb開発を中心に学習。React・Flask・Three.js・WebGLなど幅広い技術を習得。チームプロジェクトや個人制作を通じて実践力を養っている。',
  },
  {
    type: 'work',
    title: 'フリーランス Web制作',
    org: 'Self-Employed',
    period: '2024 – 現在',
    desc: 'Webデザイン・開発案件を受託。Figmaでのプロトタイプ制作からReactによる実装・デプロイまで一貫して対応。',
  },
  {
    type: 'project',
    title: 'Chatwork アプリ開発',
    org: 'HAL大阪 チームプロジェクト',
    period: '2024',
    desc: 'Flask + React を使ったチャットアプリを開発。バックエンドAPI設計・フロントエンド実装・Renderへのデプロイまで担当。',
  },
]

const WORKS = [
  { id: 1, title: 'News App',          cat: 'JavaScript / API',   img: 'images/vendorMachine.png',    url: 'https://get-xml-news.onrender.com' },
  { id: 2, title: 'Wolf Hunter',       cat: 'Next.js',            img: 'images/wolf_hunter_page.png', url: 'https://wolfhunter2023.onrender.com/' },
  { id: 3, title: 'Subkari EC Site',   cat: 'Web Design / Flask', img: 'images/Subkari.png',          url: 'https://subkari.onrender.com' },
  { id: 4, title: 'Galaxy Simulator',  cat: '3D / Three.js',      img: 'images/galaxy.png',           url: 'https://galaxy-simulator-sigma.vercel.app/' },
  { id: 5, title: 'Budgeting App',     cat: 'Firebase / React',   img: 'images/budgeting16-9.png',    url: 'https://studio--studio-1553764776-f6733.us-central1.hosted.app/' },
  { id: 6, title: 'Water Simulation',  cat: 'Three.js / WebGL',   img: 'images/water.png',            url: '#' },
]

const SECTIONS = [
  { id: 'hero',    label: 'TOP' },
  { id: 'skills',  label: 'スキル' },
  { id: 'certs',   label: '資格・認定' },
  { id: 'exp',     label: '職務経歴' },
  { id: 'works',   label: 'プロジェクト' },
  { id: 'contact', label: '連絡先' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const SkillBar = ({ name, icon, level }) => (
  <div className="skill-pill justify-between">
    <div className="flex items-center gap-2">
      {icon}
      <span>{name}</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="text-xs text-slate-400 w-7 text-right">{level}%</span>
    </div>
  </div>
)

const CertCard = ({ name, org, date, color, icon }) => (
  <div className="card-hover bg-white rounded-xl border border-slate-100 p-5 flex items-start gap-4 shadow-sm">
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
      style={{ background: `${color}18` }}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <p className="font-semibold text-slate-800 text-sm leading-snug">{name}</p>
      <p className="text-xs text-slate-400 mt-1">{org}</p>
      <span className="tag mt-2 inline-block">{date}</span>
    </div>
  </div>
)

const TimelineItem = ({ item, isLast }) => {
  const icons = { edu: GraduationCap, work: Briefcase, project: Award }
  const colors = { edu: '#6366f1', work: '#3b82f6', project: '#22c55e' }
  const Icon = icons[item.type]
  const color = colors[item.type]
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}15`, border: `2px solid ${color}50` }}
        >
          <Icon size={17} color={color} />
        </div>
        {!isLast && <div className="w-px bg-slate-200 flex-1 mt-1 mb-1" />}
      </div>
      <div className={`${isLast ? 'pb-0' : 'pb-8'}`}>
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h3 className="font-semibold text-slate-800">{item.title}</h3>
          <span className="tag">{item.period}</span>
        </div>
        <p className="text-xs font-medium text-blue-500 mb-2">{item.org}</p>
        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
      </div>
    </div>
  )
}

const WorkCard = ({ work }) => (
  <a href={work.url} target="_blank" rel="noopener noreferrer" className="group block">
    <div className="card-hover bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm h-full">
      <div className="relative overflow-hidden aspect-video bg-slate-100">
        <img
          src={work.img}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink size={13} className="text-slate-700" />
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-blue-500 font-medium mb-1">{work.cat}</p>
        <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{work.title}</h3>
      </div>
    </div>
  </a>
)

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const [formResult, setFormResult] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.35 }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormResult('送信中...')
    const formData = new FormData(e.target)
    formData.append('access_key', '574c9f9c-42d0-47a9-9fe6-a537f2625547')
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
    const data = await res.json()
    if (data.success) {
      Swal.fire({ title: '送信完了！', text: 'メッセージを受け取りました。', icon: 'success' })
      e.target.reset()
      setFormResult('')
    } else {
      setFormResult(data.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8]">

      {/* ── Navigation ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/70 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="text-xl font-bold text-slate-800 tracking-tight hover:opacity-80 transition-opacity">
            LIN<span className="text-blue-500">.</span>DEV
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`nav-link ${active === id ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:flex items-center gap-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <Mail size={14} /> お問い合わせ
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-3">
            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left text-slate-600 hover:text-blue-600 font-medium py-1.5 border-b border-slate-50 last:border-0"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">

        {/* ── Hero ── */}
        <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef2ff] via-[#f0f4f8] to-[#e0f2fe] relative overflow-hidden">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-indigo-200/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-100/20 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center px-6 relative z-10">
            <span className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium rounded-full mb-7">
              フルスタックエンジニア志望
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-3 leading-tight tracking-tight">
              LIN HENGYOU
            </h1>
            <p className="text-lg text-slate-500 mb-3 font-medium">林 恒佑</p>
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-8">
              <MapPin size={13} />
              <span>大阪府 / 台湾出身</span>
            </div>
            <p className="max-w-lg mx-auto text-slate-600 leading-relaxed mb-10 text-base">
              HAL大阪 Web科に在学中。React・Flask・Three.js を中心に学び、
              3Dアニメーションの知識を活かしたビジュアル表現が得意です。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollTo('works')}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-7 py-3 rounded-xl shadow-md shadow-blue-200/60 transition-all hover:shadow-blue-300/60"
              >
                作品を見る <ArrowRight size={16} />
              </button>
              <a
                href="https://github.com/phant890516"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-7 py-3 rounded-xl border border-slate-200 shadow-sm transition-all"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-12">
              <h2 className="section-title">スキル</h2>
              <p className="text-sm text-slate-400">習得済み・学習中の技術スタック</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Language &amp; Framework</p>
                <div className="flex flex-col gap-3">
                  {SKILLS_LANG.map((s) => <SkillBar key={s.name} {...s} />)}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Design &amp; 3D Tools</p>
                <div className="flex flex-col gap-3">
                  {SKILLS_TOOL.map((s) => <SkillBar key={s.name} {...s} />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Certifications ── */}
        <section id="certs" className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-12">
              <h2 className="section-title">資格・認定</h2>
              <p className="text-sm text-slate-400">取得済みの資格・バッジ一覧</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CERTS.map((c) => <CertCard key={c.name} {...c} />)}
            </div>
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="exp" className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-12">
              <h2 className="section-title">職務経歴</h2>
              <p className="text-sm text-slate-400">学歴・プロジェクト経験</p>
            </div>
            <div>
              {EXPERIENCE.map((item, i) => (
                <TimelineItem key={i} item={item} isLast={i === EXPERIENCE.length - 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="works" className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-12">
              <h2 className="section-title">プロジェクト</h2>
              <p className="text-sm text-slate-400">2024 – 2025 制作物</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WORKS.map((w) => <WorkCard key={w.id} work={w} />)}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-12">
              <h2 className="section-title">連絡先</h2>
              <p className="text-sm text-slate-400">お気軽にご連絡ください</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">お問い合わせ情報</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    お仕事のご依頼・採用のご相談など、お気軽にメッセージをお送りください。
                    通常 1〜2 営業日以内にご返信します。
                  </p>
                </div>
                <div className="space-y-3">
                  <a
                    href="mailto:phant890516@gmail.com"
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Mail size={17} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Email</p>
                      <p className="text-sm font-medium text-slate-700">phant890516@gmail.com</p>
                    </div>
                  </a>
                  <a
                    href="https://github.com/phant890516"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                      <Github size={17} className="text-slate-700" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">GitHub</p>
                      <p className="text-sm font-medium text-slate-700">github.com/phant890516</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">お名前</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="山田 太郎"
                    required
                    className="w-full h-11 px-4 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">メールアドレス</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    required
                    className="w-full h-11 px-4 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">メッセージ</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="ご用件をご記入ください"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  />
                </div>
                {formResult && <p className="text-sm text-slate-400">{formResult}</p>}
                <button
                  type="submit"
                  className="w-full h-12 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Mail size={16} /> 送信する
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>© 2025 LIN HENGYOU. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  )
}
