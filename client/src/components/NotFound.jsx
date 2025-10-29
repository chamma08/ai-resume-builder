export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center justify-center text-sm max-md:px-4">
        <h1 className="text-8xl md:text-9xl font-bold text-red-500">404</h1>
        <div className="h-1 w-16 rounded bg-red-900 my-5 md:my-7"></div>
        <p className="text-2xl md:text-3xl font-bold text-gray-800">
          Resume Not Found
        </p>
        <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">
          The resume you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="flex items-center gap-4 mt-6">
          <a
            href="/"
            className="bg-gray-800 hover:bg-black px-7 py-2.5 text-white rounded-md active:scale-95 transition-all"
          >
            Return Home
          </a>
          <a
            href="#"
            className="border border-gray-300 px-7 py-2.5 text-gray-800 rounded-md active:scale-95 transition-all"
          >
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
