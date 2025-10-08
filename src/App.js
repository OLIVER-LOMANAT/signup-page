import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./store/useAuthstore";
import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import { Loader2 } from 'lucide-react';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth();
      setIsInitialized(true);
    };
    initializeAuth();
  }, [checkAuth]);

  // Show loading spinner while checking authentication
  if (!isInitialized || isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-purple-50">
        <div className="text-center">
          <Loader2 className="animate-spin text-purple-500 mx-auto mb-4" size={32} />
          <p className="text-purple-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={authUser ? <HomePage /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/auth" 
          element={!authUser ? <SignupPage /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;