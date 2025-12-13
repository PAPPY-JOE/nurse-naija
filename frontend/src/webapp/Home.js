import { useEffect, useRef, useState } from 'react'
import { MenuIcon, LogOutIcon } from 'lucide-react'
import { HashLink } from 'react-router-hash-link';
import { ConversationView, HistorySidebar, RoleSelector } from '../components/webapp/'
import { useUserStore } from '../store';

const Home = () => {
  const currentSessionId = useUserStore((state) => state.user.currentSessionId)
  const setCurrentSessionId = useUserStore((state) => state.setCurrentSessionId)
  const sessions = useUserStore((state) => state.user.sessions)
  const addSession = useUserStore((state) => state.addSession)
  const addUserMessage = useUserStore((state) => state.addUserMessage)
  const addAssistantMessage = useUserStore((state) => state.addAssistantMessage)
  const fetchTriage = useUserStore((state) => state.fetchTriage);
  const updateSessionWithTriage = useUserStore((state) => state.updateSessionWithTriage);
  const transcribeAudio = useUserStore((state) => state.transcribeAudio);

  const [sidebarOpen, setSidebarOpen] = useState(false) 
  const [userRole, setUserRole] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isMicError, setIsMicError] = useState(false)
  
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

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

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioChunks.current = []; // reset chunks
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      setIsRecording(false)
      setIsMicError(true);
      console.error("Microphone error:", err);
    }
  }

  const handleCancelRecording = async () => {
    try {
      setIsRecording(false);

      // Stop MediaRecorder if active
      if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
        mediaRecorder.current.stop();
      }

      // Stop the microphone stream
      if (mediaRecorder.current?.stream) {
        mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
      }

      // Clear audio chunks
      audioChunks.current = [];

      // Reset recorder reference
      mediaRecorder.current = null;

      // Ensure UI is not stuck in processing state
      setIsProcessing(false);

    } catch (err) {
      console.error("Cancel recording error:", err);
    }
  };

  const processAudio = async (audioBlob) => {

    // Speech to Text
    const text = await transcribeAudio(audioBlob, "yoruba"); // auto-change later
    // const text = await transcribeAudio(audioBlob, "hausa"); // auto-change later
    // const text = await transcribeAudio(audioBlob, "igbo"); // auto-change later

    setIsError(false);

    if (!text) {
      setIsProcessing(false);
      // alert("Could not transcribe.");
      setIsError(true);
      return;
    }

    // Log user message
    addUserMessage(currentSessionId, {
      role: "user",
      type: "voice",
      content: text,
      timestamp: Date.now(),
    });

    // Fetch triage
    const triage = await fetchTriage(text, "patient");

    // Log assistant response & triage data
    addAssistantMessage(
      currentSessionId,
      {
        role: "assistant",
        content: triage?.notes || "Triage result available.",
        timestamp: Date.now(),
      },
      triage
    );

    setIsProcessing(false);
  };

  const handleStopRecording = async () => {
    setIsRecording(false)
    setIsProcessing(true)

    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: "audio/wav" });
      processAudio(blob);
    };
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

  const onReset = () => {
    setUserRole(null)
  }

  useEffect(() => {
    useUserStore.getState().loadSessionsFromFirebase();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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
        setIsError={setIsError}
      />

      {/* Main Content */}
      <main className="flex-1 w-full flex justify-center items-center">
        {!userRole ? (
          <RoleSelector onSelectRole={handleSelectRole} />
        ) : (
          <ConversationView
            messages={currentSession?.messages || []}
            triageResult={currentSession?.triageResult || null}
            isRecording={isRecording}
            isProcessing={isProcessing}
            isError={isError}
            isMicError={isMicError}
            onStartRecording={handleStartRecording}
            onCancelRecording={handleCancelRecording}
            onStopRecording={handleStopRecording}
            onSendText={handleSendText}
            userRole={userRole}
            onReset={onReset}
          />
        )}
      </main>
    </div>
  )
}

export default Home