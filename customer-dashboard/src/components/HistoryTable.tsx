// components/HistoryTable.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CustomerData {
  store_id: number;
  customers_in: number;
  customers_out: number;
  time_stamp: string;
}

const HistoryTable: React.FC = () => {
  const [historyData, setHistoryData] = useState<CustomerData[]>([]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/history');
        setHistoryData(response.data);
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    };

    fetchHistoryData();
  }, []);

  return (
    <div className="table-container">
      <h2>Customer Movement History (Last 24 Hours)</h2>
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
          {historyData.map((data, index) => (
            <tr key={index}>
              <td>{data.store_id}</td>
              <td>{data.customers_in}</td>
              <td>{data.customers_out}</td>
              <td>{data.time_stamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
