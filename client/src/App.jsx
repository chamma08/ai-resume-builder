import { useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, setLoading } from "./redux/features/authSlice";
import { awardPoints, fetchUserPoints } from "./redux/features/pointsSlice";
import LoadingScreen from "./components/LoadingScreen";
import API from "./configs/api";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./pages/Layout"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Preview = lazy(() => import("./pages/Preview"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"));
const PointsDashboard = lazy(() => import("./pages/PointsDashboard"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const ActivityHistory = lazy(() => import("./pages/ActivityHistory"));
const ReferralPage = lazy(() => import("./pages/ReferralPage"));


function App() {
  const dispatch = useDispatch();
  const { loading,user } = useSelector((state) => state.auth);

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

  const checkDailyLogin = async () => {
    if (!user) return;
    
    const lastLogin = localStorage.getItem('lastLoginDate');
    const today = new Date().toDateString();
    
    if (lastLogin !== today) {
      // Award daily login points
      try {
        await dispatch(awardPoints({ 
          activityType: 'DAILY_LOGIN' 
        })).unwrap();
        
        localStorage.setItem('lastLoginDate', today);
        
        // Don't show toast immediately to avoid spam
        console.log('Daily login bonus awarded: +10 points');
      } catch (error) {
        console.error('Error awarding daily login:', error);
      }
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user && !loading) {
      checkDailyLogin();
      dispatch(fetchUserPoints());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, dispatch]);

  // Show loading screen while loading
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<LoadingScreen />}>
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
      </Suspense>
    </>
  );
}

export default App;
