function AddLinkModal({ onClose, onSuccess, onError }) {
  try {
    const [url, setUrl] = React.useState('');
    const [code, setCode] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [urlError, setUrlError] = React.useState('');
    const [codeError, setCodeError] = React.useState('');

    const validateUrl = (value) => {
      try {
        new URL(value);
        setUrlError('');
        return true;
      } catch {
        setUrlError('Please enter a valid URL');
        return false;
      }
    };

    const validateCode = (value) => {
      if (!value) {
        setCodeError('');
        return true;
      }
      if (!/^[A-Za-z0-9]{6,8}$/.test(value)) {
        setCodeError('Code must be 6-8 alphanumeric characters');
        return false;
      }
      setCodeError('');
      return true;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateUrl(url) || !validateCode(code)) return;

      setLoading(true);
      const result = await createLink(url, code);
      setLoading(false);

      if (result.success) {
        onSuccess();
      } else {
        onError(result.error);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" data-name="add-link-modal" data-file="components/AddLinkModal.js">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add New Link</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <div className="icon-x text-xl"></div>
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Target URL *</label>
              <input
                type="text"
                className={`input-field ${urlError ? 'border-red-500' : ''}`}
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (e.target.value) validateUrl(e.target.value);
                }}
                placeholder="https://example.com"
                required
              />
              {urlError && <p className="text-red-500 text-sm mt-1">{urlError}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Code (optional)
              </label>
              <input
                type="text"
                className={`input-field ${codeError ? 'border-red-500' : ''}`}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  validateCode(e.target.value);
                }}
                placeholder="e.g., docs123"
                maxLength="8"
              />
              {codeError && <p className="text-red-500 text-sm mt-1">{codeError}</p>}
              <p className="text-gray-500 text-xs mt-1">6-8 alphanumeric characters</p>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="btn-secondary flex-1">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn-primary flex-1">
                {loading ? 'Creating...' : 'Create Link'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AddLinkModal component error:', error);
    return null;
  }
}