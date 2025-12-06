import { motion } from 'framer-motion'
import {
  AlertTriangleIcon,
  ActivityIcon,
  ArrowRightIcon,
  RefreshCwIcon,
} from 'lucide-react'


const TriageResult = ({ onReset}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      className="w-full max-w-md mx-auto p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header - Color coded based on severity */}
        <div className="bg-amber-500 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangleIcon className="w-6 h-6" />
            <span className="font-bold tracking-wide text-sm uppercase opacity-90">
              Triage Assessment
            </span>
          </div>
          <h2 className="text-3xl font-bold">Moderate Urgency</h2>
          <p className="text-amber-100 mt-1">
            Patient requires medical attention soon
          </p>
        </div>

        <div className="p-6">
          {/* Symptoms Summary */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Detected Symptoms
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-100">
                Severe Abdominal Pain
              </span>
              <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-100">
                Vomiting (3x)
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                Nausea
              </span>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
            <div className="flex items-start gap-3">
              <ActivityIcon className="w-5 h-5 text-emerald-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Recommended Action
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Route to General Physician queue. Monitor hydration levels.
                  Check for signs of dehydration or food poisoning.
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onReset}
            className="w-full py-4 bg-emerald-600 text-white rounded-xl font-semibold shadow-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 group"
          >
            Start New Assessment
            <RefreshCwIcon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default TriageResult