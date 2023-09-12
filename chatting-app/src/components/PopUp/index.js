import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Input,
  Tooltip,
  Image,
} from "@chakra-ui/react";

import styles from "./PopUp.module.css";

import close from "../../assets/images/icons/close.svg";

function PopUp({ icon, placeHolder, name, onChange, BodyComponent }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Tooltip label={placeHolder} fontSize="md">
        <img src={icon} alt={name} className={styles[name]} ref={btnRef} onClick={onOpen} />
      </Tooltip>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent className={styles.drawerContent}>
          <DrawerHeader className={styles.drawerHeader}>
            <Input
              placeholder={placeHolder}
              className={styles.input}
              onChange={(e) => onChange(e)}
            />
            <Image src={close} onClick={onClose} />
          </DrawerHeader>

          <DrawerBody className={styles.drawerBody}>{BodyComponent}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default PopUp;
