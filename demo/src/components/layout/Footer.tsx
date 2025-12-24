export function Footer() {
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Premium React Loaders. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Built by</span>
            <a
              href="https://ishansasika.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              ishansasika
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
