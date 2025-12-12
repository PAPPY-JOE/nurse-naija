import { ArrowRightIcon } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

const Header = ({ onNavigateAbout, onNavigateHome, currentPage }) => {
  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <HashLink 
            className="flex items-center gap-2 cursor-pointer"
            to="#"
            onClick={onNavigateHome}
          >
            <img 
              src="./assets/logo.png"
              alt='Logo'
              className='h-[40px]'
            /> 
            <span className="text-xl font-bold text-gray-900">Nurse<span className='text-emerald-500'>Naija</span></span>
          </HashLink>

          <div className="hidden sm:flex items-center gap-6">
            <HashLink
              to="#"
              onClick={() => {
                if (currentPage === "home") {
                    onNavigateAbout()
                } else {
                    onNavigateHome()
                }
              }}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {currentPage === "home" ? "About" : "Home"}
            </HashLink>
            {currentPage === "home" && (
                <>
                    <HashLink
                    to="#how-it-works"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                    How It Works
                    </HashLink>
                    <HashLink
                    to="#features"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                    Features
                    </HashLink>
                </>
            )}
            <HashLink
              className="text-gray-600 hover:text-gray-900 transition-colors"
              to="#contact"
              onClick={onNavigateAbout}
            >
              Contact Us
            </HashLink>
            <HashLink
              className="inline-flex items-center gap-2 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg transition-colors duration-200 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Get started with NurseNaija"
              to="/app#"
            >
              Get Started
              <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
            </HashLink> 
          </div>
        </div>
    </nav>
  )
}

export default Header