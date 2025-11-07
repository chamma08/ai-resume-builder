import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ATSTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900">
            {/* Header - Simple and clean for ATS parsing */}
            <header className="mb-6">
                <h1 className="text-3xl font-bold mb-3 text-gray-900">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="space-y-1 text-sm text-gray-700">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-2">
                            <Mail className="size-4" style={{ color: accentColor }} />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone className="size-4" style={{ color: accentColor }} />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="size-4" style={{ color: accentColor }} />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-2">
                            <Linkedin className="size-4" style={{ color: accentColor }} />
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-2">
                            <Globe className="size-4" style={{ color: accentColor }} />
                            <span className="break-all">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-2 text-gray-900 uppercase tracking-wide pb-1 border-b-2" style={{ borderColor: accentColor }}>
                        Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-sm">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-3 text-gray-900 uppercase tracking-wide pb-1 border-b-2" style={{ borderColor: accentColor }}>
                        Work Experience
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="mb-1">
                                    <h3 className="font-bold text-gray-900 text-base">
                                        {exp.position}
                                    </h3>
                                    <div className="flex justify-between items-baseline">
                                        <p className="text-gray-700 font-semibold text-sm">
                                            {exp.company}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-line mt-2">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-3 text-gray-900 uppercase tracking-wide pb-1 border-b-2" style={{ borderColor: accentColor }}>
                        Projects
                    </h2>

                    <div className="space-y-4">
                        {data.project.map((proj, index) => (
                            <div key={index}>
                                <h3 className="font-bold text-gray-900 text-base mb-1">
                                    {proj.name}
                                </h3>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {proj.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-3 text-gray-900 uppercase tracking-wide pb-1 border-b-2" style={{ borderColor: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900 text-base">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {formatDate(edu.start_date)} - {edu.is_current ? "Present" : formatDate(edu.end_date)}
                                    </p>
                                </div>
                                <p className="text-gray-700 text-sm font-semibold">
                                    {edu.institution}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold mb-3 text-gray-900 uppercase tracking-wide pb-1 border-b-2" style={{ borderColor: accentColor }}>
                        Skills
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="text-gray-700 text-sm"
                            >
                                {skill}{index < data.skills.length - 1 ? " •" : ""}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ATSTemplate;
