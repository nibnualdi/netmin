import styles from "./RightSide.module.css";

// components
import { RightHeader } from "../RightHeader";
import { Messages } from "../Messages";
import { InputMessage } from "../InputMessage";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@chakra-ui/react";

function RightSide({ username, data, getName, setGetName, dataUserAndFriend }) {
  const [mediaQuery] = useMediaQuery("(min-width: 768px)");
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
        <section className={mediaQuery ? styles.rightSide : `${styles.absolute} ${styles.rightSide}`}>
          <RightHeader getName={getName} setGetName={setGetName} />

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
        <>
          {
            mediaQuery && (
              <section className={`${styles.rightSide} ${styles.noMessages}`}>
                <h1>There is no message to show</h1>
              </section>
            )
          }
        </>
      )}
    </>
  );
}

export default RightSide;
