import { create } from "zustand";
import api, { transcribeAudio } from "./api";

export const useUserStore = create((set) => ({
  user: {
    currentSessionId: null,
    sessions: [],
    language: null,
  },

  setLanguage: (lang) =>
    set((state) => ({
      user: {
        ...state.user,
        language: lang,
      },
    })),

  setCurrentSessionId: (id) =>
    set((state) => ({
      user: {
        ...state.user,
        currentSessionId: id,
      },
    })),

  addSession: (session) =>
    set((state) => ({
      user: {
        ...state.user,
        sessions: [session, ...state.user.sessions],
      },
    })),

  addUserMessage: (sessionId, message) =>
    set((state) => {
      const updated = state.user.sessions.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              messages: [...s.messages, message],
              preview: message.content.slice(0, 50),
            }
          : s
      );

      return {
        user: {
          ...state.user,
          sessions: updated,
        },
      };
    }),

  addAssistantMessage: (sessionId, message, triageData) =>
    set((state) => {
      const updated = state.user.sessions.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              messages: [...s.messages, message],
              triageResult: triageData,
              triageLevel: triageData.triage_level,
              preview: message.content.slice(0, 50),
            }
          : s
      );

      return {
        user: {
          ...state.user,
          sessions: updated,
        },
      };
    }),

   // CALL BACKEND USING AXIOS
  fetchTriage: async (symptoms, role = "patient") => {
    try {
      const res = await api.get("/api/prod_triage", {
        params: { 
          symptoms, 
          role,
          prefer_language: null,
          max_new_tokens: 400,
          safety_mode: true,
          sync: false
        }
      });

      return res.data?.triage || null;
    } catch (err) {
      console.error("Triage API error:", err);
      return null;
    }
  },

  // UPDATE A SINGLE SESSION WITH TRIAGE RESULT
  updateSessionWithTriage: (sessionId, triage, preview) => {
    set((state) => ({
      user: {
        ...state.user,
        sessions: state.user.sessions.map((s) =>
          s.id === sessionId
            ? {
                ...s,
                triageResult: triage,
                triageLevel: triage.triage_level,
                preview,
              }
            : s
        ),
      },
    }));
  },

  // TRANSCRIBE USER AUDIO
  transcribeAudio: async (audioBlob, lang = "yoruba") => {
    try {
      const res = await transcribeAudio(audioBlob, lang);
      return res.data.transcription;
    } catch (err) {
      console.error("ASR error:", err);
      return null;
    }
  },
  
  loadSessionsFromFirebase: async () => {
    try {
      const res = await api.get("/api/get_all_triage"); // We'll create this endpoint
      const data = res.data || {};

      const sessions = Object.keys(data).map((key) => {
        const item = data[key];

        return {
          id: key,
          role: item.role,
          messages: [
            {
              role: "user",
              type: "text",
              content: item.symptoms,
              timestamp: item.timestamp,
            },
            {
              role: "assistant",
              type: "text",
              content: item.result?.notes || "Triage summary",
              timestamp: item.timestamp,
            },
          ],
          triageResult: item.result,
          triageLevel: item.result?.triage_level,
          preview: item.symptoms.slice(0, 50),
          timestamp: item.timestamp,
        };
      });

      set((state) => ({
        user: {
          ...state.user,
          sessions: sessions.reverse(), // newest first
        },
      }));
    } catch (err) {
      console.error("Error loading Firebase sessions:", err);
    }
  },

}));