import styles from "./RightSide.module.css";

// components
import { RightHeader } from "../RightHeader";
import { Messages } from "../Messages";
import { InputMessage } from "../InputMessage";

import { useEffect, useState } from "react";

function RightSide({ username, data, getName, dataUserAndFriend }) {
  let dataSingleUser = [];

  data?.forEach((eachData) => {
    if (eachData.friend.name === getName) return (dataSingleUser = [...dataSingleUser, eachData]);
    if (eachData.friend.name === username && eachData.user.name === getName)
      return (dataSingleUser = [...dataSingleUser, eachData]);
  });

  useEffect(() => {
    if (document.getElementById("inputMessageContainer")) {
      return (document.getElementById("inputMessageContainer").scrollTop =
        document.getElementById("inputMessageContainer").scrollHeight);
    }
  }, [getName, data]);

  return (
    <>
      {getName ? (
        <section className={styles.rightSide}>
          <RightHeader getName={getName} />

          <section id="inputMessageContainer" className={styles.messagesContainer}>
            <Messages username={username} messages={dataSingleUser} />
          </section>

          <section className={styles.inputMessageContainer}>
            <InputMessage
              data={data}
              getName={getName}
              username={username}
              dataUserAndFriend={dataUserAndFriend}
            />
          </section>
        </section>
      ) : (
        <section className={`${styles.rightSide} ${styles.noMessages}`}>
          <h1>There is no message to show</h1>
        </section>
      )}
    </>
  );
}

export default RightSide;
