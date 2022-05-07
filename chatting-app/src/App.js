// components
import LeftSide from "./components/Leftside";
import RightSide from "./components/RightSide";

import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "./libs/client/gql";

function App() {
  let { data, loading, error } = useQuery(GET_MESSAGES);
  return (
    <div className="reallyContainer">
      <div className="container">
        <LeftSide messages={data?.messages} />
        <RightSide />
      </div>
    </div>
  );
}

export default App;
