import { motion } from 'framer-motion'
import { UserIcon, StethoscopeIcon } from 'lucide-react'


const ChatBubbles = ({ onComplete, showResult }) => {
  // Auto-trigger completion after bubbles are shown
  // In a real app, this would happen after API response
  return (
    <div className="flex flex-col gap-6 p-4 w-full max-w-md mx-auto pt-8">
      {/* Patient Bubble (Left) */}
      <motion.div
        initial={{
          opacity: 0,
          x: -20,
          y: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="flex gap-3 mr-8"
      >
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-5 h-5 text-gray-600" />
        </div>
        <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm">
          <p className="text-gray-800 text-lg leading-relaxed">
            "Oga, my belle dey pain me well well. I don vomit like three times
            today." 
          </p>
          <span className="text-xs text-gray-500 mt-2 block font-medium">
            Original (Pidgin)
          </span>
        </div>
      </motion.div>

      {/* Translated Bubble (Right) */}
      <motion.div
        initial={{
          opacity: 0,
          x: 20,
          y: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 1.5,
        }} // Delay for "processing" effect
        className="flex flex-row-reverse gap-3 ml-8"
        onAnimationComplete={() => {
          // Wait a moment after showing translation before moving to triage
          setTimeout(onComplete, 2000)
        }}
      >
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <StethoscopeIcon className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl rounded-tr-none p-4 shadow-sm">
          <p className="text-gray-800 text-lg leading-relaxed">
            "Doctor, I have severe abdominal pain. I have vomited three times
            today."
          </p>
          <span className="text-xs text-emerald-600 mt-2 block font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Translated to English
          </span>
        </div>
      </motion.div>

      {/* Processing Indicator */}
      {!showResult && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 2,
          }}
          className="flex justify-center mt-8"
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-emerald-400 rounded-full"
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <span className="ml-3 text-sm text-gray-500 font-medium">
            Analyzing symptoms...
          </span>
        </motion.div>
      )}
    </div>
  )
}

export default ChatBubbles