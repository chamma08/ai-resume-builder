import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen.jsx";
import ResumePreview from "../components/ResumeBuilderSections/ResumePreview.jsx";
import NotFound from "../components/NotFound.jsx";
import API from "../configs/api.js";

export default function Preview() {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const loadResume = async () => {
    try {
      const { data } = await API.get(`/api/resumes/get-public-resume/${resumeId}`);
      document.title = `Preview - ${data.resume.title}`;
      setResumeData(data.resume);
    } catch (error) {
      console.error("Error fetching resume:", error.message);
    }
    finally{
      setIsLoading(false);
    }
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
