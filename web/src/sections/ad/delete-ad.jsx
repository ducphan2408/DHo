import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { styled, DialogActions } from '@mui/material';
// import palette from '../../../theme/palette';
// import { CreateQuestionAction, GetQuestionAction } from '../../../redux/actions/questionAction';

const Title = styled(DialogTitle)({
  fontSize: '24px',
});

export default function DeleteAd({ setOpen, open, change }) {
  const { id } = change;

	console.log(id);

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Dialog onClose={handleClose} open={open}>
      <Title sx={{color: "custom.baemin1"}}>Bạn có muốn xoá gói đẩy tin này?</Title>
      
      <DialogActions>
        <Button sx={{color: "error.main"}} onClick={handleClose}>Huỷ</Button>
        <Button sx={{color: "custom.baemin1"}} onClick={handleClose}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
}
DeleteAd.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  change: PropTypes.object.isRequired,
};
