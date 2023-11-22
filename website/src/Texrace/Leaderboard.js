import React, { useState, useEffect } from "react";
import "./Leaderboard.css"
import { USERAPIURL } from "../Components/Constants";
function Leaderboard({ gameName }) {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch(USERAPIURL + `fetchLeaderboard/${gameName}`);
        const data = await response.json();
      
        setLeaderboardData(data.scoreboard);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(gameName);
   
    fetchLeaderboard();
  }, [gameName]);

  return (
    <div style={{overflow:"hidden"}}>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player, index) => (
            <tr key={player.user_id}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.time}</td>
            </tr>
          ))}
          
          
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
