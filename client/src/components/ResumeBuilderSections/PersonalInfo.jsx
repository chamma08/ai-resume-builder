import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from '../../utils/icons';

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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 animate-slideUp">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-linear-to-br from-indigo-100 to-purple-100 rounded-lg">
            <User className="size-6 text-indigo-600" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Personal Information
          </h3>
        </div>
        <p className="text-sm sm:text-base text-gray-600 ml-14">
          Let's start with your basic details
        </p>
      </div>

      {/* Profile Image Upload Section */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8 pb-6 border-b border-gray-200 bg-linear-to-br from-blue-50/50 to-purple-50/50 rounded-2xl p-6">
        <label className="shrink-0 group cursor-pointer">
          {data.image ? (
            <div className="relative">
              <img
                src={
                  typeof data.image === "string"
                    ? data.image
                    : URL.createObjectURL(data.image)
                }
                alt="user-image"
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover ring-4 ring-purple-300 group-hover:ring-purple-500 group-hover:opacity-80 transition-all duration-300 shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full">Change</span>
              </div>
            </div>
          ) : (
            <div className="inline-flex flex-col items-center gap-3 text-slate-600 hover:text-slate-800 cursor-pointer transition-all duration-300 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg border-2 border-dashed border-purple-300 hover:border-purple-500">
              <div className="p-4 bg-linear-to-br from-purple-100 to-pink-100 rounded-full">
                <User className="size-8 text-purple-600" />
              </div>
              <span className="text-sm font-semibold">
                Upload Profile Picture
              </span>
            </div>
          )}
          <input
            type="file"
            accept="image/jpg, image/png, image/jpeg, image/webp, image/gif, image/bmp"
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
                  accept="image/jpg, image/png, image/jpeg, image/webp, image/gif, image/bmp"
                  onChange={(e) => handleChange("image", e.target.files[0])}
                  className="hidden"
                />
              </label>
              
              <div className="flex flex-col gap-1 text-xs sm:text-sm text-gray-500 max-w-xs">
                <p className="font-medium text-gray-600">Photo Tips:</p>
                <ul className=" space-y-0.5 text-gray-500">
                  <li>Use a professional headshot</li>
                  <li>Click Save Changes after uploading</li>
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
                field.key === "full_name" || 
                field.key === "profession" || 
                field.key === "email" || 
                field.key === "address" || 
                field.key === "website" ||
                field.key === "linkedin"
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm sm:text-base transition-all duration-300 hover:border-purple-200"
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
