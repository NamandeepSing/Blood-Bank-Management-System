import { useState } from 'react';
import axios from 'axios';

export default function BloodCollectionForm() {
  const [data, setData] = useState({ name: '', contact_info: '', collection_date: '', volume_ml: '' });
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/blood/collection', data);
      setMessage({ type: 'success', content: `Collection ID: ${res.data.collection_id}` });
      setData({ name: '', contact_info: '', collection_date: '', volume_ml: '' });
    } catch (err) {
      setMessage({ type: 'error', content: err.response?.data?.error || 'An error occurred' });
    }
  };

  const labels = {
    name: 'Donor Name',
    contact_info: 'Contact Information',
    collection_date: 'Collection Date',
    volume_ml: 'Volume (mL)'
  };

  const inputTypes = {
    name: 'text',
    contact_info: 'text',
    collection_date: 'date',
    volume_ml: 'number'
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-4 text-white">
        <h2 className="text-2xl font-serif">Blood Collection</h2>
        <p className="text-gray-100 text-sm mt-1">Record a new blood collection from a donor</p>
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
          {/* Donor Information Section */}
          <div className="bg-gray-50 rounded-lg border border-gray-100 p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Donor Information</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {labels.name}
                </label>
                <input
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={e => setData({ ...data, name: e.target.value })}
                  type="text"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter donor's full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact_info" className="block text-sm font-medium text-gray-700 mb-1">
                  {labels.contact_info}
                </label>
                <input
                  id="contact_info"
                  name="contact_info"
                  value={data.contact_info}
                  onChange={e => setData({ ...data, contact_info: e.target.value })}
                  type="text"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Phone number or email"
                  required
                />
              </div>
            </div>
          </div>

          {/* Collection Details Section */}
          <div className="bg-gray-50 rounded-lg border border-gray-100 p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Collection Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="collection_date" className="block text-sm font-medium text-gray-700 mb-1">
                  {labels.collection_date}
                </label>
                <input
                  id="collection_date"
                  name="collection_date"
                  value={data.collection_date}
                  onChange={e => setData({ ...data, collection_date: e.target.value })}
                  type="date"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="volume_ml" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="450"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">mL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-md font-medium shadow-sm hover:from-blue-600 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              Record Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
