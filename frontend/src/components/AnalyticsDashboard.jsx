import { useState } from 'react';
import axios from 'axios';

const queries = [
  { id: 1, label: 'Untested Components for Requests' },
  { id: 2, label: 'Donors Tested Positive' },
  { id: 3, label: 'Expired Components' },
  { id: 4, label: 'Pending Requests Over 1 Month' },
  { id: 5, label: 'Fully Compatible Requests' },
  { id: 6, label: 'Total Donations Per Donor' },
  { id: 7, label: 'Blood Type Distribution in Storage' },
  { id: 8, label: 'Fulfilled Requests' },
  { id: 9, label: 'Donors with >3 Donations' },
  { id: 10, label: 'Blood Units Expiring Soon (7 days)' },
  { id: 11, label: 'Most Requested Component Type' },
  { id: 12, label: 'Top 5 Frequent Donors' },
  { id: 13, label: 'Requests With No Matching Blood Type' },
];

export default function AnalyticsDashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeQuery, setActiveQuery] = useState(null);

  const runQuery = async (id) => {
    setLoading(true);
    setError(null);
    setActiveQuery(id);
    try {
      const res = await axios.get(`/api/analytics/query/${id}`);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to run query');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-teal-500"></div>
            <p className="mt-4 text-gray-600">Processing query...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
          <span>{error}</span>
        </div>
      );
    }

    if (!result) return null;

    // Format the result in a more readable way
    return (
      <div className="bg-white shadow-sm rounded-lg p-6 overflow-x-auto border border-gray-100">
        {Array.isArray(result) ? (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(result[0] || {}).map(key => (
                    <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {key.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {result.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {Object.values(row).map((value, j) => (
                      <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {value?.toString() || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <pre className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    );
  };

  const queryCategories = [
    { title: 'Inventory', ids: [1, 3, 7, 10], icon: '📦' },
    { title: 'Donor Analysis', ids: [2, 6, 9, 12], icon: '👤' },
    { title: 'Request Status', ids: [4, 5, 8, 13], icon: '📋' },
    { title: 'Performance Metrics', ids: [11], icon: '📊' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-3xl font-serif mb-2">Analytics Dashboard</h2>
        <p className="text-teal-100">Comprehensive blood bank statistics and insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {queryCategories.map(category => (
          <div key={category.title} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 flex items-center">
                <span className="mr-2">{category.icon}</span>
                {category.title}
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {queries
                .filter(q => category.ids.includes(q.id))
                .map(q => (
                  <button
                    key={q.id}
                    onClick={() => runQuery(q.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${activeQuery === q.id
                      ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{q.label}</span>
                      {activeQuery === q.id && (
                        <svg className="ml-auto h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {(loading || error || result) && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <span className="mr-2">🔍</span>
              Query Results
            </h3>
            {activeQuery && (
              <span className="text-sm px-3 py-1 bg-teal-100 text-teal-800 rounded-full">
                {queries.find(q => q.id === activeQuery)?.label}
              </span>
            )}
          </div>
          <div className="p-6">
            {renderResult()}
          </div>
        </div>
      )}
    </div>
  );
}
