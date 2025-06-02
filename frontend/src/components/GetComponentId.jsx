import { useState } from 'react';
import axios from 'axios';

export default function GetComponentId() {
  const [query, setQuery] = useState({ collection_id: '', component_type: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const componentTypes = [
    'Red Blood Cells',
    'Plasma',
    'Platelets',
    'Whole Blood',
    'Cryoprecipitate'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery(prevQuery => ({
      ...prevQuery,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!query.collection_id.trim()) {
      setError('Please enter a collection ID');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const res = await axios.get('/api/component', { params: query });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to retrieve component data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-t-xl p-6">
        <h2 className="text-2xl font-serif">Get Component ID</h2>
        <p className="text-purple-100 mt-1">Retrieve component information by collection ID and type</p>
      </div>
      
      {error && (
        <div className="mx-6 mt-6 p-4 rounded-lg flex items-center bg-red-50 text-red-700 border border-red-200">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="collection_id" className="block text-sm font-medium text-gray-700 mb-1">Collection ID</label>
              <input 
                type="text" 
                id="collection_id" 
                name="collection_id"
                value={query.collection_id}
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors" 
                placeholder="Enter the collection ID"
                required
              />
            </div>
            
            <div>
              <label htmlFor="component_type" className="block text-sm font-medium text-gray-700 mb-1">Component Type</label>
              <select
                id="component_type"
                name="component_type"
                value={query.component_type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              >
                <option value="">Select Component Type</option>
                {componentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg shadow-sm hover:from-purple-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : 'Get Component'}
            </button>
          </div>
        </form>
        
        {result && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">Component Information</h3>
            
            {Array.isArray(result) ? (
              result.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(result[0]).map(key => (
                          <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {key.replace(/_/g, ' ')}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {result.map((component, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          {Object.values(component).map((value, i) => (
                            <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {value?.toString() || '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
                  No component records found matching your criteria.
                </div>
              )
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
