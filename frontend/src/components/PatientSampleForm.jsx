import { useState } from 'react';
import axios from 'axios';

export default function PatientSampleForm() {
  const [data, setData] = useState({ 
    patient_name: '', 
    contact_info: '', 
    collection_date: '',
    blood_type: '',
    sample_id: ''
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

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const res = await axios.post('/api/request/sample', data);
      setMessage({ 
        type: 'success', 
        text: `Patient Sample successfully linked to Request ID: ${res.data.request_id}` 
      });
      // Reset form
      setData({ 
        patient_name: '', 
        contact_info: '', 
        collection_date: '',
        blood_type: '',
        sample_id: ''
      });
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.error || 'Failed to submit patient sample' 
      });
    } finally {
      setLoading(false);
    }
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-xl p-6">
        <h2 className="text-2xl font-serif">Patient Sample Form</h2>
        <p className="text-blue-100 mt-1">Register a new patient blood sample</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Patient Information</h3>
            
            <div className="mb-4">
              <label htmlFor="patient_name" className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input 
                type="text" 
                id="patient_name" 
                name="patient_name" 
                value={data.patient_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="contact_info" className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
              <input 
                type="text" 
                id="contact_info" 
                name="contact_info" 
                value={data.contact_info}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                required
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Sample Details</h3>
            
            <div className="mb-4">
              <label htmlFor="sample_id" className="block text-sm font-medium text-gray-700 mb-1">Sample ID</label>
              <input 
                type="text" 
                id="sample_id" 
                name="sample_id" 
                value={data.sample_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="blood_type" className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
              <select 
                id="blood_type" 
                name="blood_type" 
                value={data.blood_type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                required
              >
                <option value="">Select Blood Type</option>
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="collection_date" className="block text-sm font-medium text-gray-700 mb-1">Collection Date</label>
              <input 
                type="date" 
                id="collection_date" 
                name="collection_date" 
                value={data.collection_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                required
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end border-t border-gray-200 pt-6">
          <button 
            type="submit" 
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
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
            ) : 'Submit Sample'}
          </button>
        </div>
      </form>
    </div>
  );
}
