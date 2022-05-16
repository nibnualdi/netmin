import styles from "./Chat.module.css";

const Chat = ({ name, message, getTheFirstFiveWords, setGetName, username, getDataUserAndFriend }) => {
  let chats = document.getElementsByName("chatContainer");

  const handleSelectedChat = (e) => {
    const senderName = e.currentTarget.children[1].children[0].getAttribute("title");
    chats.forEach((e) => {
      e.classList.remove(`${styles.selected}`);
    });
    e.currentTarget.classList.toggle(`${styles.selected}`);
    setGetName(senderName);
    getDataUserAndFriend({ variables: { username, friendname: senderName } });
  };

  return (
    <div
      name="chatContainer"
      className={`${styles.chatContainer}`}
      onClick={(e) => {
        handleSelectedChat(e);
      }}
    >
      <div className={styles.profileInitial}>{name[0].toUpperCase()}</div>
      <div className={styles.messageContainer}>
        <div title={name} className={styles.senderName}>
          {name}
        </div>
        <div className={styles.message}>
          {message.messagesText.split(" ").length > 5
            ? message.messagesText.length >= 25
              ? message.messagesText.slice(0, 25) + "..."
              : getTheFirstFiveWords(message) + "..."
            : message.messagesText}
        </div>
      </div>
      <div className={styles.time}>{`${message.createdAt.split(" ")[3].split(":")[0]}.${
        message.createdAt.split(" ")[3].split(":")[1]
      }`}</div>
      <div className={styles.line} />
    </div>
  );
};

export default Chat;
