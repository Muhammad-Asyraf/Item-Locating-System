import React from 'react';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';

const EnhancedTableHead = (props) => {
  const {
    headCells,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

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
            {!['action'].includes(headCell.id) ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                // hideSortIcon={['is_active', 'stock_status'].includes(headCell.id)}
              >
                {headCell.icon}&nbsp; {headCell.label}
              </TableSortLabel>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

// 'is_active', 'stock_status'
export default EnhancedTableHead;
