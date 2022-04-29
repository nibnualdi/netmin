import styles from "./LeftSide.module.css";

// icons
import add from "../../assets/images/icons/add.svg";
import search from "../../assets/images/icons/search.svg";

const LeftSide = () => {
  return (
    <section className={styles.leftSide}>
      <section className={styles.header}>
        <img src={add} alt="add-icons" className={styles.addIcon} />
        <img src={search} alt="search-icons" className={styles.searchIcon} />
      </section>

      <section className={styles.chatsContainer}>
        <div className={styles.chatContainer}>
          <div className={styles.profileInitial}>M</div>
          <div className={styles.messageContainer}>
            <div className={styles.senderName}>Mukhlis</div>
            <div className={styles.message}>Kayaknya gak gitu deh bang...</div>
          </div>
          <div className={styles.time}>13.51</div>
          <div className={styles.line} />
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.profileInitial}>H</div>
          <div className={styles.messageContainer}>
            <div className={styles.senderName}>Handoko</div>
            <div className={styles.message}>Iya ya, mudah-mudahan dapet...</div>
          </div>
          <div className={styles.time}>13.51</div>
          <div className={styles.line} />
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.profileInitial}>K</div>
          <div className={styles.messageContainer}>
            <div className={styles.senderName}>Kocheng Oren</div>
            <div className={styles.message}>gw cakar kalo dia mahhh</div>
          </div>
          <div className={styles.time}>13.51</div>
          <div className={styles.amountUnreadMessages}>3</div>
          <div className={styles.line} />
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.profileInitial}>S</div>
          <div className={styles.messageContainer}>
            <div className={styles.senderName}>Sayang 1</div>
            <div className={styles.message}>Aku udah nunggu dari jam...</div>
          </div>
          <div className={styles.time}>13.51</div>
          <div className={styles.line} />
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.profileInitial}>S</div>
          <div className={styles.messageContainer}>
            <div className={styles.senderName}>Sayang 2</div>
            <div className={styles.message}>Kamu dimana???</div>
          </div>
          <div className={styles.time}>13.51</div>
          <div className={styles.amountUnreadMessages}>45</div>
          <div className={styles.line} />
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.profileInitial}>S</div>
          <div className={styles.messageContainer}>
            <div className={styles.senderName}>Sayang 3</div>
            <div className={styles.message}>y</div>
          </div>
          <div className={styles.time}>13.51</div>
          <div className={styles.line} />
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.profileInitial}>K</div>
          <div className={styles.messageContainer}>
            <div className={styles.senderName}>Kang Service</div>
            <div className={styles.message}>Pak, ini SSDnya rusak, mau...</div>
          </div>
          <div className={styles.time}>13.51</div>
          <div className={styles.line} />
        </div>

        <div className={`${styles.chatContainer} ${styles.selected}`}>
          <div className={styles.profileInitial}>E</div>
          <div className={styles.messageContainer}>
            <div className={styles.senderName}>Elon Musk</div>
            <div className={styles.message}>Nu, mau saham twitter gk?</div>
          </div>
          <div className={styles.time}>13.51</div>
          <div className={styles.line} />
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.profileInitial}>J</div>
          <div className={styles.messageContainer}>
            <div className={styles.senderName}>Jeff Bezos</div>
            <div className={styles.message}>Eh, lu ditawarin saham twitter...</div>
          </div>
          <div className={styles.time}>13.51</div>
          <div className={styles.line} />
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.profileInitial}>M</div>
          <div className={styles.messageContainer}>
            <div className={styles.senderName}>Mamang</div>
            <div className={styles.message}>Kayaknya gak gitu deh bang...</div>
          </div>
          <div className={styles.time}>13.51</div>
          <div className={styles.line} />
        </div>
      </section>
    </section>
  );
};

export default LeftSide;
