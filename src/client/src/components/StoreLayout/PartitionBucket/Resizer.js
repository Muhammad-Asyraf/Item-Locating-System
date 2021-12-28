import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import '../../../assets/css/resizer.css';

const Direction = {
  Top: 'top',
  TopLeft: 'topLeft',
  TopRight: 'topRight',
  Right: 'right',
  Bottom: 'bottom',
  BottomLeft: 'bottomLeft',
  BottomRight: 'bottomRight',
  Left: 'left',
};

const Resizer = ({ onResize }) => {
  const [direction, setDirection] = useState('');
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!direction) return;

      const ratio = window.devicePixelRatio;

      onResize(direction, e.movementX / ratio, e.movementY / ratio);
    };

    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseDown, direction, onResize]);

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (mouseDirection) => () => {
    setDirection(mouseDirection);
    setMouseDown(true);
  };

  return (
    <>
      <Box className="top-left" onMouseDown={handleMouseDown(Direction.TopLeft)} />

      <Box className="top" onMouseDown={handleMouseDown(Direction.Top)} />

      <Box className="top-right" onMouseDown={handleMouseDown(Direction.TopRight)} />

      <Box className="right" onMouseDown={handleMouseDown(Direction.Right)} />

      <Box className="right-bottom" onMouseDown={handleMouseDown(Direction.BottomRight)} />

      <Box className="bottom" onMouseDown={handleMouseDown(Direction.Bottom)} />

      <Box className="bottom-left" onMouseDown={handleMouseDown(Direction.BottomLeft)} />

      <Box className="left" onMouseDown={handleMouseDown(Direction.Left)} />
    </>
  );
};

export default Resizer;
