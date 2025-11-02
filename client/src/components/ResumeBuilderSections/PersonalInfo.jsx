import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

export default function PersonalInfo({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      type: "text",
      icon: User,
      required: true,
    },
    { key: "email", label: "Email", type: "email", icon: Mail, required: true },
    { key: "phone", label: "Phone Number", type: "tel", icon: Phone },
    { key: "address", label: "Address", type: "text", icon: MapPin },
    {
      key: "profession",
      label: "Profession",
      type: "text",
      icon: BriefcaseBusiness,
    },
    { key: "linkedin", label: "LinkedIn", type: "url", icon: Linkedin },
    { key: "website", label: "Personal Website", type: "url", icon: Globe },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
          Personal Information
        </h3>
        <p className="text-sm sm:text-base text-gray-600">
          Get Started with your personal information
        </p>
      </div>

      {/* Profile Image Upload Section */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8 pb-6 border-b border-gray-200">
        <label className="shrink-0">
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user-image"
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover ring-2 ring-slate-300 hover:opacity-70 transition-opacity cursor-pointer"
            />
          ) : (
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-slate-600 hover:text-slate-700 cursor-pointer transition-colors">
              <User className="size-12 sm:size-14 lg:size-16 border-2 rounded-full p-2.5 sm:p-3" />
              <span className="text-sm sm:text-base font-medium">
                Upload Profile Picture
              </span>
            </div>
          )}
          <input
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            onChange={(e) => handleChange("image", e.target.files[0])}
            className="hidden"
          />
        </label>

        {/* Image Options & Info */}
        {data.image && (
          <div className="flex flex-col gap-3 w-full sm:w-auto">
            {/* Background Removal Toggle - Only for new uploads */}
            {typeof data.image === "object" && (
              <div className="flex flex-col gap-2 pb-3 border-b border-gray-100">
                <span className="text-sm sm:text-base font-medium text-gray-700">
                  Remove Background
                </span>
                <label className="relative inline-flex items-center cursor-pointer w-fit">
                  <input
                    type="checkbox"
                    name="removeBackground"
                    id="removeBackground"
                    checked={removeBackground}
                    onChange={() => setRemoveBackground((prev) => !prev)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                  <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-4 ease-in-out"></span>
                </label>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs">
                  AI will automatically crop and remove the background from your
                  image.
                </p>
              </div>
            )}

            {/* Change Photo Button & Tips */}
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-lg cursor-pointer transition-colors duration-200 w-fit">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Change Photo</span>
                <input
                  type="file"
                  accept="image/jpg, image/png, image/jpeg"
                  onChange={(e) => handleChange("image", e.target.files[0])}
                  className="hidden"
                />
              </label>
              
              <div className="flex flex-col gap-1 text-xs sm:text-sm text-gray-500 max-w-xs">
                <p className="font-medium text-gray-600">Photo Tips:</p>
                <ul className="list-disc list-inside space-y-0.5 text-gray-500">
                  <li>Use a professional headshot</li>
                  <li>Click Save Changes after uploading</li>
                  <li>Good lighting recommended</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Form Fields - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div
              key={field.key}
              className={`space-y-2 ${
                field.key === "full_name" || field.key === "profession"
                  ? "md:col-span-2"
                  : ""
              }`}
            >
              <label
                htmlFor={field.key}
                className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-700"
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 shrink-0" />
                <span className="truncate">{field.label}</span>
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                id={field.key}
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base transition-all duration-200"
                required={field.required}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
