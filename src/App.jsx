import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { SignUpPage, BuggyComponent } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Settings } from "./pages/Settings";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/error_boundary";

export const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // console.log({ authUser });
  // console.log({ onlineUsers });

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"></Loader>
      </div>
    );
  }
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={
            !authUser ? (
              <ErrorBoundary>
                {/* <BuggyComponent /> */}
                <SignUpPage />
              </ErrorBoundary>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      <Toaster></Toaster>
    </div>
  );
};

export default App;
