import { useEffect, useState } from 'react';
import axios from 'axios';

// Configure axios with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000'
});

export default function AllRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/api/request')
      .then(res => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching requests:', err);
        setError(err.response?.data?.error || 'Failed to fetch requests');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="section">
        <div className="text-center py-4">Loading requests...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="section p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Blood Requests</h2>
        <p className="text-gray-600">Total requests: {requests.length}</p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No requests found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map(request => (
            <div 
              key={request.request_id} 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Request #{request.request_id}
                </h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {request.blood_type}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient</span>
                  <span className="font-medium">{request.patient_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age</span>
                  <span>{request.patient_age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Component</span>
                  <span className="font-medium">{request.component_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hospital</span>
                  <span>{request.hospital}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span>{new Date(request.request_date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact</span>
                  <span className="text-sm">{request.contact_info}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
