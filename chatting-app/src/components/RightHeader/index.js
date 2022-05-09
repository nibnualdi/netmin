import styles from "./RightHeader.module.css"

export const RightHeader = ({ getName }) => {
  return (
    <section className={styles.header}>
      <div className={styles.profile}>
        <div className={styles.profileInitial}>{getName[0]?.toUpperCase()}</div>
        <span>
          <div className={styles.name}>{getName}</div>
          {/* <div className={styles.isTyping}>is typing</div> */}
        </span>
      </div>
    </section>
  );
};
