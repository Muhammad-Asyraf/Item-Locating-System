import * as React from 'react';
import Modal from '@mui/material/Modal';

export default function ImageModal(props) {
  const { images, Swiper, SwiperSlide, openModal, handleCloseModal } = props;

  return (
    <Modal open={openModal}>
      <Swiper
        onClick={handleCloseModal}
        pagination={{
          clickable: true,
          type: 'fraction',
        }}
        navigation
        spaceBetween={10}
        loop
        className="mySwiper"
        style={{
          width: '100vw',
          height: '100vh',
          paddingTop: 10,
          paddingBottom: 10,
        }}
        grabCursor
        centeredSlides
        slidesPerView={1}
      >
        {images.map(({ path }) => (
          <SwiperSlide key={path}>
            <img
              src={path}
              alt="Teset"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'scale-down',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Modal>
  );
}
