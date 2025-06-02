import { useState } from 'react';
import axios from 'axios';

export default function TestingForm() {
  const [data, setData] = useState({
    component_id: '', 
    request_id: '', 
    test_date: '',
    ABO_compatibility: null, 
    Rh_compatibility: null, 
    cross_matching: null
  });
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/testing', data);
      setMessage({ type: 'success', content: res.data.message });
      setData({
        component_id: '', 
        request_id: '', 
        test_date: '',
        ABO_compatibility: null, 
        Rh_compatibility: null, 
        cross_matching: null
      });
    } catch (err) {
      setMessage({ type: 'error', content: err.response?.data?.error || 'An error occurred' });
    }
  };

  const labels = {
    component_id: 'Component ID',
    request_id: 'Request ID',
    test_date: 'Test Date',
    ABO_compatibility: 'ABO Compatibility',
    Rh_compatibility: 'Rh Compatibility',
    cross_matching: 'Cross Matching'
  };

  // Updated compatibility options with boolean values
  const compatibilityOptions = [
    { value: true, label: 'Compatible' },
    { value: false, label: 'Incompatible' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4 text-white">
        <h2 className="text-2xl font-serif">Testing & Matching</h2>
        <p className="text-gray-200 text-sm mt-1">Record blood compatibility test results</p>
      </div>

      <div className="p-6">
        {message.content && (
          <div className={`mb-6 p-4 rounded-lg border ${message.type === 'error' 
            ? 'bg-red-50 border-red-200 text-red-700' 
            : 'bg-green-50 border-green-200 text-green-700'}`}
          >
            <div className="flex items-center">
              <span className="mr-2">
                {message.type === 'error' 
                  ? <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                  : <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                }
              </span>
              <span className="font-medium">{message.content}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* IDs Section */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Identification</h3>
              
              <div className="space-y-2">
                <label htmlFor="component_id" className="block text-sm font-medium text-gray-700">
                  {labels.component_id}
                </label>
                <input
                  id="component_id"
                  name="component_id"
                  value={data.component_id}
                  onChange={e => setData({ ...data, component_id: e.target.value })}
                  type="text"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="request_id" className="block text-sm font-medium text-gray-700">
                  {labels.request_id}
                </label>
                <input
                  id="request_id"
                  name="request_id"
                  value={data.request_id}
                  onChange={e => setData({ ...data, request_id: e.target.value })}
                  type="text"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="test_date" className="block text-sm font-medium text-gray-700">
                  {labels.test_date}
                </label>
                <input
                  id="test_date"
                  name="test_date"
                  value={data.test_date}
                  onChange={e => setData({ ...data, test_date: e.target.value })}
                  type="date"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            {/* Compatibility Section */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Compatibility Results</h3>
              
              {['ABO_compatibility', 'Rh_compatibility', 'cross_matching'].map(k => (
                <div key={k} className="space-y-2">
                  <label htmlFor={k} className="block text-sm font-medium text-gray-700">
                    {labels[k]}
                  </label>
                  <select
                    id={k}
                    name={k}
                    value={data[k] === null ? '' : data[k]}
                    onChange={e => {
                      const value = e.target.value === '' ? null : e.target.value === 'true';
                      setData({ ...data, [k]: value });
                    }}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    required
                  >
                    <option value="">Select Result</option>
                    {compatibilityOptions.map(option => (
                      <option key={option.label} value={String(option.value)}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-md font-medium shadow-sm hover:from-gray-700 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
            >
              Submit Test Results
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}