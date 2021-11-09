import React from 'react';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';

import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import TodayIcon from '@mui/icons-material/Today';

const headCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Name',
    icon: <CreditCardRoundedIcon fontSize="medium" />,
  },
  {
    id: 'wholesale_price',
    align: 'center',
    disablePadding: false,
    label: 'Wholesale Price',
    icon: <AttachMoneyRoundedIcon fontSize="medium" />,
  },
  {
    id: 'updated_at',
    align: 'center',
    disablePadding: false,
    label: 'Updated at',
    icon: <CalendarTodayIcon fontSize="small" />,
  },
  {
    id: 'created_at',
    align: 'center',
    disablePadding: false,
    label: 'Added at',
    icon: <TodayIcon fontSize="medium" />,
  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
  },
];

const EnhancedTableHead = (props) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const curvy = {
    borderBottom: 'none',
    borderRadius: '0px 10px 10px 0px',
    backgroundColor: 'rgb(244, 246, 248)',
    boxShadow: 'rgb(255, 255, 255) -23px 0px 0px inset',
    color: 'rgba(0, 0, 0, 0.54)',
    paddingLeft: '0px !important',
  };

  const nonCurvy = {
    borderBottom: 'none',
    backgroundColor: 'rgb(244, 246, 248)',
    color: 'rgba(0, 0, 0, 0.54)',
    paddingLeft: '0px !important',
    paddingRight: '20px !important',
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          style={{
            borderBottom: 'none',
            borderRadius: '10px 0px 0px 10px',
            backgroundColor: 'rgb(244, 246, 248)',
            boxShadow: 'rgb(255, 255, 255) 23px 0px 0px inset',
            paddingTop: '16px !important',
            paddingBottom: '16px !important',
          }}
          align="right"
          padding="normal"
        />
        <TableCell style={nonCurvy} key="checkbox" align="left" padding="normal">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            style={headCell.id === 'action' ? curvy : nonCurvy}
            sx={{
              fontSize: '0.95rem !important',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== 'action' ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.icon} &nbsp;&nbsp;
                {headCell.label}
              </TableSortLabel>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
