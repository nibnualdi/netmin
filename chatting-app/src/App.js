// components
import LeftSide from "./components/Leftside";
import RightSide from "./components/RightSide";

import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "./libs/client/gql";
import { useEffect, useState } from "react";

function App() {
  let [userName, setUserName] = useState("admin")
  let { data, loading, error } = useQuery(GET_MESSAGES, {variables: {user: userName}});
  let [getName, setGetName] = useState("")

  useEffect(()=>{
    console.log(data)
  }, [data])
  return (
    <div className="reallyContainer">
      <div className="container">
        <LeftSide username={userName} messages={data?.messages} setGetName={setGetName} />
        <RightSide username={userName} data={data?.messages} getName={getName} />
      </div>
    </div>
  );
}

export default App;
