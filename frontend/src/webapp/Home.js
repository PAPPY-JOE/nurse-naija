import { useState } from 'react'
import { MenuIcon, LogOutIcon } from 'lucide-react'
import { HashLink } from 'react-router-hash-link';
import { ConversationView, HistorySidebar, RoleSelector } from '../components/webapp/'
import { useUserStore } from '../store';

const Home = () => {
  // const user = useUserStore((state) => state.user)
  const currentSessionId = useUserStore((state) => state.user.currentSessionId)
  const setCurrentSessionId = useUserStore((state) => state.setCurrentSessionId)
  const sessions = useUserStore((state) => state.user.sessions)
  // console.log(sessions)
  const addSession = useUserStore((state) => state.addSession)
  const addUserMessage = useUserStore((state) => state.addUserMessage)
  const addAssistantMessage = useUserStore((state) => state.addAssistantMessage)
  const fetchTriage = useUserStore((state) => state.fetchTriage);
  const updateSessionWithTriage = useUserStore((state) => state.updateSessionWithTriage);


  const [sidebarOpen, setSidebarOpen] = useState(false) 
  const [userRole, setUserRole] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isError, setIsError] = useState(false)

  const currentSession = sessions.find((s) => s.id === currentSessionId)

  const handleSelectRole = (role) => {
    const newSession = {
      id: Date.now().toString(),
      role,
      timestamp: new Date().toISOString(),
      preview: 'New session',
      messages: [],
      triageResult: null,
    }
    addSession(newSession)
    setCurrentSessionId(newSession.id)
    setUserRole(role)
  }

  const handleNewSession = () => {
    setUserRole(null)
    setCurrentSessionId(null)
  }

  const handleSelectSession = (sessionId) => {
    const session = sessions.find((s) => s.id === sessionId)
    if (session) {
      setCurrentSessionId(sessionId)
      setUserRole(session.role)
    }
  }

  const handleStartRecording = async () => {
    setIsRecording(true)
    // TODO: Implement actual voice recording using Web Audio API
    // For now, just simulate recording
  }

  const handleCancelRecording = async () => {
    setIsRecording(false)
    // TODO: Implement actual voice recording using Web Audio API
    // For now, just simulate recording
  }

  const handleStopRecording = async () => {
    setIsRecording(false)
    setIsProcessing(true)
    // TODO: Send audio to backend for transcription and triage
    // Simulate API call
    setTimeout(() => {
      handleReceiveResponse(
        'Oga, my belle dey pain me well well. I don vomit like three times today.',
        {
          triage_level: 'MODERATE',
          detected_symptoms: [
            'Severe abdominal pain',
            'Vomiting (3 episodes)',
            'Nausea',
          ],
          risk_score: 5,
          immediate_patient_steps: [
            'Rest and monitor symptoms',
            'Stay hydrated with clear fluids',
            'Seek medical attention if symptoms worsen',
          ],
          provider_actions: [
            'Assess for dehydration',
            'Consider gastroenteritis diagnosis',
            'Monitor for complications',
          ],
          language: 'pidgin',
          notes: 'Patient presenting with acute gastric symptoms',
          metadata: {
            timestamp: new Date().toISOString(),
            model_used: 'NCAIR1/N-ATLaS',
            offline_mode: false,
          },
        },
      )
    }, 125000)
  }

  const handleSendText = async (text) => {
    if (!currentSessionId) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    }

    addUserMessage(currentSessionId, userMessage)

    setIsProcessing(true)
    setIsError(false)

    const triage = await fetchTriage(text, userRole ?? "patient");

    if (!triage) {
      console.log("No triage results returned");
      setIsProcessing(false)
      setIsError(true)
      return;
    }

    updateSessionWithTriage(
      currentSessionId,
      triage,
      text.slice(0, 50)
    );

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: triage.notes,
      timestamp: new Date().toISOString(),
      preview: triage.triage_level
    } 
    
    addAssistantMessage(currentSessionId, assistantMessage, triage)
    
    setIsProcessing(false)
  }

  const handleReceiveResponse = (userText, triageData) => {
    if (!currentSessionId) return

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `Triage assessment complete. Level: ${triageData.triage_level}`,
      timestamp: new Date().toISOString(),
      preview: userText.slice(0, 50)
    } 

    addAssistantMessage(currentSessionId, assistantMessage, triageData)

    setIsProcessing(false)
  }
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center justify-between w-full gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MenuIcon className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex w-full justify-center items-center gap-2 cursor-pointer">            
            <HashLink 
              className="flex items-center gap-2"
              to="/app#"
            >
              <img 
                src="./assets/logo.png"
                alt='Logo'
                className='h-[30px]'
              /> 
            </HashLink>
            <div> 
              <h1 className="font-bold text-gray-900 text-sm">Nurse<span className='text-emerald-500'>Naija</span></h1>
              {userRole && (
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              )}
            </div>
          </div>
        </div>

        <HashLink
          to="/#"
          className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOutIcon className="w-5 h-5 text-red-600" />
        </HashLink>
      </header>

      {/* Sidebar */}
      <HistorySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        onNewSession={handleNewSession}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {!userRole ? (
          <RoleSelector onSelectRole={handleSelectRole} />
        ) : (
          <ConversationView
            messages={currentSession?.messages || []}
            triageResult={currentSession?.triageResult || null}
            isRecording={isRecording}
            isProcessing={isProcessing}
            isError={isError}
            onStartRecording={handleStartRecording}
            onCancelRecording={handleCancelRecording}
            onStopRecording={handleStopRecording}
            onSendText={handleSendText}
            userRole={userRole}
          />
        )}
      </main>
    </div>
  )
}

export default Home