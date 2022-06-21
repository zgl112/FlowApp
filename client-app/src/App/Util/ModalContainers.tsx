import React, { useContext } from "react";
import { Modal } from "semantic-ui-react";
import { RootStoreContext } from "../Stores/rootstore";
import { observer } from "mobx-react-lite";

const ModalContainers = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    modal: { open, body },
    closeModal
  } = rootStore.modalStore;
  return (
    <Modal open={open} onClose={closeModal} size="mini" dimmer={"blurring"} closeOnEscape={true} >
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  );
};
export default observer(ModalContainers);
