function Header() {
  try {
    return (
      <header className="bg-white border-b border-[var(--border-color)]" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-[var(--secondary-color)] flex items-center justify-center">
                <div className="icon-link text-xl text-[var(--primary-color)]"></div>
              </div>
              <span className="text-xl font-bold text-gray-900">URL Shortener</span>
            </div>
            <nav className="flex gap-6">
              <a href="/" className="text-[var(--primary-color)] font-medium">Dashboard</a>
              <a href="/healthz.html" className="text-gray-600 hover:text-gray-900">Health</a>
            </nav>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}