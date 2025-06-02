import { useState } from 'react';
import axios from 'axios';

export default function ComponentForm() {
  const [data, setData] = useState({
    collection_id: '', component_type: '', expiration_date: '', volume_ml: '', storage_id: ''
  });
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/component', data);
      setMessage({ type: 'success', content: `Component ID: ${res.data.component_id}` });
      setData({ collection_id: '', component_type: '', expiration_date: '', volume_ml: '', storage_id: '' });
    } catch (err) {
      setMessage({ type: 'error', content: err.response?.data?.error || 'An error occurred' });
    }
  };

  const labels = {
    collection_id: 'Collection ID',
    component_type: 'Component Type',
    expiration_date: 'Expiration Date',
    volume_ml: 'Volume (mL)',
    storage_id: 'Storage ID'
  };

  const componentTypes = ['Red Blood Cells', 'Plasma', 'Platelets', 'Cryoprecipitate', 'Whole Blood'];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-purple-700 to-purple-600 px-6 py-4 text-white">
        <h2 className="text-2xl font-serif">Add Component</h2>
        <p className="text-gray-100 text-sm mt-1">Create a new blood component record</p>
      </div>

      <div className="p-6">
        {message.content && (
          <div className={`mb-6 p-4 rounded-lg border flex items-center ${message.type === 'error' 
            ? 'bg-red-50 border-red-200 text-red-700' 
            : 'bg-green-50 border-green-200 text-green-700'}`}
          >
            <span className="mr-2">
              {message.type === 'error' 
                ? <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                : <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              }
            </span>
            <span className="font-medium">{message.content}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Source Information */}
          <div className="bg-gray-50 rounded-lg border border-gray-100 p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Source Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="collection_id" className="block text-sm font-medium text-gray-700">
                  {labels.collection_id}
                </label>
                <input
                  id="collection_id"
                  name="collection_id"
                  value={data.collection_id}
                  onChange={e => setData({ ...data, collection_id: e.target.value })}
                  type="text"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter collection ID"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="component_type" className="block text-sm font-medium text-gray-700">
                  {labels.component_type}
                </label>
                <div className="relative">
                  <select
                    id="component_type"
                    name="component_type"
                    value={data.component_type}
                    onChange={e => setData({ ...data, component_type: e.target.value })}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    required
                  >
                    <option value="">Select Component Type</option>
                    {componentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Component Details */}
          <div className="bg-gray-50 rounded-lg border border-gray-100 p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Component Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="expiration_date" className="block text-sm font-medium text-gray-700">
                  {labels.expiration_date}
                </label>
                <input
                  id="expiration_date"
                  name="expiration_date"
                  value={data.expiration_date}
                  onChange={e => setData({ ...data, expiration_date: e.target.value })}
                  type="date"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="volume_ml" className="block text-sm font-medium text-gray-700">
                  {labels.volume_ml}
                </label>
                <div className="relative">
                  <input
                    id="volume_ml"
                    name="volume_ml"
                    value={data.volume_ml}
                    onChange={e => setData({ ...data, volume_ml: e.target.value })}
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="250"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">mL</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="storage_id" className="block text-sm font-medium text-gray-700">
                  {labels.storage_id}
                </label>
                <input
                  id="storage_id"
                  name="storage_id"
                  value={data.storage_id}
                  onChange={e => setData({ ...data, storage_id: e.target.value })}
                  type="text"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter storage location"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              className="px-6 py-3 bg-gradient-to-r from-purple-700 to-purple-600 text-white rounded-md font-medium shadow-sm hover:from-purple-600 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
            >
              Add Component
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
