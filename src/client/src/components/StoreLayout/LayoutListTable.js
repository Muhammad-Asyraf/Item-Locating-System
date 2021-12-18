import React, { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { makeStyles } from '@mui/styles';

import TodayIcon from '@mui/icons-material/Today';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LabelRoundedIcon from '@mui/icons-material/LabelRounded';

import EnhancedTableHead from '../Table/EnhancedTableHead';
import EnhancedTableToolbar from '../Table/EnhancedTableToolbar';
import LayoutTableRow from './LayoutTableRow';

import { getComparator, stableSort } from '../../utils/general';

const getLayoutHeadCells = () => [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Layout',
    icon: <DashboardRoundedIcon fontSize="medium" />,
  },
  {
    id: 'label',
    align: 'center',
    disablePadding: false,
    label: 'Label',
    icon: <LabelRoundedIcon fontSize="medium" />,
  },
  {
    id: 'is_active',
    align: 'center',
    disablePadding: false,
    label: 'Active',
    icon: <CheckCircleIcon fontSize="medium" />,
  },
  {
    id: 'updated_at',
    align: 'center',
    disablePadding: false,
    label: 'Updated',
    icon: <TodayIcon fontSize="medium" />,
  },
  {
    id: 'created_at',
    align: 'center',
    disablePadding: false,
    label: 'Created',
    icon: <CalendarTodayRoundedIcon fontSize="medium" />,
  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginTop: 25,
    marginBottom: theme.spacing(2),
    boxShadow:
      'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px !important',
    borderRadius: '16px !important',
  },
  table: {
    minWidth: 750,
  },
  addButton: {
    height: '40px',
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    marginLeft: '20% !important',
    borderRadius: '8px',
    boxShadow: 'rgb(30 136 229 / 24%) 0px 8px 16px 0px',
    textTransform: 'none',
  },
}));

const LayoutListTable = (props) => {
  const classes = useStyles();
  const layoutHeadCells = getLayoutHeadCells();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedActiveStatusFilter, setSelectedActiveStatusFilter] = useState(null);
  const [filterActivated, setFilterActivated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const {
    initLayout,
    layouts,
    layoutLoading,
    setLayouts,
    handleDelete,
    onMultipleDelete,
    onMultipleActiveStatusUpdate,
    handleToggleStatus,
  } = props;

  /* eslint-disable arrow-body-style */
  /* eslint-disable no-unneeded-ternary */
  const handleSearch = (event) => {
    const searchKeywords = event.target.value.toLowerCase();

    const filteredItems = filteredData.filter((layout) => {
      const firstCondi = layout.name.toLowerCase().includes(searchKeywords);

      if (firstCondi) {
        return true;
      }
      return false;
    });

    setLayouts(filteredItems);
  };

  const filterProduct = () => {
    const activeStatusFilterActivated = selectedActiveStatusFilter !== null;

    if (activeStatusFilterActivated) {
      setFilterActivated(true);

      const filteredItem = initLayout.filter(({ is_active: isActive }) => {
        let validActiveStatus = true;

        if (activeStatusFilterActivated) {
          const selectedActiveStatusFlag =
            selectedActiveStatusFilter === 'Active' ? true : false;
          validActiveStatus = isActive === selectedActiveStatusFlag;
        }

        return validActiveStatus;
      });
      setFilteredData(filteredItem);
      setLayouts(filteredItem);
    } else {
      setFilterActivated(false);
      setFilteredData(initLayout);
      setLayouts(initLayout);
    }
  };

  useEffect(() => {
    filterProduct();
  }, [initLayout, selectedActiveStatusFilter]);

  const clearFilters = () => {
    setSelectedActiveStatusFilter(null);
  };

  const handleMultipleDelete = () => {
    onMultipleDelete(selected, setSelected);
  };

  const handleMultipleActiveStatusUpdate = (status, handleClose) => {
    onMultipleActiveStatusUpdate(selected, status, setSelected, handleClose);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = layouts.map((n) => n.uuid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (uuid) => selected.indexOf(uuid) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, layouts.length - page * rowsPerPage);

  return (
    <Paper className={classes.paper}>
      <EnhancedTableToolbar
        type="layout"
        numSelected={selected.length}
        handleMultipleDelete={handleMultipleDelete}
        handleMultipleActiveStatusUpdate={handleMultipleActiveStatusUpdate}
        handleSearch={handleSearch}
        filteredQuantity={layouts.length}
        layoutLoading={layoutLoading}
        setSelectedActiveStatusFilter={setSelectedActiveStatusFilter}
        selectedActiveStatusFilter={selectedActiveStatusFilter}
        filterActivated={filterActivated}
        clearFilters={clearFilters}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            headCells={layoutHeadCells}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={layouts.length}
          />
          <TableBody>
            <TableRow style={{ height: '10px' }} />
            {stableSort(layouts, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((layout, index) => {
                const isLayoutSelected = isSelected(layout.uuid);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <LayoutTableRow
                    key={labelId}
                    layout={layout}
                    isLayoutSelected={isLayoutSelected}
                    labelId={labelId}
                    handleClick={handleClick}
                    handleDelete={handleDelete}
                    // handleEdit={handleEdit}
                    handleToggleStatus={handleToggleStatus}
                  />
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} style={{ borderBottom: 'none' }} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={layouts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default LayoutListTable;
