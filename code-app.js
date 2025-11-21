class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function StatsApp() {
  try {
    const [link, setLink] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      
      if (!code) {
        setError('No code provided');
        setLoading(false);
        return;
      }

      loadLinkStats(code);
    }, []);

    const loadLinkStats = async (code) => {
      const result = await getLink(code);
      if (result.success) {
        setLink(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
    };

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      );
    }

    if (error || !link) {
      return (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <div className="icon-alert-circle text-5xl text-red-500 mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Link Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The link you are looking for does not exist'}</p>
            <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-block">
              Back to Dashboard
            </a>
          </div>
        </div>
      );
    }

    const shortUrl = `${window.location.origin}/${link.code}`;

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <a href="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
              <div className="icon-arrow-left text-lg"></div>
              Back to Dashboard
            </a>
          </div>

          <div className="stat-card mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Link Statistics</h1>
                <p className="text-gray-600">Detailed information about your shortened link</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Total Clicks</div>
                <div className="text-3xl font-bold text-gray-900">{link.clicks || 0}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Created</div>
                <div className="text-lg font-medium text-gray-900">
                  {new Date(link.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Last Clicked</div>
                <div className="text-lg font-medium text-gray-900">
                  {link.lastClicked ? new Date(link.lastClicked).toLocaleDateString() : 'Never'}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shortUrl}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                  <button
                    onClick={() => copyToClipboard(shortUrl)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target URL</label>
                <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 break-all">
                  {link.url}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Code</label>
                <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  <code className="text-blue-600 font-mono">{link.code}</code>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('StatsApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <StatsApp />
  </ErrorBoundary>
);
