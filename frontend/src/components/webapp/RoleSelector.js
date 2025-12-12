import { motion } from 'framer-motion'
import { UserIcon, StethoscopeIcon } from 'lucide-react'

const RoleSelector = ({ onSelectRole }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Welcome to Nurse<span className='text-emerald-500'>Naija</span>
        </h2>
        <p className="text-lg text-gray-600">Choose your role to begin</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
        <motion.button
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          onClick={() => onSelectRole('patient')}
          className="group relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
              <UserIcon className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Patient</h3>
            <p className="text-sm text-gray-600">
              Describe your symptoms and get triage guidance
            </p>
          </div>
        </motion.button>

        <motion.button
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          onClick={() => onSelectRole('doctor')}
          className="group relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <StethoscopeIcon className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Physician</h3>
            <p className="text-sm text-gray-600">
              Assist with patient triage and assessment
            </p>
          </div>
        </motion.button>
      </div>
    </div>
  )
}

export default RoleSelector