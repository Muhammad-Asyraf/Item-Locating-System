import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';

import RowOptions from './RowOptions';

// import { isSameDay } from '../../utils/general';

const useStyles = makeStyles(() => ({
  tableRow: {
    '&:hover': {
      backgroundColor: 'rgb(244, 246, 248) !important',
      // backgroundColor: 'rgb(244, 246, 248) !important',
    },
  },
  selected: {
    overflow: 'hidden !important',
    borderRadius: '15px !important',
  },
}));

const ItemTableRow = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { item, isItemSelected, labelId, handleClick, handleDelete } = props;

  // const today = new Date();
  // let createdAt = new Date(item.created_at);
  // let updatedAt = new Date(item.updated_at);

  // if (isSameDay(today, createdAt)) {
  //   createdAt = 'Today';
  // } else {
  //   createdAt = moment(createdAt).format('DD/MM/YYYY');
  // }

  // if (isSameDay(today, updatedAt)) {
  //   updatedAt = 'Today';
  // } else {
  //   updatedAt = moment(updatedAt).format('DD/MM/YYYY');
  // }

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={item.name}
        selected={isItemSelected}
        classes={{ selected: classes.selected }}
        className={classes.tableRow}
      >
        <TableCell style={{ borderBottom: 'none', paddingRight: 0 }} align="right">
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              position: 'relative',
              left: 16,
              top: 1,
            }}
          >
            {!open ? (
              <ExpandMore style={{ transform: 'rotate(-90deg)' }} />
            ) : (
              <ExpandLess style={{ transform: 'rotate(180deg)' }} />
            )}
          </IconButton>
        </TableCell>
        <TableCell
          style={{
            borderBottom: 'none',
          }}
          padding="normal"
          align="left"
        >
          <Checkbox
            checked={isItemSelected}
            onClick={(event) => handleClick(event, item.uuid)}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          align="left"
          sx={{
            fontSize: '0.95rem !important',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {item.name}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important' }}
        >
          {item.wholesale_price}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important', letterSpacing: 0.8 }}
        >
          {moment(new Date(item.updated_at)).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important', letterSpacing: 0.8 }}
        >
          {moment(new Date(item.created_at)).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="left"
          sx={{ paddingLeft: '0px !important' }}
        >
          <RowOptions item={item} Link={Link} handleDelete={handleDelete} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none' }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Paper variant="outlined">
                <img
                  src="https://cf.shopee.com.my/file/c3026716ba1d3421c5fa553c9ad3f74c"
                  alt="Teset"
                  style={{
                    width: '30%',
                    height: '30%',
                  }}
                />
              </Paper>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ItemTableRow;
