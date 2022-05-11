import styles from "./InputMessage.module.css";

import send from "../../assets/images/icons/send.svg";
import { useMutation } from "@apollo/client";
import { INPUT_MESSAGE } from "../../libs/client/gql";
import { useEffect, useState } from "react";

export const InputMessage = ({ data, getName }) => {
  const [addMessage] = useMutation(INPUT_MESSAGE);
  let [dataInput, setDataInput] = useState({
    messagesRead: false,
    messagesText: "",
    userId: 0,
    friendId: 0,
    createdAt: "",
  });

  const handleInputMessage = (e) => {
    let d = new Date();
    let date = {
      year: d.getFullYear(),
      month: d.getMonth(),
      date: d.getDate(),
      hours: d.getHours(),
      minutes: d.getMinutes(),
      seconds: d.getSeconds(),
      milliSeconds: d.getMilliseconds(),
    };
    data.forEach((message) => {
      if (message.friend.name === getName) {
        setDataInput({
          ...dataInput,
          userId: message.userId,
          friendId: message.friendId,
          messagesText: e.target.value,
          createdAt: `${date.date} ${date.month} ${date.year} ${date.hours}:${date.minutes}:${date.seconds}:${date.milliSeconds}`,
        });
      }
    });
  };

  useEffect(()=>{
    console.log(dataInput)
  }, [dataInput])

  const handleSubmit = (e) => {
    e.preventDefault()
    addMessage({
      variables: {
        messagesRead: dataInput.messagesRead,
        messagesText: dataInput.messagesText,
        userId: dataInput.userId,
        friendId: dataInput.friendId,
        createdAt: dataInput.createdAt,
      },
    });
    setDataInput({
      messagesRead: false,
      messagesText: "",
      userId: 0,
      friendId: 0,
      createdAt: "",
    })
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Message"
        className={styles.inputMessage}
        value={dataInput.messagesText}
        onChange={(e) => {
          handleInputMessage(e);
        }}
      />
      <button type="submit" className={styles.submit}>
        <img src={send} alt="" />
      </button>
    </form>
  );
};
