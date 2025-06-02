import { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/component/inventory');
        setInventory(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) return <div>Loading inventory...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Blood Component Inventory</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Component ID</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Volume (ml)</th>
              <th className="px-4 py-2 border">Expiration Date</th>
              <th className="px-4 py-2 border">Storage Location</th>
              <th className="px-4 py-2 border">Storage Temperature</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.component_id}>
                <td className="px-4 py-2 border">{item.component_id}</td>
                <td className="px-4 py-2 border">{item.component_type}</td>
                <td className="px-4 py-2 border">{item.volume_ml}</td>
                <td className="px-4 py-2 border">
                  {new Date(item.expiration_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">{item.storage_location}</td>
                <td className="px-4 py-2 border">{item.storage_temperature}°C</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryList;
