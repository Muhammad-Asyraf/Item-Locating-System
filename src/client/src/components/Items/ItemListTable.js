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

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import ItemTableRow from './ItemTableRow';

import { selectSubcategory } from '../../redux/features/categorySlice';
import { getComparator, stableSort } from '../../utils/general';

// import useFirstRender from '../../hooks/useFirstRender';

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
  itemOption: {
    color: 'red !important',
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
  // const isFirstRender = useFirstRender();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // const [selectedCategoryValue, setSelectedCategoryValue] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const categoriesOption = useSelector(selectSubcategory);

  const { itemData, items, setItems, handleDelete, onMultipleDelete, handleEdit } = props;

  const handleMultipleDelete = () => {
    onMultipleDelete(selected, setSelected);
  };

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

  useEffect(() => {
    const selectedCatList = selectedCategory.map(({ uuid }) => uuid);
    let filteredItem;

    if (selectedCategory.length > 0) {
      filteredItem = itemData.filter(({ sub_categories: subCat }) => {
        return subCat.some(({ uuid }) => selectedCatList.includes(uuid));
      });
      setFilteredData(filteredItem);
      setItems(filteredItem);
    } else {
      setFilteredData(itemData);
      setItems(itemData);
    }
  }, [selectedCategory]);

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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

  return (
    <Paper className={classes.paper} elevation={4}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        handleMultipleDelete={handleMultipleDelete}
        handleSearch={handleSearch}
        setSelectedCategory={setSelectedCategory}
        defaultValue={selectedCategory}
        categoriesOption={categoriesOption}
        filteredQuantity={items.length}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={items.length}
          />
          {/* <div style={{ height: '10px', width: '100%', clear: 'both' }} /> */}
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
