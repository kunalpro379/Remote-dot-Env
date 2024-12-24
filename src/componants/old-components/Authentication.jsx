// import React, { useState } from 'react';
// import { X, Mail, Lock, User, AlertCircle } from 'lucide-react';

// const Authentication = ({ setIsAuthenticated }) => {
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showSignupModal, setShowSignupModal] = useState(false);
//   const [showError, setShowError] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [signupEmail, setSignupEmail] = useState('');
//   const [signupPassword, setSignupPassword] = useState('');
//   const [signupName, setSignupName] = useState('');
//   const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

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
//     if (signupPassword === signupConfirmPassword) {
//       setIsAuthenticated(true);
//       setShowSignupModal(false);
//       setSignupEmail('');
//       setSignupPassword('');
//       setSignupName('');
//       setSignupConfirmPassword('');
//     } else {
//       setShowError(true);
//       setTimeout(() => setShowError(false), 3000);
//     }
//   };

//   const LoginModal = () => (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/10">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-white">Login</h2>
//           <button onClick={() => setShowLoginModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
//             <X className="w-6 h-6 text-white/80" />
//           </button>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 w-5 h-5 text-white/60" />
//               <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60" placeholder="Email" required autoComplete="email" />
//             </div>
//           </div>
//           <div>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 w-5 h-5 text-white/60" />
//               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60" placeholder="Password" required autoComplete="current-password" />
//             </div>
//           </div>

//           {showError && (
//             <div className="flex items-center gap-2 text-red-400">
//               <AlertCircle className="w-5 h-5" />
//               <span>Invalid credentials. Please try again.</span>
//             </div>
//           )}

//           <button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-colors">Login</button>
//           <button type="button" onClick={() => { setShowLoginModal(false); setShowSignupModal(true); }} className="w-full text-white/80 hover:text-white text-sm transition-colors">Don't have an account? Sign up</button>
//         </form>
//       </div>
//     </div>
//   );

//   const SignupModal = () => (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/10">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-white">Create Account</h2>
//           <button onClick={() => setShowSignupModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
//             <X className="w-6 h-6 text-white/80" />
//           </button>
//         </div>

//         <form onSubmit={handleSignup} className="space-y-6">
//           <div>
//             <div className="relative">
//               <User className="absolute left-3 top-3 w-5 h-5 text-white/60" />
//               <input type="text" value={signupName} onChange={(e) => setSignupName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60" placeholder="Full Name" required autoComplete="name" />
//             </div>
//           </div>
//           <div>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 w-5 h-5 text-white/60" />
//               <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60" placeholder="Email" required autoComplete="email" />
//             </div>
//           </div>
//           <div>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 w-5 h-5 text-white/60" />
//               <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60" placeholder="Password" required autoComplete="new-password" />
//             </div>
//           </div>
//           <div>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 w-5 h-5 text-white/60" />
//               <input type="password" value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60" placeholder="Confirm Password" required autoComplete="new-password" />
//             </div>
//           </div>

//           {showError && (
//             <div className="flex items-center gap-2 text-red-400">
//               <AlertCircle className="w-5 h-5" />
//               <span>Passwords do not match</span>
//             </div>
//           )}

//           <button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-colors">Create Account</button>
//           <button type="button" onClick={() => { setShowSignupModal(false); setShowLoginModal(true); }} className="w-full text-white/80 hover:text-white text-sm transition-colors">Already have an account? Login</button>
//         </form>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {showLoginModal && <LoginModal />}
//       {showSignupModal && <SignupModal />}
//     </>
//   );
// };

// export default Authentication;
