import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, setLoading } from "./redux/features/authSlice";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Preview from "./pages/Preview";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import LoadingScreen from "./components/LoadingScreen";
import API from "./configs/api";
import PointsDashboard from "./pages/PointsDashboard";
import Leaderboard from "./pages/Leaderboard";
import ActivityHistory from "./pages/ActivityHistory";
import ReferralPage from "./pages/ReferralPage";


function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const getUserData = async () => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await API.get("/api/users/get-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data?.user) {
          dispatch(login({ user: data.user, token }));
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show loading screen while loading
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
          <Route path="points" element={<PointsDashboard />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="activity" element={<ActivityHistory />} />
          <Route path="referral" element={<ReferralPage />} />
        </Route>

        <Route path="view/:resumeId" element={<Preview />} />

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
