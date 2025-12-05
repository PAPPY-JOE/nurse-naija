import React from 'react'
import {
  WifiOffIcon,
  LanguagesIcon,
  ZapIcon,
  ShieldIcon,
  HeartIcon,
  CheckCircleIcon,
} from 'lucide-react'

const features = [
  {
    icon: <WifiOffIcon className="w-6 h-6" aria-hidden="true" />,
    title: 'Offline-First',
    description:
      'Works without internet connection. Perfect for areas with unreliable connectivity.',
  },
  {
    icon: <LanguagesIcon className="w-6 h-6" aria-hidden="true" />,
    title: 'Multilingual Support',
    description:
      'Supports Yoruba, Igbo, Hausa, Pidgin English, and more Nigerian languages.',
  },
  {
    icon: <ZapIcon className="w-6 h-6" aria-hidden="true" />,
    title: 'Fast Triage',
    description:
      'Quick symptom assessment helps prioritize patients who need urgent care.',
  },
  {
    icon: <ShieldIcon className="w-6 h-6" aria-hidden="true" />,
    title: 'Privacy-Focused',
    description:
      'All patient data stays on the device. No cloud uploads, no data sharing.',
  },
  {
    icon: <HeartIcon className="w-6 h-6" aria-hidden="true" />,
    title: 'Easy to Use',
    description:
      'Simple interface designed for busy clinic staff with minimal training needed.',
  },
  {
    icon: <CheckCircleIcon className="w-6 h-6" aria-hidden="true" />,
    title: 'Reliable',
    description:
      'Built and tested specifically for the Nigerian healthcare environment.',
  },
]

const FeaturesSection = () => {
  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built for Nigerian Clinics
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Every feature designed with the realities of Nigerian healthcare in
            mind
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-6">
              {/* Icon */}
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-5">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection