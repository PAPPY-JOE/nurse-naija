import { HeartPulseIcon } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <HeartPulseIcon
                className="w-6 h-6 text-white"
                aria-hidden="true"
              />
            </div>
            <span className="text-2xl font-bold text-white">NurseNaija</span>
          </div>

          {/* Tagline */}
          <p className="text-gray-400 mb-8">
            Empowering Nigerian healthcare, one conversation at a time.
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a
              href="#"
              className="text-gray-400 transition-colors duration-200 hover:text-white focus:outline-none focus:text-white"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-400 transition-colors duration-200 hover:text-white focus:outline-none focus:text-white"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-gray-400 transition-colors duration-200 hover:text-white focus:outline-none focus:text-white"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 transition-colors duration-200 hover:text-white focus:outline-none focus:text-white"
            >
              Terms
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800 w-full">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} NurseNaija. Made with care for
              Nigerian clinics.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer