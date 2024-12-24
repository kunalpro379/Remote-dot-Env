//this approach was removed from the project



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Monitor, Share, Code, Users, Video, Clipboard, CheckSquare, FileText, X, Info, User, Settings, LogOut, Mail, Lock, AlertCircle, CameraIcon, Database, Globe2Icon } from 'lucide-react';
// import Authentication from './Authentication';
// import Homepage from './Homepage';

// const RemoteDesktopCard = () => {
//   const navigate = useNavigate();
//   const [selectedFeature, setSelectedFeature] = useState(null);
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showSignupModal, setShowSignupModal] = useState(false);
//   const [showError, setShowError] = useState(false);
  
//   // Auth states
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  
//   // Signup states
//   const [signupEmail, setSignupEmail] = useState('');
//   const [signupPassword, setSignupPassword] = useState('');
//   const [signupName, setSignupName] = useState('');
//   const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

//   const mockUser = {
//     name: "John Doe",
//     email: "john@example.com",
//     role: "Premium User"
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (email === "test@test.com" && password === "password") {
//       setIsAuthenticated(true);
//       setShowLoginModal(false);
//       setEmail('');
//       setPassword('');
//     } else {
//       setShowError(true);
//       setTimeout(() => setShowError(false), 3000);
//     }
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     // Add your signup logic here
//     if (signupPassword === signupConfirmPassword) {
//       setIsAuthenticated(true);
//       setShowSignupModal(false);
//       // Reset form
//       setSignupEmail('');
//       setSignupPassword('');
//       setSignupName('');
//       setSignupConfirmPassword('');
//     } else {
//       setShowError(true);
//       setTimeout(() => setShowError(false), 3000);
//     }
//   };

//   const handleFeatureClick = (feature) => {
//     if (!isAuthenticated) {
//       setShowLoginModal(true);
//     } else {
//       navigate(feature.path);
//     }
//   };
//   const features = [
//     {
//       title: "Remote Desktop",
//       description: "Control another computer remotely, as if you were sitting right in front of it.",
//       info: "This feature allows you to take full control of a remote desktop, enabling you to work on applications, access files, and perform tasks on another computer.",
//       path: "/remote-desktop", // Add path for navigation
//     },
//     {
//       title: "File Sharing",
//       description: "Share files easily and quickly between connected computers.",
//       info: "Allows users to send and receive files without storing them permanently on the remote system. Perfect for quick transfers.",
//       path: "/file-sharing", // Add path for navigation
//     },
//   ];

//   return (
//     <>
//       <Authentication 
//         setIsAuthenticated={setIsAuthenticated} 
//         setShowLoginModal={setShowLoginModal} 
//         setShowSignupModal={setShowSignupModal} 
//         setShowError={setShowError} 
//         setEmail={setEmail} 
//         setPassword={setPassword} 
//         setSignupEmail={setSignupEmail} 
//         setSignupPassword={setSignupPassword} 
//         setSignupName={setSignupName} 
//         setSignupConfirmPassword={setSignupConfirmPassword} 
//         handleLogin={handleLogin} 
//         handleSignup={handleSignup} 
//       />
//       <Homepage 
//         features={features} 
//         handleFeatureClick={handleFeatureClick} 
//         selectedFeature={selectedFeature} 
//         setSelectedFeature={setSelectedFeature} 
//         hoveredIndex={hoveredIndex} 
//         setHoveredIndex={setHoveredIndex} 
//         showProfileDropdown={showProfileDropdown} 
//         setShowProfileDropdown={setShowProfileDropdown} 
//         mockUser={mockUser} 
//         isAuthenticated={isAuthenticated} 
//       />
//     </>
//   );
// };

// export default RemoteDesktopCard;


/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Share, Code, Users, Video, Clipboard, CheckSquare, FileText, X, Info, User, Settings, LogOut, Mail, Lock, AlertCircle } from 'lucide-react';
import features from '../RemotedotEnv/features.json'; 
import SignupModal from '../Features/Authentication/views/Signup.jsx';
import LoginModal from '../Features/Authentication/views/Login.jsx';

const RemoteDesktopCard = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup states
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    role: "Premium User"
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login logic
    if (email === "test@test.com" && password === "password") {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setEmail('');
      setPassword('');
    } else {
      setShowError(true);
      setErrorMessage('Invalid credentials. Please try again.');
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    // Validation checks
    if (!signupName.trim()) {
      setShowError(true);
      setErrorMessage('Please enter your full name.');
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (!signupEmail.includes('@')) {
      setShowError(true);
      setErrorMessage('Please enter a valid email address.');
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (signupPassword.length < 6) {
      setShowError(true);
      setErrorMessage('Password must be at least 6 characters long.');
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setShowError(true);
      setErrorMessage('Passwords do not match.');
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // If all validations pass, proceed with signup
    setIsAuthenticated(true);
    setShowSignupModal(false);
    
    // Reset signup form
    setSignupEmail('');
    setSignupPassword('');
    setSignupName('');
    setSignupConfirmPassword('');
  };

  const handleFeatureClick = (feature) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate(feature.path);
    }
  };


  const ProfileAvatar = () => (
    <div className="relative">
      <button
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        className={`w-12 h-12 rounded-full ${isAuthenticated ? 'bg-purple-500' : 'bg-gray-500'} 
          flex items-center justify-center hover:opacity-90 transition-opacity`}
      >
        <span className="text-xl font-bold text-white">
          {isAuthenticated ? mockUser.name[0] : "?"}
        </span>
      </button>
      
      {showProfileDropdown && (
        <div 
          className="absolute top-16 right-0 w-72 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10 p-6 transform transition-all duration-300"
        >
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{mockUser.name[0]}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold">{mockUser.name}</h3>
                  <p className="text-white/60 text-sm">{mockUser.role}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <User size={18} />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                <button 
                  onClick={() => {
                    setIsAuthenticated(false);
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white/80" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Unauthorized User</h3>
                  <p className="text-white/60 text-sm">Please sign in to continue</p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setShowLoginModal(true);
                  setShowProfileDropdown(false);
                }}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setShowSignupModal(true);
                  setShowProfileDropdown(false);
                }}
                className="w-full border border-white/20 hover:bg-white/10 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
  const features = [
    {
      title: "Remote Desktop",
      description: "Control another computer remotely, as if you were sitting right in front of it.",
      info: "This feature allows you to take full control of a remote desktop, enabling you to work on applications, access files, and perform tasks on another computer.",
      path: "/remote-desktop",
      icon: Monitor,
      color: "bg-purple-500"
    },
    {
      title: "File Sharing",
      description: "Share files easily and quickly between connected computers.",
      info: "Allows users to send and receive files without storing them permanently on the remote system. Perfect for quick transfers.",
      path: "/file-sharing",
      icon: Share,
      color: "bg-blue-500"
    },
    {
      title: "Private Coding Environment",
      description: "Your personal sanctuary for coding and development.",
      info: "A secure, isolated environment for your coding needs with full IDE capabilities.",
      path: "/private-coding",
      icon: Code,
      color: "bg-green-500"
    },
    {
      title: "Collaborative Coding",
      description: "Code together in real-time with audio-video support.",
      info: "Full-featured collaborative environment with code execution, canvas, chat, and video calls.",
      path: "/collab-coding",
      icon: Users,
      color: "bg-yellow-500"
    },
    {
      title: "Meeting Handler",
      description: "Manage your virtual meetings efficiently.",
      info: "Comprehensive meeting management with scheduling and participation features.",
      path: "/meetings",
      icon: Video,
      color: "bg-red-500"
    },
    {
      title: "Virtual Whiteboard",
      description: "Collaborate visually with an interactive whiteboard.",
      info: "Real-time collaborative drawing and diagramming tool.",
      path: "/whiteboard",
      icon: Clipboard,
      color: "bg-indigo-500"
    },
    {
      title: "Task Management",
      description: "Organize and track your tasks effectively.",
      info: "Comprehensive task tracking and management system.",
      path: "/tasks",
      icon: CheckSquare,
      color: "bg-pink-500"
    },
    {
      title: "TextPad",
      description: "Simple yet powerful text editing tool.",
      info: "Feature-rich text editor for all your writing needs.",
      path: "/textpad",
      icon: FileText,
      color: "bg-teal-500"
    }
  ];

  const ProfileDropdown = () => (
    <div className="absolute top-20 right-4 w-72 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10 p-6 transform transition-all duration-300">
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{mockUser.name[0]}</span>
        </div>
        <div>
          <h3 className="text-white font-bold">{mockUser.name}</h3>
          <p className="text-white/60 text-sm">{mockUser.role}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <button className="w-full flex items-center gap-3 text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
          <User size={18} />
          <span>Profile</span>
        </button>
        <button className="w-full flex items-center gap-3 text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <button 
          onClick={() => setIsAuthenticated(false)} 
          className="w-full flex items-center gap-3 text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  const LoginModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Login</h2>
          <button
            onClick={() => setShowLoginModal(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white/80" />
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-white/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60"
                placeholder="Email"
                required
              />
            </div>
          </div>
          
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-white/60" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60"
                placeholder="Password"
                required
              />
            </div>
          </div>

          {showError && (
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>Invalid credentials. Please try again.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => {
              setShowLoginModal(false);
              setShowSignupModal(true);
            }}
            className="w-full text-white/80 hover:text-white text-sm transition-colors"
          >
            New user? Sign up
          </button>
        </form>
      </div>
    </div>
  );
  

  const SignupModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <button
            onClick={() => setShowSignupModal(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white/80" />
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-white/60" />
              <input
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60"
                placeholder="Full Name"
                required
                autoComplete="name"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-white/60" />
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60"
                placeholder="Email"
                required
                autoComplete="email"
              />
            </div>
          </div>
          
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-white/60" />
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60"
                placeholder="Password"
                required
                autoComplete="new-password"
                minLength={6}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-white/60" />
              <input
                type="password"
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60"
                placeholder="Confirm Password"
                required
                autoComplete="new-password"
                minLength={6}
              />
            </div>
          </div>

          {showError && (
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Create Account
          </button>

          <button
            type="button"
            onClick={() => {
              setShowSignupModal(false);
              setShowLoginModal(true);
            }}
            className="w-full text-white/80 hover:text-white text-sm transition-colors"
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );


return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-16 lg:p-24">
    <div className="max-w-8xl mx-auto relative">
      <div className="absolute top-0 right-4 z-10">
        <ProfileAvatar />
      </div>

      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-16 text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Welcome to RemoteEnv
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`group relative bg-white/10 backdrop-blur-lg rounded-2xl
                shadow-2xl hover:shadow-3xl transition-all duration-500
                cursor-pointer overflow-hidden
                transform hover:scale-105
                border border-white/10
              `}
              onClick={() => handleFeatureClick(feature)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`absolute inset-0 ${feature.color} opacity-0 
                group-hover:opacity-20 transition-opacity duration-500
              `} />
              
              <div className="relative p-8 md:p-10">
                <div className="flex items-center justify-between mb-6">
                  <Icon className={`w-12 h-12 text-white transition-transform duration-500
                    ${hoveredIndex === index ? 'scale-110' : 'scale-100'}
                  `} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFeature(feature);
                    }}
                    className="p-3 hover:bg-white/10 rounded-full transition-colors duration-300"
                  >
                    <Info className="w-6 h-6 text-white/80" />
                  </button>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-white/80">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} setShowSignupModal={setShowSignupModal} />}
    {showSignupModal && <SignupModal setShowSignupModal={setShowSignupModal} setShowLoginModal={setShowLoginModal} />}
    {selectedFeature && (
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={() => setSelectedFeature(null)}
      >
        <div 
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-white/10"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">
              {selectedFeature.title}
            </h2>
            <button
              onClick={() => setSelectedFeature(null)}
              className="p-3 hover:bg-white/10 rounded-full transition-colors duration-300"
            >
              <X className="w-8 h-8 text-white/80" />
            </button>
          </div>
          <p className="text-xl text-white/80 leading-relaxed">
            {selectedFeature.info}
          </p>
        </div>
      </div>
    )}
  </div>
);
};

export default RemoteDesktopCard;


*/