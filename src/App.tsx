import styles from './App.module.css'
import CursorGlow from './components/CursorGlow'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import IdleBitRain from './components/IdleBitRain'
import NavBar from './components/NavBar'
import Projects from './components/Projects'

function App() {
  return (
    <div className={styles.app}>
      <NavBar />
      <main>
        <Hero />
        <Projects />
        <Experience />
      </main>
      <Footer />
      <IdleBitRain />
      <CursorGlow />
    </div>
  )
}

export default App
