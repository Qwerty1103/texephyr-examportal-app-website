
import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomListDropDown from "./CustomListDropdown";
import Table from "./Table";
import Navbar from "../Navbar";
import { USERAPIURL } from "../Constants";

function Scoreboard() {

  const [roundid, setroundid] = React.useState('');

  // const handleChange =(event) =>{
  //   setroundid(event.target.value);
  //   console.log(roundid);
  // } ;

  const handleChange = async(roundid) => {
      const myvar = String(roundid.toLowerCase() + "_scoreboards")
      const result = await axios(`${USERAPIURL}/fetchScoreboard/${myvar}`);
      result.data.scoreboard.forEach((node, index) => {node.newtime = new Date(node.time * 1000).toISOString().slice(11, 19); node.rank = index + 1});
      setData(result.data.scoreboard);
    // setroundid(roundid);
  };
  // this.handleChange = this.handleChange.bind(this)
  const columns = useMemo(
    () => [
      {

        Header: "Scoreboard",
        columns: [
          {
            Header: "Rank",
            accessor: "rank"
          },
          {
            Header: "User ID",
            accessor: "user_id",
          },
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Marks",
            accessor: "marks",
          },
          {
            Header: "Time Taken for Completion",
            accessor: "newtime"
          },
          
        ],
      },
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {

      // const result = await axios(`http://localhost:5000/api/webuser/fetchScoreboard/codestorm_round1_scoreboards`);
      // //console.log(result.data);

      // console.log(result.data.scoreboard);
      // result.data.scoreboard.forEach((node) => node.newtime = new Date(node.time * 1000).toISOString().slice(11, 19));
      // setData(result.data.scoreboard);
      // console.log("data");
      // console.log(data);

    })();
  }, []);


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Submit");

  //   (async () => {
  //     const myvar = String(roundid.toLowerCase() + "_scoreboards")
  //     const result = await axios(`${USERAPIURL}/fetchScoreboard/${myvar}`);
  //     result.data.scoreboard.forEach((node) => node.newtime = new Date(node.time * 1000).toISOString().slice(11, 19));
  //     console.log(result.data.scoreboard);
  //     setData(result.data.scoreboard);
  //   })();

  // }


  return (
    <div className="scoreboardPage">
      <Navbar />
        <br></br>
        <label className="scoreboardDropdown">
          <CustomListDropDown handleChange={handleChange} />
        </label>
        <br></br>
        <Table columns={columns} data={data} />
        <br></br> 
    </div>
  );
}
export default Scoreboard;
