import React from "react";
import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import MinimalImageTemplate from "../templates/MinimalImageTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import ElegantTemplate from "../templates/ElegantTemplate";
import ATSTemplate from "../templates/ATSTemplate";
import ATSImageTemplate from "../templates/ATSImageTemplate";

export default function ResumePreview({
  data,
  template,
  accentColor,
  classes = "",
}) {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;

      case "classic":
        return <ClassicTemplate data={data} accentColor={accentColor} />;

      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;

      case "elegant":
        return <ElegantTemplate data={data} accentColor={accentColor} />;

      case "ats":
        return <ATSTemplate data={data} accentColor={accentColor} />;

      case "ats-image":
        return <ATSImageTemplate data={data} accentColor={accentColor} />;

      /* case "corporate":
            return <CorporateTemplate data={data} accentColor={accentColor} />; */

      default:
        return <MinimalTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div
        id="resume-preview"
        className={
          "border border-gray-200 print:shadow-none print:border-none" + classes
        }
      >
        {renderTemplate()}

        {
          <style >
            {`
              @page {
                size: letter;
                margin: 0;
              }
              @media print {
                html,
                body {
                  width: 8.5in;
                  height: 11in;
                  overflow: hidden;
                }
                body * {
                  visibility: hidden;
                }
                #resume-preview,
                #resume-preview * {
                  visibility: visible;
                }
                #resume-preview {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: auto;
                  margin: 0;
                  padding: 0;
                  box-shadow: none !important;
                  border: none !important;
                }
              }
            `}
          </style>
        }
      </div>
    </div>
  );
}
