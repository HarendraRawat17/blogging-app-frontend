
import { useState, useEffect } from 'react';
import Header from './pages/Header';
import SignUp from './components/SignUp';
import OtpForm from './components/OtpForm';
import LoginForm from './components/LoginForm';
import Hero from './pages/Hero';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function App() {
  // 1. Single 'view' state to manage the flow: 
  // 'newPage' | 'signup' | 'otp' | 'login' | 'dashboard'
 const [view, setView] = useState(() => {
  return localStorage.getItem('info') ? 'dashboard' : 'newPage';
});


const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('info'));
  
  // 2. State to hold data between steps (e.g., email from Signup to OTP)
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate()



  // 3. Check if user is already signed in on page load
  // useEffect(() => {
  //   const info = localStorage.getItem('info');
  //   if (info) {
  //     setView('dashboard');
  //   }
  // }, []);




  // Handlers for step transitions
  const handleSignupSuccess = (data) => {
    setUserData(data); // Save response for next step
    setView('otp');    // Move to OTP
  };

  const handleOtpVerified = () => {
    setView('login');  // Move to Login after OTP
  };

  const handleLoginSuccess = (info) => {
    localStorage.setItem('info', info);
    setIsLoggedIn(true); // Update the boolean!
    setView('newPage');  // Close any open modals
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem('info');
    localStorage.removeItem('userId');
    setIsLoggedIn(false); // Update the boolean!
    setView('newPage') // it Reset the view to def.
    navigate("/");
     toast.success("Logged out!");
  };

  return (
    <div className="app-container">
      {/* Header always visible, but buttons change based on view */}
      <Toaster position='top-right' toastOptions={{duration: 3000}}/>
      <Header 
        onAddClick={() => setView('signup')} 
        onLogin={()=> setView('login')}
        isLoggedIn={isLoggedIn} ///changed view==='dashboard' to isLoggedIn
        onLogout={handleLogout}
      />
      <Hero onLogout={handleLogout} />


      {/* STEP 1: SIGNUP MODAL */}
      {view === 'signup' && (
        <SignUp 
          onClose={() => setView('newPage')} 
          onSuccess={handleSignupSuccess} 
          onLogin={()=> setView('login')}
        />
      )}

      {/* STEP 2: OTP MODAL */}
      {view === 'otp'  && (
        <OtpForm 
          email={userData?.email} 
          onSuccess={handleOtpVerified} 
          onClose={() => setView('newPage')}
        />
      )}

      {/* STEP 3: LOGIN MODAL */}
      {view === 'login' && (
        <LoginForm 
          onSuccess={handleLoginSuccess} 
          onClose={() => setView('newPage')}
        />
      )}

    </div>
  );
}

export default App;
