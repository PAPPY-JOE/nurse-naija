import { motion } from 'framer-motion'
import {
  ActivityIcon,
  RefreshCwIcon,
  UserIcon,
} from 'lucide-react'
import { getLevelConfig } from '../../helper'

const TriageResultCard = ({ triageData, onReset }) => {
  const config = getLevelConfig(triageData.risk_score)
  const IconComponent = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-full max-w-md mx-auto p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

        {/* Header */}
        <div className={`${config.bgColor} p-6 text-white`}>
          <div className="flex items-center gap-3 mb-2">
            <IconComponent className="w-6 h-6" />
            <span className="font-bold tracking-wide text-sm uppercase opacity-90">
              Assessment Summary
            </span>
          </div>
          <h2 className="text-3xl font-bold capitalize">{config.title}</h2>
          <p className={`${config.textColor} mt-1`}>
            Based on patient-reported symptoms
          </p>
        </div>

        <div className="p-6">

          {/* Reported Symptoms */}
          {triageData.detected_symptoms?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider mb-3">
                Recorded Symptoms from Patient
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
                  {triageData.risk_score * 100 + "%"}
                </span>
              </div>
            </div>
          )}

          {/* What to Tell the Patient */}
          {triageData.immediate_patient_steps?.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <UserIcon className="w-5 h-5 text-emerald-600" />
                <h4 className="font-semibold text-gray-900">
                  What to Tell the Patient
                </h4>
              </div>
              <ul className="space-y-2">
                {triageData.immediate_patient_steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-emerald-600 mt-0.5">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul> 
            </div>
          )}

          {/* Responder Guidance */}
          {triageData.provider_actions?.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <ActivityIcon className="w-5 h-5 text-emerald-600" />
                <h4 className="font-semibold text-gray-900">
                  Responder Guidance
                </h4>
              </div>
              <ul className="space-y-2">
                {triageData.provider_actions.map((action, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-emerald-600 mt-0.5">•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Metadata */}
          {triageData.metadata && (
            <div className="mb-6 mt-8 text-xs text-gray-500 space-y-1">
              <div><strong>Model:</strong> {triageData.metadata.model_used}</div>
              <div><strong>Mode:</strong> {triageData.metadata.offline_mode ? 'Offline' : 'Online'}</div>
            </div>
          )}

          {/* Reset */}
          <button
            onClick={onReset}
            className="w-full py-4 bg-emerald-600 text-white rounded-xl font-semibold shadow-md hover:bg-emerald-700 transition flex items-center justify-center gap-2 group"
          >
            Start New Patient Assessment
            <RefreshCwIcon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default TriageResultCard