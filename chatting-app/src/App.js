// components
import LeftSide from "./components/Leftside";
import RightSide from "./components/RightSide";

import { useQuery, useSubscription } from "@apollo/client";
import { GET_MESSAGES } from "./libs/client/gql";
import { useEffect, useState } from "react";

function App() {
  let [userName, setUserName] = useState("new user")
  let { data, loading, error } = useSubscription(GET_MESSAGES, {variables: {user: userName}});
  let [getName, setGetName] = useState("")


  let sortedActivities = data?.messages.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  useEffect(()=>{
    console.log(data)
  }, [data])
  return (
    <div className="reallyContainer">
      <div className="container">
        <LeftSide username={userName} messages={sortedActivities} setGetName={setGetName} />
        <RightSide username={userName} data={sortedActivities} getName={getName} />
      </div>
    </div>
  );
}

export default App;
