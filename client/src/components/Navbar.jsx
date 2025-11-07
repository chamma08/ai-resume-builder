import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/job_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authSlice";
import {
  Activity,
  Gift,
  LogOutIcon,
  TrendingUp,
  Trophy,
  UserCircle2Icon,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-white shadow-md border-b-4 border-blue-500 sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 py-3">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2 transform hover:scale-105 transition-transform duration-200 z-50"
        >
          <img src={logo} alt="Logo" className="h-10 sm:h-12 w-auto drop-shadow-md" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex gap-2 items-center">
          <Link
            to="/app"
            className="flex items-center gap-2 px-3 xl:px-4 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border-2 border-transparent hover:border-blue-200"
          >
            Dashboard
          </Link>
          <Link
            to="/app/points"
            className="flex items-center gap-2 px-3 xl:px-4 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-all duration-200 border-2 border-transparent hover:border-amber-200"
          >
            <Trophy size={18} className="text-amber-500" />
            Points
          </Link>
          {/* <Link
            to="/app/leaderboard"
            className="flex items-center gap-2 px-3 xl:px-4 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 border-2 border-transparent hover:border-green-200"
          >
            <TrendingUp size={18} className="text-green-500" />
            Leaderboard
          </Link> */}
          <Link
            to="/app/activity"
            className="flex items-center gap-2 px-3 xl:px-4 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 border-2 border-transparent hover:border-purple-200"
          >
            <Activity size={18} className="text-purple-500" />
            Activity
          </Link>
          <Link
            to="/app/referral"
            className="flex items-center gap-2 px-3 xl:px-4 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200 border-2 border-transparent hover:border-pink-200"
          >
            <Gift size={18} className="text-pink-500" />
            Referral
          </Link>
        </div>

        {/* Desktop User Section */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 px-4 py-2.5 bg-blue-50 rounded-lg border-2 border-blue-200 shadow-sm">
            <UserCircle2Icon className="size-5 text-blue-600" />
            <p className="text-sm text-slate-800">
              <span className="font-bold text-blue-600">{user.name}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 xl:px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 border-2 border-red-600"
          >
            <LogOutIcon className="size-4" />
            <span className="hidden xl:inline">Logout</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center justify-center p-2 rounded-lg hover:bg-blue-50 transition-colors z-50"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-slate-700" />
          ) : (
            <Menu size={24} className="text-slate-700" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 backdrop-blur-xs bg-white/30 z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed top-[73px] right-0 h-[calc(100vh-73px)] w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 lg:hidden ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-6">
            {/* User Info - Mobile */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200 mb-6">
              <UserCircle2Icon className="size-8 text-blue-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-600">Welcome back,</p>
                <p className="font-bold text-blue-600 truncate">{user.name}</p>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex-1 space-y-2">
              <Link
                to="/app"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border-2 border-transparent hover:border-blue-200"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-lg">
                  <span className="text-blue-600 text-lg font-bold">📊</span>
                </div>
                <span>Dashboard</span>
              </Link>

              <Link
                to="/app/points"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-all duration-200 border-2 border-transparent hover:border-amber-200"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-amber-100 rounded-lg">
                  <Trophy size={18} className="text-amber-600" />
                </div>
                <span>Points</span>
              </Link>

              <Link
                to="/app/leaderboard"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg font-medium text-slate-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 border-2 border-transparent hover:border-green-200"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-lg">
                  <TrendingUp size={18} className="text-green-600" />
                </div>
                <span>Leaderboard</span>
              </Link>

              <Link
                to="/app/activity"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 border-2 border-transparent hover:border-purple-200"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-lg">
                  <Activity size={18} className="text-purple-600" />
                </div>
                <span>Activity</span>
              </Link>

              <Link
                to="/app/referral"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg font-medium text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200 border-2 border-transparent hover:border-pink-200"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-pink-100 rounded-lg">
                  <Gift size={18} className="text-pink-600" />
                </div>
                <span>Referral</span>
              </Link>
            </nav>

            {/* Logout Button - Mobile */}
            <button
              onClick={() => {
                closeMobileMenu();
                handleLogout();
              }}
              className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 border-2 border-red-600 mt-4"
            >
              <LogOutIcon className="size-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
