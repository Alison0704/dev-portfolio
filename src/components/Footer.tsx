import { SOCIAL_LINKS, type SocialIcon } from '../data'
import styles from './Footer.module.css'
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons'

const ICONS: Record<SocialIcon, typeof GithubIcon> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a href="#about" className={styles.logo}>
          {'<ALIEMI />'}
        </a>
        <p className={styles.copyright}>© 2026 Alison Emilien</p>
        <ul className={styles.links}>
          {SOCIAL_LINKS.map(({ label, href, icon }) => {
            const Icon = ICONS[icon]
            const external = href.startsWith('http')
            return (
              <li key={label}>
                <a
                  href={href}
                  className={styles.iconButton}
                  aria-label={label}
                  title={label}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <Icon size={16} />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </footer>
  )
}
