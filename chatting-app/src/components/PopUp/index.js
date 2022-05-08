import React, { useState } from "react";
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
  Tooltip,
} from "@chakra-ui/react";

import styles from "./PopUp.module.css";

function PopUp({ icon, placeHolder, name, onChange, BodyComponent }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Tooltip label={placeHolder} fontSize='md'>
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
          </DrawerHeader>

          <DrawerBody className={styles.drawerBody}>{BodyComponent}</DrawerBody>

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
