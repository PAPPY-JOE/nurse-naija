import { useState } from 'react'
import { LandingPage, TriageApp } from './pages'

const App = () => {
  const [showApp, setShowApp] = useState(false)
  return (
    <>
      {showApp ? (
        <TriageApp onExit={() => setShowApp(false)} />
      ) : (
        <>
          <LandingPage />
          {/* Floating Toggle Button for Demo */}
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={() => setShowApp(true)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full shadow-lg hover:bg-emerald-700 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              Launch Triage Demo
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default App