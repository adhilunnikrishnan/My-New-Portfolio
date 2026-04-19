import './App.css'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import { THINGS_I_DO, INTRO_HEIGHTS } from './constants'
import { useIntroAnimation } from './hooks/useIntroAnimation'

function App() {
  const { isLoading } = useIntroAnimation();

  return (
    <>
      {isLoading && <Preloader heights={INTRO_HEIGHTS} />}
      <Hero thingsIDo={THINGS_I_DO} />
    </>
  )
}

export default App
