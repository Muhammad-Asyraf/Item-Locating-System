import React from 'react';
import Downshift from 'downshift';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';

import { makeStyles } from '@material-ui/core/styles';

/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */

const useStyles = makeStyles(() => ({
  chipContainer: {
    backgroundColor: 'transparent',
    display: 'inline-block',
    marginBottom: 10,
  },
  chip: {
    marginTop: 10,
    marginRight: 5,
  },
  paper: {
    maxHeight: '150px',
    overflowY: 'auto',
  },
}));

const renderSuggestion = (params) => {
  const { item, index, itemProps, highlightedIndex, selectedItem } = params;
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem.indexOf(item.name) > -1;

  return (
    !isSelected && (
      <MenuItem {...itemProps} key={item.uuid} selected={isHighlighted} component="div">
        {item.name}
      </MenuItem>
    )
  );
};

const getSuggestions = (inputValue, itemList) =>
  itemList.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()));

function MultiChipSelect(props) {
  const classes = useStyles();
  const { availableItems, onRemoveItem, ...rest } = props;

  return (
    <Downshift itemToString={(item) => (item ? '' : '')} {...rest}>
      {({
        getInputProps,
        getItemProps,
        inputValue,
        selectedItem,
        highlightedIndex,
        toggleMenu,
        isOpen,
      }) => (
        <div>
          <div className={classes.chipContainer}>
            {selectedItem.length > 0 &&
              selectedItem.map((item) => (
                <Chip
                  key={item.name}
                  className={classes.chip}
                  label={item.name}
                  deleteIcon={<CancelIcon />}
                  onDelete={() => onRemoveItem(item)}
                  // onClick={() => onRemoveItem(item)}
                />
              ))}
          </div>

          <TextField
            fullWidth
            label={availableItems.length === 0 ? 'No more item to add' : 'Choose an item'}
            disabled={Boolean(availableItems.length === 0)}
            // variant="outlined"
            InputProps={{
              classes: {
                input: classes.input,
              },
              ...getInputProps({
                onClick: () => toggleMenu(),
              }),
            }}
          />

          {isOpen && (
            <Paper className={classes.paper} square>
              {getSuggestions(inputValue, availableItems).map((item, index) =>
                renderSuggestion({
                  item,
                  index,
                  itemProps: getItemProps({
                    key: item.uuid,
                    item,
                  }),
                  highlightedIndex,
                  selectedItem,
                })
              )}
            </Paper>
          )}
        </div>
      )}
    </Downshift>
  );
}

export default MultiChipSelect;
