import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

/* eslint-disable prefer-arrow-callback */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CampaignLinkDialog = (props) => {
  const { open, handleClose } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          sx: { padding: '20px 40px 20px 40px', borderRadius: 3 },
        }}
      >
        <DialogTitle>Link the promotion to a campaign</DialogTitle>
        <DialogContent sx={{ pl: 0, pr: 0 }}>
          <DialogContentText>
            By linking the promotion to a campaign, all products applicable to this promotion
            will be attached to the selected campaign.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pr: 0 }}>
          <Button onClick={handleClose}>Understood</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CampaignLinkDialog;
