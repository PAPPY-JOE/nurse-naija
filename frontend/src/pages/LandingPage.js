import { FeaturesSection, Footer, Header, HeroSection, HowItWorksSection } from '../components'

const LandingPage = ({onNavigateAbout}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header currentPage={"home"} onNavigateAbout={onNavigateAbout} />
      
      <main>
        <HeroSection />
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
      </main>

      <Footer currentPage={"home"} onNavigateAbout={onNavigateAbout} />
    </div>
  )
  
}

export default LandingPage