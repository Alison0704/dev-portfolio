import { useEffect, useState } from 'react'
import { cx } from '../cx'
import { NAV_LINKS } from '../data'
import styles from './NavBar.module.css'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cx(styles.header, scrolled && styles.scrolled)}>
      <nav className={styles.nav}>
        <a href="#about" className={styles.logo}>
          {'<ALIEMI />'}
        </a>

        <ul className={styles.links}>
          {NAV_LINKS.map((link, i) => (
            <li key={link}>
              <span className={styles.index}>0{i + 1}</span>
              <a href={`#${link.toLowerCase()}`} className={styles.link}>
                {link}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {[0, 1, 2].map(i => (
            <span key={i} className={cx(styles.menuBar, open && i === 1 && styles.menuBarHidden)} />
          ))}
        </button>

        {open && (
          <div className={styles.mobileMenu}>
            <ul>
              {NAV_LINKS.map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className={styles.mobileLink} onClick={() => setOpen(false)}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
