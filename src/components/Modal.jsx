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
        description
      </Button>
      <Modal className='custom-modal' title={item.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p><span className='font-bold'>bred_for: </span>{item.bred_for}</p>
        <p><span className='font-bold'>breed_group </span>{item.breed_group}</p>
        <p><span className='font-bold'>description </span>{item.description}</p>
        <p><span className='font-bold'>life_span </span>{item.life_span}</p>
        <p><span className='font-bold'>temperament </span>{item.temperament}</p>
      </Modal>
    </>
  );
};
export default InfoModal;


// bred_for
// : 
// "Guarding"
// breed_group
// : 
// "Mixed"
// description
// : 
// "The Alapaha Blue Blood Bulldog is a well-developed, exaggerated bulldog with a broad head and natural drop ears. The prominent muzzle is covered by loose upper lips. The prominent eyes are set well apart. The Alapaha's coat is relatively short and fairly stiff. Preferred colors are blue merle, brown merle, or red merle all trimmed in white or chocolate and white. Also preferred are the glass eyes (blue) or marble eyes (brown and blue mixed in a single eye). The ears and tail are never trimmed or docked. The body is sturdy and very muscular. The well-muscled hips are narrower than the chest. The straight back is as long as the dog is high at the shoulders. The dewclaws are never removed and the feet are cat-like."
// height
// : 
// {imperial: '18 - 24', metric: '46 - 61'}
// history
// : 
// ""
// id
// : 
// 7
// image
// : 
// {id: '33mJ-V3RX', width: 1828, height: 2065, url: 'https://cdn2.thedogapi.com/images/33mJ-V3RX.jpg'}
// life_span
// : 
// "12 - 13 years"
// name
// : 
// "Alapaha Blue Blood Bulldog"
// reference_image_id
// : 
// "33mJ-V3RX"
// temperament
// : 
// "Loving, Protective, Trainable, Dutiful, Responsible"