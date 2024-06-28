import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tables, setTables] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tables');
        console.log('API response:', response.data);
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!tables) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Agricultural Data</h1>

      {tables.final_table && tables.final_table.length > 0 ? (
        <div>
          <h2>Table 1: Max and Min Production</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Crop With Max Production</th>
                <th>Crop With Min Production</th>
              </tr>
            </thead>
            <tbody>
              {tables.final_table.map((row, index) => (
                <tr key={index}>
                  <td>{row.Year}</td>
                  <td>{row.CropWithMaxProd}</td>
                  <td>{row.CropWithMinProd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data available for Table 1</p>
      )}

      {tables.final_table2 && tables.final_table2.length > 0 ? (
        <div>
          <h2>Table 2: Average Yield and Cultivation Area</h2>
          <table>
            <thead>
              <tr>
                <th>Crop Name</th>
                <th>Average Yield (Kg/Ha)</th>
                <th>Average Cultivation Area (Ha)</th>
              </tr>
            </thead>
            <tbody>
              {tables.final_table2.map((row, index) => (
                <tr key={index}>
                  <td>{row['CropName']}</td>  {/* Use dot notation */}
                  <td>{row['Average Yield (Kg/Ha)']}</td>
                  <td>{row['Average Cultivation Area (Ha)']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data available for Table 2</p>
      )}
    </div>
  );
}

export default App;
