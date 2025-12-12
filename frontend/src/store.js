import { create } from "zustand";
import api from "./api";

export const useUserStore = create((set) => ({
  user: {
    currentSessionId: null,
    sessions: [],
  },

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

   // CALL YOUR BACKEND USING AXIOS
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
  
}));