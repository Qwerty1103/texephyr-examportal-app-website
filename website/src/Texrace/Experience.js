import { Physics, Debug } from "@react-three/rapier";
import Effects from "./Effects.js";
import { Level, BlockAxe, BlockLimbo, BlockSpinner } from "./Level.js";
import Lights from "./Lights.js";
import Player from "./Player.js";
import useGame from "../Texrace/stores/useGame.js";
import { useLocation } from "react-router";

import { USERAPIURL, FRONTENDURL } from "../Components/Constants.js";
import axios from "axios";
import React, { useEffect, useState } from "react";


function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Experience() {
  const [userid, setuserid] = useState("");
    let query = useQuery();
    var list = query.get("propsNames");
    var level = parseInt(query.get("level"));
    list = list.split(",");
    const dictDefault = {
      "BlockAxe": BlockAxe,
      "BlockLimbo": BlockLimbo,
      "BlockSpinner": BlockSpinner,
    };
  const [prop, setProps] = useState([dictDefault[list[0]]]);
  useEffect(() => {
    for(var i=1;i<list.length;i++){
        setProps([...prop,dictDefault[list[i]]]);
    }
 

    if (localStorage.getItem("userToken")) {
      
      axios.get("http://localhost:5000/api/webuser/getWebUserId", {
          headers: { "Authorization": `${localStorage.getItem("userToken")}` }
      }).then((res) => {
          setuserid(res.data.id);
         
      }).catch((err) => {
          console.log(err);
      })
  }
  }, []);
  const blocksSeed = useGame((state) => state.blocksSeed);
  return (
    <>
      <color args={["#252731"]} attach="background" />
      <Physics>
        {/* <Debug/> */}
        <Lights />
        <Level
          count={level}
          types={prop}
          seed={blocksSeed}
        />
        <Player limit={level}/>
      </Physics>

      <Effects />
    </>
  );
}
