import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { makeStyles } from '@mui/styles';

import RowOptions from './RowOptions';

const useStyles = makeStyles(() => ({
  tableRow: {
    '&:hover': {
      backgroundColor: 'rgb(244, 246, 248) !important',
    },
  },
  selected: {
    overflow: 'hidden !important',
    borderRadius: '15px !important',
  },
}));

/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
const LayoutTableRow = (props) => {
  const classes = useStyles();
  // const [open, setOpen] = useState(false);

  const {
    layout,
    isLayoutSelected,
    labelId,
    handleClick,
    handleDelete,
    handleEdit,
    handleToggleStatus,
  } = props;

  // const handleOpenModal = () => setOpenModal(true);
  // const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isLayoutSelected}
        tabIndex={-1}
        key={layout.name}
        selected={isLayoutSelected}
        classes={{ selected: classes.selected }}
        className={classes.tableRow}
      >
        <TableCell style={{ borderBottom: 'none', paddingRight: 0 }} align="right" />
        <TableCell
          style={{
            borderBottom: 'none',
          }}
          padding="normal"
          align="left"
        >
          <Checkbox
            checked={isLayoutSelected}
            onClick={(event) => handleClick(event, layout.uuid)}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          id={labelId}
          scope="row"
          align="left"
          sx={{
            fontSize: '0.95rem !important',
            paddingLeft: 0,
          }}
        >
          {layout.name}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          align="center"
          sx={{
            fontSize: '0.95rem !important',
            padding: '10px 20px 10px 20px',
          }}
        >
          <Chip
            color="primary"
            size="small"
            label={layout.label}
            style={{ padding: '8px 15px' }}
          />
          {/* <Chip color="primary" size="small" label={layout.label} /> */}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important' }}
        >
          <Switch
            checked={layout.is_active}
            onChange={() => {
              handleToggleStatus(layout.uuid, layout.is_active);
            }}
          />
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important', letterSpacing: 0.8 }}
        >
          {moment(new Date(layout.updated_at)).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important', letterSpacing: 0.8 }}
        >
          {moment(new Date(layout.created_at)).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          // sx={{ paddingLeft: '0px !important' }}
        >
          <RowOptions
            layout={layout}
            Link={Link}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default LayoutTableRow;
