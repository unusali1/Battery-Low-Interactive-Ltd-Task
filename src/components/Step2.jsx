import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import ResultPage from './ResultPage';
import "./step2.css"
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, registerables } from 'chart.js';
Chart.register(CategoryScale, ...registerables);

const Step2 = ({ formData }) => {
  const [maxX, setMaxX] = useState(null);
  const [minX, setMinX] = useState(null);
  const [maxY, setMaxY] = useState(null);
  const [minY, setMinY] = useState(null);
  const [maxZ, setMaxZ] = useState(null);
  const [minZ, setMinZ] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [chartData, setChartData] = useState(null);

  const [manualMaxX, setManualMaxX] = useState('');
  const [manualMinX, setManualMinX] = useState('');
  const [manualMaxY, setManualMaxY] = useState('');
  const [manualMinY, setManualMinY] = useState('');
  const [manualMaxZ, setManualMaxZ] = useState('');
  const [manualMinZ, setManualMinZ] = useState('');


  const [combinedMaxX, setCombinedMaxX] = useState(null);
  const [combinedMinX, setCombinedMinX] = useState(null);
  const [combinedMaxY, setCombinedMaxY] = useState(null);
  const [combinedMinY, setCombinedMinY] = useState(null);
  const [combinedMaxZ, setCombinedMaxZ] = useState(null);
  const [combinedMinZ, setCombinedMinZ] = useState(null);

  const handleCsvFile = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const text = await file.text();
        Papa.parse(text, {
          complete: function (parsedData) {
            const data = parsedData.data.slice(1); // Skip header row
            const xValues = data.map((row) => parseFloat(row[1]) || null);
            const yValues = data.map((row) => parseFloat(row[2]) || null);
            const zValues = data.map((row) => parseFloat(row[3]) || null);

            const nonEmptyXValues = xValues.filter((value) => value !== null);
            const nonEmptyYValues = yValues.filter((value) => value !== null);
            const nonEmptyZValues = zValues.filter((value) => value !== null);


            setMaxX(nonEmptyXValues.length > 0 ? Math.max(...nonEmptyXValues) : null);
            setMinX(nonEmptyXValues.length > 0 ? Math.min(...nonEmptyXValues) : null);
            setMaxY(nonEmptyYValues.length > 0 ? Math.max(...nonEmptyYValues) : null);
            setMinY(nonEmptyYValues.length > 0 ? Math.min(...nonEmptyYValues) : null);
            setMaxZ(nonEmptyZValues.length > 0 ? Math.max(...nonEmptyZValues) : null);
            setMinZ(nonEmptyZValues.length > 0 ? Math.min(...nonEmptyZValues) : null);

            setManualMaxX(nonEmptyXValues.length > 0 ? Math.max(...nonEmptyXValues) : '');
            setManualMinX(nonEmptyXValues.length > 0 ? Math.min(...nonEmptyXValues) : '');
            setManualMaxY(nonEmptyYValues.length > 0 ? Math.max(...nonEmptyYValues) : '');
            setManualMinY(nonEmptyYValues.length > 0 ? Math.min(...nonEmptyYValues) : '');
            setManualMaxZ(nonEmptyZValues.length > 0 ? Math.max(...nonEmptyZValues) : '');
            setManualMinZ(nonEmptyZValues.length > 0 ? Math.min(...nonEmptyZValues) : '');

            prepareChartData(data);

          }
        });

      } catch (error) {
        console.error('Error parsing CSV:', error);
      }
    } else {
      setMaxX(null);
      setMinX(null);
      setMaxY(null);
      setMinY(null);
      setMaxZ(null);
      setMinZ(null);
    }
  };

  useEffect(() => {
    setCombinedMaxX(maxX !== null ? Math.max(maxX, manualMaxX) : manualMaxX);
    setCombinedMinX(minX !== null ? Math.min(minX, manualMinX) : manualMinX);
    setCombinedMaxY(maxY !== null ? Math.max(maxY, manualMaxY) : manualMaxY);
    setCombinedMinY(minY !== null ? Math.min(minY, manualMinY) : manualMinY);
    setCombinedMaxZ(maxZ !== null ? Math.max(maxZ, manualMaxZ) : manualMaxZ);
    setCombinedMinZ(minZ !== null ? Math.min(minZ, manualMinZ) : manualMinZ);
  }, [maxX, manualMaxX, minX, manualMinX, maxY, manualMaxY, minY, manualMinY, maxZ, manualMaxZ, minZ, manualMinZ]);



  const prepareChartData = (data) => {
    const newChartData = {
      labels: data.map((row) => row[0]),
      datasets: [
        {
          label: 'X Values',
          data: data.map((row) => parseFloat(row[1]) || null),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };

    const chartOptions = {
      scales: {
        x: {
          type: 'category',
          labels: data.map((row) => row[0]),
          title: {
            display: true,
            text: 'KP',
          },
        },
      },
    };

    setChartData({ data: newChartData, options: chartOptions });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <>
      <div className="container">
        <h1 className="form-title">Step2 : select your csv file</h1>
        <div className='formdata-step1'>
          <p><strong>Project Name:</strong> {formData.projectName}</p>
          <p><strong>Project Description:</strong> {formData.projectDescription}</p>
          <p> <strong>Client:</strong> {formData.client}</p>
          <p><strong>Contractor:</strong> {formData.contractor}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="csvfile">Choose CSV File</label>
            <input type="file" onChange={handleCsvFile} accept=".csv" />
          </div>
          <div className="main-project-info">
            <div className="input-box">
              <label htmlFor="maxx">maxX</label>
              <input type="number" placeholder="Max X" value={manualMaxX} onChange={(e) => setManualMaxX(e.target.value)} required />
            </div>
            <div className="input-box">
              <label htmlFor="minx">minX</label>
              <input type="number" placeholder="Min X" value={manualMinX} onChange={(e) => setManualMinX(e.target.value)} required />
            </div>
            <div className="input-box">
              <label htmlFor="maxy">maxY</label>
              <input type="number" placeholder="Max Y" value={manualMaxY} onChange={(e) => setManualMaxY(e.target.value)} required />
            </div>
            <div className="input-box">
              <label htmlFor="miny">minY</label>
              <input type="number" placeholder="Min Y" value={manualMinY} onChange={(e) => setManualMinY(e.target.value)} required />
            </div>
            <div className="input-box">
              <label htmlFor="maxz">maxZ</label>
              <input type="number" placeholder="Max Z" value={manualMaxZ} onChange={(e) => setManualMaxZ(e.target.value)} required />
            </div>
            <div className="input-box">
              <label htmlFor="minz">minZ</label>
              <input type="number" placeholder="Min Z" value={manualMinZ} onChange={(e) => setManualMinZ(e.target.value)} required />
            </div>
          </div>
          <div className="submit-btn">
            <button type="submit" className='show-btn'>Show Result</button>
          </div>

          {showResult && (
            <div>
              <ResultPage
                formData={formData}
                maxX={combinedMaxX}
                minX={combinedMinX}
                maxY={combinedMaxY}
                minY={combinedMinY}
                maxZ={combinedMaxZ}
                minZ={combinedMinZ}
              />
            </div>
          )}

          <div className="chart-container">
            {showResult && chartData && (
              <Bar data={chartData.data} options={chartData.options} />
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default Step2;