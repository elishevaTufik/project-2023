
import * as React from 'react';
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import UserUseHttpRequest from '../../Hooks/UserUseHttpRequuest'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Face4Icon from '@mui/icons-material/Face4';

export default function BasicCard(props) {

  const { deleteUser, updateUser } = UserUseHttpRequest()
  const user = props.card;
  const [open, setOpen] = React.useState(false);

  let nameRef = React.useRef("");
  let userNameRef = React.useRef("");
  let emailRef = React.useRef("");
  let addressRef = React.useRef("");
  let phoneRef = React.useRef("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const save = () => {
    const newName = nameRef.current.value ? nameRef.current.value : ""
    const newUserName = userNameRef.current.value ? userNameRef.current.value : ""
    const newEmail = emailRef.current.value ? emailRef.current.value : ""
    const newAddress = addressRef.current.value ? addressRef.current.value : ""
    const newPhone = phoneRef.current.value ? phoneRef.current.value : ""
    updateUser(user._id, { name: newName, userName: newUserName, email: newEmail, address: newAddress, phone: newPhone }, props.refetch)
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen(false);
  }

  const users = useSelector(x => x.UserSlice.UsersData);

  return (
    <Card sx={{ border: "2px solid #b874bc", margin: "60px" }}>

      <CardContent>
        <Typography variant="h1" sx={{ fontSize: 24, fontFamily: 'Segoe Script' }} color="#b874bc" gutterBottom>
          <Face4Icon />
          <br />
          {user.name}
        </Typography>

        <Typography variant="h1" sx={{ fontSize: 20, fontFamily: 'Segoe Script' }} color="#22b14c" gutterBottom>
          {user.address}
        </Typography>

        <Typography variant="h1" sx={{ fontSize: 20, fontFamily: 'Segoe Script' }} color="#22b14c" gutterBottom>
          {user.phone}
        </Typography>

        <Typography variant="h1" sx={{ fontSize: 20, fontFamily: 'Segoe Script' }} color="#22b14c" gutterBottom>
          {user.email}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small" style={{ color: "#22b14c" }}></Button>
      </CardActions>

      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen} startIcon={<ModeIcon />} sx={{ height: "37px", color: "#22b14c", backgroundColor: "#000000", margin: "5px", opacity: "60%" }}>
          update user
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>update the user</DialogTitle>
          <DialogContent>
            <DialogContentText>please enter name, userName, email, address and phone</DialogContentText>

            <TextField
              defaultValue={user.name}
              required="true"
              inputRef={nameRef}
              autoFocus
              margin="dense"
              id="name"
              label="name"
              type="string"
              fullWidth
              variant="standard"
            />

            <TextField
              defaultValue={user.userName}
              required="true"
              inputRef={userNameRef}
              autoFocus
              margin="dense"
              id="userName"
              label="userName"
              type="string"
              fullWidth
              variant="standard"
            />

            <TextField
              defaultValue={user.email}
              inputRef={emailRef}
              autoFocus
              margin="dense"
              id="email"
              label="email"
              type="string"
              fullWidth
              variant="standard"
            />

            <TextField
              defaultValue={user.address}
              inputRef={addressRef}
              autoFocus
              margin="dense"
              id="address"
              label="address"
              type="string"
              fullWidth
              variant="standard"
            />

            <TextField
              defaultValue={user.phone}
              inputRef={phoneRef}
              autoFocus
              margin="dense"
              id="phone"
              label="phone"
              type="string"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1}>Cancel</Button>
            <Button onClick={save}>update</Button>

          </DialogActions>
        </Dialog>
      </React.Fragment>

      <Button variant="outlined" onClick={() => { deleteUser(user._id, props.refetch) }} startIcon={<DeleteIcon />} sx={{ height: "37px", color: "#b874bc", backgroundColor: "#000000", margin: "5px", opacity: "60%" }} >
        Delete
      </Button>
      <br/><br/><br/>

    </Card>
  );
}


