import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "./firebaseConfig";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

const GoogleIcon = require("../assets/images/google.png");
const GlobalImage = require("../assets/images/image.png");

function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate("/home");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSignIn = async () => {
    try {
      auth.onAuthStateChanged(() => {});

      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-6 text-white">
      {/* Global Image - Further Reduced */}
      <img
        src={GlobalImage}
        alt="Globe"
        className="mb-4 h-32 w-auto drop-shadow-2xl transition-transform duration-300 hover:scale-105"
      />

      {/* Title */}
      <h1 className="mb-2 text-xl font-semibold tracking-wide">Welcome to Globetrotter</h1>
      <p className="mb-4 text-base text-gray-200">Sign in to start your journey!</p>

      {/* Google Sign-in Button */}
      <button
        onClick={handleSignIn}
        className="flex w-full max-w-xs items-center justify-center space-x-3 rounded-full bg-white px-5 py-3 text-gray-700 shadow-md transition-all duration-300 hover:bg-gray-200 hover:shadow-lg hover:ring-2 hover:ring-white/50"
      >
        <img src={GoogleIcon} alt="Google Icon" className="h-5 w-5" />
        <span className="text-base font-medium">Continue with Google</span>
      </button>
    </div>
  );
}

export default Auth;
