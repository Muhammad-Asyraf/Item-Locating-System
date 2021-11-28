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
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import TodayIcon from '@mui/icons-material/Today';
import CategoryIcon from '@mui/icons-material/Category';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';

import EnhancedTableHead from '../Table/EnhancedTableHead';
import EnhancedTableToolbar from '../Table/EnhancedTableToolbar';
import ProductTableRow from './ProductTableRow';

import { selectSubcategory } from '../../redux/features/categorySlice';
import { getComparator, stableSort } from '../../utils/general';

const getProductHeadCells = () => [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Product',
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
    disablePadding: false,
    label: 'Categories',
    icon: <CategoryIcon fontSize="medium" />,
  },
  {
    id: 'retail_price',
    align: 'center',
    disablePadding: false,
    label: 'Retail Price',
    icon: <AttachMoneyRoundedIcon fontSize="medium" />,
  },
  {
    id: 'is_active',
    align: 'center',
    disablePadding: true,
    label: 'Active',
    icon: <CheckCircleIcon fontSize="medium" />,
  },
  {
    id: 'stock_status',
    align: 'center',
    disablePadding: false,
    label: 'Stock',
    icon: <LocalGroceryStoreRoundedIcon fontSize="small" />,
  },
  {
    id: 'updated_at',
    align: 'center',
    disablePadding: true,
    label: 'Updated',
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

const ProductListTable = (props) => {
  const classes = useStyles();
  const productHeadCells = getProductHeadCells();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryFilterType, setCategoryFilterType] = useState('any');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState([]);
  const [selectedActiveStatusFilter, setSelectedActiveStatusFilter] = useState(null);
  const [selectedStockStatusFilter, setSelectedStockStatusFilter] = useState(null);
  const [filterActivated, setFilterActivated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const categoriesOption = useSelector(selectSubcategory);

  const {
    initProduct,
    products,
    productLoading,
    setProducts,
    handleDelete,
    onMultipleDelete,
    onMultipleActiveStatusUpdate,
    onMultipleStockStatusUpdate,
    handleToggleStatus,
    handleStockStatus,
    handleEdit,
  } = props;

  /* eslint-disable arrow-body-style */
  /* eslint-disable no-unneeded-ternary */
  const handleSearch = (event) => {
    const searchKeywords = event.target.value.toLowerCase();

    const filteredItems = filteredData.filter((product) => {
      const firstCondi = product.name.toLowerCase().includes(searchKeywords);
      const secCondi = product.retail_price.includes(searchKeywords);
      const thirdCondi = product.barcode_number.includes(searchKeywords);

      if (firstCondi || secCondi || thirdCondi) {
        return true;
      }
      return false;
    });

    setProducts(filteredItems);
  };

  const filterProduct = () => {
    const categoryFilterActivated = selectedCategoryFilter.length > 0;
    const activeStatusFilterActivated = selectedActiveStatusFilter !== null;
    const stockStatusFilterActivated = selectedStockStatusFilter !== null;

    if (categoryFilterActivated || activeStatusFilterActivated || stockStatusFilterActivated) {
      setFilterActivated(true);
      const selectedCatList = selectedCategoryFilter.map(({ uuid }) => uuid);

      const filteredItem = initProduct.filter(
        ({ sub_categories: subCat, is_active: isActive, stock_status: stockStatus }) => {
          let validCategory = true;
          let validActiveStatus = true;
          let validStockStatus = true;

          if (categoryFilterActivated) {
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
          }

          if (activeStatusFilterActivated) {
            const selectedActiveStatusFlag =
              selectedActiveStatusFilter === 'Active' ? true : false;
            validActiveStatus = isActive === selectedActiveStatusFlag;
          }

          if (stockStatusFilterActivated) {
            validStockStatus = stockStatus === selectedStockStatusFilter;
          }

          // console.log('name:', name);
          // console.log('category:', validCategory);
          // console.log('active:', validActiveStatus);
          // console.log('stock:', validStockStatus);
          // console.log('\n');

          return validCategory && validActiveStatus && validStockStatus;
        }
      );
      setFilteredData(filteredItem);
      setProducts(filteredItem);
    } else {
      setFilterActivated(false);
      setFilteredData(initProduct);
      setProducts(initProduct);
    }
  };

  useEffect(() => {
    filterProduct();
  }, [
    initProduct,
    selectedCategoryFilter,
    selectedActiveStatusFilter,
    selectedStockStatusFilter,
    categoryFilterType,
  ]);

  const clearFilters = () => {
    setCategoryFilterType('any');
    setSelectedCategoryFilter([]);
    setSelectedActiveStatusFilter(null);
    setSelectedStockStatusFilter(null);
  };

  const handleMultipleDelete = () => {
    onMultipleDelete(selected, setSelected);
  };

  const handleMultipleActiveStatusUpdate = (status, handleClose) => {
    onMultipleActiveStatusUpdate(selected, status, setSelected, handleClose);
  };

  const handleMultipleStockStatusUpdate = (status, handleClose) => {
    onMultipleStockStatusUpdate(selected, status, setSelected, handleClose);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.uuid);
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  return (
    <Paper className={classes.paper}>
      <EnhancedTableToolbar
        type="product"
        numSelected={selected.length}
        handleMultipleDelete={handleMultipleDelete}
        handleMultipleActiveStatusUpdate={handleMultipleActiveStatusUpdate}
        handleMultipleStockStatusUpdate={handleMultipleStockStatusUpdate}
        handleSearch={handleSearch}
        categoriesOption={categoriesOption}
        filteredQuantity={products.length}
        productLoading={productLoading}
        setCategoryFilterType={setCategoryFilterType}
        setSelectedCategoryFilter={setSelectedCategoryFilter}
        setSelectedActiveStatusFilter={setSelectedActiveStatusFilter}
        setSelectedStockStatusFilter={setSelectedStockStatusFilter}
        categoryFilterType={categoryFilterType}
        selectedCategoryFilter={selectedCategoryFilter}
        selectedActiveStatusFilter={selectedActiveStatusFilter}
        selectedStockStatusFilter={selectedStockStatusFilter}
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
            headCells={productHeadCells}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={products.length}
          />
          <TableBody>
            <TableRow style={{ height: '10px' }} />
            {stableSort(products, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, index) => {
                const isProductSelected = isSelected(product.uuid);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <ProductTableRow
                    key={labelId}
                    product={product}
                    isProductSelected={isProductSelected}
                    labelId={labelId}
                    handleClick={handleClick}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleToggleStatus={handleToggleStatus}
                    handleStockStatus={handleStockStatus}
                    productLoading={productLoading}
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
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductListTable;
