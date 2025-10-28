// CorporateTemplate.jsx
const CorporateTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-gray-900 font-sans leading-relaxed">
      {/* Header */}
      <header className="border-b pb-6 mb-8 text-center">
        <h1
          className="text-4xl font-semibold mb-2 tracking-wide"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <p className="text-sm text-gray-600">
          {data.personal_info?.profession || "Your Title"}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-gray-700">
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

      {/* Two-Column Body */}
      <div className="grid grid-cols-3 gap-10">
        {/* Left Sidebar */}
        <aside className="col-span-1 border-r pr-6 text-sm">
          {/* Summary */}
          {data.professional_summary && (
            <section className="mb-8">
              <h2
                className="text-base font-semibold uppercase mb-3 tracking-widest"
                style={{ color: accentColor }}
              >
                Profile
              </h2>
              <p className="text-gray-700">{data.professional_summary}</p>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-base font-semibold uppercase mb-3 tracking-widest"
                style={{ color: accentColor }}
              >
                Skills
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-base font-semibold uppercase mb-3 tracking-widest"
                style={{ color: accentColor }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-semibold">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </p>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(edu.graduation_date)}
                    </p>
                    {edu.gpa && (
                      <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Content */}
        <main className="col-span-2 text-sm">
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section className="mb-10">
              <h2
                className="text-base font-semibold uppercase mb-4 tracking-widest"
                style={{ color: accentColor }}
              >
                Professional Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-md font-semibold">
                        {exp.position}
                        <span className="text-gray-700 font-normal">
                          {" "}
                          — {exp.company}
                        </span>
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    {exp.description && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
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
            <section>
              <h2
                className="text-base font-semibold uppercase mb-4 tracking-widest"
                style={{ color: accentColor }}
              >
                Projects
              </h2>
              <div className="space-y-4">
                {data.project.map((proj, index) => (
                  <div key={index}>
                    <h3 className="font-semibold">{proj.name}</h3>
                    {proj.description && (
                      <p className="text-gray-700">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default CorporateTemplate;
