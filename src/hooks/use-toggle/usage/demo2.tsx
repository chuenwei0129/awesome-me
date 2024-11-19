import React from "react";
import { Button, Modal } from "antd";
import { useToggle } from 'naifu'

function ModalButton() {
  const [open, { setLeft, setRight }] = useToggle()

  const showModal = () => {
    setRight()
  };

  const closeModal = () => {
    setLeft()
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          showModal();
        }}
      >
        Click Me
      </Button>
      <Modal
        title="ModalDemo"
        open={open}
        okText="Submit"
        onCancel={() => {
          closeModal();
        }}
        onOk={() => {
          closeModal();
        }}
      >
        <>children</>
      </Modal>
    </>
  );
}

export default ModalButton;

