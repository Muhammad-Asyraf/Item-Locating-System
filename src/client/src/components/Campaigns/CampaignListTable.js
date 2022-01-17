import React, { useState } from 'react';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { makeStyles } from '@mui/styles';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TodayIcon from '@mui/icons-material/Today';
import CampaignIcon from '@mui/icons-material/Campaign';

import EnhancedTableHead from '../Table/EnhancedTableHead';
import EnhancedTableToolbar from '../Table/EnhancedTableToolbar';
import CampaignTableRow from './CampaignTableRow';

import { getComparator, stableSort } from '../../utils/general';

const getCampaignHeadCells = () => [
  {
    id: 'campaign',
    align: 'left',
    disablePadding: true,
    label: 'Campaign',
    icon: <CampaignIcon sx={{ fontSize: '1.8rem' }} />,
  },
  {
    id: 'start_date',
    align: 'center',
    disablePadding: false,
    label: 'Start Date',
    icon: <CalendarTodayIcon fontSize="small" />,
  },
  {
    id: 'end_date',
    align: 'center',
    disablePadding: false,
    label: 'End Date',
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
    // marginTop: 25,
    marginBottom: theme.spacing(2),
    boxShadow:
      'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px !important',
    // borderRadius: '16px !important',
    borderRadius: '0px 0px 16px 16px !important',
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
  selectedTab: {
    height: '3px !important',
    borderRadius: '10px !important',
  },
  tabRoot: {
    textTransform: 'none !important',
    fontSize: '1.1em !important',
  },
  tabContainer: {
    marginTop: '10px !important',
    // marginLeft: '20px !important',
  },
}));

const PromotionListTable = (props) => {
  const classes = useStyles();
  const campaignHeadCells = getCampaignHeadCells();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    currentTab,
    campaignPeriods,
    handleChangeTab,
    initCampaign,
    campaigns,
    setCampaigns,
    handleDelete,
    onMultipleDelete,
    handleEdit,
  } = props;

  /* eslint-disable arrow-body-style */
  const handleSearch = (event) => {
    const searchKeywords = event.target.value.toLowerCase();

    const filteredCampaigns = initCampaign.filter((campaign) => {
      const firstCondi = campaign.name.toLowerCase().includes(searchKeywords);

      if (firstCondi) {
        return true;
      }
      return false;
    });

    setCampaigns(filteredCampaigns);
  };

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
      const newSelecteds = campaigns.map((n) => n.uuid);
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

  const checkCampaignPeriod = (campaign, campaignPeriod) => {
    const currentDateTime = new Date().getTime();
    const startDateTime = new Date(campaign.start_date).getTime();
    const endDateTime = new Date(campaign.end_date).getTime();

    if (campaignPeriod === 'Current & Upcoming') {
      if (
        (currentDateTime >= startDateTime && currentDateTime <= endDateTime) ||
        (currentDateTime <= startDateTime && currentDateTime <= endDateTime)
      ) {
        return true;
      }
    } else if (campaignPeriod === 'Past') {
      if (currentDateTime >= startDateTime && currentDateTime >= endDateTime) {
        return true;
      }
    } else if (campaignPeriod === 'All') {
      return true;
    }

    return false;
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (uuid) => selected.indexOf(uuid) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, campaigns.length - page * rowsPerPage);

  return (
    <TabContext value={currentTab}>
      <TabList
        onChange={handleChangeTab}
        classes={{ indicator: classes.selectedTab }}
        className={classes.tabContainer}
      >
        {campaignPeriods.map((campaignPeriod) => {
          const labelId = `campaign-tab-${campaignPeriod}`;

          return (
            <Tab
              key={labelId}
              disableRipple
              label={campaignPeriod}
              value={campaignPeriod}
              className={classes.tabRoot}
            />
          );
        })}
      </TabList>
      <Paper className={classes.paper} elevation={4}>
        <EnhancedTableToolbar
          type="campaign"
          numSelected={selected.length}
          handleMultipleDelete={handleMultipleDelete}
          handleSearch={handleSearch}
        />
        {campaignPeriods.map((campaignPeriod) => {
          const tabKey = `tab-panel-${campaignPeriod}`;
          return (
            <TabPanel key={tabKey} value={campaignPeriod} style={{ marginTop: 0, padding: 0 }}>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    headCells={campaignHeadCells}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={campaigns.length}
                  />
                  <TableBody>
                    <TableRow style={{ height: '10px' }} />
                    {stableSort(campaigns, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((campaign, index) => {
                        const isCampaignSelected = isSelected(campaign.uuid);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        const currentPeriod = checkCampaignPeriod(campaign, campaignPeriod);

                        if (currentPeriod) {
                          return (
                            <CampaignTableRow
                              key={labelId}
                              campaign={campaign}
                              isCampaignSelected={isCampaignSelected}
                              labelId={labelId}
                              handleClick={handleClick}
                              handleDelete={handleDelete}
                              handleEdit={handleEdit}
                            />
                          );
                        }
                        return null;
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
                count={campaigns.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TabPanel>
          );
        })}
      </Paper>
    </TabContext>
  );
};

export default PromotionListTable;
