import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
  Trophy,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from '../utils/icons';
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import API from "../configs/api";
import { toast } from "react-toastify";
import pdfTotext from "react-pdftotext";
import { awardPoints, fetchUserPoints } from "../redux/features/pointsSlice";
import OnboardingModal from "../components/modals/OnboardingModal";
import PointsExplainerCard from "../components/PointsExplainerCard";
import GettingStartedChecklist from "../components/GettingStartedChecklist";

export default function Dashboard() {
  const { user, token } = useSelector((state) => state.auth);
  const { points, level, progress } = useSelector((state) => state.points);
  const dispatch = useDispatch();

  const colors = [
    "indigo",
    "purple",
    "pink",
    "blue",
    "green",
    "yellow",
    "red",
    "teal",
  ];
  const [resumes, setResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [allResumes, setAllResumes] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showGettingStarted, setShowGettingStarted] = useState(true);
  const [showPointsSection, setShowPointsSection] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchResumes = async () => {
    try {
      const { data } = await API.get("/api/users/get-resumes", {
        headers: {
          Authorization: token,
        },
      });
      setResumes(data.resumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      
      // Validation
      if (!title || title.trim().length === 0) {
        toast.error("Please enter a resume title", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      
      if (title.trim().length < 3) {
        toast.error("Title must be at least 3 characters long", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      
      if (title.trim().length > 50) {
        toast.error("Title must not exceed 50 characters", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      
      const { data } = await API.post(
        "/api/resumes/create-resume",
        { title: title.trim() },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      
      // Check if this is the first resume
      const isFirstResume = allResumes.length === 0;
      
      // Award points for creating a resume
      try {
        await dispatch(awardPoints({ 
          activityType: 'RESUME_CREATED',
          metadata: { 
            resumeId: data.resume._id,
            isFirst: isFirstResume 
          }
        })).unwrap();
      } catch (pointsError) {
        console.error("Error awarding points:", pointsError);
        // Don't block resume creation if points award fails
      }
      
      toast.success("Resume created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      console.error("Error creating resume:", error);
      toast.error("Failed to create resume. Please try again.");
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!title || title.trim().length === 0) {
      toast.error("Please enter a resume title", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
      return;
    }
    
    if (title.trim().length < 3) {
      toast.error("Title must be at least 3 characters long", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
      return;
    }
    
    if (title.trim().length > 50) {
      toast.error("Title must not exceed 50 characters", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
      return;
    }
    
    if (!resume) {
      toast.error("Please select a PDF file to upload", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
      return;
    }
    
    // Validate file type
    if (resume.type !== "application/pdf") {
      toast.error("Only PDF files are allowed", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
      return;
    }
    
    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (resume.size > maxSize) {
      toast.error("File size must not exceed 5MB", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    try {
      console.log("Starting PDF text extraction...");
      const resumeText = await pdfTotext(resume);
      console.log("PDF text extracted, length:", resumeText?.length);
      
      if (!resumeText || resumeText.trim().length === 0) {
        toast.error("Could not extract text from PDF. Please ensure the PDF contains text.");
        setIsLoading(false);
        return;
      }
      
      console.log("Uploading resume to server...");
      const { data } = await API.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      console.log("Resume uploaded successfully:", data);
      
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      
      // Check if this is the first resume
      const isFirstResume = allResumes.length === 0;
      
      // Award points for creating a resume (via upload)
      try {
        await dispatch(awardPoints({ 
          activityType: 'RESUME_CREATED',
          metadata: { 
            resumeId: data.resumeId,
            isFirst: isFirstResume,
            uploadedFromPDF: true
          }
        })).unwrap();
      } catch (pointsError) {
        console.error("Error awarding points:", pointsError);
        // Don't block resume upload if points award fails
      }
      
      toast.success("Resume uploaded successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      console.error("Error uploading resume:", error);
      
      // More specific error messages
      if (error.response) {
        const errorMsg = error.response.data?.message || "Failed to upload resume";
        toast.error(errorMsg);
        console.error("Server error:", error.response.status, error.response.data);
      } else if (error.request) {
        toast.error("Could not connect to server. Please check your connection.");
        console.error("Network error:", error.request);
      } else {
        toast.error("Failed to upload resume. Please try again.");
        console.error("Upload error:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (e) => {
    try {
      e.preventDefault();
      
      // Validation
      if (!title || title.trim().length === 0) {
        toast.error("Please enter a resume title", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      
      if (title.trim().length < 3) {
        toast.error("Title must be at least 3 characters long", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      
      if (title.trim().length > 50) {
        toast.error("Title must not exceed 50 characters", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      
      const { data } = await API.put(
        "/api/resumes/update-resume",
        { resumeId: editResumeId, resumeData: JSON.stringify({ title: title.trim() }) },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setResumes(
        resumes.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume
        )
      );
      setTitle("");
      setEditResumeId("");
      toast.success("Resume title updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating resume title:", error);
      toast.error(
        "Failed to update resume title. Please try again."
      );
    }
  };

  const deleteResume = async (resumeId) => {
    setResumeToDelete(resumeId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (resumeToDelete) {
      try {
        const { data } = await API.delete(
          `/api/resumes/delete-resume/${resumeToDelete}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setResumes(resumes.filter((resume) => resume._id !== resumeToDelete));
        toast.success("Resume deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        console.error("Error deleting resume:", error);
        toast.error("Failed to delete resume. Please try again.");
      } finally {
        setShowDeleteConfirm(false);
        setResumeToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setResumeToDelete(null);
  };

  useEffect(() => {
    fetchResumes();
    // Fetch points when dashboard loads
    dispatch(fetchUserPoints());
    
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem(`onboarding_completed_${user?._id}`);
    if (!hasSeenOnboarding && user) {
      // Show onboarding after a short delay
      setTimeout(() => {
        setShowOnboarding(true);
      }, 500);
    }
  }, [user]);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    // Mark onboarding as completed
    if (user) {
      localStorage.setItem(`onboarding_completed_${user._id}`, 'true');
    }
  };

  return (
    <>
      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
        userName={user?.name || 'User'}
      />
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header with Quick Stats */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                Welcome, {user?.name?.split(' ')[0] || 'User'}! 👋
              </h1>
              <p className="text-slate-600 text-lg">
                Let's build your perfect resume together
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="bg-blue-50 rounded-xl px-6 py-4 text-center border-2 border-blue-200">
                <p className="text-3xl font-bold text-blue-600">{resumes.length}</p>
                <p className="text-sm text-slate-600 font-medium">Resume{resumes.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="bg-purple-50 rounded-xl px-6 py-4 text-center border-2 border-purple-200">
                <p className="text-3xl font-bold text-purple-600">{points || 0}</p>
                <p className="text-sm text-slate-600 font-medium">Points</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Section - Very Prominent */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">1</span>
            Choose How to Start
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Create New Resume Card */}
            <button
              onClick={() => setShowCreateResume(true)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-4 border-blue-200 hover:border-blue-400 p-8 text-left hover:-translate-y-2"
            >
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <PlusIcon className="size-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    Build from Scratch
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed mb-4">
                    Perfect for first-time users! Our step-by-step guide will help you create a professional resume in minutes.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    <span>Get Started</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-500">
                  ✓ Easy step-by-step builder &nbsp; ✓ Professional templates &nbsp; ✓ Save anytime
                </p>
              </div>
            </button>

            {/* Upload Existing Resume Card */}
            <button
              onClick={() => setShowUploadResume(true)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-4 border-purple-200 hover:border-purple-400 p-8 text-left hover:-translate-y-2"
            >
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <UploadCloudIcon className="size-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">
                    Upload Existing Resume
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed mb-4">
                    Already have a resume? Upload your PDF and our AI will help you improve and customize it.
                  </p>
                  <div className="flex items-center gap-2 text-purple-600 font-semibold">
                    <span>Upload Now</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-500">
                  ✓ AI-powered improvements &nbsp; ✓ Keep your content &nbsp; ✓ PDF format only
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Help & Rewards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Getting Started Guide */}
          {resumes.length < 3 && (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-emerald-200 overflow-hidden">
              <button
                onClick={() => setShowGettingStarted(!showGettingStarted)}
                className="w-full flex items-center justify-between p-6 hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-slate-800">Quick Start Guide</h3>
                    <p className="text-sm text-slate-600">Learn the basics in 2 minutes</p>
                  </div>
                </div>
                {showGettingStarted ? (
                  <ChevronUp className="size-6 text-slate-600" />
                ) : (
                  <ChevronDown className="size-6 text-slate-600" />
                )}
              </button>
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  showGettingStarted 
                    ? 'max-h-[2000px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <GettingStartedChecklist
                    profileCompleted={user?.stats?.profileCompleted || false}
                    hasResumes={resumes.length > 0}
                    points={points || 0}
                    onCreateResume={() => setShowCreateResume(true)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Points & Rewards */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 overflow-hidden">
            <button
              onClick={() => setShowPointsSection(!showPointsSection)}
              className="w-full flex items-center justify-between p-6 hover:bg-amber-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Trophy className="size-7 text-amber-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-slate-800">Rewards Program</h3>
                  <p className="text-sm text-slate-600">Earn points & unlock features</p>
                </div>
              </div>
              {showPointsSection ? (
                <ChevronUp className="size-6 text-slate-600" />
              ) : (
                <ChevronDown className="size-6 text-slate-600" />
              )}
            </button>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                showPointsSection 
                  ? 'max-h-[2000px] opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6">
                <PointsExplainerCard 
                  userPoints={points || 0} 
                  onShowTutorial={() => setShowOnboarding(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* My Resumes Section */}
        {resumes.length > 0 ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <span className="bg-slate-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">2</span>
                Your Saved Resumes
              </h2>
              <div className="bg-white px-4 py-2 rounded-lg border-2 border-slate-200">
                <span className="text-slate-600 font-medium">{resumes.length} Resume{resumes.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {resumes.map((resume, index) => {
                const colorClasses = {
                  indigo:
                    "bg-indigo-50 border-indigo-300 hover:border-indigo-500",
                  purple:
                    "bg-purple-50 border-purple-300 hover:border-purple-500",
                  pink: "bg-pink-50 border-pink-300 hover:border-pink-500",
                  blue: "bg-blue-50 border-blue-300 hover:border-blue-500",
                  green:
                    "bg-emerald-50 border-emerald-300 hover:border-emerald-500",
                  yellow: "bg-amber-50 border-amber-300 hover:border-amber-500",
                  red: "bg-red-50 border-red-300 hover:border-red-500",
                  teal: "bg-teal-50 border-teal-300 hover:border-teal-500",
                };
                const iconColorClasses = {
                  indigo: "text-indigo-600",
                  purple: "text-purple-600",
                  pink: "text-pink-600",
                  blue: "text-blue-600",
                  green: "text-emerald-600",
                  yellow: "text-amber-600",
                  red: "text-red-600",
                  teal: "text-teal-600",
                };
                const color = colors[index % colors.length];
                return (
                  <div
                    key={index}
                    onClick={() => navigate(`/app/builder/${resume._id}`)}
                    className={`group relative ${colorClasses[color]} border-3 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer bg-white`}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className={`w-20 h-20 ${colorClasses[color].split(' ')[0]} rounded-2xl flex items-center justify-center shadow-md border-2 ${colorClasses[color].split(' ')[1]}`}>
                        <FilePenLineIcon
                          className={`size-10 ${iconColorClasses[color]}`}
                        />
                      </div>
                      <div className="text-center w-full">
                        <p className="font-bold text-lg text-slate-800 truncate w-full px-2 mb-1">
                          {resume.title}
                        </p>
                        <p className="text-sm text-slate-500 flex items-center justify-center gap-1">
                          <span>📅</span>
                          <span>
                            {new Date(resume.updatedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </p>
                      </div>
                      <button className="w-full bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors group-hover:bg-slate-50">
                        Open & Edit
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity duration-200"
                    >
                      <button
                        onClick={() => {
                          setEditResumeId(resume._id);
                          setTitle(resume.title);
                        }}
                        className="p-2 bg-white hover:bg-blue-50 rounded-lg shadow-lg transition-colors border-2 border-blue-200"
                        title="Rename resume"
                      >
                        <PencilIcon className="size-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => {
                          deleteResume(resume._id);
                        }}
                        className="p-2 bg-white hover:bg-red-50 rounded-lg shadow-lg transition-colors border-2 border-red-200"
                        title="Delete resume"
                      >
                        <TrashIcon className="size-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <FilePenLineIcon className="size-16 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                Your Resume Collection is Empty
              </h3>
              <p className="text-slate-600 text-lg mb-8 max-w-md">
                No worries! Let's create your first professional resume. Choose one of the options above to get started.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCreateResume(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg"
                >
                  Create Your First Resume
                </button>
                <button
                  onClick={() => setShowUploadResume(true)}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors shadow-lg"
                >
                  Upload Existing Resume
                </button>
              </div>
            </div>
          </div>
        )}

        {showCreateResume && (
          <div
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          >
            <form
              onSubmit={createResume}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-slideUp"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-blue-500 to-blue-600 px-8 py-6 rounded-t-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <PlusIcon className="size-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Create New Resume
                    </h2>
                    <p className="text-sm text-blue-100">
                      Let's get started with a great title
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8">
                <div className="mb-6">
                  <label className="block text-base font-semibold text-slate-700 mb-3">
                    What would you like to call this resume?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Marketing Manager Resume, Software Developer CV"
                    className="w-full px-4 py-4 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                    required
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    maxLength={50}
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    💡 Tip: Use a descriptive name to easily find it later
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-100">
                  <p className="text-sm text-slate-700">
                    <strong>What happens next?</strong> You'll be taken to our easy-to-use builder where you can add your information step by step.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 pb-8 flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateResume(false);
                    setTitle("");
                  }}
                  className="flex-1 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg text-lg"
                >
                  Continue →
                </button>
              </div>

              <button
                type="button"
                className="absolute top-8 right-8 text-white/80 hover:text-white transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              >
                <XIcon className="size-6" />
              </button>
            </form>
          </div>
        )}

        {showUploadResume && (
          <div
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          >
            <form
              onSubmit={uploadResume}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-slideUp"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-purple-500 to-purple-600 px-8 py-6 rounded-t-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <UploadCloudIcon className="size-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Upload Your Resume
                    </h2>
                    <p className="text-sm text-purple-100">
                      Import and enhance your existing resume
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-3">
                    Give your resume a name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Marketing Manager Resume"
                    className="w-full px-4 py-4 border-2 border-slate-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-lg"
                    required
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    maxLength={50}
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-3">
                    Select your PDF file
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="resume-input"
                      className="hidden"
                      accept=".pdf"
                      onChange={(e) => setResume(e.target.files[0])}
                    />
                    <label
                      htmlFor="resume-input"
                      className="flex flex-col items-center justify-center gap-4 border-3 border-dashed border-purple-300 rounded-2xl p-10 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all group"
                    >
                      {resume ? (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <FilePenLineIcon className="size-8 text-purple-600" />
                          </div>
                          <p className="text-base font-semibold text-slate-800">
                            {resume.name}
                          </p>
                          <p className="text-sm text-slate-600 mt-2">
                            ✓ File selected - Click to change
                          </p>
                        </div>
                      ) : (
                        <>
                          <UploadCloudIcon className="size-16 text-purple-300 group-hover:text-purple-500 transition-colors" />
                          <div className="text-center">
                            <p className="text-lg font-semibold text-slate-800 mb-1">
                              Click here to choose a file
                            </p>
                            <p className="text-sm text-slate-600">
                              📄 Only PDF files accepted (Max 5MB)
                            </p>
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-100">
                  <p className="text-sm text-slate-700">
                    <strong>What happens next?</strong> Our AI will analyze your resume and help you improve it with better formatting and content suggestions.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 pb-8 flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadResume(false);
                    setTitle("");
                    setResume(null);
                  }}
                  className="flex-1 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-lg"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                >
                  {isLoading && (
                    <LoaderCircleIcon className="animate-spin size-6" />
                  )}
                  {isLoading ? "Processing..." : "Upload & Continue →"}
                </button>
              </div>

              <button
                type="button"
                className="absolute top-8 right-8 text-white/80 hover:text-white transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                  setResume(null);
                }}
                disabled={isLoading}
              >
                <XIcon className="size-6" />
              </button>
            </form>
          </div>
        )}

        {editResumeId && (
          <div
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          >
            <form
              onSubmit={editTitle}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl animate-slideUp"
            >
              {/* Header */}
              <div className="bg-emerald-50 px-6 py-5 rounded-t-2xl border-b border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <PencilIcon className="size-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Edit Resume Title
                    </h2>
                    <p className="text-sm text-slate-600">
                      Update your resume name
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Resume Title
                </label>
                <input
                  type="text"
                  placeholder="Resume Title"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  required
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditResumeId("");
                    setTitle("");
                  }}
                  className="flex-1 py-3 border-2 border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-md"
                >
                  Update
                </button>
              </div>

              <button
                type="button"
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              >
                <XIcon className="size-5" />
              </button>
            </form>
          </div>
        )}

        {showDeleteConfirm && (
          <div
            onClick={cancelDelete}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-slideUp"
            >
              <div className="p-6">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <TrashIcon className="size-8 text-red-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Delete Resume?
                  </h2>
                  <p className="text-slate-600">
                    Are you sure you want to delete this resume? This action
                    cannot be undone and all your work will be permanently
                    removed.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={cancelDelete}
                    className="flex-1 py-3 border-2 border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmDelete}
                    className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
