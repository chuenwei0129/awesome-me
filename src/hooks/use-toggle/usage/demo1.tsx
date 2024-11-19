import React, { useState } from "react";
import { Button, Modal } from "antd";

function ModalButton() {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
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

