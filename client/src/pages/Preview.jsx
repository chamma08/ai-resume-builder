import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets.js";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen.jsx";
import ResumePreview from "../components/ResumeBuilderSections/ResumePreview.jsx";
import NotFound from "../components/NotFound.jsx";

export default function Preview() {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const loadResume = async () => {
    setResumeData(
      dummyResumeData.find((resume) => resume._id === resumeId) || null
    );
    document.title = "Preview - AI Resume Builder";
    setIsLoading(false);
  };
  useEffect(() => {
    loadResume();
  }, []);
  return resumeData ? (
    <div className="bg-gray-100 ">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div>{isLoading ? <LoadingScreen /> : <NotFound />}</div>
  );
}
