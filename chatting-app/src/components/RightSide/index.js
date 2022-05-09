import styles from "./RightSide.module.css";

import send from "../../assets/images/icons/send.svg";
import { RightHeader } from "../RightHeader";
import { useEffect } from "react";
import { Messages } from "../Messages";

function RightSide({ username, data, getName }) {
  let dataSingleUser = [];

  data?.forEach((eachData) => {
    if (eachData.friend.name === getName) return (dataSingleUser = [...dataSingleUser, eachData]);
    if (eachData.friend.name === username && eachData.user.name === getName)
      return (dataSingleUser = [...dataSingleUser, eachData]);
  });

  useEffect(() => {
    console.log(dataSingleUser);
  }, [dataSingleUser]);

  return (
    <section className={styles.rightSide}>
      <RightHeader getName={getName} />

      <section className={styles.messagesContainer}>
        <Messages username={username} messages={dataSingleUser} />
      </section>

      <section className={styles.inputMessageContainer}>
        <input type="text" placeholder="Message" className={styles.inputMessage} />
        <button type="submit">
          <img src={send} alt="" />
        </button>
      </section>
    </section>
  );
}

export default RightSide;
