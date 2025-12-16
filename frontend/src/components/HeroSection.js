import { ArrowRightIcon } from 'lucide-react'
import { HashLink } from 'react-router-hash-link'

const HeroSection = () => {
  return (
    <section className="bg-white py-20 md:py-28 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          Built for Nigerian Healthcare & Community Response
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Healthcare Communication,{' '}
          <span className="text-emerald-600">Simplified</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Offline multilingual triage assistant helping responders understand patients in their native language — no internet required. 
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <HashLink
            to="/app#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg transition-colors duration-200 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Get started with NurseNaija"
          >
            Get Started
            <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
          </HashLink> 
        </div>

        {/* Trust indicator */}
        <p className="mt-12 text-sm text-gray-500">
          <span>{"Powered by "}</span>
          <img 
            src="./assets/awarii.webp"
            alt='Awari'
            className='w-[70px] rounded inline'
          /> 
          <span>'s N-ATLaS-LLM - Multilingual African Language Model</span>           
        </p>
      </div>
    </section>
  )
}

export default HeroSection