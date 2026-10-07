import { PERFORMANCE_SRC } from './audio'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Typed from './vendor/typed.js'
import './App.css'
import {
  featuredProjects,
  intro,
  profile,
  research,
  skills,
  workingExperience,
} from './content'
import { featuredProjectDetails } from './featuredProjectDetails'
import { galleryDetailBlocks } from './galleryDetailBlocks'
import { galleryDescriptions } from './galleryDescriptions'
import { legacyGallery } from './legacyGallery'

const legacyItemsBySection = Object.fromEntries(
  legacyGallery.map((block) => [block.section, block.items]),
)

const projectSubsections = [
  {
    id: 'ai-ml',
    title: 'AI & machine learning',
    featured: featuredProjects.aiMl,
    legacySections: ['AI projects'],
  },
  {
    id: 'game-dev',
    title: 'Game development',
    legacySections: ['Game project'],
  },
  {
    id: 'web-apps',
    title: 'Web applications',
    legacySections: ['Website projects'],
  },
  {
    id: 'systems',
    title: 'Systems & architecture',
    featured: featuredProjects.systems,
    legacySections: ['Computer architecture projects', 'Operating System'],
  },
]

const assetUrl = (path) => {
  if (!path) return path
  if (/^https?:\/\//i.test(path)) return path
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${String(path).replace(/^\//, '')}`
}

const mainNavItems = [
  { id: 'about', label: 'About' },
  { id: 'working-experience', label: 'Working Experience' },
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function useSectionSpy(sectionIds, enabled) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    if (!enabled || !sectionIds.length) return undefined

    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!nodes.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.08, 0.2, 0.35, 0.5],
      },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [enabled, sectionIds.join('|')])

  return [activeId, setActiveId]
}

function ProjectDetailBody({ item }) {
  const blocks =
    (item.detailKey && featuredProjectDetails[item.detailKey]) ||
    galleryDetailBlocks[item.title] ||
    item.detailBlocks ||
    null

  if (blocks?.length) {
    return (
      <div className="project-modal-body project-modal-rich">
        {blocks.map((block, i) => {
          if (block.type === 'heading') {
            return (
              <h5 key={i} className="project-modal-h">
                {block.text}
              </h5>
            )
          }
          if (block.type === 'subheading') {
            return (
              <h6 key={i} className="project-modal-subh">
                {block.text}
              </h6>
            )
          }
          if (block.type === 'list') {
            return (
              <ul key={i} className="project-modal-list">
                {block.items.map((line) => (
                  <li key={line.slice(0, 48)}>{line}</li>
                ))}
              </ul>
            )
          }
          if (block.type === 'link') {
            return (
              <p key={i} className="project-modal-link-wrap">
                <a
                  className={`project-modal-link${block.hoverPreview ? ' has-hover-preview' : ''}`}
                  href={block.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {block.text || block.href}
                  {block.hoverPreview ? (
                    <span className="project-link-preview" aria-hidden="true">
                      <img
                        src={assetUrl(block.hoverPreview)}
                        alt={block.hoverPreviewAlt || ''}
                        loading="lazy"
                      />
                    </span>
                  ) : null}
                </a>
              </p>
            )
          }
          if (block.type === 'video' && block.youtubeId) {
            return (
              <div key={i} className="project-modal-video">
                <iframe
                  title={block.title || 'Project demo'}
                  src={`https://www.youtube.com/embed/${block.youtubeId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )
          }
          return (
            <p key={i} className="project-modal-p">
              {block.text}
            </p>
          )
        })}
      </div>
    )
  }

  const description =
    item.description ??
    galleryDescriptions[item.title] ??
    'Undergraduate portfolio project.'

  return <p className="project-modal-body">{description}</p>
}

function ProjectDetailModal({ detail, onClose }) {
  const dialogRef = useRef(null)
  const { item, imageIndex } = detail
  const images = item.images ?? []
  const isRich =
    Boolean(item.detailKey && featuredProjectDetails[item.detailKey]) ||
    Boolean(galleryDetailBlocks[item.title]?.length) ||
    Boolean(item.detailBlocks?.length)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const showImage = images.length > 0
  const activeSrc = showImage ? images[imageIndex] : null

  return createPortal(
    <div
      className="project-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`project-modal${isRich ? ' project-modal-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h4 id="project-modal-title" className="project-modal-title">
          {item.title}
        </h4>
        {item.dates ? (
          <p className="project-modal-meta">{item.dates}</p>
        ) : null}
        {activeSrc ? (
          <div className="project-modal-media">
            <img src={activeSrc} alt="" />
          </div>
        ) : null}
        <ProjectDetailBody item={item} />
        {images.length > 1 ? (
          <p className="project-modal-hint">
            Screenshot {imageIndex + 1} of {images.length}
          </p>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}

function GalleryPortfolioItems({ items }) {
  const [detail, setDetail] = useState(null)

  if (!items?.length) return null

  const openDetail = (item, imageIndex = 0) => {
    setDetail({ item, imageIndex })
  }

  return (
    <>
      <div className="gallery-items">
        {items.map((item) => {
          const videos = item.videos ?? []
          const inline = Boolean(item.inlineDetails)
          const images = item.images ?? []
          const liveHref =
            item.href && /\.web\.app(\/|$)/i.test(item.href) ? item.href : null

          const showScreenshotHint = !inline && images.length > 0
          const showWriteUpLink =
            !inline && !videos.length && images.length === 0

          return (
            <article key={item.title} className="gallery-item">
              <div className="gallery-title-row">
                <p className="gallery-title">{item.title}</p>
                {liveHref ? (
                  <a
                    className={`gallery-live-link project-modal-link${item.hoverPreview ? ' has-hover-preview' : ''}`}
                    href={liveHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {liveHref}
                    {item.hoverPreview ? (
                      <span className="project-link-preview" aria-hidden="true">
                        <img
                          src={assetUrl(item.hoverPreview)}
                          alt={item.hoverPreviewAlt || ''}
                          loading="lazy"
                        />
                      </span>
                    ) : null}
                  </a>
                ) : null}
              </div>
              {showScreenshotHint ? (
                <p className="gallery-prompt">Click a screenshot for details</p>
              ) : null}
              {showWriteUpLink ? (
                <button
                  type="button"
                  className="gallery-prompt gallery-write-up-btn"
                  onClick={() => openDetail(item, 0)}
                >
                  Click for full write-up
                </button>
              ) : null}
              {inline ? (
                <div className="gallery-inline-details">
                  <ProjectDetailBody item={item} />
                </div>
              ) : null}
              {videos.length > 0 ? (
                <div className="gallery-video-rows">
                  {videos.map((vid) => (
                    <div key={vid.youtubeId} className="gallery-video-row">
                      <a
                        className="gallery-video-thumb"
                        href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={`https://i.ytimg.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                          alt={vid.title || 'YouTube demo'}
                          loading="lazy"
                        />
                        <span className="gallery-video-play" aria-hidden="true">
                          ▶
                        </span>
                      </a>
                      <div className="gallery-video-copy">
                        {vid.title ? (
                          <p className="gallery-video-title">{vid.title}</p>
                        ) : null}
                        {vid.points?.length ? (
                          <ul>
                            {vid.points.map((pt) => (
                              <li key={pt.slice(0, 48)}>{pt}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              {images.length > 0 ? (
                <>
                  <div className="gallery-images">
                    {images.map((src, index) =>
                      inline ? (
                        <figure key={src} className="gallery-thumb gallery-thumb-static">
                          <img
                            src={src}
                            alt={item.imageCaptions?.[index] || ''}
                            loading="lazy"
                          />
                          {item.imageCaptions?.[index] ? (
                            <figcaption className="gallery-caption">
                              {item.imageCaptions[index]}
                            </figcaption>
                          ) : null}
                        </figure>
                      ) : (
                        <button
                          key={src}
                          type="button"
                          className="gallery-thumb"
                          onClick={() => openDetail(item, index)}
                        >
                          <img
                            src={src}
                            alt={item.imageCaptions?.[index] || ''}
                            loading="lazy"
                          />
                          {item.imageCaptions?.[index] ? (
                            <span className="gallery-caption">
                              {item.imageCaptions[index]}
                            </span>
                          ) : null}
                        </button>
                      ),
                    )}
                  </div>
                </>
              ) : null}
            </article>
          )
        })}
      </div>
      {detail ? (
        <ProjectDetailModal detail={detail} onClose={() => setDetail(null)} />
      ) : null}
    </>
  )
}

function FeaturedProjectCards({ items }) {
  const [detail, setDetail] = useState(null)

  if (!items?.length) return null

  return (
    <>
      <div className="project-grid">
        {items.map((p) => {
          const expandable =
            p.detailKey && featuredProjectDetails[p.detailKey]
          const Tag = expandable ? 'button' : 'article'
          return (
            <Tag
              key={p.title}
              type={expandable ? 'button' : undefined}
              className={`project${expandable ? ' project-clickable' : ''}`}
              onClick={
                expandable
                  ? () => setDetail({ item: p, imageIndex: 0 })
                  : undefined
              }
            >
              <h4>{p.title}</h4>
              <p className="meta">{p.dates}</p>
              <p>{p.blurb}</p>
              {expandable ? (
                <span className="project-more">Click for full write-up</span>
              ) : null}
            </Tag>
          )
        })}
      </div>
      {detail ? (
        <ProjectDetailModal detail={detail} onClose={() => setDetail(null)} />
      ) : null}
    </>
  )
}

function HeroRoles({ motionOk }) {
  const textRef = useRef(null)
  const text = 'Backend engineer, Software engineer, Research assistant | AI agents · ML research · Software development'

  useEffect(() => {
    if (!motionOk) return undefined
    const options = {
      typeSpeed: 55,
      backSpeed: 28,
      backDelay: 2200,
      startDelay: 350,
      loop: true,
      smartBackspace: true,
    }
    const typed = new Typed(textRef.current, { ...options, strings: [text] })
    return () => {
      typed.destroy()
    }
  }, [motionOk])

  return (
    <div className="hero-roles">
      <div className="hero-role-row">
        <div className="eyebrow hero-typing-lines">
          <div aria-hidden="true">
            {motionOk ? <span ref={textRef} /> : text}
          </div>
          <span className="sr-only">{text}</span>
        </div>
      </div>
    </div>
  )
}

function CursorGlow({ enabled }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!enabled) return undefined
    const el = ref.current
    if (!el) return undefined

    const onMove = (e) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`)
      document.documentElement.style.setProperty('--my', `${e.clientY}px`)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])

  if (!enabled) return null
  return <div className="cursor-glow" ref={ref} aria-hidden="true" />
}

/** Full-bleed first page — skylining-style slide + autoplaying piano video bg */
function IntroGate({ onEnter, soundOn, onToggleSound, videoRef, exiting }) {
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.loop = true
    v.playsInline = true
    v.muted = !soundOn
    v.volume = 0.4
    void v.play().catch(() => {})
  }, [videoRef, soundOn])

  useEffect(() => {
    const onWheel = (e) => {
      if (e.deltaY > 18) onEnter()
    }
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        onEnter()
      }
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [onEnter])

  return (
    <section
      className={`sky-intro ${exiting ? 'is-exiting' : ''}`}
      aria-label="Introduction"
    >
      <div className="sky-video-wrap">
        <video
          ref={videoRef}
          className="sky-video"
          src={PERFORMANCE_SRC}
          autoPlay
          muted={!soundOn}
          loop
          playsInline
          preload="auto"
        />
        <div className="sky-video-veil" />
        <div className="sky-video-grain" />
      </div>

      <div className="sky-slide-panels" aria-hidden="true">
        <span className="sky-panel sky-panel-a" />
        <span className="sky-panel sky-panel-b" />
        <span className="sky-panel sky-panel-c" />
      </div>

      <header className="sky-top">
        <p className="sky-brand">{profile.shortName}</p>
      </header>

      <button
        type="button"
        className="sky-sound"
        onClick={onToggleSound}
        aria-pressed={soundOn}
      >
        {soundOn ? '♪ Mute piano' : '♪ Enable sound'}
      </button>

      <div className="sky-center">
        <p className="sky-kicker slide-up d1">
          I have been playing the piano for 10 years
        </p>
        <h1 className="sky-title">
          <span className="slide-up d2">{intro.greeting}</span>
        </h1>
        <p className="sky-sub slide-up d3">{profile.rolesLine}</p>
        <p className="sky-lead slide-up d4">{intro.lead}</p>
        <div className="sky-cta slide-up d5">
          <button type="button" className="enter-btn" onClick={onEnter}>
            Enter portfolio
            <span aria-hidden="true">↓</span>
          </button>
          <p className="sky-scroll-hint">Scroll or press Enter</p>
        </div>
      </div>

      <div className="sky-bottom slide-up d6">
        <span className="sky-live" />
        <span>Piano performance · autoplaying</span>
      </div>
    </section>
  )
}

function App() {
  const [entered, setEntered] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [motionOk, setMotionOk] = useState(true)
  const [soundOn, setSoundOn] = useState(false)
  const introVideoRef = useRef(null)
  const enteredVideoRef = useRef(null)

  const mainNavIds = mainNavItems.map((n) => n.id)
  const projectNavIds = projectSubsections.map((s) => s.id)
  const [activeNav, setActiveNav] = useSectionSpy(mainNavIds, entered)
  const [activeProjectNav, setActiveProjectNav] = useSectionSpy(
    projectNavIds,
    entered,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setMotionOk(!mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const activeVideo = () =>
    entered ? enteredVideoRef.current : introVideoRef.current

  const applySound = async (nextOn) => {
    const v = activeVideo()
    if (!v) {
      setSoundOn(nextOn)
      return
    }
    v.volume = 0.4
    if (nextOn) {
      v.muted = false
      try {
        await v.play()
        setSoundOn(true)
      } catch {
        // Autoplay-with-sound blocked; keep UI honest
        v.muted = true
        setSoundOn(false)
      }
      return
    }
    v.muted = true
    setSoundOn(false)
  }

  const toggleSound = async (e) => {
    e?.stopPropagation?.()
    await applySound(!soundOn)
  }

  const handleEnter = async () => {
    if (exiting || entered) return
    if (!motionOk) {
      setEntered(true)
      return
    }
    setExiting(true)
    window.setTimeout(() => setEntered(true), 900)
  }

  useEffect(() => {
    if (!entered) return
    const v = enteredVideoRef.current
    if (!v) return
    v.loop = true
    v.playsInline = true
    v.volume = 0.4
    v.muted = !soundOn
    void v.play().catch(() => {})
  }, [entered, soundOn])

  if (!entered) {
    return (
      <>
        <CursorGlow enabled={motionOk} />
        <IntroGate
          onEnter={handleEnter}
          soundOn={soundOn}
          onToggleSound={toggleSound}
          videoRef={introVideoRef}
          exiting={exiting}
        />
      </>
    )
  }

  return (
    <>
      <CursorGlow enabled={motionOk} />
      <button
        type="button"
        className="music-fab"
        onClick={toggleSound}
        aria-pressed={soundOn}
        title={soundOn ? 'Mute piano' : 'Unmute piano'}
      >
        {soundOn ? '♪' : 'mute'}
      </button>

      <div className="site-with-piano entered-shell">
        <div className="entered-bg" aria-hidden="true">
          <video
            ref={enteredVideoRef}
            className="entered-bg-video"
            src={PERFORMANCE_SRC}
            autoPlay
            muted={!soundOn}
            loop
            playsInline
          />
          <div className="entered-bg-veil" />
        </div>

        <div className="site on-video">
          <header className="topbar">
            <a className="brand" href="#top">
              <img src={profile.photo} alt="" className="avatar" />
              <span>{profile.shortName}</span>
            </a>
            <nav className="nav-box" aria-label="Primary">
              <input type="checkbox" id="menu" className="nav-toggle" />
              <label htmlFor="menu" className="nav-line" aria-label="Toggle menu">
                <span className="nav-menu-icon" />
              </label>
              <div className="menu-list">
                {mainNavItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={activeNav === item.id ? 'is-active' : undefined}
                    aria-current={activeNav === item.id ? 'true' : undefined}
                    onClick={(e) => {
                      e.preventDefault()
                      const toggle = document.getElementById('menu')
                      if (toggle) toggle.checked = false
                      setActiveNav(item.id)
                      const el = document.getElementById(item.id)
                      if (!el) return
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      window.history.replaceState(null, '', `#${item.id}`)
                    }}
                  >
                    <span className="nav-label">{item.label}</span>
                  </a>
                ))}
              </div>
            </nav>
          </header>

          <main id="top">
            <section className="hero reveal">
              <div className="hero-copy">
                <HeroRoles motionOk={motionOk} />
                <h1 className="hero-name" aria-label={profile.name}>
                  {profile.name.split(' ').map((word, index) => (
                    <span className="hero-name-word" aria-hidden="true" key={word}
                      style={{ '--word-delay': `${index * 100}ms` }}>{word}{' '}</span>
                  ))}
                </h1>
                <ul className="edu-list">
                  {profile.education.map((e) => (
                    <li className="education-entry" key={e.school}>
                      <div className="education-heading">
                        <strong>{e.school}</strong>
                        {e.gpa ? <span className="education-gpa">GPA {e.gpa}</span> : null}
                      </div>
                      <span className="education-degree">{e.degree}</span>
                      {e.dates ? <span className="education-dates">{e.dates}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
              <img className="hero-photo" src={profile.photo} alt={profile.name} />
            </section>

            <section id="about" className="panel reveal glass-panel">
              <h2>About</h2>
              <p className="lead">{intro.lead}</p>
              {intro.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </section>

            <section id="working-experience" className="panel reveal glass-panel">
              <h2>Working Experience</h2>
              <div className="stack">
                {workingExperience.map((job) => (
                  <article key={job.org} className="job">
                    <div className="job-head">
                      <h3>
                        {job.role}
                        <span> · {job.org}</span>
                      </h3>
                      <time>{job.dates}</time>
                    </div>
                    <ul>
                      {job.points.map((pt) => (
                        <li key={pt.slice(0, 48)}>{pt}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section id="research" className="panel reveal glass-panel">
              <h2>Research</h2>
              <article className="research">
                <h3>{research.title}</h3>
                <p className="meta">{research.venue}</p>
                <p>{research.summary}</p>
                <ul>
                  {research.points.map((pt) => (
                    <li key={pt.slice(0, 48)}>{pt}</li>
                  ))}
                </ul>
                <div className="links research-links">
                  <a
                    className="gallery-live-link"
                    href={research.arxiv}
                    target="_blank"
                    rel="noreferrer"
                  >
                    arXiv 2602.16313
                  </a>
                  <a
                    className="gallery-live-link"
                    href={research.site}
                    target="_blank"
                    rel="noreferrer"
                  >
                    memoryarena.github.io
                  </a>
                </div>
              </article>
            </section>

            <section id="projects" className="panel reveal glass-panel">
              <h2>Projects</h2>
              <nav className="projects-subnav" aria-label="Project categories">
                {projectSubsections.map((sub) => (
                  <a
                    key={sub.id}
                    href={`#${sub.id}`}
                    className={
                      activeProjectNav === sub.id ? 'is-active' : undefined
                    }
                    aria-current={
                      activeProjectNav === sub.id ? 'true' : undefined
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveProjectNav(sub.id)
                      const el = document.getElementById(sub.id)
                      if (!el) return
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      window.history.replaceState(null, '', `#${sub.id}`)
                    }}
                  >
                    {sub.title}
                  </a>
                ))}
              </nav>

              {projectSubsections.map((sub) => {
                const galleryItems = sub.legacySections.flatMap(
                  (name) => legacyItemsBySection[name] ?? [],
                )
                return (
                  <div key={sub.id} id={sub.id} className="projects-subsection">
                    <h3 className="projects-subsection-title">{sub.title}</h3>
                    <FeaturedProjectCards items={sub.featured} />
                    <GalleryPortfolioItems items={galleryItems} />
                  </div>
                )
              })}
            </section>

            <section id="skills" className="panel reveal glass-panel">
              <h2>Skills</h2>
              <dl className="skills">
                <div>
                  <dt>Programming Languages</dt>
                  <dd>{skills.languages}</dd>
                </div>
                <div>
                  <dt>Software Development</dt>
                  <dd>{skills.eng}</dd>
                </div>
                <div>
                  <dt>Machine Learning</dt>
                  <dd>{skills.ai}</dd>
                </div>
              </dl>
            </section>

            <section id="contact" className="panel contact reveal glass-panel">
              <h2>Contact</h2>
              <p>{intro.cta}</p>
              <div className="contact-links">
                <a
                  className="contact-chip"
                  href={`mailto:${profile.email}`}
                  aria-label={`Email ${profile.email}`}
                >
                  <span className="contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="3.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <path
                        d="M4.5 7.5 12 13l7.5-5.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{profile.email}</span>
                </a>
                <a
                  className="contact-chip"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <span className="contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <path
                        d="M8 10.5V16.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <circle cx="8" cy="7.8" r="1.05" fill="currentColor" />
                      <path
                        d="M12 16.5v-3.4c0-1.45.9-2.4 2.2-2.4 1.15 0 1.8.7 1.8 2.15V16.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>LinkedIn</span>
                </a>
                <a
                  className="contact-chip"
                  href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}
                  aria-label={`Call ${profile.phone}`}
                >
                  <span className="contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M8.2 4.8c.45-.9 1.55-1.2 2.35-.65l1.35.95c.7.5.85 1.45.35 2.15l-.7 1c-.2.3-.2.7 0 1 1.1 1.7 2.5 3.1 4.2 4.2.3.2.7.2 1 0l1-.7c.7-.5 1.65-.35 2.15.35l.95 1.35c.55.8.25 1.9-.65 2.35l-1.15.55c-.85.4-1.85.3-2.6-.25-2.55-1.85-4.75-4.05-6.6-6.6-.55-.75-.65-1.75-.25-2.6l.55-1.15Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="17.2"
                        cy="6.8"
                        r="1.15"
                        fill="currentColor"
                        opacity="0.85"
                      />
                    </svg>
                  </span>
                  <span>{profile.phone}</span>
                </a>
              </div>
            </section>
          </main>

          <footer>
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}

export default App
