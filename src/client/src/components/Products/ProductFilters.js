import React from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import '../../assets/css/dialogOverride.css';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const ProductFilters = (props) => {
  const {
    open,
    handleClose,
    categoryOptions,
    setCategoryFilterType,
    setSelectedCategoryFilter,
    setSelectedActiveStatusFilter,
    setSelectedStockStatusFilter,
    categoryFilterType,
    selectedCategoryFilter,
    selectedActiveStatusFilter,
    selectedStockStatusFilter,
    filteredQuantity,
    filterActivated,
    clearFilters,
  } = props;

  const onChangeCategory = (e, value) => {
    setSelectedCategoryFilter(value);
  };

  const onChangeActiveStatus = (e, value) => {
    setSelectedActiveStatusFilter(value);
  };

  const onChangeStockStatus = (e, value) => {
    setSelectedStockStatusFilter(value);
  };

  const onChangeCategoryFilterType = ({ target }) => {
    setCategoryFilterType(target.value);
  };

  return (
    <Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
      <DialogTitle sx={{ pb: 1, pt: 3, pl: 0 }}>
        Filters &nbsp;&nbsp;
        {filterActivated ? (
          <>
            <span
              style={{
                fontSize: '0.875rem',
                backgroundColor: 'rgba(0,0,0,0.08)',
                color: 'black',
                borderRadius: 8,
                padding: '5px 8px 5px 8px',
              }}
            >
              <b>{filteredQuantity} &nbsp;Products found</b>
            </span>
            &nbsp;&nbsp;
            <IconButton
              onClick={clearFilters}
              sx={{
                backgroundColor: 'rgba(255,0,0,0.08)',
                borderRadius: 11,
                pt: 0.25,
                pb: 0.2,
                pl: 1.5,
                pr: 2,
              }}
            >
              <ClearAllIcon sx={{ color: 'red' }} />
              <span
                style={{
                  fontSize: '0.845rem',
                  color: 'red',
                }}
              >
                &nbsp;<b>Clear All</b>
              </span>
            </IconButton>
          </>
        ) : null}
      </DialogTitle>
      <Divider />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} container justifyContent="flex-start" alignItems="center">
          &nbsp; Category Filter Type: &nbsp; &nbsp;
          <RadioGroup row value={categoryFilterType} onChange={onChangeCategoryFilterType}>
            <FormControlLabel value="any" control={<Radio />} label="Any" />
            <FormControlLabel value="all" control={<Radio />} label="All" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="tags-outlined"
            multiple
            disableCloseOnSelect
            value={selectedCategoryFilter}
            onChange={onChangeCategory}
            options={categoryOptions}
            isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
            groupBy={(option) => option.category.name}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="Category" placeholder="Subcategory" />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            id="active-select"
            options={['Active', 'Inactive']}
            onChange={onChangeActiveStatus}
            value={selectedActiveStatusFilter}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Activation Status" />}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            id="stock-select"
            options={['In Stock', 'Low Stock', 'Out of Stock']}
            onChange={onChangeStockStatus}
            value={selectedStockStatusFilter}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Stock Status" />}
          />
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ProductFilters;
