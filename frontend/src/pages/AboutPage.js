import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MailIcon,
  UserIcon,
  MessageSquareIcon,
  SendIcon,
  AwardIcon,
  GlobeIcon,
  TargetIcon,
} from 'lucide-react'
import { Footer, Header } from '../components'


const AboutPage = ({ onNavigateHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({
      name: '',
      email: '',
      message: '',
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header currentPage={"about"} onNavigateHome={onNavigateHome} />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-emerald-50 to-white py-20 md:py-28 px-4">
          <div className="max-w-4xl mx-auto text-center">
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
                duration: 0.6,
              }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                About Nurse<span className="text-emerald-600">Naija</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Breaking down language barriers in Nigerian healthcare, one
                conversation at a time.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Founder Story Section */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <UserIcon className="w-6 h-6 text-emerald-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                The Story Behind Nurse<span className='text-emerald-500'>Naija</span>
              </h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-gray-50 rounded-2xl p-8 md:p-10 mb-8 border border-gray-100">
                <a 
                    className="flex items-start gap-4 mb-6"
                    href='https://www.linkedin.com/in/josephfatoye/'
                    target='blank'
                >
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img 
                        src="./assets/Portrait-NBG.png"
                        alt='Joseph Fatoye'
                        className='h-[80px]'
                    /> 
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Joseph Fatoye, B.Eng
                    </h3>
                    <p className="text-gray-600">Founder & Developer</p>
                  </div>
                </a>

                <div className="text-justify space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Growing up in Nigeria, I witnessed firsthand the challenges
                    that arise when patients and healthcare providers don't
                    speak the same language. I watched as seniors struggle
                    to explain their symptoms to doctors who didn't understand
                    their native language, and I saw the frustration on both sides of the
                    conversation.
                  </p>
                  <p>
                    These experiences stayed with me. As a developer, I knew
                    technology could bridge this gap—but it had to work in the
                    real world: in clinics with unreliable internet, with
                    patients who speak dozens of different languages, and with
                    healthcare workers who need simple, reliable tools.
                  </p>
                  <p>
                    NurseNaija is my answer to that challenge. It's built for
                    the Nigeria I know, diverse, resilient, and deserving of
                    healthcare that truly serves everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge Context Section */}
        <section className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <AwardIcon className="w-6 h-6 text-emerald-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Awarri Developer Challenge 2025
              </h2>
            </div>

            <div className="text-justify bg-white rounded-2xl p-8 md:p-10 border border-gray-100 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                NurseNaija is a submission for the{' '}
                <a 
                    href='https://www.awarri.com/developer-challenge-2025'
                    target='blank'
                >
                  <img 
                    src="./assets/awari_logo.jpg"
                    alt='Awari'
                    className='w-[35px] rounded inline'
                  /> 
                  <strong>Awarri Developer Challenge 2025</strong> 
                </a>
                , a competition that showcases real-world products built using
                African language technology.
              </p>

              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <div className="flex items-start gap-3 mb-4">
                  <GlobeIcon className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Powered by N-ATLaS
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      At the heart of NurseNaija is <strong>N-ATLaS</strong>, a
                      state-of-the-art language model specifically trained on
                      Nigerian languages including Yoruba, Igbo, Hausa, and
                      Nigerian Pidgin English.
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed ml-9">
                  Unlike generic translation tools, N-ATLaS understands the
                  nuances, idioms, and cultural context of Nigerian
                  speech, making it uniquely suited for healthcare communication
                  where precision matters.
                </p>
              </div>
            </div>

            <div className="text-justify grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  Challenge Goal
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Build practical applications that demonstrate how African
                  language technology can solve real problems in African
                  communities.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  Our Approach
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Focus on offline-first healthcare triage that works in
                  resource-constrained environments while maintaining accuracy
                  and cultural sensitivity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <TargetIcon className="w-6 h-6 text-emerald-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our Mission
              </h2>
            </div>

            <div className="text-justify bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 md:p-10 border border-emerald-100">
              <p className="text-xl text-gray-800 leading-relaxed mb-6 font-medium">
                To ensure that every Nigerian, regardless of the language they
                speak, can access quality healthcare without barriers.
              </p>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We believe that language should never be an obstacle to
                  receiving care. NurseNaija is our commitment to building
                  technology that respects Nigeria's linguistic diversity while
                  improving healthcare outcomes.
                </p>
                <p>
                  By combining offline-first design with advanced language AI,
                  we're creating tools that work in the real world; in busy
                  clinics, in rural areas, and everywhere in between.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-emerald-200">
                <h3 className="font-bold text-gray-900 mb-4">Our Values</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-emerald-600 font-bold mb-1">
                      Accessibility
                    </div>
                    <div className="text-sm text-gray-600">
                      Works offline, works for everyone
                    </div>
                  </div>
                  <div>
                    <div className="text-emerald-600 font-bold mb-1">
                      Privacy
                    </div>
                    <div className="text-sm text-gray-600">
                      Patient data stays local
                    </div>
                  </div>
                  <div>
                    <div className="text-emerald-600 font-bold mb-1">
                      Accuracy
                    </div>
                    <div className="text-sm text-gray-600">
                      Cultural context matters
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <MessageSquareIcon className="w-6 h-6 text-emerald-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Get in Touch
                </h2>
              </div>
              <p className="text-lg text-gray-600">
                Have questions or want to learn more? We'd love to hear from
                you.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Joseph Fatoye"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="joseph@example.com"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    required
                    rows={5}
                    className="text-justify w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your clinic or ask us a question..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-600 text-white font-semibold rounded-lg transition-colors duration-200 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                >
                  Send Message
                  <SendIcon className="w-5 h-5" />
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              We typically respond within 24 hours
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer currentPage={"about"} onNavigateHome={onNavigateHome} />
    </div>
  )
}

export default AboutPage