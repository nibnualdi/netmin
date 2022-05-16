import styles from "./InputMessage.module.css";

import send from "../../assets/images/icons/send.svg";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_USER_AND_FRIEND_BY_NAME, INPUT_MESSAGE } from "../../libs/client/gql";
import { useEffect, useState } from "react";

export const InputMessage = ({ data, getName, username, dataUserAndFriend }) => {
  const [addMessage, { data: dataInputToDatabase, loading: loadingInput }] =
    useMutation(INPUT_MESSAGE);
  // const [getDataUserAndFriend, { data: dataUserAndFriend, loading: loadingDataUserAndFriend }] =
  //   useLazyQuery(GET_USER_AND_FRIEND_BY_NAME);
  let [dataInput, setDataInput] = useState({
    messagesRead: false,
    messagesText: "",
    userId: "",
    friendId: "",
    createdAt: "",
  });

  // useEffect(() => {
  //   getDataUserAndFriend({ variables: { username, friendname: getName } });
  // }, [dataUserAndFriend]);
  
  // useEffect(() => {
  //   console.log(dataInput)  
  // }, [dataInput]);

  // console.log(dataUserAndFriend?.users[0].id);
  // console.log(dataUserAndFriend?.friends[0].id);
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
  console.log(
    `${lengthIsOne(date.month.toString())} ${lengthIsOne(date.date.toString())} ${date.year} ${date.hours}:${
      date.minutes
    }:${date.seconds}:${date.milliSeconds}`
  );

  // let [isTyping, setIsTyping] = useState(false);
  // let timeoute = null

  // const handleIsTyping = () => {
  //   timeoute = setTimeout(()=>{console.log("hai")}, 1000)
  //   return timeoute
  // }


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
      createdAt: `${lengthIsOne(date.month.toString())} ${lengthIsOne(date.date.toString())} ${date.year} ${date.hours}:${
        date.minutes
      }:${date.seconds}:${date.milliSeconds}`,
    });

    // data.forEach((message) => {
    //   if (message.friend.name === getName) {
    //     setDataInput({
    //       ...dataInput,
    //       userId: message.userId,
    //       friendId: message.friendId,
    //       messagesText: e.target.value,
    //       createdAt: `${date.date} ${date.month} ${date.year} ${date.hours}:${date.minutes}:${date.seconds}:${date.milliSeconds}`,
    //     });
    //   }
    // });

    // if(timeoute) {
    //   clearTimeout(timeoute)
    // }
    // handleIsTyping()
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
