import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Preview from "./pages/Preview"
import Dashboard from "./pages/Dashboard"
import ResumeBuilder from "./pages/ResumeBuilder"
import LoadingScreen from "./components/LoadingScreen"  


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - adjust duration as needed
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen while loading
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={ <Home /> } />

        <Route path="app" element={ <Layout /> } >
          <Route index element={ <Dashboard /> } />
          <Route path="builder/:resumeId" element={ <ResumeBuilder /> } />
        </Route>

        <Route path="view/:resumeId" element={ <Preview /> } />

        <Route path="/sign-up" element={ <SignUp /> } />
        <Route path="/sign-in" element={ <SignIn /> } />

      </Routes>
    </>
  )
}

export default App