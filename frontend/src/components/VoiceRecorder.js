import React from 'react'
import { motion } from 'framer-motion'
import { MicIcon, XIcon } from 'lucide-react'


const VoiceRecorder = ({ onStop, onCancel }) => {
  // Generate random heights for waveform bars
  const bars = Array.from({
    length: 12,
  }).map((_, i) => i)
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-12">
      <motion.h2
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="text-2xl font-semibold text-gray-800 mb-12"
      >
        Listening...
      </motion.h2>

      {/* Pulsing Mic Button */}
      <div className="relative mb-12">
        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-100"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-200"
          animate={{
            scale: [1, 1.3],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.5,
          }}
        />

        {/* Main Button */}
        <motion.button
          onClick={onStop}
          className="relative z-10 w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg text-white"
          whileTap={{
            scale: 0.95,
          }}
          animate={{
            boxShadow: [
              '0 0 0 0px rgba(16, 185, 129, 0.4)',
              '0 0 0 20px rgba(16, 185, 129, 0)',
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <MicIcon className="w-12 h-12" />
        </motion.button>
      </div>

      {/* Waveform Visualization */}
      <div className="flex items-center justify-center gap-1 h-16 mb-8">
        {bars.map((i) => (
          <motion.div
            key={i}
            className="w-1.5 bg-emerald-400 rounded-full"
            animate={{
              height: [16, Math.random() * 48 + 16, 16],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      <p className="text-gray-500 text-sm mb-12">Tap microphone to stop</p>

      <button
        onClick={onCancel}
        className="flex items-center gap-2 px-6 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
      >
        <XIcon className="w-5 h-5" />
        Cancel
      </button>
    </div>
  )
}

export default VoiceRecorder