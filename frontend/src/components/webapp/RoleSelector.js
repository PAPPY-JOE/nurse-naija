import { motion } from 'framer-motion'
import { UserIcon, StethoscopeIcon, RefreshCcw } from 'lucide-react'
import { useUserStore } from '../../store'

const RoleSelector = ({ onSelectRole }) => {
  const language = useUserStore((state) => state.user.language)
  const setLanguage = useUserStore((state) => state.setLanguage)

  const languageOptions = [
    {name: "yoruba", spelling: "Yorùbá"}, 
    {name: "igbo", spelling: "Igbo"}, 
    {name: "hausa", spelling: "Hausa"}, 
    {name: "english", spelling: "English"}
  ]

  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full min-h-[calc(100vh-60px)] w-full p-8 py-20">

      {!language && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Welcome to Nurse<span className="text-emerald-500">Naija</span>
            </h2>
            <p className="text-lg text-gray-600">
              Please choose your preferred language
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
            {languageOptions.map((lang, index) => (
              <motion.button
                key={lang.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setLanguage(lang.spelling)}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-emerald-500 transition-all duration-200 text-lg font-semibold capitalize"
              >
                {lang.spelling}
              </motion.button>
            ))}
          </div>
        </>
      )}

      {language && (
        <>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 flex flex-col items-center justify-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Choose your role
            </h2>

            <p className="text-gray-600">
              Language:
              <span className="capitalize font-semibold ml-1">
                {language}
              </span>
            </p>

            <button
              onClick={() => setLanguage(null)}
              className="flex mt-3 text-sm items-center gap-2 px-3 py-[5px] text-emerald-500 hover:text-emerald-700 bg-gray-100 hover:bg-emerald-100 rounded-full transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              Change language
            </button>
          </motion.div>

          {/* Role cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">

            {/* PATIENT */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => onSelectRole('patient')}
              className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-500 transition-all duration-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <UserIcon className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Patient
                </h3>
                <p className="text-sm text-gray-600">
                  Describe symptoms and get triage guidance
                </p>
              </div>
            </motion.button>

            {/* DOCTOR */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => onSelectRole('doctor')}
              className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-500 transition-all duration-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <StethoscopeIcon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Physician
                </h3>
                <p className="text-sm text-gray-600">
                  Assist with patient triage and assessment
                </p>
              </div>
            </motion.button>

          </div>
        </>
      )}
    </div>
  )
}

export default RoleSelector