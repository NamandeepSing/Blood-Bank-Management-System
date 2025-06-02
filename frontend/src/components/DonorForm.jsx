import { useState } from 'react';
import axios from 'axios';

export default function DonorForm() {
  const [formData, setFormData] = useState({
    name: '', blood_type: '', rh_factor: '', date_of_birth: '', contact_info: ''
  });
  const [message, setMessage] = useState({ type: '', content: '' });

  

  const handleSubmit = async e => {
    e.preventDefault();
  
    const combinedBloodType = formData.blood_type + formData.rh_factor;
  
    try {
      const res = await axios.post('/api/donor', {
        ...formData,
        blood_type: combinedBloodType,
        rh_factor: formData.rh_factor // keep if needed elsewhere
      });
  
      setMessage({ type: 'success', content: 'Donor added successfully' });
      setFormData({ name: '', blood_type: '', rh_factor: '', date_of_birth: '', contact_info: '' });
    } catch (err) {
      setMessage({ type: 'error', content: err.response?.data?.error || 'An error occurred' });
    }
  };
  
  const labels = {
    name: 'Full Name',
    blood_type: 'Blood Type',
    rh_factor: 'RH Factor',
    date_of_birth: 'Date of Birth',
    contact_info: 'Contact Information'
  };

  const bloodTypes = ['A', 'B', 'AB', 'O'];
  const rhFactors = ['+', '-'];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-red-700 to-red-600 px-6 py-4 text-white">
        <h2 className="text-2xl font-serif">Add Donor</h2>
        <p className="text-gray-100 text-sm mt-1">Register a new blood donor to the system</p>
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
          {/* Personal Information Section */}
          <div className="bg-gray-50 rounded-lg border border-gray-100 p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {labels.name}
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                  {labels.date_of_birth}
                </label>
                <input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={e => setFormData({ ...formData, date_of_birth: e.target.value })}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                  type="text"
                  value={formData.contact_info}
                  onChange={e => setFormData({ ...formData, contact_info: e.target.value })}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Phone number or email"
                  required
                />
              </div>
            </div>
          </div>

          {/* Blood Information Section */}
          <div className="bg-gray-50 rounded-lg border border-gray-100 p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Blood Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="blood_type" className="block text-sm font-medium text-gray-700 mb-1">
                  {labels.blood_type}
                </label>
                <div className="relative">
                  <select
                    id="blood_type"
                    name="blood_type"
                    value={formData.blood_type}
                    onChange={e => setFormData({ ...formData, blood_type: e.target.value })}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
                    required
                  >
                    <option value="">Select Blood Type</option>
                    {bloodTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="rh_factor" className="block text-sm font-medium text-gray-700 mb-1">
                  {labels.rh_factor}
                </label>
                <div className="relative">
                  <select
                    id="rh_factor"
                    name="rh_factor"
                    value={formData.rh_factor}
                    onChange={e => setFormData({ ...formData, rh_factor: e.target.value })}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
                    required
                  >
                    <option value="">Select RH Factor</option>
                    {rhFactors.map(factor => (
                      <option key={factor} value={factor}>{factor}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              className="px-6 py-3 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-md font-medium shadow-sm hover:from-red-600 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
            >
              Register Donor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
