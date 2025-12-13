import { motion, AnimatePresence } from "framer-motion";
import { XIcon, MessageSquareIcon, ClockIcon, PlusIcon } from "lucide-react";
import { getLevelColor, getLevelConfig } from "../../helper";

const HistorySidebar = ({
  isOpen,
  onClose,
  sessions,
  currentSessionId,
  onSelectSession,
  onNewSession,
  setIsError,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{
              x: -300,
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: -300,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-50 flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <MessageSquareIcon className="w-5 h-5 text-emerald-600" />
                Sessions
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              >
                <XIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* New Session Button */}
            <div className="p-4 border-b border-gray-200">
              <button
                onClick={() => {
                  onNewSession();
                  onClose();
                  setIsError(false);
                }}
                className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                New Session
              </button>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto">
              {sessions.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <MessageSquareIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">No sessions yet</p>
                  <p className="text-xs mt-1">Start a new session to begin</p>
                </div>
              ) : (
                <div className="p-2 space-y-2">
                  {sessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => {
                        onSelectSession(session.id);
                        onClose();
                        setIsError(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentSessionId === session.id
                          ? "bg-emerald-50 border border-emerald-200"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-medium text-gray-500 capitalize">
                          {session.role}
                        </span>
                        {session.triageLevel && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium normal-case ${getLevelColor(
                              session.triageResult?.risk_score
                            )}`}
                          >
                            {
                              getLevelConfig(session.triageResult?.risk_score)
                                ?.level
                            }
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-900 line-clamp-2 mb-2">
                        {session.triageResult?.notes?.length > 0
                          ? session.triageResult?.notes?.slice(0, 50) + "..."
                          : "Start a new conversation..."}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <ClockIcon className="w-3 h-3" />
                        {new Date(session.timestamp).toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default HistorySidebar;
