import React from 'react'
import { ArrowRightIcon } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="bg-white py-20 md:py-28 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          Built for Nigerian Clinics
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Healthcare Communication,{' '}
          <span className="text-emerald-600">Simplified</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Offline multilingual triage assistant helping Nigerian clinics serve
          patients in their native language—no internet required.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg transition-colors duration-200 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Get started with NurseNaija"
          >
            Get Started
            <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            className="inline-flex items-center gap-2 px-8 py-4 text-gray-700 font-semibold rounded-lg border border-gray-200 transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            aria-label="Learn more about NurseNaija"
          >
            Learn More
          </button>
        </div>

        {/* Trust indicator */}
        <p className="mt-12 text-sm text-gray-500">
          Powered by Awarri's N-ATLaS-LLM - Multilingual African Language Model
          {/* Trusted by clinics across Lagos, Abuja, and Port Harcourt */}
        </p>
      </div>
    </section>
  )
}

export default HeroSection