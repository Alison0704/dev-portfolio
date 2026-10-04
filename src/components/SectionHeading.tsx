import { cx } from '../cx'
import styles from './SectionHeading.module.css'

export default function SectionHeading({ index, title, className }: { index: string; title: string; className?: string }) {
  return (
    <div className={cx(styles.heading, className)}>
      <span className={styles.index}>{index}</span>
      <div className={styles.rule} />
      <h2 className={styles.title}>{title}</h2>
    </div>
  )
}
