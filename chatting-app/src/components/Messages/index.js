import styles from "./Messages.module.css";

export const Messages = ({ username, messages }) => {
  if (document.getElementById(window.location.href.split("#")[1])) {
    document.getElementById(window.location.href.split("#")[1])?.classList.add(styles["selected"]);
    setTimeout(() => {
      document
        .getElementById(window.location.href.split("#")[1])
        .classList.remove(styles["selected"]);
    }, 3000);
  }

  return (
    <>
      {messages.map((message) => {
        return (
          <div key={message.id} id={message.id} className={styles.container}>
            {message.user.name === username ? (
              <div className={styles.messagesFromUser}>
                <div className={styles.messageFromUser}>
                  <div className={styles.tail} />
                  {message.messagesText}
                </div>
              </div>
            ) : (
              <div className={styles.messagesFromFriend} id={message.id}>
                <div className={styles.messageFromFriend}>
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
