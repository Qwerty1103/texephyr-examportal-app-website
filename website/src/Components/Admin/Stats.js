import React, { useEffect, useState } from 'react'
import "./stats.css"
import { USERAPIURL } from '../Constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import StatsCard from './StatsCard';


function Stats() {

    const[options, setOptions] = useState(["Codestorm"])
    const[value, setValue] = useState(options[0])
    const[tableData, setTableData] = useState([]);

    useEffect(() =>{
        axios.get(USERAPIURL + 'getAllEventNames').then((response) =>{
            setOptions(response.data)
        }).then(() => updateTable({value}))
    },[])

    const updateTable = (value) => {
        axios(
            {
              method: "POST",
              url: USERAPIURL + "getRegStats",
              data: { "eventName": value.value }
            }
          ).then((response) =>{
            setTableData(response.data);
            console.log(response.data);
        })
    }

    let team = 0;

    const statCardList = tableData.map((row, number) => (
      <StatsCard key={number} number = {number + 1} grpMem = {row} />
    ));


  return (
    <div>
      <div className='statsContainer'>
      <div className="dropDown">
        <Dropdown options={options} onChange={(value) => updateTable(value)} value={value} placeholder="Select an option" />
      </div>
      <div className="statsCardContainer">
        {statCardList}
      </div>
      </div>
    </div>
  )
}

export default Stats
