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
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600">
        Get Started with your personal information
      </p>
      <div className="flex items-center gap-2">
        <label>
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user-image"
              className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-30"
            />
          ) : (
            <div className="inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer">
              <User className="size-10 border rounded-full p-2.5" />
              Upload Profile Picture
            </div>
          )}
          <input
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            onChange={(e) => handleChange("image", e.target.files[0])}
            className="hidden"
          />
        </label>
        {typeof data.image === "object" && (
          <div className="flex pl-1 flex-col text-sm">
            <p>Remove Background</p>
            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3 ">
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
          </div>
        )}
      </div>

      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label
              htmlFor={field.key}
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Icon className="h-4 w-4 text-gray-400" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              id={field.key}
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
              required={field.required}
              placeholder={`Enter your ${field.label.toLowerCase()}`}
            />
          </div>
        );
      })}
    </div>
  );
}
