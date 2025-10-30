
import { SendHorizontal } from "lucide-react";
import Title from "./Title";

export default function Contact() {
  return (
    <div className="flex flex-col items-center mt-40" id="contact">
      <div className="flex items-center gap-2 text-sm text-red-800 bg-red-400/10 border border-red-200 rounded-full px-4">
        <span>🚀</span>
        <span>Contact</span>
      </div>
      <Title
        title="Feel free to reach out!"
        description="We're here to help and answer any questions you might have. We look forward to hearing from you"
      />
        <div className="w-full max-w-3xl bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 mt-8">
          <form className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Full Name</label>
              <input
                type="text"
                placeholder="Christ Mike"
                className="w-full border-2 border-gray-200 focus:border-red-900 focus:ring-2 focus:ring-red-200 p-3 rounded-lg transition-all duration-200 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Email Address</label>
              <input
                type="email"
                placeholder="christ.mike@example.com"
                className="w-full border-2 border-gray-200 focus:border-red-900 focus:ring-2 focus:ring-red-200 p-3 rounded-lg transition-all duration-200 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Phone Number</label>
              <input
                type="number"
                placeholder="+1 (555) 000-0000"
                className="w-full border-2 border-gray-200 focus:border-red-900 focus:ring-2 focus:ring-red-200 p-3 rounded-lg transition-all duration-200 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Your Message</label>
              <textarea
                placeholder="Tell us how we can help you..."
                className="w-full border-2 border-gray-200 focus:border-red-900 focus:ring-2 focus:ring-red-200 p-3 rounded-lg transition-all duration-200 outline-none resize-none"
                rows="5"
              />
            </div>
            <button className="bg-red-800 hover:bg-red-900 text-white font-semibold p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 mt-2">
              Send Message 
              <SendHorizontal className="inline-block ml-2 h-5 w-5" />
            </button>
          </form>
        </div>
    </div>
  );
}
