import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const InfoModal = ({ isModalOpen, setIsModalOpen, item }) => {

    console.log(item);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal className='custom-modal' title="Basic Modal" open={isModalOpen} onOk={handleOk}>
        <p>{item.name}</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default InfoModal;