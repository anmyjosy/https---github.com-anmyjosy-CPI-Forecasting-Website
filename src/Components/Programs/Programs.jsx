import React from 'react'
import './Programs.css'
import program_1 from '../../assets/img1.png'
import program_2 from '../../assets/img2.png'
import program_3 from '../../assets/img3.png'

const Programs = () => {
  return (
    <div className='programs'>
      <div className="program">
        <img src={program_1} alt="" />
        <h1>Data Visualization</h1>
        <button><a href="time">GO &gt;</a></button>
        <p>Time series analysis involves examining sequences of data points collected at consistent intervals to identify trends, patterns, and changes over time.</p>
      </div>
      <div className="program">
        <img src={program_2} alt="" />
        <h1>CPI Forecast</h1>
        <button><a href="login">GO &gt;</a></button>
        <p className='para2'>Forecasting the CPI that measures the average change in price over time of a market basket of consumer goods and services</p>
      </div>
      <div className="program">
        <img src={program_3} alt="" />
        <h1>Top Commodity</h1>
        <button><a href="top">GO &gt;</a></button>
        <p className='para3'>Displaying the top commodity involves showcasing the specific good or service predicted to most significantly influence the Consumer Price Index trends .</p>
      </div>
    </div>
  )
}

export default Programs
