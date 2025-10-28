const ElegantTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 p-10 leading-relaxed font-sans">
      {/* Header */}
      <header className="text-center border-b pb-6 mb-8">
        <h1
          className="text-4xl font-semibold tracking-wide mb-2"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <p className="text-sm text-gray-600">
          {data.personal_info?.profession || "Your Professional Title"}
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700 mt-3">
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.location && (
            <span>{data.personal_info.location}</span>
          )}
          {data.personal_info?.linkedin && (
            <span className="break-all">{data.personal_info.linkedin}</span>
          )}
          {data.personal_info?.website && (
            <span className="break-all">{data.personal_info.website}</span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-8">
          <h2
            className="text-lg font-semibold uppercase mb-3 tracking-widest"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>
          <p className="text-gray-700">{data.professional_summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-8">
          <h2
            className="text-lg font-semibold uppercase mb-3 tracking-widest"
            style={{ color: accentColor }}
          >
            Professional Experience
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-semibold">
                    {exp.position} —{" "}
                    <span className="font-normal text-gray-700">
                      {exp.company}
                    </span>
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                {exp.description && (
                  <ul className="list-disc list-inside text-gray-700 mt-1 space-y-1">
                    {exp.description.split("\n").map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project && data.project.length > 0 && (
        <section className="mb-8">
          <h2
            className="text-lg font-semibold uppercase mb-3 tracking-widest"
            style={{ color: accentColor }}
          >
            Projects
          </h2>
          <div className="space-y-3">
            {data.project.map((proj, index) => (
              <div key={index}>
                <h3 className="font-semibold">{proj.name}</h3>
                {proj.description && (
                  <p className="text-gray-700 text-sm">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-8">
          <h2
            className="text-lg font-semibold uppercase mb-3 tracking-widest"
            style={{ color: accentColor }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-semibold">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <h2
            className="text-lg font-semibold uppercase mb-3 tracking-widest"
            style={{ color: accentColor }}
          >
            Core Skills
          </h2>
          <div className="text-gray-700 flex flex-wrap gap-x-4 gap-y-2">
            {data.skills.map((skill, index) => (
              <span key={index}>• {skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ElegantTemplate;