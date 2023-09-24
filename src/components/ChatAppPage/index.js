// components
import LeftSide from "../Leftside";
import RightSide from "../RightSide";

import { useState } from "react";


import { useLazyQuery, useSubscription } from "@apollo/client";
import { GET_MESSAGES, GET_USER_AND_FRIEND_BY_NAME } from "../../libs/client/gql";

import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function ChatAppPage() {
  let param = useParams();
  let [userName] = useState(param.userName.substr(1, param.userName.length));
  let { data, loading, error } = useSubscription(GET_MESSAGES, { variables: { user: userName } });
  let [getName, setGetName] = useState("");
  const [getDataUserAndFriend, { data: dataUserAndFriend, loading: loadingDataUserAndFriend }] =
    useLazyQuery(GET_USER_AND_FRIEND_BY_NAME);

  let sortedActivities = data?.messages
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  let messagesReversed = data?.messages
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <Helmet>
        <title>{`netmin | ${userName}`}</title>
      </Helmet>
      <div className="reallyContainer">
        <div className="container">
          <LeftSide
            username={userName}
            messages={messagesReversed}
            setGetName={setGetName}
            getDataUserAndFriend={getDataUserAndFriend}
          />
          <RightSide
            username={userName}
            data={sortedActivities}
            getName={getName}
            setGetName={setGetName}
            dataUserAndFriend={dataUserAndFriend}
          />
        </div>
      </div>
    </>
  );
}

export default ChatAppPage;
