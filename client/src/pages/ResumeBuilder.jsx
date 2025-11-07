import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import PersonalInfo from "../components/ResumeBuilderSections/PersonalInfo";
import ResumePreview from "../components/ResumeBuilderSections/ResumePreview";
import TemplateSelector from "../components/ResumeBuilderSections/TemplateSelector";
import ColorPicker from "../components/ResumeBuilderSections/ColorPicker";
import ProfessionalSummary from "../components/ResumeBuilderSections/ProfessionalSummary";
import Experience from "../components/ResumeBuilderSections/Experience";
import Education from "../components/ResumeBuilderSections/Education";
import Project from "../components/ResumeBuilderSections/Project";
import Skills from "../components/ResumeBuilderSections/Skills";
import { useSelector } from "react-redux";
import API from "../configs/api";
import { toast } from "react-toastify";

export default function ResumeBuilder() {
  const { resumeId } = useParams();

  const { token } = useSelector((state) => state.auth);

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
        document.title = `Editing Resume - ${data.resume.title}`;
      }
    } catch (error) {
      console.error("Error loading existing resume:", error);
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", title: "Personal Info", icon: User },
    { id: "professional_summary", title: "Professional Summary", icon: User },
    { id: "experience", title: "Experience", icon: Briefcase },
    { id: "education", title: "Education", icon: GraduationCap },
    { id: "projects", title: "Projects", icon: FolderIcon },
    { id: "skills", title: "Skills", icon: SparkleIcon },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, []);

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }));
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

  const downloadResume = async () => {
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
  };

  const saveResume = async() => {
    try {
      let updatedResumeData = structuredClone(resumeData);

      //Remove image from resume data
      if(typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === "object" && formData.append("image", resumeData.personal_info.image);

      const { data } = await API.put("/api/resumes/update-resume", formData, {
        headers: {
          Authorization: token,
        },
      });
      setResumeData(data.resume);
      /* toast.success(data.message); */
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume.");
    }
  }

  const shareResume = async () => {
    const frontednUrl = window.location.href.split("/app")[0];
    const resumeUrl = frontednUrl + "/view/" + resumeId;

    if (navigator.share) navigator.share({ url: resumeUrl, text: "My Resume" });
    else alert("Share not supported to this browser");
  };
  return (
    <div>
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

              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1 ">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
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

              <button onClick={() => {toast.promise(saveResume(), {pending: "Saving...", success: "Resume saved successfully!", error: "Failed to save resume"})}} className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {resumeData.public && (
                  <button onClick={shareResume} className="flex items-center px-3 gap-2 p-2 bg-green-600 text-white text-xs  rounded-lg hover:bg-green-700 transition-colors">
                    <Share2Icon className="size-4 inline-block" /> Share
                  </button>
                )}
                <button onClick={changeResumeVisibility} className="flex items-center gap-2 text-xs p-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 border border-gray-300 transition-colors">
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resumeData.public ? " Public" : " Private"}
                </button>
                <button onClick={downloadResume} className="flex items-center gap-2 text-xs p-2 px-6 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">
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
          </div>

          <div></div>
        </div>
      </div>
    </div> 
  );
}
