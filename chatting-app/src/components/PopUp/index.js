import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";

import styles from "./PopUp.module.css";

function PopUp({ icon, placeHolder, name, onChange, data, inputSearch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <img src={icon} alt={name} className={styles[name]} ref={btnRef} onClick={onOpen} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent className={styles.drawerContent}>
          <DrawerHeader className={styles.drawerHeader}>
            <Input
              placeholder={placeHolder}
              className={styles.input}
              onChange={(e) => onChange(e)}
            />
          </DrawerHeader>

          {/* console.log(message.messagesText.split(" ")) */}
          <DrawerBody className={styles.drawerBody}>
            {data?.map((message, index) => {
              const firstIndexSelectedWord = message.messagesText.toLowerCase().search(inputSearch);
              const firstSelectedWord = message.messagesText.toLowerCase().match(inputSearch);

              return (
                <div key={message.id} className={styles.gakTau}>
                  {message.friend.name === "admin" ? (
                    <h1 className={styles.senderName}>{message.user.name}</h1>
                  ) : (
                    <h1 className={styles.senderName}>{message.friend.name}</h1>
                  )}
                  {firstIndexSelectedWord !== -1 && (
                    <div className={styles.messagesText} style={{ position: "relative" }}>
                      {message.messagesText}
                      <p
                        className={styles.messagesText}
                        style={{ position: "absolute", top: 0, left: 0, display: "inline-block" }}
                      >
                        {message.messagesText.substr(0, firstIndexSelectedWord)}
                        <span style={{ backgroundColor: "#5f5f5f", display: "inline-block" }}>
                          {firstSelectedWord}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default PopUp;
