import { ArrowRightIcon } from 'lucide-react'
import { HashLink } from 'react-router-hash-link'

const Footer = ({ currentPage, onNavigateAbout, onNavigateHome }) => {
  return (
    <footer className="bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <img 
              alt='Logo'
              src="./assets/logo.png"
              className='h-[60px] rounded'
            /> 
            <span className="text-2xl font-bold text-white">Nurse<span className='text-emerald-500'>Naija</span></span>
          </div>

          {/* Tagline */}
          <p className="text-gray-400 mb-8">
            Empowering Nigerian healthcare, one conversation at a time.
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            <HashLink
              to="#"
              onClick={() => {
                if (currentPage === "home") {
                    onNavigateAbout()
                } else {
                    onNavigateHome()
                }
              }}
              className="text-gray-400 transition-colors duration-200 hover:text-white focus:outline-none focus:text-white"
            >
              {currentPage === "home" ? "About" : "Home"}
            </HashLink>
            {currentPage === "home" && (
              <HashLink
                to="#contact"
                onClick={onNavigateAbout}
                className="text-gray-400 transition-colors duration-200 hover:text-white focus:outline-none focus:text-white"
              >
                Contact
              </HashLink> 
            )}
            <HashLink
              className="inline-flex items-center gap-2 py-2 px-4 bg-emerald-700 text-white font-semibold rounded-lg transition-colors duration-200 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Get started with NurseNaija"
              to="/app#"
            >
              Get Started
              <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
            </HashLink> 
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800 w-full">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} NurseNaija | All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer