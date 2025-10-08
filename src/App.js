import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./store/useAuthstore";
import { Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Route } from "react-router-dom";
import { useEffect } from "react";

function App() {

  const {authUser, checkAuth} = useAuthStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <div>
      <Routes>
      <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/auth"/>} />
      <Route path="/auth" element={!authUser ? <SignupPage /> : <Navigate to="/"/>}/>
      <Route path="*" element={<Navigate to="/" />}/>
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
      />
    </div>
  );
}

export default App;
