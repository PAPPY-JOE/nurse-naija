import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Countdown from "react-countdown";
import { SendIcon, LoaderIcon, XIcon, CloudOff, StethoscopeIcon, UserIcon } from 'lucide-react'
import TriageResultCard from './TriageResultCard'
import VoiceRecorder from './VoiceRecorder';

const ConversationView = ({
  messages,
  triageResult,
  isRecording,
  isProcessing,
  isError,
  isMicError,
  onStartRecording,
  onCancelRecording,
  onStopRecording,
  onSendText,
  userRole,
}) => {
  const [textInput, setTextInput] = useState('')

  const messagesEndRef = useRef(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages, triageResult])

  const handleSendText = () => {
    if (textInput.trim()) {
      onSendText(textInput)
      setTextInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendText()
    }
  }

  // Generate random heights for waveform bars
  const bars = Array.from({
    length: 12,
  }).map((_, i) => i)
  
  const handleRecordButtonPress = () => {
    if(isRecording){
      onStopRecording()
    } else {
      onStartRecording()
    }
  }

  // Renderer callback with condition
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      onStopRecording()
    } else {
      // Render a countdown
      return (
        <h3 className={`text-2xl font-semibold mt-5 mb-3 ${seconds > 15 ?"text-gray-900" : "text-red-500"}`}>
          {seconds}
        </h3>
      );
    }
  };

  const processingRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }} 
            className="flex justify-center items-center mt-8"
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
            <p className="ml-3 text-sm text-gray-500 font-medium">
              Taking longer than expected. Please wait
            </p>
          </motion.div>
        </div>
      ) 
    } else {
      // Render a countdown
      return (
        <h3 className={`text-2xl font-semibold mt-5 mb-3 ${minutes > 0 ? "text-gray-500" : "text-green-500"}`}>
          {minutes}:{seconds}
        </h3>
      );
    }
  };

  const processingTextRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }} 
            className="flex justify-center items-center mt-8"
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
            <p className="ml-3 text-xs text-gray-500">
              Taking longer than expected. Please wait
            </p>
          </motion.div>
        </div>
      ) 
    } else {
      // Render a countdown
      return (
        <p className={`text-xs w-full mt-2 ${minutes > 0 ? "text-gray-500" : "text-green-500"}`}>
          {minutes}:{seconds}
        </p>
      );
    }
  };

  const shouldShowInput = isError || messages.length === 0;

  return (
    <div className="flex-1 flex flex-col h-full min-h-[calc(100vh-60px)] pt- 20 max-w-[800px] bg-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p -4 pt-0 space -y-4">
        {messages.length === 0 && !triageResult && (
          <div className="flex-1 flex flex-col items-center justify-center h-full min-h-[calc(100vh-140px)] text-center py-2 px-8">
            {(isRecording || isProcessing) && (
              <motion.h2
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                className="text-2xl font-semibold text-gray-800 mb-6 sm:mb-12"
              >
                {isProcessing ? "Processing..." : "Listening..."}
              </motion.h2>
            )} 

            {/* Pulsing Mic Button */}
            <div className="relative mb-12">       
              <VoiceRecorder 
                isProcessing={isProcessing}
                handleRecordButtonPress={handleRecordButtonPress}
              />
            </div>
            
            {/* Waveform Visualization */}
            {isRecording && (
              <div className="flex items-center justify-center gap-1 h-16 overflow-hidden">
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
            )}

            {isProcessing && (
              <Countdown date={Date.now() + 120000} renderer={processingRenderer} />
            )}

            {!isRecording && !isProcessing && (
              <>
                {isError ? (
                  <>
                    <p className='text-red-600 font-semibold text-lg'>Something went wrong</p>
                    <p className='text-sm text-gray-600 max-w-xs my-2'>Please try again...</p>
                  </>
                ) : (
                  <>
                    <h3 className={`text-lg font-semibold ${isMicError ? "text-emerald-600" : "text-gray-900"}`}>
                      {isMicError ? "Kindly enable your" : "Tap"} microphone to start
                    </h3>
                    <p className="text-sm text-gray-600 max-w-xs my-2">
                      {userRole === 'patient'
                        ? 'Describe your symptoms using voice or text'
                        : 'Help assess patient symptoms and provide triage guidance'}
                    </p>
                  </>
                )}
              </>
            )}  

            {isRecording && (
              <>
                <Countdown date={Date.now() + 30000} renderer={renderer} />

                <p className="text-gray-500 text-sm mb-12">Tap microphone to stop</p>
                
                <button
                  onClick={onCancelRecording}
                  className="flex items-center gap-2 px-6 py-3 text-red-500 hover:text-red-700 bg-gray-100 hover:bg-red-100 rounded-full transition-colors"
                >
                  <XIcon className="w-5 h-5" />
                  Cancel
                </button>
              </>
            )}

          </div>
        )}

        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-end flex-row-reverse'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user' ? 'rounded-tr-none bg-gray-200 text-gray-900' : 'bg-emerald-100 rounded-tl-none'}`}
            >
              <p className="text-md leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              <span
                className={`text-xs mt-1 block font-medium ${message.role === 'user' ? 'text-gray-500' : 'text-emerald-600'}`}
              >
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user' ? 'bg-gray-200 text-gray-900' : 'bg-emerald-100'}`}>
              {message.role === 'user' ? (
                <UserIcon className="w-5 h-5 text-gray-600" />
              ) : (
                <StethoscopeIcon className="w-5 h-5 text-emerald-600" />
              )}
            </div>
          </motion.div>
        ))} 

        {isProcessing && messages.length > 0 && (
          <div className='flex'>
            <div className='max-w-[80%] rounded-2xl px-4 py-3 flex flex-col items-center justify-start bg-gray-200'>
              <div className='flex items-center justify-start'>
                <LoaderIcon className="w-4 h-4 text-gray-900 animate-spin" />
                <p className='ml-2 text-sm'>Processing...</p>
              </div>

              <Countdown date={Date.now() + 120000} renderer={processingTextRenderer} />
            </div>
          </div>
            )}

        {isError && messages.length > 0 && (
          <div className='flex'>
            <div className='max-w-[80%] rounded-2xl px-4 py-3 flex flex-col items-center justify-start bg-red-100'>
              <div className='flex items-end justify-center'>
                <CloudOff className="w-4 h-4 text-gray-900 animate -spin" />
                <p className='ml-2 text-sm'>Something went wrong...</p>
              </div>
              <p className="text-xs text-gray-700 w-full mt-2">
                Please try again
              </p>
            </div>
          </div>
            )}

        {triageResult && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
          >
            <TriageResultCard triageData={triageResult} onReset={() => {}} />
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {shouldShowInput
       && ( // no chat yet or error then show
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex items-center gap-2">
            {/* Text Input */}
            <div className="flex-1 relative flex justify-center items-center">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isProcessing || isRecording}
                placeholder={
                  isRecording
                    ? 'Recording...'
                    : 'Type your message or use voice...'
                }
                className="w-full px-4 py-3 pr-12 text-sm sm:text-md border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                rows={1}
                style={{
                  minHeight: '48px',
                  maxHeight: '120px',
                }}
              />
              <button
                onClick={handleSendText}
                disabled={!textInput.trim() || isProcessing || isRecording}
                className="absolu-te ml-2 right-2 bottom-2 p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </div>
          </div> 
        </div>
      )}
    </div>
  )
}

export default ConversationView