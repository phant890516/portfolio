import { useState, useEffect } from 'react'
import {
  Mail, Github, ExternalLink, Globe, Layers, Zap, Cpu,
  Atom, FileCode, Server, PencilRuler, Image, Video, Dices,
  Gauge, Menu, X, ArrowRight, Award, Briefcase,
  GraduationCap, MapPin
} from 'lucide-react'
import Swal from 'sweetalert2'
import Unicorn from './Unicorn'
import './index.css'

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILLS_LANG = [
  { name: 'HTML',        icon: <Globe   size={18} color="#e34c26" />, level: 90 },
  { name: 'CSS',         icon: <Layers  size={18} color="#264de4" />, level: 85 },
  { name: 'JavaScript',  icon: <Zap     size={18} color="#c9a500" />, level: 80 },
  { name: 'Python',      icon: <Cpu     size={18} color="#3776ab" />, level: 75 },
  { name: 'React',       icon: <Atom    size={18} color="#61dafb" />, level: 70 },
  { name: 'Tailwind CSS',icon: <Gauge   size={18} color="#06b6d4" />, level: 70 },
  { name: 'PHP',         icon: <FileCode size={18} color="#777bb4" />, level: 70 },
  { name: 'Flask',       icon: <Server  size={18} color="#94a3b8" />, level: 85 },
]

const SKILLS_TOOL = [
  { name: 'Figma',      icon: <PencilRuler size={18} color="#a259ff" />, level: 85 },
  { name: 'Photoshop',  icon: <Image       size={18} color="#31a8ff" />, level: 90 },
  { name: 'Premiere',   icon: <Video       size={18} color="#9999ff" />, level: 95 },
  { name: 'Maya',       icon: <Dices       size={18} color="#00c2e4" />, level: 85 },
]

const CERTS = [
  { name: '日本語能力試験 JLPT N1',                  org: '国際交流基金 / 日本国際教育支援協会', date: '2025', color: '#DC2626', icon: '🇯🇵' },
  { name: 'J検 情報活用試験 1級',                    org: '日本情報処理検定協会',               date: '2025', color: '#0ea5e9', icon: '💻' },
  { name: '基本情報技術者',                          org: '情報処理推進機構（IPA）',             date: '2025', color: '#2563eb', icon: '🖥️' },
  { name: 'J検 情報システム試験 システムデザインスキル', org: '日本情報処理検定協会',               date: '2025', color: '#0ea5e9', icon: '🛠️' },
  { name: 'マルチメディア検定 ベーシック',            org: 'CG-ARTS（画像情報教育振興協会）',      date: '2025', color: '#8b5cf6', icon: '🎨' },
  { name: 'Webデザイナー検定 ベーシック',             org: 'CG-ARTS（画像情報教育振興協会）',                     date: '2025', color: '#22c55e', icon: '🌐' },
]

const EXPERIENCE = [
  {
    type: 'edu',
    title: 'HAL大阪 Web科',
    org: 'HAL大阪専門学校',
    period: '2024 – 現在',
    desc: 'フルスタックWeb開発を中心に学習。React・Flask・Three.js・WebGLなど幅広い技術を習得。チームプロジェクトや個人制作を通じて実践力を養っている。',
  },
  {
    type: 'work',
    title: 'ECサイトの制作',
    org: 'HAL大阪 チームプロジェクト',
    period: '2025.6 – 2025.11',
    desc: 'ECサイトの開発において、要件定義から設計・実装・テストまで一貫して担当。Flaskを用いたAPI開発を行い、フロントエンドとバックエンド間の通信機能を実装した。',
  },
  {
    type: 'project',
    title: '実験シミュレーションアプリ開発',
    org: 'HAL大阪 チームプロジェクト',
    period: '2026 – 現在',
    desc: 'Node.Js + WebSocket を使った教育アプリの開発。バックエンドAPI設計・フロントエンド実装まで担当。',
  },
]

const WORKS = [
  { id: 1, title: 'News App',          cat: 'JavaScript / API',   img: 'images/news.png',    url: 'https://get-xml-news.vercel.app/' },
  { id: 2, title: 'Wolf Hunter',       cat: 'Next.js',            img: 'images/wolf_hunter_page.png', url: 'https://wolf-hunter2023-l5s1.vercel.app/' },
  { id: 3, title: 'Subkari EC Site',   cat: 'Web Design / Flask', img: 'images/Subkari.png',          url: 'https://github.com/phant890516/subkari_ec' },
  { id: 4, title: 'Galaxy Simulator',  cat: '3D / Three.js',      img: 'images/galaxy.png',           url: 'https://galaxy-simulator-git-main-phants-projects-e741a5f4.vercel.app/' },
  { id: 5, title: 'Budgeting App',     cat: 'Firebase / React',   img: 'images/budgeting16-9.png',    url: 'https://budget-system-psi.vercel.app/' },
  { id: 6, title: 'Vitual Chemistry Laboratory',  cat: 'Three.js / WebSocket',   img: 'images/VCL.png',url: 'https://github.com/phant890516/VCL' },
]

const SECTIONS = [
  { id: 'hero',    label: 'TOP' },
  { id: 'skills',  label: 'スキル' },
  { id: 'certs',   label: '資格・認定' },
  { id: 'exp',     label: '開発経歴' },
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
      <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400"
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="text-xs text-slate-500 w-7 text-right">{level}%</span>
    </div>
  </div>
)

const CertCard = ({ name, org, date, color, icon }) => (
  <div className="card-hover bg-[#15132b] rounded-xl border border-[#2a2550] p-5 flex items-start gap-4">
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
      style={{ background: `${color}20` }}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <p className="font-semibold text-slate-100 text-sm leading-snug">{name}</p>
      <p className="text-xs text-slate-500 mt-1">{org}</p>
      <span className="tag mt-2 inline-block">{date}</span>
    </div>
  </div>
)

const TimelineItem = ({ item, isLast }) => {
  const icons = { edu: GraduationCap, work: Briefcase, project: Award }
  const colors = { edu: '#6366f1', work: '#8b5cf6', project: '#22c55e' }
  const Icon = icons[item.type]
  const color = colors[item.type]
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}18`, border: `2px solid ${color}50` }}
        >
          <Icon size={17} color={color} />
        </div>
        {!isLast && <div className="w-px bg-slate-700 flex-1 mt-1 mb-1" />}
      </div>
      <div className={`${isLast ? 'pb-0' : 'pb-8'}`}>
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h3 className="font-semibold text-slate-100">{item.title}</h3>
          <span className="tag">{item.period}</span>
        </div>
        <p className="text-xs font-medium text-violet-400 mb-2">{item.org}</p>
        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
      </div>
    </div>
  )
}

const WorkCard = ({ work }) => (
  <a href={work.url} target="_blank" rel="noopener noreferrer" className="group block">
    <div className="card-hover bg-[#15132b] rounded-xl overflow-hidden border border-[#2a2550] h-full">
      <div className="relative overflow-hidden aspect-video bg-[#100d22]">
        <img
          src={work.img}
          alt={work.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink size={13} className="text-white" />
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-violet-400 font-medium mb-1">{work.cat}</p>
        <h3 className="font-semibold text-slate-100 group-hover:text-violet-400 transition-colors">{work.title}</h3>
      </div>
    </div>
  </a>
)

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const [formResult, setFormResult] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setIsSubmitting(true)
    setFormResult('')
    const formData = new FormData(e.target)
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY)
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.success) {
        Swal.fire({ title: '送信完了！', text: 'メッセージを受け取りました。', icon: 'success' })
        e.target.reset()
      } else {
        setFormResult(data.message)
      }
    } catch {
      setFormResult('送信に失敗しました。再度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0a1e]">

      {/* ── Navigation ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0a1e]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="text-xl font-bold text-white tracking-tight hover:opacity-80 transition-opacity">
            LIN<span className="text-violet-400">.</span>DEV
          </button>

          <nav className="hidden md:flex items-center gap-10">
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
            className="hidden cursor-pointer md:flex items-center gap-2 bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm shadow-violet-500/30"
          >
            <Mail size={14} /> お問い合わせ
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#100d22] border-t border-white/5 px-6 py-4 flex flex-col gap-3">
            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left text-slate-400 hover:text-violet-400 font-medium py-1.5 border-b border-white/5 last:border-0"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">

        {/* ── Hero ── */}
        <section id="hero" className="min-h-screen relative overflow-hidden flex items-end justify-center pb-24">
          <div className="absolute inset-0 z-0">
            <div className="wrapper relative w-full h-screen bg-[#060606]">
              <Unicorn/>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0b0a1e] z-10 pointer-events-none" />

          <div className="text-center px-6 relative z-20">
            {/* <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-violet-300 text-sm font-medium rounded-full mb-7">
              フルスタックエンジニア志望
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-3 leading-tight tracking-tight drop-shadow-lg">
              LIN HENGYOU
            </h1>
            <p className="text-lg text-slate-300 mb-3 font-medium">林 恆佑</p>
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-8">
              <MapPin size={13} />
              <span>大阪府 / 台湾出身</span>
            </div>
            <p className="max-w-lg mx-auto text-slate-300 leading-relaxed mb-10 text-base drop-shadow">
              HAL大阪 Web科に在学中。React・Flask・Three.js を中心に学び、
              3Dアニメーションの知識を活かしたビジュアル表現が得意です。
            </p> */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollTo('works')}
                className="flex items-center gap-2 bg-violet-500 hover:bg-violet-400 text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-violet-500/30 cursor-pointer transition-all"
              >
                作品を見る <ArrowRight size={16} />
              </button>
              <a
                href="https://github.com/phant890516"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-7 py-3 rounded-xl border border-white/20 transition-all"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="py-24 px-6 bg-[#0b0a1e]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-12">
              <h2 className="section-title">スキル</h2>
              <p className="text-sm text-slate-500">習得済み・学習中の技術スタック</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Language &amp; Framework</p>
                <div className="flex flex-col gap-3">
                  {SKILLS_LANG.map((s) => <SkillBar key={s.name} {...s} />)}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Design &amp; 3D Tools</p>
                <div className="flex flex-col gap-3">
                  {SKILLS_TOOL.map((s) => <SkillBar key={s.name} {...s} />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Certifications ── */}
        <section id="certs" className="py-24 px-6 bg-[#100d22]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-12">
              <h2 className="section-title">資格・認定</h2>
              <p className="text-sm text-slate-500">取得済みの資格・バッジ一覧</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CERTS.map((c) => <CertCard key={c.name} {...c} />)}
            </div>
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="exp" className="py-24 px-6 bg-[#0b0a1e]">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-12">
              <h2 className="section-title">経歴</h2>
              <p className="text-sm text-slate-500">学歴・プロジェクト経験</p>
            </div>
            <div>
              {EXPERIENCE.map((item, i) => (
                <TimelineItem key={i} item={item} isLast={i === EXPERIENCE.length - 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="works" className="py-24 px-6 bg-[#100d22]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-12">
              <h2 className="section-title">プロジェクト</h2>
              <p className="text-sm text-slate-500">2024 – 2026 制作物</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WORKS.map((w) => <WorkCard key={w.id} work={w} />)}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="py-24 px-6 bg-[#0b0a1e]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-12">
              <h2 className="section-title">連絡先</h2>
              <p className="text-sm text-slate-500">お気軽にご連絡ください</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">お問い合わせ</h3>
                </div>
                <div className="space-y-3">
                  <a
                    href="mailto:phant890516@gmail.com"
                    className="flex items-center gap-3 p-4 bg-[#15132b] rounded-xl border border-[#2a2550] hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all group"
                  >
                    <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                      <Mail size={17} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="text-sm font-medium text-slate-300">phant890516@gmail.com</p>
                    </div>
                  </a>
                  <a
                    href="https://github.com/phant890516"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-[#15132b] rounded-xl border border-[#2a2550] hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all group"
                  >
                    <div className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                      <Github size={17} className="text-slate-300" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">GitHub</p>
                      <p className="text-sm font-medium text-slate-300">github.com/phant890516</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="bg-[#15132b] rounded-2xl border border-[#2a2550] p-8 space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-slate-400 mb-1.5">お名前</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="山田 太郎"
                    required
                    className="w-full h-11 px-4 bg-[#100d22] border border-[#2a2550] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-slate-400 mb-1.5">メールアドレス</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    required
                    className="w-full h-11 px-4 bg-[#100d22] border border-[#2a2550] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-slate-400 mb-1.5">メッセージ</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="ご用件をご記入ください"
                    required
                    className="w-full px-4 py-3 bg-[#100d22] border border-[#2a2550] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                  />
                </div>
                {formResult && <p className="text-sm text-red-400">{formResult}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-violet-500 hover:bg-violet-400 active:bg-violet-600 disabled:bg-violet-500/40 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20"
                >
                  <Mail size={16} /> {isSubmitting ? '送信中...' : '送信する'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#08071a] text-slate-600 py-8 text-center text-sm border-t border-white/5">
        <p>© 2025 LIN HENGYOU. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  )
}
