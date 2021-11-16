import React from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import '../../assets/css/dialogOverride.css';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="left" ref={ref} {...props} />
));

const CategoryFilterDialog = (props) => {
  const {
    open,
    handleClose,
    categoryOptions,
    setSelectedCategory,
    defaultValue,
    filteredQuantity,
  } = props;

  const onChange = (e, value) => {
    setSelectedCategory(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
      <DialogTitle>
        Filters &nbsp;&nbsp;
        {defaultValue.length > 0 ? (
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

      <Stack spacing={3} sx={{ width: '100%', mb: 2 }}>
        <Autocomplete
          id="tags-outlined"
          multiple
          disableCloseOnSelect
          value={defaultValue}
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
      </Stack>
    </Dialog>
  );
};

export default CategoryFilterDialog;
