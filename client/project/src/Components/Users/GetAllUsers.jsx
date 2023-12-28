import useAxios from 'axios-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { get } from '../../Slices/UserSlice'
import BasicCard from './UsersMui'
import Button from '@mui/material/Button';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserUseHttpRequest from "../../Hooks/UserUseHttpRequuest"
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function GetAllUsers(props) {

  const searchVal = props.searchVal
  const page = props.page;

  const users = useSelector(x => x.UserSlice.UsersData);
  const dispatch = useDispatch();
  const { createUser } = UserUseHttpRequest();

  const [open, setOpen] = React.useState(false);
  const [userNameIsAble, setUserNameIsAble] = React.useState(true);
  const [nameIsAble, setNameIsAble] = React.useState(true);

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
    const newName = nameRef.current.value ? nameRef.current.value : ""
    const newUserName = userNameRef.current.value ? userNameRef.current.value : ""
    const newEmail = emailRef.current.value ? emailRef.current.value : ""
    const newAddress = addressRef.current.value ? addressRef.current.value : ""
    const newPhone = phoneRef.current.value ? phoneRef.current.value : ""
    createUser({ name: newName, userName: newUserName, email: newEmail, address: newAddress, phone: newPhone }, refetch)
    setUserNameIsAble(true)
    setNameIsAble(true)
  };

  const handleClose1 = () => {
    setOpen(false);
    setUserNameIsAble(true)
    setNameIsAble(true)
  }

  const [{ data, loading, error }, refetch] = useAxios(
    `http://localhost:4963/api/${page}/getAll`
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  dispatch(get({ data: data }))

  return (
    <>
      <br />
      <h1 style={{ color: '#b874bc' }}>USERS:</h1>

      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen} startIcon={<PersonAddIcon />} sx={{ height: "37px", color: "#000000", backgroundColor: "#22b14c", margin: "5px", opacity: "60%" }}>
          Add user
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>add new user:</DialogTitle>
          <DialogContent>
            <DialogContentText>please enter name, userName, email, address and phone</DialogContentText>
            {/* name */}
            <TextField
              required="true"
              inputRef={nameRef}
              autoFocus
              margin="dense"
              id="name"
              label="name"
              type="string"
              fullWidth
              variant="standard"
              onChange={event => { event.target.value != "" ? setUserNameIsAble(false) : setUserNameIsAble(true) }}


            />
            {/* userName */}
            <TextField
              required="true"
              inputRef={userNameRef}
              autoFocus
              margin="dense"
              id="userName"
              label="userName"
              type="string"
              fullWidth
              variant="standard"
              onChange={event => { event.target.value != "" ? setNameIsAble(false) : setNameIsAble(true) }}

            />
            {/* email */}
            <TextField
              inputRef={emailRef}
              autoFocus
              margin="dense"
              id="email"
              label="email"
              type="string"
              fullWidth
              variant="standard"
            />
            {/* address */}
            <TextField
              inputRef={addressRef}
              autoFocus
              margin="dense"
              id="address"
              label="address"
              type="string"
              fullWidth
              variant="standard"
            />
            {/* phone */}
            <TextField
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
            <Button onClick={handleClose} disabled={(!nameIsAble && !userNameIsAble) ? userNameIsAble : true}>add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      {users.map((e) =>
        e.name.toLowerCase().includes(searchVal.toLowerCase()) ?
          <BasicCard card={e} refetch={refetch} /> : <></>
      )}
      <br /><br /><br />
    </>
  )
}
export default GetAllUsers
