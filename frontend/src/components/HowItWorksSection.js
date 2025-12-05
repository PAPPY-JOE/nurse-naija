import { MicIcon, LanguagesIcon, StethoscopeIcon } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: <MicIcon className="w-8 h-8" aria-hidden="true" />,
    title: 'Voice Input',
    description:
      'Patient speaks in their native language—Yoruba, Igbo, Hausa, or Pidgin.',
  },
  {
    number: '02',
    icon: <LanguagesIcon className="w-8 h-8" aria-hidden="true" />,
    title: 'Instant Translation',
    description:
      'Speech is translated to English in real-time, right on the device.',
  },
  {
    number: '03',
    icon: <StethoscopeIcon className="w-8 h-8" aria-hidden="true" />,
    title: 'Triage Assessment',
    description:
      'AI-powered triage helps prioritize care based on symptoms described.',
  },
]

const HowItWorksSection = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Three simple steps to better patient communication
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line (hidden on mobile, shown between cards on desktop) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-emerald-200"
                  aria-hidden="true"
                />
              )}

              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                {/* Step number */}
                <span className="text-sm font-bold text-emerald-600 tracking-wide">
                  STEP {step.number}
                </span>

                {/* Icon */}
                <div className="mt-4 mb-5 w-16 h-16 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection