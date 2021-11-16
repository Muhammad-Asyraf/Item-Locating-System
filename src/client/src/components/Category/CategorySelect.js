import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const CategorySelect = (props) => {
  const { categoryOptions, setSelectedCategory, defaultValue } = props;

  const onChange = (e, value) => {
    const selectedCat = value.map(({ category, name, ...uuid }) => uuid);
    setSelectedCategory(selectedCat);
  };

  return (
    <Stack spacing={3} sx={{ width: '100%', mb: 2 }}>
      <Autocomplete
        id="tags-outlined"
        multiple
        disableCloseOnSelect
        defaultValue={defaultValue}
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
  );
};

export default CategorySelect;
