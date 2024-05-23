import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer,Label} from 'recharts';
import * as d3 from 'd3';
import './Linechart.css'
import Navbar from '../Components/Navbar/Navbar';

const Linechart = () => {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedAttribute, setSelectedAttribute] = useState('');

  const attributes = ['Egg', 'Cereals and products', 'Meat and fish', 'Milk and products', 'Oils and fats', 'Fruits', 'Vegetables', 'Pulses and products', 'Sugar and Confectionery', 'Spices', 'Non-alcoholic beverages', 'Prepared meals, snacks, sweets etc.', 'Food and beverages','Pan, tobacco and intoxicants', 'Clothing', 'Footwear', 'Clothing and footwear', 'Housing', 'Fuel and light', 'Household goods and services', 'Health', 'Transport and communication', 'Recreation and amusement', 'Education', 'Personal care and effects', 'Miscellaneous', 'General index'];

  useEffect(() => {
    d3.csv('cpi (1).csv').then((csvData) => {
      setData(csvData);
      const uniqueYears = new Set(csvData.map(item => item.Year)); 
      const sortedYears = Array.from(uniqueYears).sort(); 
      setYears(sortedYears); 
      if (sortedYears.length > 0) {
        setSelectedYear(sortedYears[0]); 
        setSelectedAttribute('Vegetables'); 
      }
    });
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleAttributeChange = (event) => {
    setSelectedAttribute(event.target.value);
  };

  // Filter data based on selected year
  const filteredData = data.filter(item => item.Year === selectedYear);

  return (
    <div className='all'>
      <Navbar/>
      <h1>Data Visualization</h1>
      <div className='select'>
        <label htmlFor="year-select">Choose a Year:</label>
        <select className='opt' id="year-select" value={selectedYear} onChange={handleYearChange}>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <label htmlFor="attribute-select">Choose an Attribute:</label>
        <select className='opt' id="attribute-select" value={selectedAttribute} onChange={handleAttributeChange}>
          {attributes.map(attribute => (
            <option key={attribute} value={attribute}>{attribute}</option>
          ))}
        </select>
      </div>
      
      <ResponsiveContainer width="100%" height="100%"></ResponsiveContainer>
      <div className='barall'>
      <LineChart
          width={1000}
          height={600}
          data={filteredData}
          margin={{ top: 50, right: 40, left: 20, bottom: 150 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke='white' />
          <XAxis dataKey="Month" stroke='white' />
          <YAxis dataKey={selectedAttribute} domain={[50, 250]} tickCount={9} stroke='white'>
          <Label 
              value="CPI Values" 
              offset={10} 
              position="insideLeft" 
              angle={-90} 
              style={{ textAnchor: 'middle', fill: 'white' }}/>
          </YAxis>


          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={selectedAttribute} stroke="rgb(5, 23, 46)" dot={{ strokeWidth: 1, r: 4 }} activeDot={{ r: 5 }} />
        </LineChart>
        </div>
    </div>
  );
};

export default Linechart;