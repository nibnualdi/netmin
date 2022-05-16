import styles from "./LeftSide.module.css";

// icons
import add from "../../assets/images/icons/add.svg";
import search from "../../assets/images/icons/search.svg";

// components
import Chat from "../Chat";
import PopUp from "../PopUp";
import SearchPopUpBody from "../SearchPopUpBody";

import { useEffect, useState } from "react";
import { useSubscription } from "@apollo/client";
import { GET_USERS } from "../../libs/client/gql";
import AddPopUpBody from "../AddPopUpBody";

const LeftSide = ({ messages, setGetName, username, getDataUserAndFriend }) => {
  let [usersFound, setUsersFound] = useState([]);
  let { data: users, loading: loadingUsers, error: errorUsers } = useSubscription(GET_USERS);

  // variable friends is for keep the friends name from the data given (props messages)
  let friends = [];
  let alreadyShown = [];
  let [messagesFound, setMessagesFound] = useState([]);
  let [inputSearch, setInputSearch] = useState("");

  // this is for add friend name to variable friends from the data given (props messages)
  // if there are match friend name then return the first found friend name and return null for the rest of it
  messages?.forEach((message) => {
    if (!friends.includes(message.friend.name)) {
      return (friends = [...friends, message.friend.name]);
    }
    if (username !== message.user.name && !friends.includes(message.user.name)) {
      return (friends = [...friends, message.user.name]);
    } else {
      return (friends = [...friends, null]);
    }
  });

  // this is for limit the message to be max 5 words in each messages
  // it needs each message that want to show
  const getTheFirstFiveWords = (message) => {
    let theFirstFiveWords = "";
    for (let i = 0; i < 5; i++) {
      theFirstFiveWords += `${message.messagesText.split(" ")[i]} `;
    }
    return theFirstFiveWords;
  };

  const handleSearch = (e) => {
    setInputSearch(e.target.value.toLowerCase());
    setMessagesFound([]);
    messages.forEach((message) => {
      if (message.messagesText.toLowerCase().includes(e.target.value.toLowerCase())) {
        setMessagesFound((oldArray) => [...oldArray, message]);
      }
    });
  };

  const handleAddUsers = (e) => {
    setUsersFound([]);
    users?.users.forEach((user) => {
      if (user.name.toLowerCase() === e.target.value.toLowerCase()) {
        console.log(usersFound)
        return setUsersFound([user]);
      }
      if (user.email.toLowerCase() === e.target.value.toLowerCase()) {
        console.log(usersFound)
        return setUsersFound([user]);
      }
    });
  };

  useEffect(()=>{
    console.log(usersFound)
  }, [usersFound])

  return (
    <section className={styles.leftSide}>
      <section className={styles.header}>
        <PopUp
          icon={add}
          placeHolder="Message to..."
          name="addIcon"
          users={users?.users}
          inputSearch={inputSearch}
          onChange={handleAddUsers}
          BodyComponent={
            <AddPopUpBody
              username={username}
              data={usersFound}
              setGetName={setGetName}
              getDataUserAndFriend={getDataUserAndFriend}
            />
          }
        />

        <PopUp
          icon={search}
          placeHolder="Search..."
          name="searchIcon"
          onChange={handleSearch}
          BodyComponent={
            <SearchPopUpBody
              username={username}
              data={messagesFound}
              inputSearch={inputSearch}
              setGetName={setGetName}
            />
          }
        />
      </section>
      <section className={styles.chatsContainer}>
        {messages?.length > 0 &&
          messages?.map((message, index) => {
            if (
              friends[index] !== null &&
              message.friend.name === username &&
              !alreadyShown.includes(friends[index])
            ) {
              alreadyShown = [...alreadyShown, message.user.name];
              return (
                <div key={message.id}>
                  <Chat
                    name={message.user.name}
                    message={message}
                    getTheFirstFiveWords={getTheFirstFiveWords}
                    setGetName={setGetName}
                    username={username}
                    getDataUserAndFriend={getDataUserAndFriend}
                  />
                </div>
              );
            }
            if (
              friends[index] !== null &&
              friends[index] !== username &&
              !alreadyShown.includes(friends[index])
            ) {
              alreadyShown = [...alreadyShown, message.user.name];
              return (
                <div key={message.id}>
                  <Chat
                    name={message.friend.name}
                    message={message}
                    getTheFirstFiveWords={getTheFirstFiveWords}
                    setGetName={setGetName}
                    username={username}
                    getDataUserAndFriend={getDataUserAndFriend}
                  />
                </div>
              );
            }
          })}
      </section>
    </section>
  );
};

export default LeftSide;
