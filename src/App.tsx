import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { ToastProvider } from "./context/ToastContext";


// Auth Pages
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import OtpVerification from "./pages/auth/OtpVerification";
import Onboarding from "./pages/auth/Onboarding";

// Dashboard Pages
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import AiWriter from "./pages/dashboard/AiWriter";
import SocialTools from "./pages/dashboard/SocialTools";

import Projects from "./pages/dashboard/Projects";
import ProjectDetails from "./pages/dashboard/ProjectDetails";
import Settings from "./pages/dashboard/Settings";
import Pricing from "./pages/dashboard/Pricing";
import Brand from "./pages/dashboard/Brand";
import ChatPage from "./pages/dashboard/ChatPage";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Auth Routes */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/otp-verification" element={<OtpVerification />} />
              <Route path="/onboarding" element={<Onboarding />} />

              {/* Dashboard Layout Routes */}
              <Route path="/" element={<DashboardLayout />}>
              <Route path="/chat" element={<ChatPage />} />
                <Route index element={<Dashboard />} />
                <Route path="ai-writer" element={<AiWriter />} />
                <Route path="settings" element={<Settings />} />
                <Route path="social-tools" element={<SocialTools />} />
                <Route path="chatpage" element={<ChatPage />} />
                <Route path="projects" element={<Projects />} />
                <Route path="projects/:id" element={<ProjectDetails />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="brand" element={<Brand />} />
              </Route>
            </Routes>
          </Router>
        </ToastProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
