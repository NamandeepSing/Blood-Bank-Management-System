import { Routes, Route, Link } from 'react-router-dom';
import {
  DonorForm,
  RetrieveDonor,
  BloodCollectionForm,
  BloodCollectionQuery,
  CollectionById,
  SampleProcessingForm,
  StorageForm,
  ComponentForm,
  GetComponentId,
  RequestForm,
  PatientSampleForm,
  GetRequestId,
  TestingForm,
  UntestedMatches,
  AllRequests,
  SatisfiedRequests,
  AnalyticsDashboard,
  InventoryList,
} from './components';

const routes = [
  { path: '/', label: 'Home', element: (
    <div className="py-8">
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-serif text-white font-bold mb-4">Welcome to the Blood Bank Management System</h2>
            <p className="text-red-100 text-lg mb-6">A comprehensive platform for managing blood donation, testing, storage, and distribution.</p>
            <div className="flex space-x-4">
              <a href="#quick-actions" className="bg-white text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-medium shadow-md transition-colors duration-200">Get Started</a>
              <a href="#learn-more" className="bg-red-700 text-white hover:bg-red-800 px-6 py-3 rounded-lg font-medium shadow-md transition-colors duration-200">Learn More</a>
            </div>
          </div>
          <div className="md:w-1/2 p-8 flex items-center justify-center">
            <img src="https://img.freepik.com/free-vector/blood-donation-concept-illustration_114360-2870.jpg" alt="Blood Donation" className="rounded-lg shadow-lg max-w-full h-auto" />
          </div>
        </div>
      </div>
      
      <div id="quick-actions" className="mb-12">
        <h3 className="text-2xl font-serif text-gray-800 mb-6 text-center">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="bg-red-100 text-red-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">Register Donor</h4>
            <p className="text-gray-600 mb-4">Add new donors to the system with their personal and medical information.</p>
            <Link to="/donor/add" className="text-red-600 hover:text-red-800 font-medium flex items-center">
              Register Now
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">Manage Inventory</h4>
            <p className="text-gray-600 mb-4">Track and manage blood components, their storage locations, and expiration dates.</p>
            <Link to="/component/inventory" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              Manage Now
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">View Analytics</h4>
            <p className="text-gray-600 mb-4">Access comprehensive reports and analytics about donations, inventory, and requests.</p>
            <Link to="/analytics" className="text-green-600 hover:text-green-800 font-medium flex items-center">
              View Reports
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      <div id="learn-more" className="bg-gray-50 rounded-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-serif text-gray-800 mb-6 text-center">About Our Blood Bank System</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-3">Our Mission</h4>
            <p className="text-gray-600 mb-4">We are dedicated to ensuring a safe and adequate blood supply for patients in need. Our comprehensive blood bank management system helps streamline the entire process from donation to transfusion.</p>
            
            <h4 className="text-lg font-medium text-gray-800 mb-3 mt-6">Key Features</h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Donor management and history tracking</li>
              <li>Blood collection and component preparation</li>
              <li>Comprehensive testing and quality control</li>
              <li>Inventory management with expiration alerts</li>
              <li>Request handling and distribution</li>
              <li>Advanced analytics and reporting</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Blood Donation Facts</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <span className="font-bold">1</span>
                </div>
                <p className="text-gray-600">One donation can save up to three lives.</p>
              </div>
              <div className="flex items-start">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <span className="font-bold">2</span>
                </div>
                <p className="text-gray-600">Someone needs blood every two seconds.</p>
              </div>
              <div className="flex items-start">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <span className="font-bold">3</span>
                </div>
                <p className="text-gray-600">Less than 10% of eligible population donates blood.</p>
              </div>
              <div className="flex items-start">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <span className="font-bold">4</span>
                </div>
                <p className="text-gray-600">Blood cannot be manufactured; it can only come from donors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) },
  // Donor Management
  { path: '/donor/add', label: 'Add Donor', element: <DonorForm /> },
  { path: '/donor/get', label: 'Get Donor', element: <RetrieveDonor /> },
  
  // Blood Collection
  { path: '/collection/add', label: 'Add Collection', element: <BloodCollectionForm /> },
  { path: '/collection/get', label: 'Get Collection', element: <BloodCollectionQuery /> },
  { path: '/collection/id', label: 'Collection by ID', element: <CollectionById /> },
  
  // Sample Processing
  { path: '/sample/process', label: 'Process Sample', element: <SampleProcessingForm /> },
  
  // Storage Management
  { path: '/storage/add', label: 'Add Storage', element: <StorageForm /> },
  
  // Component Management
  { path: '/component/add', label: 'Add Component', element: <ComponentForm /> },
  { path: '/component/get', label: 'Get Component', element: <GetComponentId /> },
  { path: '/component/inventory', label: 'Inventory', element: <InventoryList /> },
  
  // Request Management
  { path: '/request/add', label: 'Add Request', element: <RequestForm /> },
  { path: '/request/all', label: 'All Requests', element: <AllRequests /> },
  { path: '/request/satisfied', label: 'Satisfied Requests', element: <SatisfiedRequests /> },
  
  // Patient Sample
  { path: '/patient/sample', label: 'Patient Sample', element: <PatientSampleForm /> },
  { path: '/request/id', label: 'Request by ID', element: <GetRequestId /> },
  
  // Testing
  { path: '/testing/add', label: 'Add Test', element: <TestingForm /> },
  { path: '/testing/untested', label: 'Untested Matches', element: <UntestedMatches /> },
  
  // Analytics
  { path: '/analytics', label: 'Analytics', element: <AnalyticsDashboard /> }
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-bold text-xl">Blood Bank</Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700">Donor</button>
                  <div className="absolute z-10 hidden group-hover:block w-48 bg-white rounded-md shadow-lg py-1">
                    <Link to="/donor/add" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Donor</Link>
                    <Link to="/donor/get" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Get Donor</Link>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700">Collection</button>
                  <div className="absolute z-10 hidden group-hover:block w-48 bg-white rounded-md shadow-lg py-1">
                    <Link to="/collection/add" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Collection</Link>
                    <Link to="/collection/get" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Get Collection</Link>
                    <Link to="/collection/id" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Collection by ID</Link>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700">Processing</button>
                  <div className="absolute z-10 hidden group-hover:block w-48 bg-white rounded-md shadow-lg py-1">
                    <Link to="/sample/process" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Process Sample</Link>
                    <Link to="/storage/add" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Storage</Link>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700">Components</button>
                  <div className="absolute z-10 hidden group-hover:block w-48 bg-white rounded-md shadow-lg py-1">
                    <Link to="/component/add" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Component</Link>
                    <Link to="/component/get" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Get Component</Link>
                    <Link to="/component/inventory" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Inventory</Link>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700">Requests</button>
                  <div className="absolute z-10 hidden group-hover:block w-48 bg-white rounded-md shadow-lg py-1">
                    <Link to="/request/add" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Request</Link>
                    <Link to="/request/all" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Requests</Link>
                    <Link to="/request/satisfied" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Satisfied Requests</Link>
                    <Link to="/request/id" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Request by ID</Link>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700">Testing</button>
                  <div className="absolute z-10 hidden group-hover:block w-48 bg-white rounded-md shadow-lg py-1">
                    <Link to="/testing/add" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Test</Link>
                    <Link to="/testing/untested" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Untested Matches</Link>
                    <Link to="/patient/sample" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Patient Sample</Link>
                  </div>
                </div>
                
                <Link to="/analytics" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700">Analytics</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </div>
  );
}
