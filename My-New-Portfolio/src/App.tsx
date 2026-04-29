import './App.css'
import Preloader from './components/loading/Preloader'
import Hero from './components/sections/hero/Hero'
import About from './components/sections/about/About'
import Skills from './components/Skills'
import GitHub from './components/GitHub'
import { THINGS_I_DO, INTRO_HEIGHTS } from './data'
import { useIntroAnimation } from './hooks/useIntroAnimation'

function App() {
  const { isLoading } = useIntroAnimation();

  return (
    <>
      {isLoading && <Preloader heights={INTRO_HEIGHTS} />}
      <Hero thingsIDo={THINGS_I_DO} />
      <About />
      <Skills />
      <GitHub />
    </>
  )
}

export default App
