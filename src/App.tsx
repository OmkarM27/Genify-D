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
import ContentStudio from "./pages/dashboard/ContentStudio";
import EngagementHub from "./pages/dashboard/EngagementHub";
import SocialMediaManager from "./pages/dashboard/SocialMediaManager";

// Tools
import BlogCreator from "./pages/tools/BlogCreator";
import EmailCampaign from "./pages/tools/EmailCampaign";
import OutreachManager from "./pages/tools/OutreachManager";
import ArticleGenerator from "./pages/tools/ArticleGenerator";
import LinkedInPost from "./pages/tools/LinkedInPost";
import YoutubeScript from "./pages/tools/YoutubeScript";
import OneLinerGenerator from "./pages/tools/OneLinerGenerator";
import InstagramPost from "./pages/tools/InstagramPost"; // ✅ NEWLY ADDED

// Dynamic Use Case Page
import DynamicUseCasePage from "./pages/usecases/DynamicUseCasePage";

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
                <Route index element={<Dashboard />} />
                <Route path="ai-writer" element={<AiWriter />} />
                <Route path="settings" element={<Settings />} />
                <Route path="social-tools" element={<SocialTools />} />
                <Route path="chatpage" element={<ChatPage />} />
                <Route path="projects" element={<Projects />} />
                <Route path="projects/:id" element={<ProjectDetails />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="brand" element={<Brand />} />
                <Route path="chat" element={<ChatPage />} />
                <Route path="hub/content" element={<ContentStudio />} />
                <Route path="hub/engagement" element={<EngagementHub />} />
                <Route path="hub/social-media" element={<SocialMediaManager />} />

                {/* Tools */}
                <Route path="tools/blog-creator" element={<BlogCreator />} />
                <Route path="tools/email-campaign-generator" element={<EmailCampaign />} />
                <Route path="tools/outreach-manager" element={<OutreachManager />} />
                <Route path="tools/article-generator" element={<ArticleGenerator />} />
                <Route path="tools/linkedin-post" element={<LinkedInPost />} />
                <Route path="tools/youtube-script" element={<YoutubeScript />} />
                <Route path="tools/one-liner-generator" element={<OneLinerGenerator />} />
                <Route path="tools/instagram-post" element={<InstagramPost />} /> {/* ✅ New Route */}
                
                {/* Dynamic Use Case */}
                <Route path="usecases/:useCaseId" element={<DynamicUseCasePage />} />
              </Route>
            </Routes>
          </Router>
        </ToastProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
