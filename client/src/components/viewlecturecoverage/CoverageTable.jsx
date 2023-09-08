import React, { useState, useEffect } from 'react';
const CoverageTable = () => {

  const [coverages, setCoverages] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5000/coverages')
      .then(response => response.json())
      .then(data => setCoverages(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
    return(
      <div>
      <h2>Coverage Table</h2>
      <table>
        <thead>
          <tr>
            <th>Lecturer Name</th>
            <th>Batch Code</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Date</th>
            <th>Lecture Coverage</th>
          </tr>
        </thead>
        <tbody>
          {coverages.map(coverage => (
            <tr key={coverage._id}>
              <td>{coverage.lecturername}</td>
              <td>{coverage.batchcode}</td>
              <td>{coverage.starttime}</td>
              <td>{coverage.endtime}</td>
              <td>{coverage.date}</td>
              <td>{coverage.lecturecoverage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
}

export default CoverageTable;
