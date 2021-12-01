import React, { useState } from 'react';
import clsx from 'clsx';

import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';

import { makeStyles } from '@mui/styles';

import ProductFilter from '../Products/ProductFilters';
import CategoryFilter from '../Category/CategoryFilterDialog';
import ActiveStatusDialog from '../Products/ActiveStatusDialog';
import StockStatusDialog from '../Products/StockStatusDialog';

/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '16px 16px 0px 0px',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  selected: {
    color: 'white !important',
    fontSize: '0.875rem !important',
    display: 'inline',
    paddingLeft: 15,
  },
  input: {
    borderRadius: '12px !important',
    color: 'white !important',
  },
  notchedOutline: {
    border: '1px solid white !important',
    borderRadius: '12px !important',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    type,
    numSelected,
    handleMultipleDelete,
    handleMultipleActiveStatusUpdate,
    handleMultipleStockStatusUpdate,
    handleSearch,
    categoriesOption,
    filteredQuantity,
    productLoading,
    setCategoryFilterType,
    setSelectedCategoryFilter,
    setSelectedActiveStatusFilter,
    setSelectedStockStatusFilter,
    categoryFilterType,
    selectedCategoryFilter,
    selectedActiveStatusFilter,
    selectedStockStatusFilter,
    filterActivated,
    clearFilters,
  } = props;

  const [openFilter, setOpenFilter] = useState(false);
  const [openActiveStatusDialog, setOpenActiveStatusDialog] = useState(false);
  const [openStockStatusDialog, setOpenStockStatusDialog] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleClickOpen = () => setOpenFilter(true);
  const handleClose = () => setOpenFilter(false);

  const handleClickOpenActiveStatusDialog = () => setOpenActiveStatusDialog(true);
  const handleCloseActiveStatusDialog = () => setOpenActiveStatusDialog(false);

  const handleClickOpenStockStatusDialog = () => setOpenStockStatusDialog(true);
  const handleCloseStockStatusDialog = () => setOpenStockStatusDialog(false);

  const updateSearchInput = (e) => setSearchValue(e.target.value);

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {type === 'product' ? (
        <ProductFilter
          open={openFilter}
          handleClose={handleClose}
          categoryOptions={categoriesOption}
          setCategoryFilterType={setCategoryFilterType}
          setSelectedCategoryFilter={setSelectedCategoryFilter}
          setSelectedActiveStatusFilter={setSelectedActiveStatusFilter}
          setSelectedStockStatusFilter={setSelectedStockStatusFilter}
          categoryFilterType={categoryFilterType}
          selectedCategoryFilter={selectedCategoryFilter}
          selectedActiveStatusFilter={selectedActiveStatusFilter}
          selectedStockStatusFilter={selectedStockStatusFilter}
          filteredQuantity={filteredQuantity}
          filterActivated={filterActivated}
          clearFilters={clearFilters}
        />
      ) : (
        <CategoryFilter
          open={openFilter}
          handleClose={handleClose}
          categoryOptions={categoriesOption}
          setCategoryFilterType={setCategoryFilterType}
          categoryFilterType={categoryFilterType}
          setSelectedCategoryFilter={setSelectedCategoryFilter}
          selectedCategoryFilter={selectedCategoryFilter}
          filterActivated={filterActivated}
          filteredQuantity={filteredQuantity}
        />
      )}

      <ActiveStatusDialog
        open={openActiveStatusDialog}
        handleClose={handleCloseActiveStatusDialog}
        onUpdate={handleMultipleActiveStatusUpdate}
        productLoading={productLoading}
      />
      <StockStatusDialog
        open={openStockStatusDialog}
        handleClose={handleCloseStockStatusDialog}
        onUpdate={handleMultipleStockStatusUpdate}
        productLoading={productLoading}
      />
      <Grid container sx={{ marginBottom: 2.4, marginTop: 2.5 }}>
        <Grid
          item
          xs={12}
          sm={8}
          container
          justifyContent="flex-start"
          alignItems="center"
          // style={{ border: '1px solid red' }}
        >
          <TextField
            id="outlined-basic"
            placeholder={`Search for ${type}...`}
            autoComplete="off"
            variant="outlined"
            style={{ width: '64%' }}
            onChange={handleSearch}
            onInput={updateSearchInput}
            defaultValue={searchValue}
            InputProps={{
              className: numSelected > 0 ? classes.input : JSON.stringify({ color: 'black' }),
              classes: {
                notchedOutline: numSelected > 0 ? classes.notchedOutline : classes.input,
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: numSelected > 0 ? 'white' : 'black' }} />
                </InputAdornment>
              ),
            }}
          />
          {numSelected > 0 ? (
            <div className={classes.selected}>
              <b>{numSelected}</b> &nbsp;selected
            </div>
          ) : null}
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          container
          justifyContent="flex-end"
          alignItems="center"
          // style={{ border: '1px solid red' }}
        >
          {type === 'product' ? (
            <>
              {numSelected > 0 ? (
                <>
                  <Tooltip title="Filter">
                    <IconButton
                      onClick={handleClickOpen}
                      style={{
                        paddingLeft: 20,
                        paddingRight: filterActivated ? 15 : 10,
                        color: 'white',
                        borderRadius: 11,
                        backgroundColor: filterActivated
                          ? 'rgba(255, 255, 255, 0.07)'
                          : '#001933',
                      }}
                    >
                      {filterActivated ? (
                        <div style={{ fontSize: '0.875rem' }}>
                          <b>
                            {filteredQuantity} &nbsp;&nbsp;<span>{type}s found</span>
                          </b>
                          &nbsp;&nbsp;
                        </div>
                      ) : null}
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Active Status">
                    <IconButton
                      className={classes.selected}
                      aria-label="update-active"
                      onClick={handleClickOpenActiveStatusDialog}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Stock Status">
                    <IconButton
                      className={classes.selected}
                      aria-label="update-stock-status"
                      onClick={handleClickOpenStockStatusDialog}
                    >
                      <LocalGroceryStoreRoundedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      className={classes.selected}
                      aria-label="delete"
                      onClick={handleMultipleDelete}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Filter">
                  <IconButton
                    onClick={handleClickOpen}
                    style={{
                      paddingLeft: 20,
                      paddingRight: filterActivated ? 15 : 10,
                      color: 'black',
                      borderRadius: 11,
                      backgroundColor: filterActivated ? 'rgba(0, 0, 0, 0.04)' : 'white',
                    }}
                  >
                    {filterActivated ? (
                      <div style={{ fontSize: '0.875rem' }}>
                        <b>
                          {filteredQuantity} &nbsp;&nbsp;<span>{type}s found</span>
                        </b>
                        &nbsp;&nbsp;
                      </div>
                    ) : null}
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          ) : (
            <>
              {numSelected > 0 ? (
                <>
                  <Tooltip title="Filter">
                    <IconButton
                      onClick={handleClickOpen}
                      style={{
                        paddingLeft: 20,
                        paddingRight: filterActivated ? 15 : 10,
                        color: 'white',
                        borderRadius: 11,
                        backgroundColor: filterActivated
                          ? 'rgba(255, 255, 255, 0.07)'
                          : '#001933',
                      }}
                    >
                      {filterActivated ? (
                        <div style={{ fontSize: '0.875rem' }}>
                          <b>
                            {filteredQuantity} &nbsp;&nbsp;<span>{type}s found</span>
                          </b>
                          &nbsp;&nbsp;
                        </div>
                      ) : null}
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      className={classes.selected}
                      aria-label="delete"
                      onClick={handleMultipleDelete}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Filter">
                  <IconButton
                    onClick={handleClickOpen}
                    style={{
                      paddingLeft: 20,
                      paddingRight: filterActivated ? 15 : 10,
                      color: 'black',
                      borderRadius: 11,
                      backgroundColor: filterActivated ? 'rgba(0, 0, 0, 0.04)' : 'white',
                    }}
                  >
                    {filterActivated ? (
                      <div style={{ fontSize: '0.875rem' }}>
                        <b>
                          {filteredQuantity} &nbsp;&nbsp;<span>{type}s found</span>
                        </b>
                        &nbsp;&nbsp;
                      </div>
                    ) : null}
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
