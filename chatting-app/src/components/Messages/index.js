import styles from "./Messages.module.css";

export const Messages = ({ username, messages }) => {
  return (
    <>
      {messages.map((message) => {
        return (
          <div key={message.id}>
            {message.user.name === username ? (
              <div className={styles.messagesFromUser}>
                <div className={styles.messageFromUser}>
                {/* {message.createdAt} */}
                  <div className={styles.tail} />
                  {message.messagesText}
                </div>
              </div>
            ) : (
              <div className={styles.messagesFromFriend}>
                <div className={styles.messageFromFriend}>
                {/* {message.createdAt} */}
                  <div className={styles.tail} />
                  {message.messagesText}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
