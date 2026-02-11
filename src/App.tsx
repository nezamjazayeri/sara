import { useState } from 'react'
import AuthScreen from './components/AuthScreen'
import ValentineScreen from './components/ValentineScreen'
import CelebrationScreen from './components/CelebrationScreen'
import './App.css'

type Screen = 'auth' | 'valentine' | 'celebration'

function App() {
  const [screen, setScreen] = useState<Screen>('auth')

  return (
    <div className="app">
      {screen === 'auth' && (
        <AuthScreen onSuccess={() => setScreen('valentine')} />
      )}
      {screen === 'valentine' && (
        <ValentineScreen onYes={() => setScreen('celebration')} />
      )}
      {screen === 'celebration' && <CelebrationScreen />}
    </div>
  )
}

export default App
