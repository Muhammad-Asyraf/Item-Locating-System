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
import FormControlLabel from '@mui/material/FormControlLabel';

import '../../assets/css/dialogOverride.css';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const CategoryFilterDialog = (props) => {
  const {
    open,
    handleClose,
    categoryOptions,
    setCategoryFilterType,
    categoryFilterType,
    setSelectedCategoryFilter,
    selectedCategoryFilter,
    filteredQuantity,
    filterActivated,
  } = props;

  const onChange = (e, value) => {
    setSelectedCategoryFilter(value);
  };

  const onChangeCategoryFilterType = ({ target }) => {
    setCategoryFilterType(target.value);
  };

  return (
    <Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
      <DialogTitle sx={{ pb: 1, pt: 3, pl: 0 }}>
        Filters &nbsp;&nbsp;
        {filterActivated ? (
          <span
            style={{
              fontSize: '0.875rem',
              backgroundColor: 'rgba(0,0,0,0.08)',
              color: 'black',
              borderRadius: 8,
              padding: '5px 8px 5px 8px',
            }}
          >
            <b>{filteredQuantity} &nbsp;Items found</b>
          </span>
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
            onChange={onChange}
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
      </Grid>
    </Dialog>
  );
};

export default CategoryFilterDialog;
