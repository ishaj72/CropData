import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

function App() {
  const [tables, setTables] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tables');
        let data = response.data;
        
        // Replace NaN with null and parse the JSON
        data = data.replace(/NaN/g, 'null');
        const parsedData = JSON.parse(data);

        // Filter out tables with NaN (null after replacement)
        const filteredTables = {
          final_table: parsedData.final_table.filter(row =>
            Object.values(row).every(value => value !== null)
          ),
          final_table2: parsedData.final_table2.filter(row =>
            Object.values(row).every(value => value !== null)
          ),
        };

        setTables(filteredTables);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!tables) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
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
                  <td>{row.Year || 'N/A'}</td>
                  <td>{row.CropWithMaxProd || 'N/A'}</td>
                  <td>{row.CropWithMinProd || 'N/A'}</td>
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
                  <td>{row['Crop Name'] || 'N/A'}</td>
                  <td>{row['Average Yield (Kg/Ha)'] || 'N/A'}</td>
                  <td>{row['Average Cultivation Area (Ha)'] || 'N/A'}</td>
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
