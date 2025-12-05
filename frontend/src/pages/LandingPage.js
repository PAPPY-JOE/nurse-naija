import HeroSection from '../components/HeroSection'
import HowItWorksSection from '../components/HowItWorksSection'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg- white bg-red-500">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="./assets/logo.png"
              // src="./assets/logo-2.png"
              className='h-[40px]'
            /> 
            <span className="text-xl font-bold text-gray-900">Nurse<span className='text-emerald-500'>Naija</span></span>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <button className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg transition-colors duration-200 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      <main>
        <HeroSection />
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
      </main>

      <Footer />
    </div>
  )
  
}

export default LandingPage