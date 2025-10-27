import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
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

  const navigate = useNavigate();

  const fetchResumes = async () => {
    setResumes(dummyResumeData);
    console.log("Fetched Resumes:", dummyResumeData);
  };

  const createResume = async (e) => {
    e.preventDefault();
    setShowCreateResume(false);
    navigate(`/app/builder/res123`);
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setShowUploadResume(false);
    navigate(`/app/builder/res123`);
  }

  const editTitle = async (e) => {
    e.preventDefault();
    setEditResumeId("");
    // Update resume title logic here
  }

  const deleteResume = async (resumeId) => {
    setResumeToDelete(resumeId);
    setShowDeleteConfirm(true);
  }

  const confirmDelete = async () => {
    if (resumeToDelete) {
      setResumes(prev => prev.filter(resume => resume._id !== resumeToDelete));
      setAllResumes(prev => prev.filter(resume => resume._id !== resumeToDelete));
      setShowDeleteConfirm(false);
      setResumeToDelete(null);
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setResumeToDelete(null);
  }

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Matheesha Dissanayake
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group-hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>
          <button onClick={() => setShowUploadResume(true)} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group-hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {resumes.map((resume, index) => {
            const color = colors[index % colors.length];
            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 bg-white rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 text-center border border-slate-200 group cursor-pointer"
              >
                <FilePenLineIcon className="size-7 group-hover:scale-105" />
                <p className="mt-2 text-sm font-medium text-slate-700 truncate">
                  {resume.title}
                </p>
                <p className="text-xs text-slate-500 group-hover:scale-105 transition-all px-2 text-center">
                  Last edited: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div onClick={e => e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden">
                  <TrashIcon onClick={() => {deleteResume(resume._id)}} color="red" className="size-7 p-1.5 hover:bg-red-100 rounded text-slate-700 transition-colors" />
                  <PencilIcon onClick={() => {setEditResumeId(resume._id); setTitle(resume.title)}} className="size-7 p-1.5 hover:bg-gray-100 rounded text-slate-700 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-lg font-medium text-black mb-4">
                Create a New Resume
              </h2>
              <input
                type="text"
                placeholder="Resume Title"
                className="w-full px-4 py-2 mb-4 border border-red-800 rounded-lg focus:border-red-900 ring-red-800 outline-none transition"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <button
                type="submit"
                className="w-full py-2 bg-red-800 text-white rounded hover:bg-red-900 transition-colors"
              >
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-lg font-medium text-black mb-4">
                Upload a Resume
              </h2>
              <input
                type="text"
                placeholder="Resume Title"
                className="w-full px-4 py-2 mb-4 border border-red-800 rounded-lg focus:border-red-900 ring-red-800 outline-none transition"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <div>
                <label htmlFor="resume-input">
                  Choose Resume File
                  <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-red-800 cursor-pointer transition-colors hover:text-red-900">
                    {resume ? (
                      <p className="text-sm">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloudIcon className="size-14 stroke-1" />
                        <p className="text-sm">
                          Drag & drop your file here, or click to select
                        </p>
                      </>
                    )}
                  </div>
                </label>
                <input type="file"
                  id="resume-input"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-red-800 text-white rounded hover:bg-red-900 transition-colors"
              >
                Upload Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-lg font-medium text-black mb-4">
                Edit Resume Title
              </h2>
              <input
                type="text"
                placeholder="Resume Title"
                className="w-full px-4 py-2 mb-4 border border-red-800 rounded-lg focus:border-red-900 ring-red-800 outline-none transition"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <button
                type="submit"
                className="w-full py-2 bg-red-800 text-white rounded hover:bg-red-900 transition-colors"
              >
                Update
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {showDeleteConfirm && (
          <div
            onClick={cancelDelete}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200">
                <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-gray-900 font-semibold mt-4 text-xl">Are you sure?</h2>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Do you really want to delete this resume? This action<br />cannot be undone.
                </p>
                <div className="flex items-center justify-center gap-4 mt-5 w-full">
                  <button 
                    type="button" 
                    onClick={cancelDelete}
                    className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    onClick={confirmDelete}
                    className="w-full md:w-36 h-10 rounded-md text-white bg-red-900 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
                  >
                    Confirm
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
