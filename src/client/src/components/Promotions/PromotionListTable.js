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
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import TodayIcon from '@mui/icons-material/Today';
import CategoryIcon from '@mui/icons-material/Category';

import EnhancedTableHead from '../Table/EnhancedTableHead';
import EnhancedTableToolbar from '../Table/EnhancedTableToolbar';
import PromotionTableRow from './PromotionTableRow';

import { getComparator, stableSort } from '../../utils/general';

const getPromotionHeadCells = () => [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Promotion',
    icon: <LocalOfferRoundedIcon fontSize="small" />,
  },
  {
    id: 'promotion_type',
    align: 'center',
    disablePadding: true,
    label: 'Promotion Type',
    icon: <CategoryIcon fontSize="medium" />,
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
  const promotionHeadCells = getPromotionHeadCells();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    currentTab,
    promotionPeriods,
    handleChangeTab,
    initPromotion,
    promotions,
    setPromotions,
    handleDelete,
    onMultipleDelete,
    handleEdit,
  } = props;

  /* eslint-disable arrow-body-style */
  const handleSearch = (event) => {
    const searchKeywords = event.target.value.toLowerCase();

    const filteredPromotions = initPromotion.filter((promotion) => {
      const firstCondi = promotion.name.toLowerCase().includes(searchKeywords);
      const secCondi = promotion.wholesale_price.includes(searchKeywords);
      const thirdCondi = promotion.barcode_number.includes(searchKeywords);

      if (firstCondi || secCondi || thirdCondi) {
        return true;
      }
      return false;
    });

    setPromotions(filteredPromotions);
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
      const newSelecteds = promotions.map((n) => n.uuid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const checkPromotionPeriod = (promotion, promotionPeriod) => {
    const currentDateTime = new Date().getTime();
    const startDateTime = new Date(promotion.start_date).getTime();
    const endDateTime = new Date(promotion.end_date).getTime();

    if (promotionPeriod === 'Current & Upcoming') {
      if (
        (currentDateTime >= startDateTime && currentDateTime <= endDateTime) ||
        (currentDateTime <= startDateTime && currentDateTime <= endDateTime)
      ) {
        return true;
      }
    } else if (promotionPeriod === 'Past') {
      if (currentDateTime >= startDateTime && currentDateTime >= endDateTime) {
        return true;
      }
    } else if (promotionPeriod === 'All') {
      return true;
    }

    return false;
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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, promotions.length - page * rowsPerPage);

  return (
    <TabContext value={currentTab}>
      <TabList
        onChange={handleChangeTab}
        classes={{ indicator: classes.selectedTab }}
        className={classes.tabContainer}
      >
        {promotionPeriods.map((promotionPeriod) => {
          const labelId = `promotion-tab-${promotionPeriod}`;

          return (
            <Tab
              key={labelId}
              disableRipple
              label={promotionPeriod}
              value={promotionPeriod}
              className={classes.tabRoot}
            />
          );
        })}
      </TabList>
      <Paper className={classes.paper} elevation={4}>
        <EnhancedTableToolbar
          type="promotion"
          numSelected={selected.length}
          handleMultipleDelete={handleMultipleDelete}
          handleSearch={handleSearch}
        />
        {promotionPeriods.map((promotionPeriod) => {
          const tabKey = `tab-panel-${promotionPeriod}`;
          return (
            <TabPanel
              key={tabKey}
              value={promotionPeriod}
              style={{ marginTop: 0, padding: 0 }}
            >
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    headCells={promotionHeadCells}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={promotions.length}
                  />
                  <TableBody>
                    <TableRow style={{ height: '10px' }} />
                    {stableSort(promotions, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((promotion, index) => {
                        const isPromotionSelected = isSelected(promotion.uuid);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        const currentPeriod = checkPromotionPeriod(promotion, promotionPeriod);

                        if (currentPeriod) {
                          return (
                            <PromotionTableRow
                              key={labelId}
                              promotion={promotion}
                              isPromotionSelected={isPromotionSelected}
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
                count={promotions.length}
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
