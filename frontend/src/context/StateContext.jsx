import React, { createContext, useContext, useState, useEffect } from 'react';












const AppStateContext = createContext(undefined);

const PRELOADED_APPLICATIONS = [
{
  id: "app_pre_1",
  fullName: "Aisha binti Rahman",
  email: "aisha.rahman@gmail.com",
  phone: "+60 12-345 6789",
  age: 22,
  nationality: "Malaysian",
  skills: ["Secondary Tutoring", "Social Media", "Malay conversational"],
  preference: "Local",
  motivation: "I want to spend my semester break empowering kids in Changkat with organic planting skills. True community co-creation matters!",
  availability: "Immediate (June - July 2026)",
  status: "Reviewing",
  appliedProjectTitle: "Changkat Orang Asli Community Co-Creation",
  appliedAt: "2026-05-24T08:30:00Z"
},
{
  id: "app_pre_2",
  fullName: "Marcus Van de Berg",
  email: "marcus.vdb@univ-utrecht.nl",
  phone: "+31 6 12345678",
  age: 25,
  nationality: "Dutch",
  skills: ["Basic Engineering", "Carpentry", "Water Management"],
  preference: "International",
  motivation: "I have studies in sustainability. Helping co-install sand filters in Siem Reap directly with Cambodian partners is the exact humble learning project I seek.",
  availability: "August 2026 (3 weeks)",
  status: "Approved",
  appliedProjectTitle: "Siem Reap Eco-Water and Solar Installation",
  appliedAt: "2026-05-28T14:15:00Z"
}];



const PRELOADED_MESSAGES = [
{
  id: "msg_1",
  name: "Dr. Farah Hashim (UiTM)",
  email: "farah.hashim@uitm.edu.my",
  subject: "Co-creation Research Collaboration",
  message: "We love your co-creation methodology with local indigenous partners. Would love to run a collaborative social science paper or place student interns.",
  date: "2026-05-30T09:00:00Z"
}];


export const AppStateProvider = ({ children }) => {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('move_applications');
    return saved ? JSON.parse(saved) : PRELOADED_APPLICATIONS;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('move_messages');
    return saved ? JSON.parse(saved) : PRELOADED_MESSAGES;
  });

  useEffect(() => {
    localStorage.setItem('move_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('move_messages', JSON.stringify(messages));
  }, [messages]);

  const addApplication = (app) => {
    const newApp = {
      ...app,
      id: `app_${Date.now()}`,
      status: 'Pending',
      appliedAt: new Date().toISOString()
    };
    setApplications((prev) => [newApp, ...prev]);
  };

  const addMessage = (msg) => {
    const newMsg = {
      ...msg,
      id: `msg_${Date.now()}`,
      date: new Date().toISOString()
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  return (
    <AppStateContext.Provider value={{
      applications,
      messages,
      addApplication,
      addMessage
    }}>
      {children}
    </AppStateContext.Provider>);

};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};