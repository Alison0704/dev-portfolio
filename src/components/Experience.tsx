import { useState } from 'react'
import { cx } from '../cx'
import { EXPERIENCE, type Experience as ExperienceEntry } from '../data'
import styles from './Experience.module.css'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.texture} />

      <div className={styles.inner}>
        <SectionHeading index="03" title="Experience" className={styles.heading} />

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          {EXPERIENCE.map((exp, i) => (
            <ExperienceItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceItem({ exp, index }: { exp: ExperienceEntry; index: number }) {
  const [expanded, setExpanded] = useState(index === 0)
  const detailsId = `experience-details-${index}`
  const startYear = exp.period.split('—')[0].trim().split(' ')[1]

  return (
    <div className={cx(styles.item, expanded && styles.expanded)}>
      <div className={styles.node} />
      <span className={styles.year}>{startYear}</span>

      <button
        type="button"
        className={styles.toggle}
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
        aria-controls={detailsId}
      >
        <div className={styles.summary}>
          <div>
            <h3 className={styles.role}>{exp.role}</h3>
            <p className={styles.company}>{exp.company}</p>
          </div>
          <div className={styles.aside}>
            <div className={styles.when}>
              <p>{exp.period}</p>
              <p>{exp.location}</p>
            </div>
            <span className={styles.pill}>
              {expanded ? 'Hide details' : 'View details'}
              <span className={styles.plus} aria-hidden="true">
                +
              </span>
            </span>
          </div>
        </div>
      </button>

      <div id={detailsId} className={styles.details}>
        <div className={styles.detailsInner} inert={!expanded}>
          <ul className={styles.bullets}>
            {exp.bullets.map(bullet => (
              <li key={bullet}>
                <span className={styles.chevron}>›</span>
                {bullet}
              </li>
            ))}
          </ul>
          <div className={styles.tags}>
            {exp.tags.map(tag => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
