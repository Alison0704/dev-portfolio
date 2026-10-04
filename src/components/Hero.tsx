import styles from './Hero.module.css'

// Subtle technical grid for the hero background
function GridBackground() {
  return (
    <svg
      className={styles.overlay}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#2A4B85" strokeWidth="0.25" opacity="0.18" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section id="about" className={styles.hero}>
      <GridBackground />
      <div className={styles.vignette} />

      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.name}>
            Alison
            <br />
            <span className={styles.surname}>Emilien</span>
          </h1>
          <p className={styles.role}>Hardware DV Engineer &amp; Full-Stack Developer</p>
          <p className={styles.bio}>
            I’m a graduate student from University of Ottawa from the program <a className={styles.academics} href="https://catalogue.uottawa.ca/en/undergrad/basc-electrical-engineering-bsc-computing-technology/#programrequirementstext" target="_blank" rel="noopener noreferrer">BASc Electrical Engineering and BSc Computing Technology</a> with interest in <span className={styles.careers}>Hardware Design & Verification</span> and/or <span className={styles.careers}>Full-Stack Development</span> as career paths, while enjoying Digital Art, Game Development and Robotics as creative hobbies.
          </p>
          <div className={styles.actions}>
            <a href="#projects" className={styles.primary}>
              View Projects
            </a>
            <a href="#experience" className={styles.ghost}>
              Experience
            </a>
          </div>
        </div>
      </div>

      <div className={styles.scrollCue}>
        <span className={styles.scrollLabel}>SCROLL</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
