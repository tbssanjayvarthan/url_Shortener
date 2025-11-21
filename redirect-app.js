function RedirectApp() {
  const [status, setStatus] = React.useState('loading');

  React.useEffect(() => {
    const code = window.location.pathname.substring(1);
    
    if (!code) {
      window.location.href = '/';
      return;
    }

    handleRedirect(code);
  }, []);

  const handleRedirect = async (code) => {
    const result = await getLink(code);
    
    if (!result.success) {
      setStatus('notfound');
      return;
    }

    await updateLinkClicks(code);
    window.location.href = result.data.url;
  };

  if (status === 'notfound') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-6">Link not found</p>
          <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-block">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RedirectApp />);