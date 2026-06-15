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


const PRELOADED_DONATIONS = [
{
  id: "don_1",
  donorName: "Tan Sri Lee Kok Wah",
  email: "kw.lee@heritagecorp.com.my",
  amount: 15000,
  isAnonymous: false,
  frequency: "one-time",
  targetProject: "Changkat Orang Asli Community Co-Creation",
  date: "2026-05-29T03:40:00Z",
  paymentMethod: "fpx"
},
{
  id: "don_2",
  donorName: "Liyana Razak",
  email: "liyana.r@designarch.com",
  amount: 250,
  isAnonymous: false,
  frequency: "monthly",
  targetProject: "Borneo Marine Protection & Reef Seeding",
  date: "2026-05-30T11:20:00Z",
  paymentMethod: "card"
},
{
  id: "don_3",
  donorName: "Anonymous Supporter",
  email: "secret@donor.org",
  amount: 1000,
  isAnonymous: true,
  frequency: "one-time",
  targetProject: "General Fund (Any Program Needed)",
  date: "2026-05-31T20:15:00Z",
  paymentMethod: "paypal"
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

  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem('move_donations');
    return saved ? JSON.parse(saved) : PRELOADED_DONATIONS;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('move_messages');
    return saved ? JSON.parse(saved) : PRELOADED_MESSAGES;
  });

  useEffect(() => {
    localStorage.setItem('move_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('move_donations', JSON.stringify(donations));
  }, [donations]);

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

  const addDonation = (donation) => {
    const newDonation = {
      ...donation,
      id: `don_${Date.now()}`,
      date: new Date().toISOString()
    };
    setDonations((prev) => [newDonation, ...prev]);
  };

  const addMessage = (msg) => {
    const newMsg = {
      ...msg,
      id: `msg_${Date.now()}`,
      date: new Date().toISOString()
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const totalDonationAmount = donations.reduce((sum, item) => sum + item.amount, 0);

  return (
    <AppStateContext.Provider value={{
      applications,
      donations,
      messages,
      addApplication,
      addDonation,
      addMessage,
      totalDonationAmount
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