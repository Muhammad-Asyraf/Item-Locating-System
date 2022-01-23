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
  inputTitle: {
    margin: '0px 0px 5px',
    fontWeight: '600',
    lineHeight: '1.57143',
    fontSize: '0.875rem',
    fontFamily: 'Public Sans, sans-serif',
    color: 'black',
    // color: 'rgb(99, 115, 129)',
  },
  dateTag: {
    backgroundColor: '#D63B49',
    color: 'white',
    padding: '5px 20px',
    borderRadius: 8,
  },
}));

const CampaignTableRow = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { campaign, isCampaignSelected, labelId, handleClick, handleDelete, handleEdit } =
    props;

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isCampaignSelected}
        tabIndex={-1}
        key={campaign.name}
        selected={isCampaignSelected}
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
            checked={isCampaignSelected}
            onClick={(event) => handleClick(event, campaign.uuid)}
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
          {campaign.name}
        </TableCell>

        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important', letterSpacing: 0.8 }}
        >
          {moment(new Date(campaign.start_date)).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="center"
          sx={{ fontSize: '0.95rem !important', letterSpacing: 0.8 }}
        >
          {moment(new Date(campaign.end_date)).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell
          style={{ borderBottom: 'none' }}
          align="left"
          sx={{ paddingLeft: '5px !important' }}
        >
          <RowOptions
            campaign={campaign}
            Link={Link}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0, borderBottom: 'none' }} colSpan={12}>
          <Collapse in={open} timeout={600} unmountOnExit>
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
                          Campaign Overview
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          style={{
                            padding: '20px 20px 20px 20px',
                            borderRadius: '0px 0px 20px 0px',
                          }}
                        >
                          <img
                            src={campaign.banner_ad_path}
                            alt="Teset"
                            style={{
                              width: '100%',
                              objectFit: 'scale-down',
                              borderRadius: '20px',
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          style={{
                            padding: '0px 35px 20px 35px',
                          }}
                        >
                          <p className={classes.inputTitle}>Effective Date</p>
                          <span className={classes.dateTag}>
                            <b>
                              {moment(new Date(campaign.start_date)).format(
                                'MMM Do YYYY, hh:mm a'
                              )}
                            </b>
                          </span>
                          &nbsp;—&nbsp;
                          <span className={classes.dateTag}>
                            <b>
                              {moment(new Date(campaign.end_date)).format(
                                'MMM Do YYYY, hh:mm a'
                              )}
                            </b>
                          </span>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          style={{
                            padding: '0px 20px 15px 20px',
                          }}
                        >
                          <p className={classes.inputTitle} style={{ paddingLeft: '15px' }}>
                            Descriptions
                          </p>
                          <ReactQuill
                            value={campaign.description}
                            readOnly
                            theme="bubble"
                            style={{ paddingTop: '0px' }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          style={{
                            padding: '0px 20px 30px 20px',
                          }}
                        >
                          <p className={classes.inputTitle} style={{ paddingLeft: '15px' }}>
                            Terms & Conditions
                          </p>
                          <ReactQuill
                            value={campaign.terms_conditions}
                            readOnly
                            theme="bubble"
                          />
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

export default CampaignTableRow;
