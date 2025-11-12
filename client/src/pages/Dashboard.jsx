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
} from '../utils/icons';
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import API from "../configs/api";
import { toast } from "react-toastify";
import pdfTotext from "react-pdftotext";
import { awardPoints, fetchUserPoints } from "../redux/features/pointsSlice";

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
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Points Widget - Compact with Hover Expansion */}
        <Link to="/app/points">
          <div className="group bg-white border-2 border-blue-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden mb-6">
            {/* Compact View - Always Visible */}
            <div className="flex items-center justify-between p-3 sm:p-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-3 sm:gap-6">
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-slate-800">{points || 0}</p>
                    <p className="text-xs text-slate-500">Points</p>
                  </div>
                  <div className="h-8 sm:h-10 w-px bg-slate-200"></div>
                  <div>
                    <p className="text-base sm:text-lg font-bold text-slate-800">{level || 'Bronze'}</p>
                    <p className="text-xs text-slate-500">Level</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-600 group-hover:text-purple-600 transition-colors">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:inline text-sm font-medium">View Details</span>
              </div>
            </div>
            
            {/* Expanded View - Visible on Hover */}
            {level !== 'Diamond' && (
              <div className="max-h-0 group-hover:max-h-20 transition-all duration-300 overflow-hidden bg-slate-50 border-t border-slate-200">
                <div className="p-3 sm:p-4">
                  <div className="flex justify-between text-xs sm:text-sm text-slate-600 mb-2">
                    <span className="font-medium">Progress to Next Level</span>
                    <span className="font-bold text-blue-600">{Math.round(progress || 0)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">My Resumes</h1>
          <p className="text-slate-600">
            Create, manage, and export your professional resumes
          </p>
        </div>

        {/* Action Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setShowCreateResume(true)}
            className="group relative bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                <PlusIcon className="size-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                  Create New
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Start from scratch
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="group relative bg-white hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-400 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-colors duration-300">
                <UploadCloudIcon className="size-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">
                  Upload Resume
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Import existing PDF
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Resumes Grid Section */}
        {resumes.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">
                Your Resumes ({resumes.length})
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {resumes.map((resume, index) => {
                const colorClasses = {
                  indigo:
                    "bg-indigo-50 border-indigo-200 hover:border-indigo-400",
                  purple:
                    "bg-purple-50 border-purple-200 hover:border-purple-400",
                  pink: "bg-pink-50 border-pink-200 hover:border-pink-400",
                  blue: "bg-blue-50 border-blue-200 hover:border-blue-400",
                  green:
                    "bg-emerald-50 border-emerald-200 hover:border-emerald-400",
                  yellow: "bg-amber-50 border-amber-200 hover:border-amber-400",
                  red: "bg-red-50 border-red-200 hover:border-red-400",
                  teal: "bg-teal-50 border-teal-200 hover:border-teal-400",
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
                    className={`group relative ${colorClasses[color]} border-2 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer`}
                  >
                    <div className="flex flex-col items-center gap-3 min-h-[140px]">
                      <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <FilePenLineIcon
                          className={`size-7 ${iconColorClasses[color]}`}
                        />
                      </div>
                      <div className="text-center w-full">
                        <p className="font-medium text-slate-800 truncate w-full px-2">
                          {resume.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          {new Date(resume.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity duration-200"
                    >
                      <button
                        onClick={() => {
                          setEditResumeId(resume._id);
                          setTitle(resume.title);
                        }}
                        className="p-1.5 bg-white hover:bg-slate-100 rounded-lg shadow-md transition-colors"
                        title="Edit title"
                      >
                        <PencilIcon className="size-4 text-slate-600" />
                      </button>
                      <button
                        onClick={() => {
                          deleteResume(resume._id);
                        }}
                        className="p-1.5 bg-white hover:bg-red-50 rounded-lg shadow-md transition-colors"
                        title="Delete resume"
                      >
                        <TrashIcon className="size-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-4">
              <FilePenLineIcon className="size-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No resumes yet
            </h3>
            <p className="text-slate-600 text-center mb-6 max-w-md">
              Get started by creating a new resume or uploading an existing one
            </p>
            
          </div>
        )}

        {showCreateResume && (
          <div
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          >
            <form
              onSubmit={createResume}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl animate-slideUp"
            >
              {/* Header */}
              <div className="bg-blue-50 px-6 py-5 rounded-t-2xl border-b border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <PlusIcon className="size-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Create New Resume
                    </h2>
                    <p className="text-sm text-slate-600">
                      Give your resume a memorable title
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
                  placeholder="e.g., Senior Developer Resume"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
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
                    setShowCreateResume(false);
                    setTitle("");
                  }}
                  className="flex-1 py-3 border-2 border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
                >
                  Create Resume
                </button>
              </div>

              <button
                type="button"
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              >
                <XIcon className="size-5" />
              </button>
            </form>
          </div>
        )}

        {showUploadResume && (
          <div
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          >
            <form
              onSubmit={uploadResume}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl animate-slideUp"
            >
              {/* Header */}
              <div className="bg-purple-50 px-6 py-5 rounded-t-2xl border-b border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <UploadCloudIcon className="size-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Upload Resume
                    </h2>
                    <p className="text-sm text-slate-600">
                      Import your existing resume
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Resume Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Software Engineer Resume"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    required
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>

                <div>
                  <label
                    htmlFor="resume-input"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Choose File
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
                      className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-300 rounded-lg p-8 cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all group"
                    >
                      {resume ? (
                        <div className="text-center">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <FilePenLineIcon className="size-6 text-purple-600" />
                          </div>
                          <p className="text-sm font-medium text-slate-700">
                            {resume.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Click to change file
                          </p>
                        </div>
                      ) : (
                        <>
                          <UploadCloudIcon className="size-12 text-slate-400 group-hover:text-purple-500 transition-colors" />
                          <div className="text-center">
                            <p className="text-sm font-medium text-slate-700">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              PDF files only
                            </p>
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadResume(false);
                    setTitle("");
                    setResume(null);
                  }}
                  className="flex-1 py-3 border-2 border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading && (
                    <LoaderCircleIcon className="animate-spin size-5" />
                  )}
                  {isLoading ? "Uploading..." : "Upload Resume"}
                </button>
              </div>

              <button
                type="button"
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                  setResume(null);
                }}
                disabled={isLoading}
              >
                <XIcon className="size-5" />
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
  );
}
