import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  Upload, 
  Bell, 
  Stethoscope, 
  MessageSquare, 
  AlertCircle,
  Languages,
  FileText,
  Menu,
  X,
  User,
  Brain,
  Calendar,
  Clock,
  Shield,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { DoctorLogin } from './components/DoctorLogin';
import { DoctorSignup } from './components/DoctorSignup';
import { DoctorDashboard } from './components/DoctorDashboard';
import { DoctorProfile } from './components/DoctorProfile';
import { Dashboard } from './components/Dashboard';
import { UploadPrescription } from './components/UploadPrescription';
import { Reminders } from './components/Reminders';
import { Symptoms } from './components/Symptoms';
import { Consultations } from './components/Consultations';
import { Chatbot } from './components/Chatbot';
import { Emergency } from './components/Emergency';
import { Language } from './components/Language';
import { Profile } from './components/Profile';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

function DoctorPrivateRoute({ children }: { children: React.ReactNode }) {
  const isDoctorLoggedIn = localStorage.getItem('isDoctorLoggedIn') === 'true';
  return isDoctorLoggedIn ? <>{children}</> : <Navigate to="/doctor/login" />;
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle navbar visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavbarVisible(currentScrollY <= lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById('mobile-nav');
      if (isMobileMenuOpen && nav && !nav.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', icon: <Home className="w-5 h-5 text-purple-500" />, label: 'Home' },
    { path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5 text-blue-500" />, label: 'Dashboard' },
    { path: '/upload', icon: <Upload className="w-5 h-5 text-green-500" />, label: 'Upload Prescription' },
    { path: '/reminders', icon: <Bell className="w-5 h-5 text-yellow-500" />, label: 'Reminders' },
    { path: '/symptoms', icon: <FileText className="w-5 h-5 text-pink-500" />, label: 'Symptoms' },
    { path: '/consultations', icon: <Stethoscope className="w-5 h-5 text-red-500" />, label: 'Consultations' },
    { path: '/chatbot', icon: <MessageSquare className="w-5 h-5 text-cyan-500" />, label: 'AI Chatbot' },
    { path: '/emergency', icon: <AlertCircle className="w-5 h-5 text-orange-500" />, label: 'Emergency' },
    { path: '/language', icon: <Languages className="w-5 h-5 text-indigo-500" />, label: 'Language' },
    { path: '/profile', icon: <User className="w-5 h-5 text-purple-500" />, label: 'Profile' },
  ];

  const doctorNavItems = [
    { path: '/doctor/dashboard', icon: <LayoutDashboard className="w-5 h-5 text-blue-500" />, label: 'Dashboard' },
    { path: '/doctor/profile', icon: <User className="w-5 h-5 text-purple-500" />, label: 'Profile' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/signup" element={<DoctorSignup />} />
          <Route path="/" element={<HomePage />} />
          
          {/* Doctor Routes */}
          <Route
            path="/doctor/*"
            element={
              <DoctorPrivateRoute>
                <div className="min-h-screen bg-[#0a0a0f] text-white">
                  {/* Mobile Menu Button */}
                  <div className={`lg:hidden fixed top-4 right-4 z-50 transition-transform duration-300 ${
                    isNavbarVisible ? 'translate-y-0' : '-translate-y-16'
                  }`}>
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="p-2 text-white hover:bg-gray-800 rounded-lg backdrop-blur-sm bg-gray-800/50"
                      aria-label="Toggle menu"
                    >
                      {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                  </div>

                  {/* Sidebar Navigation */}
                  <nav
                    id="mobile-nav"
                    className={`
                      fixed top-0 left-0 h-full w-64 bg-[#12121a] transform transition-all duration-300 ease-in-out z-40
                      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                      lg:shadow-none
                      border-r border-gray-800/50 backdrop-blur-sm
                    `}
                  >
                    <div className="sticky top-0 bg-[#12121a] z-10 border-b border-gray-800/50 p-6">
                      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                        MediNest
                      </h1>
                      <p className="text-sm text-gray-400 mt-1">Doctor Portal</p>
                    </div>
                    
                    <div className="h-[calc(100vh-5rem)] overflow-y-auto no-scrollbar">
                      <ul className="space-y-2 px-4 py-4">
                        {doctorNavItems.map((item) => (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.icon}
                              <span>{item.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </nav>

                  {/* Overlay */}
                  {isMobileMenuOpen && (
                    <div
                      className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  )}

                  {/* Main Content */}
                  <main className={`
                    transition-all duration-300 ease-in-out
                    ${isMobileMenuOpen ? 'lg:ml-64' : 'lg:ml-64'}
                    min-h-screen
                  `}>
                    <Routes>
                      <Route path="/dashboard" element={<DoctorDashboard />} />
                      <Route path="/profile" element={<DoctorProfile />} />
                    </Routes>
                  </main>
                </div>
              </DoctorPrivateRoute>
            }
          />

          {/* Patient Routes */}
          <Route
            path="*"
            element={
              <PrivateRoute>
                <div className="min-h-screen bg-[#0a0a0f] text-white">
                  {/* Mobile Menu Button */}
                  <div className={`lg:hidden fixed top-4 right-4 z-50 transition-transform duration-300 ${
                    isNavbarVisible ? 'translate-y-0' : '-translate-y-16'
                  }`}>
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="p-2 text-white hover:bg-gray-800 rounded-lg backdrop-blur-sm bg-gray-800/50"
                      aria-label="Toggle menu"
                    >
                      {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                  </div>

                  {/* Sidebar Navigation */}
                  <nav
                    id="mobile-nav"
                    className={`
                      fixed top-0 left-0 h-full w-64 bg-[#12121a] transform transition-all duration-300 ease-in-out z-40
                      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                      lg:shadow-none
                      border-r border-gray-800/50 backdrop-blur-sm
                    `}
                  >
                    <div className="sticky top-0 bg-[#12121a] z-10 border-b border-gray-800/50 p-6">
                      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                        MediNest
                      </h1>
                    </div>
                    
                    <div className="h-[calc(100vh-5rem)] overflow-y-auto no-scrollbar">
                      <ul className="space-y-2 px-4 py-4">
                        {navItems.map((item) => (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.icon}
                              <span>{item.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </nav>

                  {/* Overlay */}
                  {isMobileMenuOpen && (
                    <div
                      className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  )}

                  {/* Main Content */}
                  <main className={`
                    transition-all duration-300 ease-in-out
                    ${isMobileMenuOpen ? 'lg:ml-64' : 'lg:ml-64'}
                    min-h-screen
                  `}>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/upload" element={<UploadPrescription />} />
                      <Route path="/reminders" element={<Reminders />} />
                      <Route path="/symptoms" element={<Symptoms />} />
                      <Route path="/consultations" element={<Consultations />} />
                      <Route path="/chatbot" element={<Chatbot />} />
                      <Route path="/emergency" element={<Emergency />} />
                      <Route path="/language" element={<Language />} />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </main>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// Home Page Component
function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl transform -skew-y-12"></div>
        </div>
      </div>

      {/* Navigation */}
      {/* <nav className="fixed w-full z-50 bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                MediNest
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Patient Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors shadow-lg shadow-purple-500/25"
                >
                  Patient Sign Up
                </Link>
              </div>
              <div className="border-l border-gray-800 h-8"></div>
              <div className="flex items-center space-x-2">
                <Link
                  to="/doctor/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Doctor Login
                </Link>
                <Link
                  to="/doctor/signup"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors shadow-lg shadow-blue-500/25"
                >
                  Doctor Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 mb-8">
              <Sparkles className="w-4 h-4 text-purple-500 mr-2" />
              <span className="text-sm">AI-Powered Healthcare Platform</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                Revolutionary
              </span>
              <br />
              <span className="text-white">
                Healthcare for All
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              Experience the future of healthcare with AI-driven medication management, 
              symptom tracking, and instant doctor consultations.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/signup"
                className="px-8 py-4 bg-purple-500 hover:bg-purple-600 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25 flex items-center gap-2"
              >
                Get Started as Patient <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/doctor/signup"
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                Join as Doctor <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-pink-900/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Smart Features for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"> Better Health</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8 text-purple-500" />,
                title: "AI Prescription Analysis",
                description: "Upload prescriptions for instant AI analysis and medication instructions"
              },
              {
                icon: <Bell className="w-8 h-8 text-yellow-500" />,
                title: "Smart Reminders",
                description: "Never miss a dose with personalized medication reminders"
              },
              {
                icon: <Stethoscope className="w-8 h-8 text-blue-500" />,
                title: "Doctor Consultations",
                description: "Connect with healthcare professionals through video calls"
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-green-500" />,
                title: "AI Health Assistant",
                description: "Get instant answers to your health queries 24/7"
              },
              {
                icon: <Shield className="w-8 h-8 text-red-500" />,
                title: "Emergency Support",
                description: "Quick access to emergency contacts and medical history"
              },
              {
                icon: <Languages className="w-8 h-8 text-cyan-500" />,
                title: "Multilingual Support",
                description: "Healthcare assistance in your preferred language"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/30 p-8 rounded-2xl hover:bg-gray-800/50 transition-all transform hover:scale-105 border border-gray-700/50 backdrop-blur-sm"
              >
                <div className="mb-4 p-3 bg-gray-700/30 rounded-xl w-fit">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/10 to-purple-900/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Simple Steps to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"> Better Health</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Upload className="w-8 h-8 text-purple-500" />,
                title: "Upload Prescription",
                description: "Take a photo of your prescription"
              },
              {
                icon: <Brain className="w-8 h-8 text-pink-500" />,
                title: "AI Analysis",
                description: "Our AI extracts medication details"
              },
              {
                icon: <Clock className="w-8 h-8 text-blue-500" />,
                title: "Set Reminders",
                description: "Get notifications for your medications"
              },
              {
                icon: <Calendar className="w-8 h-8 text-green-500" />,
                title: "Track Progress",
                description: "Monitor your health journey"
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 rounded-2xl bg-gray-800/30 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform border border-gray-700/50 backdrop-blur-sm">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="bg-gray-800/30 p-12 rounded-3xl border border-gray-700/50 backdrop-blur-sm">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Take Control of Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"> Health Today</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who are managing their health smarter with MediNest
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/signup"
                className="px-8 py-4 bg-purple-500 hover:bg-purple-600 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25 flex items-center gap-2"
              >
                Join as Patient <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/doctor/signup"
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                Join as Doctor <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                MediNest
              </h3>
              <p className="text-gray-400">
                AI-powered healthcare companion for better medication management and health tracking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-purple-500 transition-colors cursor-pointer">Prescription Scanner</li>
                <li className="hover:text-purple-500 transition-colors cursor-pointer">Medication Reminders</li>
                <li className="hover:text-purple-500 transition-colors cursor-pointer">Doctor Consultations</li>
                <li className="hover:text-purple-500 transition-colors cursor-pointer">AI Health Assistant</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-purple-500 transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-purple-500 transition-colors cursor-pointer">Contact</li>
                <li className="hover:text-purple-500 transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-purple-500 transition-colors cursor-pointer">Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-purple-500 transition-colors cursor-pointer">Twitter</li>
                <li className="hover:text-purple-500 transition-colors cursor-pointer">LinkedIn</li>
                <li className="hover:text-purple-500 transition-colors cursor-pointer">Facebook</li>
                <li className="hover:text-purple-500 transition-colors cursor-pointer">Instagram</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800/50 text-center text-gray-400">
            <p>&copy; 2024 MediNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;