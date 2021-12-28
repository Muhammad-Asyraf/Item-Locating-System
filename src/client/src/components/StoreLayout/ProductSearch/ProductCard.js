import React from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  input: {
    borderRadius: '12px !important',
    color: 'white !important',
  },
  notchedOutline: {
    border: '1px solid white !important',
    borderRadius: '12px !important',
  },
  removeBtn: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08) !important',
    },
  },
}));

const ProductCard = () => {
  return <div></div>;
};

export default ProductCard;
