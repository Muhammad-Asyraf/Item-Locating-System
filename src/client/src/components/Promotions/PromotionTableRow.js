import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import moment from 'moment';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';

import RowOptions from './RowOptions';

const useStyles = makeStyles(() => ({
  tableRow: {
    '&:hover': {
      backgroundColor: 'rgb(244, 246, 248) !important',
      // backgroundColor: 'rgb(244, 246, 248) !important',
    },
  },
  selected: {
    overflow: 'hidden !important',
    borderRadius: '15px !important',
  },
}));

const PromotionTableRow = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { promotion, isPromotionSelected, labelId, handleClick, handleDelete, handleEdit } =
    props;

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isPromotionSelected}
        tabIndex={-1}
        key={promotion.name}
        selected={isPromotionSelected}
        classes={{ selected: classes.selected }}
        className={classes.tableRow}
      >
        <TableCell style={{ borderBottom: 'none', paddingRight: 0 }} align="right">
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              position: 'relative',
              left: 16,
              top: 1,
            }}
          >
            {!open ? (
              <ExpandMore style={{ transform: 'rotate(-90deg)' }} />
            ) : (
              <ExpandLess style={{ transform: 'rotate(180deg)' }} />
            )}
          </IconButton>
        </TableCell>
        <TableCell
          style={{
            borderBottom: 'none',
          }}
          padding="normal"
          align="left"
        >
          <Checkbox
            checked={isPromotionSelected}
            onClick={(event) => handleClick(event, promotion.uuid)}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          id={labelId}
          scope="row"
          // padding="none"
          align="left"
          sx={{
            fontSize: '0.95rem !important',
            // whiteSpace: 'nowrap',
            // overflow: 'hidden',
            paddingLeft: 0,
          }}
        >
          {promotion.name}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{
            fontSize: '0.95rem !important',
            padding: '10px 0px 10px 20px',
          }}
        >
          <Chip
            color="primary"
            size="small"
            label={promotion.promotion_type}
            sx={{ pl: 5, pr: 5, pt: 2, pb: 2 }}
          />
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important', letterSpacing: 0.8 }}
        >
          {moment(new Date(promotion.start_date)).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important', letterSpacing: 0.8 }}
        >
          {moment(new Date(promotion.end_date)).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="left"
          sx={{ paddingLeft: '5px !important' }}
        >
          <RowOptions
            promotion={promotion}
            Link={Link}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0, borderBottom: 'none' }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Paper
              sx={{
                ml: 3,
                mr: 3,
              }}
              elevation={0}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                // sx={{ border: '1px solid red' }}
              >
                <Grid item sx={{ mt: 2, mb: 5 }}>
                  <Paper
                    elevation={0}
                    style={{
                      borderRadius: 20,
                      boxShadow:
                        'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px ',
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <Box
                          style={{
                            backgroundColor: 'rgb(244, 246, 248)',
                            padding: '20px 0px 20px 25px',
                            borderRadius: '20px 20px 0px 0px',
                          }}
                        >
                          Promotion Overview
                        </Box>
                      </Grid>
                      <Grid item xs={9}>
                        <Box
                          style={{
                            padding: '20px 25px 20px 10px',
                            borderRadius: '0px 0px 20px 0px',
                          }}
                        >
                          <ReactQuill value={promotion.description} readOnly theme="bubble" />
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default PromotionTableRow;
