function HealthApp() {
  const [uptime, setUptime] = React.useState(0);

  React.useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const healthData = {
    ok: true,
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    uptime: uptime
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <div className="icon-check-circle text-2xl text-green-600"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">System Health</h1>
              <p className="text-gray-600">All systems operational</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Status</div>
              <div className="text-lg font-medium text-green-600">Operational</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Version</div>
              <div className="text-lg font-medium text-gray-900">{healthData.version}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Uptime</div>
              <div className="text-lg font-medium text-gray-900">{formatUptime(uptime)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Last Check</div>
              <div className="text-lg font-medium text-gray-900">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">API Response</h2>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
{JSON.stringify(healthData, null, 2)}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HealthApp />);