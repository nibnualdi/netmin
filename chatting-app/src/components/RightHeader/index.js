import styles from "./RightHeader.module.css";
import { useMediaQuery } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

import back from "../../assets/images/icons/back.svg";

export const RightHeader = ({ getName, setGetName }) => {
  const [mediaQuery] = useMediaQuery("(min-width: 768px)");

  return (
    <section className={styles.header}>
      {!mediaQuery && <Image src={back} className={styles.back} onClick={()=>{setGetName("")}} />}
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
