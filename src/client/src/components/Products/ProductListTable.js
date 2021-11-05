import React from 'react';
import { Link } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import { makeStyles } from '@mui/styles';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import RowOptions from './RowOptions';

import { getComparator, stableSort } from '../../utils/general';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginTop: 40,
    marginBottom: theme.spacing(2),
    boxShadow:
      'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px',
    borderRadius: '16px',
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  itemOption: {
    color: 'red !important',
  },
  addButton: {
    height: '50px',
    width: 200,
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    marginLeft: '50% !important',
    paddingRight: 20,
    borderRadius: '8px',
    boxShadow: 'rgb(30 136 229 / 24%) 0px 8px 16px 0px',
    textTransform: 'none',
  },
}));

const ProductListTable = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { products, handleDelete, onMultipleDelete, handleToggleStatus } = props;

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

  const displayDate = (date) => {
    const createdDate = new Date(date);
    return createdDate.toDateString();
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  return (
    <Paper className={classes.paper}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        handleMultipleDelete={handleMultipleDelete}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={products.length}
          />
          <TableBody>
            {stableSort(products, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, index) => {
                const isItemSelected = isSelected(product.uuid);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={product.uuid}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, product.uuid)}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell align="right">
                      <Switch
                        checked={product.is_active}
                        color="primary"
                        onChange={() => {
                          handleToggleStatus(product.uuid, product.is_active);
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">{product.retail_price}</TableCell>
                    <TableCell align="right">{product.selling_price}</TableCell>
                    <TableCell align="right">{displayDate(product.created_at)}</TableCell>
                    <TableCell align="right">
                      <RowOptions
                        product={product}
                        Link={Link}
                        handleDelete={handleDelete}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
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
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductListTable;
