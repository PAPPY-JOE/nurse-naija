import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AboutPage, LandingPage, TriageApp } from './pages'

const Home = () => {
  const [currentPage, setCurrentPage] = useState('home')
  return (
    <>
      {currentPage === 'app' ? (
        <TriageApp onExit={() => setCurrentPage('home')} />
      ) : currentPage === 'about' ? (
        <AboutPage onNavigateHome={() => setCurrentPage('home')} />
      ) : (
        <>
          <LandingPage currentPage={currentPage} onNavigateAbout={() => setCurrentPage('about')} />
          {/* Floating Toggle Button for Demo */}
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={() => setCurrentPage('app')}
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


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
)}

export default App
