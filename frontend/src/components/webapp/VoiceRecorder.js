import { motion } from 'framer-motion'
import { LoaderIcon, MicIcon } from "lucide-react";

const VoiceRecorder = ({
    isProcessing,
    handleRecordButtonPress
}) => { 

  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <motion.button
        onClick={handleRecordButtonPress}
        disabled={isProcessing}
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
            duration: 5,
            repeat: Infinity,
        }}
        >
        {isProcessing ? (
            <LoaderIcon className="w-12 h-12 text-white animate-spin" />
        ) : (                  
            <MicIcon className="w-12 h-12" />
        )}
     </motion.button>
    </div>
  );
}

export default VoiceRecorder