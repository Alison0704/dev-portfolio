import { useState } from 'react'
import { cx } from '../cx'
import { PROJECTS, type Project, type ProjectCategory } from '../data'
import { GithubIcon } from './Icons'
import styles from './Projects.module.css'
import SectionHeading from './SectionHeading'

type Tab = ProjectCategory | 'all'

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'software', label: 'Software' },
]

const countFor = (tab: Tab) => (tab === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.category === tab).length)

const STATUS_CLASS: Record<Project['status'], string> = {
  'Open source': styles.statusOpenSource,
  Published: styles.statusPublished,
  'Tape-out ready': styles.statusTapeOut,
  'NDA restricted': styles.statusRestricted,
}

export default function Projects() {
  const [tab, setTab] = useState<Tab>('all')
  const visible = tab === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === tab)

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading index="02" title="Projects" className={styles.heading} />

        <div className={styles.tabs} role="tablist" aria-label="Project category">
          {TABS.map(({ id, label }) => {
            const active = tab === id
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(id)}
                className={cx(styles.tab, active && styles.tabActive)}
              >
                <span className={styles.tabIcon}>◈</span>
                {label}
                <span className={styles.tabCount}>{countFor(id)}</span>
                {active && <span className={styles.tabUnderline} />}
              </button>
            )
          })}
        </div>

        <div className={styles.grid}>
          {visible.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isHardware = project.category === 'hardware'

  return (
    <article className={styles.card}>
      <div className={styles.cornerTopLeft} />
      <div className={styles.cornerBottomRight} />

      <div className={styles.body}>
        <div className={styles.header}>
          <div>
            <div className={styles.meta}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.metaDot}>·</span>
              <span>{project.year}</span>
            </div>
            <h3 className={styles.title}>{project.title}</h3>
          </div>
          <div className={styles.badges}>
            <span className={cx(styles.category, isHardware ? styles.hardware : styles.software)}>
              {isHardware ? '⬡ HW' : '⬢ SW'}
            </span>
            <div className={cx(styles.status, STATUS_CLASS[project.status])}>
              <span className={styles.statusDot} />
              <span>{project.status}</span>
            </div>
          </div>
        </div>

        <p className={styles.description}>{project.description}</p>

        <div>
          <p className={styles.stackLabel}>Tech Stack</p>
          <div className={styles.stack}>
            {project.tech.map(t => (
              <span key={t} className={styles.tech}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          {project.github ? (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.repoLink}>
              <GithubIcon />
              View on GitHub
              <span className={styles.arrow}>→</span>
            </a>
          ) : (
            <span className={styles.restricted}>
              <span className={styles.restrictedIcon}>■</span>
              Repository restricted — NDA
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
