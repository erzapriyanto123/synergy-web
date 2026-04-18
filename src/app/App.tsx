import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { ProblemTrigger } from './pages/ProblemTrigger';
import { SystemVisualization } from './pages/SystemVisualization';
import { DragDropActivity } from './pages/DragDropActivity';
import { ConnectionActivity } from './pages/ConnectionActivity';
import { DynamicAnalysis } from './pages/DynamicAnalysis';
import { SystemSimulation } from './pages/SystemSimulation';
import { GreenChemistryLab } from './pages/GreenChemistryLab';
import { Reflection } from './pages/Reflection';
import { FinalReward } from './pages/FinalReward';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/problem-trigger" element={<ProblemTrigger />} />
            <Route path="/system-visualization" element={<SystemVisualization />} />
            <Route path="/drag-drop-activity" element={<DragDropActivity />} />
            <Route path="/connection-activity" element={<ConnectionActivity />} />
            <Route path="/dynamic-analysis" element={<DynamicAnalysis />} />
            <Route path="/system-simulation" element={<SystemSimulation />} />
            <Route path="/green-chemistry-lab" element={<GreenChemistryLab />} />
            <Route path="/reflection" element={<Reflection />} />
            <Route path="/final-reward" element={<FinalReward />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </UserProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}