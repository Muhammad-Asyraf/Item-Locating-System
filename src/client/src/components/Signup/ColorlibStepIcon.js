import { React } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import PersonPinRoundedIcon from '@mui/icons-material/PersonPinRounded';

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  active: {
    // backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #003366 51%, #30D2BE 100%)',
    backgroundColor: '#003366',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundColor: '#003366',
    // backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #003366 51%, #30D2BE 100%)',
  },
});

const ColorlibStepIcon = (props) => {
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;

  const icons = {
    1: <PersonPinRoundedIcon />,
    2: <ContactPhoneRoundedIcon />,
    3: <BusinessCenterRoundedIcon />,
    4: <AccountBoxRoundedIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
};

export default ColorlibStepIcon;
