import { useState } from 'react';
import axios from 'axios';

export default function SampleProcessingForm() {
  const [data, setData] = useState({
    collection_id: '', 
    hiv_test: '', 
    hepatitis_b_test: '', 
    hepatitis_c_test: '',
    syphilis_test: '', 
    malaria_test: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const toBool = (val) => {
    if (val === 'Positive') return true;
    if (val === 'Negative') return false;
    return null; // if you decide to allow null for Inconclusive
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
  
    try {
      const res = await axios.post('/api/blood/processing', {
        collection_id: data.collection_id,
        hiv_test: toBool(data.hiv_test),
        hepatitis_b_test: toBool(data.hepatitis_b_test),
        hepatitis_c_test: toBool(data.hepatitis_c_test),
        syphilis_test: toBool(data.syphilis_test),
        malaria_test: toBool(data.malaria_test),
      });
  
      setMessage({ type: 'success', text: 'Sample processing results successfully added!' });
      setData({
        collection_id: '', 
        hiv_test: '', 
        hepatitis_b_test: '', 
        hepatitis_c_test: '',
        syphilis_test: '', 
        malaria_test: ''
      });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to add processing results' });
    } finally {
      setLoading(false);
    }
  };

  const testResults = ['Positive', 'Negative', 'Inconclusive'];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-t-xl p-6">
        <h2 className="text-2xl font-serif">Sample Processing Form</h2>
        <p className="text-green-100 mt-1">Record blood sample test results</p>
      </div>
      
      {message.text && (
        <div className={`mx-6 mt-6 p-4 rounded-lg flex items-center ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d={message.type === 'success'
              ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            } clipRule="evenodd" />
          </svg>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label htmlFor="collection_id" className="block text-sm font-medium text-gray-700 mb-1">Collection ID</label>
          <input 
            type="text" 
            id="collection_id" 
            name="collection_id" 
            value={data.collection_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
            required
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Test Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="hiv_test" className="block text-sm font-medium text-gray-700 mb-1">HIV Test</label>
              <select 
                id="hiv_test" 
                name="hiv_test" 
                value={data.hiv_test}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                required
              >
                <option value="">Select Result</option>
                {testResults.map(result => (
                  <option key={result} value={result}>{result}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="hepatitis_b_test" className="block text-sm font-medium text-gray-700 mb-1">Hepatitis B Test</label>
              <select 
                id="hepatitis_b_test" 
                name="hepatitis_b_test" 
                value={data.hepatitis_b_test}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                required
              >
                <option value="">Select Result</option>
                {testResults.map(result => (
                  <option key={result} value={result}>{result}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="hepatitis_c_test" className="block text-sm font-medium text-gray-700 mb-1">Hepatitis C Test</label>
              <select 
                id="hepatitis_c_test" 
                name="hepatitis_c_test" 
                value={data.hepatitis_c_test}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                required
              >
                <option value="">Select Result</option>
                {testResults.map(result => (
                  <option key={result} value={result}>{result}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="syphilis_test" className="block text-sm font-medium text-gray-700 mb-1">Syphilis Test</label>
              <select 
                id="syphilis_test" 
                name="syphilis_test" 
                value={data.syphilis_test}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                required
              >
                <option value="">Select Result</option>
                {testResults.map(result => (
                  <option key={result} value={result}>{result}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="malaria_test" className="block text-sm font-medium text-gray-700 mb-1">Malaria Test</label>
              <select 
                id="malaria_test" 
                name="malaria_test" 
                value={data.malaria_test}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                required
              >
                <option value="">Select Result</option>
                {testResults.map(result => (
                  <option key={result} value={result}>{result}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end border-t border-gray-200 pt-6">
          <button 
            type="submit" 
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg shadow-sm hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Submit Results'}
          </button>
        </div>
      </form>
    </div>
  );
}
