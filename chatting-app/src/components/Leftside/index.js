import styles from "./LeftSide.module.css";

// icons
import add from "../../assets/images/icons/add.svg";
import search from "../../assets/images/icons/search.svg";

// components
import Chat from "../Chat";
import PopUp from "../PopUp";
import SearchPopUpBody from "../SearchPopUpBody";

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../libs/client/gql";
import AddPopUpBody from "../AddPopUpBody";

const LeftSide = ({ messages, setGetName, username }) => {
  let [usersFound, setUsersFound] = useState([]);
  let { data: users, loading: loadingUsers, error: errorUsers } = useQuery(GET_USERS);

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
      if (user.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return setUsersFound((oldArray) => [...oldArray, user]);
      }
      if (user.email.toLowerCase().includes(e.target.value.toLowerCase())) {
        return setUsersFound((oldArray) => [...oldArray, user]);
      }
    });
  };

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
          BodyComponent={<AddPopUpBody username={username} data={usersFound} />}
        />

        <PopUp
          icon={search}
          placeHolder="Search..."
          name="searchIcon"
          onChange={handleSearch}
          BodyComponent={
            <SearchPopUpBody username={username} data={messagesFound} inputSearch={inputSearch} />
          }
        />
      </section>
      <section className={styles.chatsContainer}>
        {/* if there are messages then show the data, else show loading */}
        {messages?.length > 0 &&
          messages?.map((message, index) => {
            {
              /* if friend name equals user name and if the index of current message (teman admin ke admin) smaller than message admin to friend, then show the message admin to friend and friend name */
            }
            if (message.friend.name === username) {
              let indexOfAdminMessagetoFriend = messages.findIndex(
                (e) => e.friend.name === message.user.name
              );

              if (messages.indexOf(message) < indexOfAdminMessagetoFriend) {
                alreadyShown = [...alreadyShown, message.user.name];
                return (
                  <div key={message.id}>
                    <Chat
                      name={message.user.name}
                      message={message}
                      getTheFirstFiveWords={getTheFirstFiveWords}
                      setGetName={setGetName}
                    />
                  </div>
                );
              }
            }

            {
              /* show the data according to index of variable friends */
            }
            if (friends[index] !== null && !alreadyShown.includes(friends[index])) {
              return (
                <div key={message.id}>
                  <Chat
                    name={message.friend.name}
                    message={message}
                    getTheFirstFiveWords={getTheFirstFiveWords}
                    setGetName={setGetName}
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
