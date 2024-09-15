// components/LiveTable.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CustomerData {
  store_id: number;
  customers_in: number;
  customers_out: number;
  time_stamp: string;
}

const LiveTable: React.FC = () => {
  const [liveData, setLiveData] = useState<CustomerData | null>(null);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/live');
        setLiveData(response.data);
      } catch (error) {
        console.error('Error fetching live data:', error);
      }
    };

    const interval = setInterval(fetchLiveData, 5000);
    fetchLiveData();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="table-container">
      <h2>Live Customers In/Out</h2>
      {liveData ? (
        <table className="table">
          <thead>
            <tr>
              <th>Store ID</th>
              <th>Customers In</th>
              <th>Customers Out</th>
              <th>Time Stamp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{liveData.store_id}</td>
              <td>{liveData.customers_in}</td>
              <td>{liveData.customers_out}</td>
              <td>{liveData.time_stamp}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No live data available.</p>
      )}
    </div>
  );
};

export default LiveTable;
