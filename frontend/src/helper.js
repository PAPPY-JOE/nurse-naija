import { AlertCircle, AlertTriangleIcon, CheckCircleIcon } from "lucide-react"

export const getLevelColor = (riskScore) => {
    if (riskScore >= 0.9) {
    return 'bg-red-100 text-red-700'
  }

  if (riskScore >= 0.6) {
    return 'bg-amber-100 text-amber-700'
  }

  if (riskScore >= 0.25) {
    return 'bg-emerald-100 text-emerald-700'
  }

  // Reassure (low)
  return 'bg-gray-100 text-gray-600'
}

// Map risk_score → triage config
export const getLevelConfig = (riskScore) => {
  if (riskScore >= 0.9) {
    return {
      level: 'EMERGENCY',
      bgColor: 'bg-red-500',
      textColor: 'text-red-100',
      icon: AlertTriangleIcon,
      title: 'Urgent Care Needed',
      subtitle: 'Patient requires immediate medical evaluation',
      badgeColor: 'bg-red-50 text-red-700 border-red-100',
    }
  }

  if (riskScore >= 0.6) {
    return {
      level: 'URGENT',
      bgColor: 'bg-red-500',
      textColor: 'text-red-100',
      icon: AlertTriangleIcon,
      title: 'Urgent Care Needed',
      subtitle: 'Patient requires immediate medical evaluation',
      badgeColor: 'bg-red-50 text-red-700 border-red-100',
    }
  }

  if (riskScore >= 0.25) {
    return {
      level: 'NON-URGENT',
      bgColor: 'bg-amber-500',
      textColor: 'text-amber-100',
      icon: AlertCircle,
      title: 'Moderate Urgency',
      subtitle: 'Patient requires medical attention soon',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-100',
    }
  }

  // Reassure (low)
  return {
    level: 'REASSURE',
    bgColor: 'bg-emerald-500',
    textColor: 'text-emerald-100',
    icon: CheckCircleIcon,
    title: 'Low Priority',
    subtitle: 'Patient can be reassured with home care guidance',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  }
}
