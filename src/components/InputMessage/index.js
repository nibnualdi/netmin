import styles from "./InputMessage.module.css";
import send from "../../assets/images/icons/send.svg";

import { useMutation } from "@apollo/client";
import { useState } from "react";
import { INPUT_MESSAGE } from "../../libs/client/gql";

export const InputMessage = ({ dataUserAndFriend }) => {
  const [addMessage] = useMutation(INPUT_MESSAGE);
  let [dataInput, setDataInput] = useState({
    messagesRead: false,
    messagesText: "",
    userId: "",
    friendId: "",
    createdAt: "",
  });

  const lengthIsOne = (str) => {
    if (str.length === 1) {
      return "0" + str;
    }
    if (str.length === 2) {
      return str;
    }
  };

  let d = new Date();
  let date = {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    date: d.getDate(),
    hours: d.getHours(),
    minutes: d.getMinutes(),
    seconds: d.getSeconds(),
    milliSeconds: d.getMilliseconds(),
  };

  const handleInputMessage = (e) => {
    let d = new Date();
    let date = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      date: d.getDate(),
      hours: d.getHours(),
      minutes: d.getMinutes(),
      seconds: d.getSeconds(),
      milliSeconds: d.getMilliseconds(),
    };
    setDataInput({
      ...dataInput,
      userId: `${dataUserAndFriend?.users[0].id}`,
      friendId: `${dataUserAndFriend?.friends[0].id}`,
      messagesText: e.target.value,
      createdAt: `${lengthIsOne(date.month.toString())} ${lengthIsOne(date.date.toString())} ${
        date.year
      } ${date.hours}:${date.minutes}:${date.seconds}:${date.milliSeconds}`,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataInput.messagesText) {
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
      });
    } else {
      console.log("Jangan samain sama hati lu, itu inputan harus ada isinya bang!!!");
    }
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
