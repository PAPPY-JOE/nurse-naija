import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, MoreVerticalIcon } from 'lucide-react'
import { ChatBubbles, TriageResult, VoiceRecorder } from '../components/'

const TriageApp = ({ onExit }) => {
  const categories = ['listening', 'chat', 'result']
  const [state, setState] = useState(categories[0]) // listening
  const [showResult, setShowResult] = useState(false)

  // Auto-transition from listening to chat for demo purposes
  useEffect(() => {
    let timer
    if (state === 'listening') {
      timer = setTimeout(() => {
        setState(categories[1])
      }, 4000) // 4 seconds of "listening"
    }
    return () => clearTimeout(timer)
  }, [state])

  const handleReset = () => {
    setState(categories[0])
    setShowResult(!showResult)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center relative overflow-hidden">
      {/* Mobile Status Bar Simulation */}
      <div className="w-full bg-emerald-600 h-2"></div>

      {/* App Header */}
      <header className="w-full max-w-md bg-white shadow-sm px-4 py-4 flex items-center justify-between z-10 sticky top-0">
        <button
          onClick={onExit}
          className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <img 
              src="./assets/logo.png"
              alt='Logo'
              className='h-[35px]'
            /> 
            <span className="text-base font-bold text-gray-900">Nurse<span className='text-emerald-500'>Naija</span></span>
          </div> 
        </div>

        <button className="p-2 -mr-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
          <MoreVerticalIcon className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-md bg-white relative flex flex-col">
        <AnimatePresence mode="wait">
          {state === 'listening' && (
            <motion.div
              key="listening"
              className="flex-1 flex flex-col"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <VoiceRecorder
                onStop={() => setState('chat')}
                onCancel={onExit}
              />
            </motion.div>
          )}

          {state === 'chat' && (
            <motion.div
              key="chat"
              className="flex-1 flex flex-col"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <ChatBubbles onComplete={() => setShowResult(true)} showResult={showResult} />
            </motion.div>
          )}

          {state === 'chat' && showResult && (
            <motion.div
              key="result"
              className="flex-1 flex flex-col justify-center pb-8"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.4,
              }}
            >
              <TriageResult onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-100 via-transparent to-transparent"></div>
    </div>
  )
}

export default TriageApp