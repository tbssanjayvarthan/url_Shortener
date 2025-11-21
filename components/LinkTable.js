function LinkTable({ links, onDelete }) {
  try {
    const [sortField, setSortField] = React.useState('createdAt');
    const [sortDesc, setSortDesc] = React.useState(true);

    const sortedLinks = [...links].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'clicks') {
        return sortDesc ? bVal - aVal : aVal - bVal;
      }
      return sortDesc ? (bVal > aVal ? 1 : -1) : (aVal > bVal ? 1 : -1);
    });

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
    };

    const formatDate = (dateStr) => {
      if (!dateStr) return 'Never';
      return new Date(dateStr).toLocaleString();
    };

    if (links.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center" data-name="link-table" data-file="components/LinkTable.js">
          <div className="icon-link-2 text-4xl text-gray-300 mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No links yet</h3>
          <p className="text-gray-500">Create your first shortened link to get started</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden" data-name="link-table" data-file="components/LinkTable.js">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-[var(--border-color)]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Target URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer" onClick={() => setSortDesc(!sortDesc)}>
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Clicked</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {sortedLinks.map((link) => (
                <tr key={link.code} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-[var(--primary-color)]">{link.code}</code>
                      <button onClick={() => copyToClipboard(`${window.location.origin}/${link.code}`)} className="text-gray-400 hover:text-gray-600">
                        <div className="icon-copy text-sm"></div>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-md truncate text-sm text-gray-900">{link.url}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{link.clicks || 0}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(link.lastClicked)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <a href={`/code.html?code=${link.code}`} className="text-[var(--primary-color)] hover:text-[var(--accent-color)] text-sm">
                        Stats
                      </a>
                      <button onClick={() => onDelete(link.code)} className="text-red-600 hover:text-red-700 text-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LinkTable component error:', error);
    return null;
  }
}