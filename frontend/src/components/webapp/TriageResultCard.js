import { motion } from 'framer-motion'
import { 
  ActivityIcon,
  RefreshCwIcon,
  ClipboardListIcon,
  UserIcon,
} from 'lucide-react'
import { getLevelConfig } from '../../helper'

const TriageResultCard = ({
  triageData,
  onReset,
}) => {

  const config = getLevelConfig(triageData.risk_score)

  const IconComponent = config.icon
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
        <div className={`${config.bgColor} p-6 text-white`}>
          <div className="flex items-center gap-3 mb-2">
            <IconComponent className="w-6 h-6" />
            <span className="font-bold tracking-wide text-sm uppercase opacity-90">
              Triage Assessment
            </span>
          </div>
          <h2 className="text-3xl font-bold capitalize">{config.title}</h2>
          <p className={`${config.textColor} mt-1`}>{config.subtitle}</p>
        </div>

        <div className="p-6">
          {/* Detected Symptoms */}
          {triageData.detected_symptoms &&
            triageData.detected_symptoms.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Detected Symptoms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {triageData.detected_symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${config.badgeColor}`}
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Risk Score */}
          {triageData.risk_score !== undefined && (
            <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  Risk Score
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  {triageData.risk_score}
                </span>
              </div>
            </div>
          )}

          {/* Patient Steps */}
          {triageData.immediate_patient_steps &&
            triageData.immediate_patient_steps.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <UserIcon className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-semibold text-gray-900">For Patient</h4>
                </div>
                <ul className="space-y-2">
                  {triageData.immediate_patient_steps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Provider Actions */}
          {triageData.provider_actions &&
            triageData.provider_actions.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <ActivityIcon className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-semibold text-gray-900">
                    Provider Actions
                  </h4>
                </div>
                <ul className="space-y-2">
                  {triageData.provider_actions.map((action, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Notes */}
          {triageData.notes && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="flex items-start gap-2">
                <ClipboardListIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-900">{triageData.notes}</p>
              </div>
            </div>
          )}

          {/* Metadata */}
          {triageData.metadata && (
            <div className="mb-6 text-xs text-gray-500 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">Model:</span>
                <span>{triageData.metadata.model_used}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Mode:</span>
                <span>
                  {triageData.metadata.offline_mode ? 'Offline' : 'Online'}
                </span>
              </div>
            </div>
          )}

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

export default TriageResultCard