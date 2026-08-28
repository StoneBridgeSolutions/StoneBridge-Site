import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Marketing from './pages/Marketing'
import SocialMedia from './pages/SocialMedia'
import EmailNewsletters from './pages/EmailNewsletters'
import Blog from './pages/Blog'
import PushNotifications from './pages/PushNotifications'
import Intake from './pages/Intake'
import VoiceAI from './pages/VoiceAI'
import IntakeForms from './pages/IntakeForms'
import ClientManager from './pages/ClientManager'
import Retention from './pages/Retention'
import Pricing from './pages/Pricing'
import Signup from './pages/Signup'
import Purchase from './pages/Purchase'
import Onboarding from './pages/Onboarding'
import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import WebDevelopment from './pages/WebDevelopment';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/marketing/social-media" element={<SocialMedia />} />
          <Route path="/marketing/email-newsletters" element={<EmailNewsletters />} />
          <Route path="/marketing/blog" element={<Blog />} />
          <Route path="/marketing/push-notifications" element={<PushNotifications />} />
          <Route path="/intake" element={<Intake />} />
          <Route path="/intake/voice-ai" element={<VoiceAI />} />
          <Route path="/intake/intake-forms" element={<IntakeForms />} />
          <Route path="/client-manager" element={<ClientManager />} />
          <Route path="/retention" element={<Retention />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        <Route path="/login" element={<Login />} />
  </Routes>
      </main>
      <Footer />
    </div>
  )
}