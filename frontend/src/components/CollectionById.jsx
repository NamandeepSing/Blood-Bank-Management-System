import { useState } from 'react';
import axios from 'axios';

export default function CollectionById() {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!id.trim()) {
      setError('Please enter a collection ID');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const res = await axios.get(`/api/blood/collection/${id}`);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to retrieve collection data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-t-xl p-6">
        <h2 className="text-2xl font-serif">Collection By ID</h2>
        <p className="text-amber-100 mt-1">Retrieve a specific blood collection record by its ID</p>
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
          <div className="mb-6">
            <label htmlFor="collection_id" className="block text-sm font-medium text-gray-700 mb-1">Collection ID</label>
            <div className="flex">
              <input 
                type="text" 
                id="collection_id" 
                value={id}
                onChange={e => setId(e.target.value)} 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors" 
                placeholder="Enter the collection ID"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-r-lg shadow-sm hover:from-amber-700 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
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
                ) : 'Search'}
              </button>
            </div>
          </div>
        </form>
        
        {result && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">Collection Details</h3>
            
            {typeof result === 'object' ? (
              <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {Object.entries(result).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 pb-2">
                      <div className="text-sm font-medium text-gray-500">{key.replace(/_/g, ' ').toUpperCase()}</div>
                      <div className="mt-1 text-sm text-gray-900">{value?.toString() || '-'}</div>
                    </div>
                  ))}
                </div>
              </div>
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
