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
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const [links, setLinks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [showModal, setShowModal] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [alert, setAlert] = React.useState(null);

    React.useEffect(() => {
      loadLinks();
    }, []);

    const loadLinks = async () => {
      setLoading(true);
      const result = await fetchLinks();
      if (result.success) {
        setLinks(result.data);
      }
      setLoading(false);
    };

    const handleDelete = async (code) => {
      const result = await deleteLink(code);
      if (result.success) {
        setAlert({ type: 'success', message: 'Link deleted successfully' });
        loadLinks();
      } else {
        setAlert({ type: 'error', message: result.error });
      }
    };

    const filteredLinks = links.filter(link =>
      link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen bg-gray-50" data-name="app" data-file="app.js">
        <Header />
        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your shortened links and track their performance</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <input
                type="text"
                placeholder="Search by code or URL..."
                className="input-field max-w-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn-primary" onClick={() => setShowModal(true)}>
                <span className="flex items-center gap-2">
                  <div className="icon-plus text-lg"></div>
                  Add New Link
                </span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)]"></div>
            </div>
          ) : (
            <LinkTable links={filteredLinks} onDelete={handleDelete} />
          )}
        </main>

        {showModal && (
          <AddLinkModal
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              setShowModal(false);
              setAlert({ type: 'success', message: 'Link created successfully' });
              loadLinks();
            }}
            onError={(error) => setAlert({ type: 'error', message: error })}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);