import styles from "./RightSide.module.css";

// import send from "../../assets/images/icons/send.svg";
import { RightHeader } from "../RightHeader";
import { useEffect } from "react";
import { Messages } from "../Messages";
import { InputMessage } from "../InputMessage";

function RightSide({ username, data, getName }) {
  let dataSingleUser = [];

  data?.forEach((eachData) => {
    if (eachData.friend.name === getName) return (dataSingleUser = [...dataSingleUser, eachData]);
    if (eachData.friend.name === username && eachData.user.name === getName)
      return (dataSingleUser = [...dataSingleUser, eachData]);
  });

  // useEffect(() => {
  //   console.log(sortedActivities);
  // }, [sortedActivities]);

  return (
    <section className={styles.rightSide}>
      <RightHeader getName={getName} />

      <section className={styles.messagesContainer}>
        <Messages username={username} messages={dataSingleUser} />
      </section>

      <section className={styles.inputMessageContainer}>
        <InputMessage data={data} getName={getName} />
      </section>
    </section>
  );
}

export default RightSide;
