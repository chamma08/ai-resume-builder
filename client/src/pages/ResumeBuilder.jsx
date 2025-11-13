import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  SparkleIcon,
  User,
} from '../utils/icons';
import PersonalInfo from "../components/ResumeBuilderSections/PersonalInfo";
import ResumePreview from "../components/ResumeBuilderSections/ResumePreview";
import TemplateSelector from "../components/ResumeBuilderSections/TemplateSelector";
import ColorPicker from "../components/ResumeBuilderSections/ColorPicker";
import ProfessionalSummary from "../components/ResumeBuilderSections/ProfessionalSummary";
import Experience from "../components/ResumeBuilderSections/Experience";
import Education from "../components/ResumeBuilderSections/Education";
import Project from "../components/ResumeBuilderSections/Project";
import Skills from "../components/ResumeBuilderSections/Skills";
import { useDispatch, useSelector } from "react-redux";
import API from "../configs/api";
import { toast } from "react-toastify";
import DownloadConfirmModal from "../components/modals/DownloadConfirmModal";
import RatingFeedbackModal from "../components/modals/RatingFeedbackModal";
import { deductPoints, fetchUserPoints } from '../redux/features/pointsSlice';

export default function ResumeBuilder() {
  const dispatch = useDispatch();

  const { resumeId } = useParams();

  const { token } = useSelector((state) => state.auth);

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState(null);

  // Auto-save states
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [saveStatus, setSaveStatus] = useState("saved"); // "saved", "saving", "unsaved"
  const [showAutoSaveInfo, setShowAutoSaveInfo] = useState(false);
  const autoSaveTimerRef = useRef(null);
  const initialLoadRef = useRef(true);

  // Check if user has seen auto-save info
  useEffect(() => {
    const hasSeenAutoSaveInfo = localStorage.getItem("hasSeenAutoSaveInfo");
    if (!hasSeenAutoSaveInfo) {
      setTimeout(() => {
        setShowAutoSaveInfo(true);
      }, 3000); // Show after 3 seconds
    }
  }, []);

  const closeAutoSaveInfo = () => {
    setShowAutoSaveInfo(false);
    localStorage.setItem("hasSeenAutoSaveInfo", "true");
  };

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    skills: [],
    project: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async () => {
    try {
      const { data } = await API.get(`/api/resumes/get-resume/${resumeId}`, {
        headers: {
          Authorization: token,
        },
      });
      if (data.resume) {
        setResumeData(data.resume);
        setLastSaved(new Date());
        setSaveStatus("saved");
        document.title = `Editing Resume - ${data.resume.title}`;
      }
    } catch (error) {
      console.error("Error loading existing resume:", error);
    }
  };

  // Auto-save function
  const autoSaveResume = async () => {
    if (isSaving || initialLoadRef.current) return;
    
    try {
      setIsSaving(true);
      setSaveStatus("saving");
      
      let updatedResumeData = structuredClone(resumeData);

      // Remove image from resume data if it's an object
      if (typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));

      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === "object" &&
        formData.append("image", resumeData.personal_info.image);

      await API.put("/api/resumes/update-resume", formData, {
        headers: {
          Authorization: token,
        },
      });
      
      setLastSaved(new Date());
      setSaveStatus("saved");
      setIsSaving(false);
    } catch (error) {
      console.error("Auto-save error:", error);
      setSaveStatus("unsaved");
      setIsSaving(false);
    }
  };

  // Trigger auto-save when resume data changes
  useEffect(() => {
    // Skip auto-save on initial load
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }

    // Mark as unsaved when data changes
    setSaveStatus("unsaved");

    // Clear existing timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    // Set new timer for auto-save (2 seconds after user stops typing)
    autoSaveTimerRef.current = setTimeout(() => {
      autoSaveResume();
    }, 2000);

    // Cleanup
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [resumeData]);

  // Format last saved time
  const getLastSavedText = () => {
    if (!lastSaved) return "";
    
    const now = new Date();
    const diffInSeconds = Math.floor((now - lastSaved) / 1000);
    
    if (diffInSeconds < 10) return "Just now";
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes === 1) return "1 minute ago";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    return lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleDownloadClick = (resumeId, templateType) => {
    setCurrentResumeId(resumeId);
    setCurrentTemplate(templateType);
    setShowDownloadModal(true);
  };

  const handleConfirmDownload = async (cost) => {
    try {
      // Deduct points
      const deductResult = await dispatch(
        deductPoints({
          activityType: "SPEND_CV_DOWNLOAD",
          amount: cost,
          metadata: {
            resumeId: currentResumeId,
            templateType: currentTemplate,
          },
        })
      ).unwrap();

      // Track download on server (updates stats)
      await API.post(
        `/api/resumes/download/${currentResumeId}`,
        { templateType: currentTemplate },
        {
          headers: { Authorization: token },
        }
      );

      // Close modal
      setShowDownloadModal(false);

      // Refresh points balance
      dispatch(fetchUserPoints());

      // Show success message
      toast.success(`Resume downloaded! ${cost} points deducted. Use browser print dialog to save as PDF.`);

      // Check if any badges were earned
      if (deductResult.newBadges && deductResult.newBadges.length > 0) {
        deductResult.newBadges.forEach(badge => {
          setTimeout(() => {
            toast.success(`🎉 Badge Earned: ${badge.icon} ${badge.name}!`, {
              duration: 4000,
              style: {
                background: '#10B981',
                color: '#fff',
                fontWeight: 'bold',
              },
            });
          }, 1000);
        });
      }

      // Trigger browser print dialog (allows Save as PDF)
      setTimeout(() => {
        window.print();
      }, 500);

      // Show rating modal after print dialog (2 seconds delay)
      setTimeout(() => {
        setShowRatingModal(true);
      }, 2500);

    } catch (error) {
      if (error.error === "INSUFFICIENT_POINTS") {
        toast.error(`Insufficient points! You need ${error.required} points.`);
      } else if (error.error === "TEMPLATE_LOCKED") {
        toast.error("Please unlock this template first!");
      } else {
        toast.error(error.message || "Failed to download resume");
      }
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", title: "About You", icon: User },
    { id: "professional_summary", title: "Your Profile Summary", icon: User },
    { id: "experience", title: "Work Experience", icon: Briefcase },
    { id: "education", title: "Education", icon: GraduationCap },
    { id: "projects", title: "Projects & Achievements", icon: FolderIcon },
    { id: "skills", title: "Skills & Abilities", icon: SparkleIcon },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, []);

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public })
      );
      const { data } = await API.put("/api/resumes/update-resume", formData, {
        headers: {
          Authorization: token,
        },
      });
      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success("Resume visibility Changed!");
    } catch (error) {
      console.error("Error updating resume visibility:", error);
    }
  };

  /* const downloadResume = async () => {
    try {
      // Track the download in backend for points
      const token = localStorage.getItem("token");
      await API.post(`/api/resumes/track-download/${resumeId}`, {}, {
        headers: {
          Authorization: token,
        },
      });

      // Award points for download
      await API.post('/api/points/award', {
        activityType: 'RESUME_DOWNLOADED',
        metadata: { resumeId }
      }, {
        headers: {
          Authorization: token,
        },
      });

      // Trigger browser print dialog
      window.print();
    } catch (error) {
      console.error("Error tracking download:", error);
      // Still allow printing even if tracking fails
      window.print();
    }
  }; */

  const saveResume = async () => {
    try {
      setSaveStatus("saving");
      let updatedResumeData = structuredClone(resumeData);

      //Remove image from resume data
      if (typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));

      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === "object" &&
        formData.append("image", resumeData.personal_info.image);

      const { data } = await API.put("/api/resumes/update-resume", formData, {
        headers: {
          Authorization: token,
        },
      });
      setResumeData(data.resume);
      setLastSaved(new Date());
      setSaveStatus("saved");
      /* toast.success(data.message); */
    } catch (error) {
      console.error("Error saving resume:", error);
      setSaveStatus("unsaved");
      toast.error("Failed to save resume.");
    }
  };

  const shareResume = async () => {
    const frontednUrl = window.location.href.split("/app")[0];
    const resumeUrl = frontednUrl + "/view/" + resumeId;

    if (navigator.share) navigator.share({ url: resumeUrl, text: "My Resume" });
    else alert("Share not supported to this browser");
  };
  return (
    <div>
      {/* Auto-save Info Tooltip */}
      {showAutoSaveInfo && (
        <div className="fixed top-4 right-4 z-50 max-w-sm animate-slideIn">
          <div className="bg-blue-600 text-white rounded-lg shadow-2xl p-4 border-2 border-blue-700">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold mb-1">Auto-Save is Active! ✨</h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Your changes are automatically saved every few seconds. No need to worry about losing your work!
                </p>
              </div>
              <button
                onClick={closeAutoSaveInfo}
                className="shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div> */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Side */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* Progress bar using activeSectionIndex */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-linear-to-r from-green-400 to-green-500 border-none transition-all duration-2000"
                style={{
                  width: `${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                }}
              />

              {/* Auto-save Status Indicator */}
              <div className="flex items-center justify-center gap-2 mb-3 py-2">
                {saveStatus === "saving" && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving...</span>
                  </div>
                )}
                {saveStatus === "saved" && lastSaved && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Saved {getLastSavedText()}</span>
                  </div>
                )}
                {saveStatus === "unsaved" && (
                  <div className="flex items-center gap-2 text-sm text-orange-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Unsaved changes</span>
                  </div>
                )}
              </div>

              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1 ">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                    resumeData={resumeData}
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      className="flex items-center gap-1  p-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSectionIndex === 0}
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button
                    className={`flex items-center gap-1  p-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex === sections.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1)
                      )
                    }
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <div>
                    <PersonalInfo
                      data={resumeData.personal_info}
                      onChange={(data) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal_info: data,
                        }))
                      }
                      removeBackground={removeBackground}
                      setRemoveBackground={setRemoveBackground}
                    />
                  </div>
                )}

                {activeSection.id === "professional_summary" && (
                  <ProfessionalSummary
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {activeSection.id === "experience" && (
                  <Experience
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "education" && (
                  <Education
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <Project
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        project: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <Skills
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    toast.promise(saveResume(), {
                      pending: "Saving...",
                      success: "Resume saved successfully!",
                      error: "Failed to save resume",
                    });
                  }}
                  disabled={saveStatus === "saving"}
                  className={`flex-1 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 ${
                    saveStatus === "saving" ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {saveStatus === "saving" ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                      </svg>
                      Save Now
                    </>
                  )}
                </button>
                <Link
                  to="/app"
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeftIcon className="size-4" />
                  Back
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {resumeData.public && (
                  <button
                    onClick={shareResume}
                    className="flex items-center px-3 gap-2 p-2 bg-green-600 text-white text-xs  rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Share2Icon className="size-4 inline-block" /> Share
                  </button>
                )}
                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center gap-2 text-xs p-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 border border-gray-300 transition-colors"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resumeData.public ? " Public" : " Private"}
                </button>
                <button
                  onClick={() => handleDownloadClick(resumeId, resumeData.template)}
                  className="flex items-center gap-2 text-xs p-2 px-6 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  <DownloadIcon className="size-4" /> Download
                </button>
              </div>
            </div>

            {/* Resume Preview */}
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />

            {/* Download confirmation modal */}
            <DownloadConfirmModal
              isOpen={showDownloadModal}
              onClose={() => setShowDownloadModal(false)}
              onConfirm={handleConfirmDownload}
              resumeId={currentResumeId}
              templateType={currentTemplate}
            />

            {/* Rating & Feedback modal */}
            <RatingFeedbackModal
              isOpen={showRatingModal}
              onClose={() => setShowRatingModal(false)}
            />
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
}
