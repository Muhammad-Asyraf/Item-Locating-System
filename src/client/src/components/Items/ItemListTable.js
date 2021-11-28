import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { makeStyles } from '@mui/styles';

import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import TodayIcon from '@mui/icons-material/Today';
import CategoryIcon from '@mui/icons-material/Category';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';

import EnhancedTableHead from '../Table/EnhancedTableHead';
import EnhancedTableToolbar from '../Table/EnhancedTableToolbar';
import ItemTableRow from './ItemTableRow';

import { selectSubcategory } from '../../redux/features/categorySlice';
import { getComparator, stableSort } from '../../utils/general';

const getItemHeadCells = () => [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Name',
    icon: <CreditCardRoundedIcon fontSize="medium" />,
  },
  {
    id: 'barcode_number',
    align: 'center',
    disablePadding: true,
    label: 'Barcode',
    icon: <QrCode2RoundedIcon fontSize="medium" />,
  },
  {
    id: 'category',
    align: 'center',
    disablePadding: true,
    label: 'Categories',
    icon: <CategoryIcon fontSize="medium" />,
  },
  {
    id: 'wholesale_price',
    align: 'center',
    disablePadding: true,
    label: 'Supplier Price',
    icon: <AttachMoneyRoundedIcon fontSize="medium" />,
  },
  {
    id: 'updated_at',
    align: 'center',
    disablePadding: false,
    label: 'Updated',
    icon: <CalendarTodayIcon fontSize="small" />,
  },
  {
    id: 'created_at',
    align: 'center',
    disablePadding: false,
    label: 'Created',
    icon: <TodayIcon fontSize="medium" />,
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

const ItemListTable = (props) => {
  const classes = useStyles();
  const itemHeadCells = getItemHeadCells();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryFilterType, setCategoryFilterType] = useState('any');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState([]);
  const [filterActivated, setFilterActivated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const categoriesOption = useSelector(selectSubcategory);

  const { initItem, items, setItems, handleDelete, onMultipleDelete, handleEdit } = props;

  /* eslint-disable arrow-body-style */
  const handleSearch = (event) => {
    const searchKeywords = event.target.value.toLowerCase();

    const filteredItems = filteredData.filter((item) => {
      const firstCondi = item.name.toLowerCase().includes(searchKeywords);
      const secCondi = item.wholesale_price.includes(searchKeywords);
      const thirdCondi = item.barcode_number.includes(searchKeywords);

      if (firstCondi || secCondi || thirdCondi) {
        return true;
      }
      return false;
    });

    setItems(filteredItems);
  };

  const filterItemCategory = () => {
    const categoryFilterActivated = selectedCategoryFilter.length > 0;
    if (categoryFilterActivated) {
      setFilterActivated(true);

      const selectedCatList = selectedCategoryFilter.map(({ uuid }) => uuid);
      const filteredItem = initItem.filter(({ sub_categories: subCat }) => {
        let validCategory;

        switch (categoryFilterType) {
          case 'any':
            validCategory = subCat.some(({ uuid }) => selectedCatList.includes(uuid));
            break;
          case 'all':
            validCategory = subCat.every(({ uuid }) => selectedCatList.includes(uuid));
            break;
          default:
          // no default
        }
        return validCategory;
      });

      setFilteredData(filteredItem);
      setItems(filteredItem);
    } else {
      setFilterActivated(false);
      setFilteredData(initItem);
      setItems(initItem);
    }
  };

  useEffect(() => {
    filterItemCategory();
  }, [selectedCategoryFilter, categoryFilterType]);

  const handleMultipleDelete = () => {
    onMultipleDelete(selected, setSelected);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = items.map((n) => n.uuid);
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

  return (
    <Paper className={classes.paper} elevation={4}>
      <EnhancedTableToolbar
        type="item"
        numSelected={selected.length}
        handleMultipleDelete={handleMultipleDelete}
        handleSearch={handleSearch}
        setCategoryFilterType={setCategoryFilterType}
        categoryFilterType={categoryFilterType}
        setSelectedCategoryFilter={setSelectedCategoryFilter}
        selectedCategoryFilter={selectedCategoryFilter}
        categoriesOption={categoriesOption}
        filterActivated={filterActivated}
        filteredQuantity={items.length}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            headCells={itemHeadCells}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={items.length}
          />
          <TableBody>
            <TableRow style={{ height: '10px' }} />
            {stableSort(items, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => {
                const isItemSelected = isSelected(item.uuid);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <ItemTableRow
                    key={labelId}
                    item={item}
                    isItemSelected={isItemSelected}
                    labelId={labelId}
                    handleClick={handleClick}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
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
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ItemListTable;
