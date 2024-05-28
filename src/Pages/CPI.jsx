import React, { useState, useEffect } from 'react';
import "./CPI.css";
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router-dom';

const CPI = () => {
  const navigate = useNavigate();
  


  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [cpiData, setCpiData] = useState(null);
  const [plot, setPlot] = useState('');
  const [loading, setLoading] = useState(false);

  const attributes = [
    '', 'Cereals and products', 'Meat and fish', 'Egg', 
    'Milk and products', 'Oils and fats', 'Fruits', 'Vegetables', 
    'Pulses and products', 'Sugar and Confectionery', 'Spices', 
    'Non-alcoholic beverages', 'Prepared meals, snacks, sweets etc.', 
    'Food and beverages', 'Pan, tobacco and intoxicants', 'Clothing', 
    'Footwear', 'Clothing and footwear', 'Housing', 'Fuel and light', 
    'Household goods and services', 'Health', 'Transport and communication', 
    'Recreation and amusement', 'Education', 'Personal care and effects', 
    'Miscellaneous', 'General index'
  ];

  const handleAttributeChange = (event) => {
    setSelectedAttribute(event.target.value);
  };
  useEffect(() => {
    axios.get('https://cpiforecast.netlify.app/verify',{ withCredentials: true })
      .then(res => {
        if (!res.data.status) {
          navigate('/login');
        }
      })
      .catch(err => {
        console.error("Verification error:", err);
        navigate('/');
      });
  }, [navigate]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); 
    axios.get('http://127.0.0.1:5173/cpi', { params: { attribute: selectedAttribute } })
      .then(response => {
        setCpiData(response.data);
        setPlot(JSON.parse(response.data.plot));
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the CPI data!", error);
        setLoading(false);
      });
  };

  return (
    <div className='all'>
      <Navbar />
      <h1>CPI Forecasting</h1>
      <div className='select'>
        <p>Choose an Attribute:</p>
        <form onSubmit={handleSubmit}>
          <select className='opt' id="attribute-select" value={selectedAttribute} onChange={handleAttributeChange}>
            {attributes.map(attribute => (
              <option key={attribute} value={attribute}>{attribute}</option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
      {loading && (
        <div>
          <h1 className='load'>please wait...</h1>
        </div>
      )}
      {cpiData && (
        <div className='cpi-data'>
          <h2 className='head'>Data for {cpiData.attribute}</h2>
          <div className='allbody'>
            <div>
              <table className='thetable'>
                <thead>
                  <tr className='colname'>
                    <th>Date</th>
                    <th>Forecasted value</th>
                  </tr>
                </thead>
                <tbody>
                  {cpiData.data.map((row, index) => (
                    <tr key={index}>
                      <td className='dateleft'>{row.Date}</td>
                      <td className='valueleft'>{row.forecast}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='forecast-image'>
              {plot && (
                <div>
                  <h2>Forecast Plot</h2>
                  <Plot className='figure'
                    data={plot.data}
                    layout={plot.layout}
                    config={plot.config}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CPI;
