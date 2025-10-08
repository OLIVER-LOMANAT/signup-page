import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Loader2, Rocket, RefreshCw, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthstore'; // Import your auth store

function HomePage() {
  // FIXED: useMemo to memoize launchDate so it doesn't change on every render
  const launchDate = useMemo(() => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), []);
  
  // FIXED: Define getTimeLeft before using it in useState
  const getTimeLeft = useCallback(() => {
    const now = new Date();
    const diff = launchDate - now;

    if (diff <= 0) {
      return null;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  }, [launchDate]);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [isLoading, setIsLoading] = useState(false);
  
  // Get auth store functions
  const { authUser, logout } = useAuthStore();

  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleLogout = async () => {
    try {
      await logout();
      // The logout function in your store should handle redirecting to auth page
      // If not, you can add: window.location.href = '/auth';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = getTimeLeft();
      setTimeLeft(updatedTimeLeft);
      if (!updatedTimeLeft) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [getTimeLeft]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 text-purple-900 p-6 relative">
      
      {/* Logout Button - Top Right */}
      {authUser && (
        <div className="absolute top-6 right-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg shadow-lg hover:bg-purple-50 transition-all duration-300 border border-purple-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}

      {/* User Welcome Message - Top Left */}
      {authUser && (
        <div className="absolute top-6 left-6">
          <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-purple-200">
            <p className="text-purple-600 font-medium">
              Welcome, <span className="text-purple-800">{authUser.username}</span>!
            </p>
          </div>
        </div>
      )}

      <div className="text-center max-w-2xl">
        <Rocket className="mx-auto mb-6 text-purple-500" size={64} />
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Launch Countdown
        </h1>
        
        {timeLeft ? (
          <>
            <p className="text-xl text-purple-600 mb-8">
              Our amazing app is launching soon! Get ready for something special.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-lg border border-purple-200">
                <div className="text-3xl font-bold text-purple-600">{timeLeft.days}</div>
                <div className="text-sm text-purple-500 mt-1">Days</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-lg border border-purple-200">
                <div className="text-3xl font-bold text-purple-600">{timeLeft.hours}</div>
                <div className="text-sm text-purple-500 mt-1">Hours</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-lg border border-purple-200">
                <div className="text-3xl font-bold text-purple-600">{timeLeft.minutes}</div>
                <div className="text-sm text-purple-500 mt-1">Minutes</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-lg border border-purple-200">
                <div className="text-3xl font-bold text-purple-600">{timeLeft.seconds}</div>
                <div className="text-sm text-purple-500 mt-1">Seconds</div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <div className="text-6xl">🎉</div>
            <p className="text-3xl font-semibold text-green-600">We Have Launched!</p>
            <p className="text-lg text-purple-600 max-w-md">
              Thank you for your patience! Our app is now live and ready for you to explore.
            </p>
          </div>
        )}

        {!timeLeft && (
          <button
            onClick={handleReload}
            disabled={isLoading}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Reloading...
              </>
            ) : (
              <>
                <RefreshCw size={20} />
                Reload Page
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default HomePage;