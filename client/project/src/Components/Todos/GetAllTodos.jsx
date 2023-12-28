import useAxios from 'axios-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { get } from '../../Slices/TodoSlice'
import BasicCard from './TodosMui'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TodoUseHttpRequest from '../../Hooks/TodoUseHttpRequest '

function GetAllTodos(props) {

  const searchVal = props.searchVal
  const page = props.page;
  const todos = useSelector(x => x.TodoSlice.TodosData);

  const dispatch = useDispatch();
  const { createTodo } = TodoUseHttpRequest();

  const [open, setOpen] = React.useState(false);
  const [titleAble, setTitleIsAble] = React.useState(true);

  let titleRef = React.useRef("");
  let tagsRef = React.useRef([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    const newTitle = titleRef.current.value ? titleRef.current.value : ""
    const newTags = tagsRef.current.value.length ? tagsRef.current.value.split(",") : []
    createTodo({ title: newTitle, tags: newTags }, refetch)
    setTitleIsAble(true)
  };

  const handleClose1 = () => {
    setOpen(false);
    setTitleIsAble(true)
  }

  const [{ data, loading, error }, refetch] = useAxios(
    `http://localhost:4963/api/${page}/getAll`
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  dispatch(get({ data: data }))
  debugger
  return (
    <>
      <br />
      <h1 style={{ color: '#b874bc' }}>TO DO LIST:</h1>

      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddIcon />} sx={{ height: "37px", color: "#000000", backgroundColor: "#22b14c", margin: "5px", opacity: "60%" }}>
          Add task
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>add new task</DialogTitle>
          <DialogContent>
            <DialogContentText>please enter title and tags:</DialogContentText>

            <TextField
              defaultValue={todos.title}
              required="true"
              inputRef={titleRef}
              autoFocus
              margin="dense"
              id="title"
              label="title"
              type="string"
              fullWidth
              variant="standard"
              onChange={event => { event.target.value != "" ? setTitleIsAble(false) : setTitleIsAble(true) }}
            />

            <TextField
              defaultValue={todos.tags}
              inputRef={tagsRef}
              autoFocus
              margin="dense"
              id="tags"
              label="tag"
              type="string"
              fullWidth
              variant="standard"
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1}>Cancel</Button>
            <Button onClick={handleClose} disabled={titleAble}>add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      {todos.map((e) =>
        e.title.toLowerCase().includes(searchVal.toLowerCase()) ?
          <BasicCard card={e} refetch={refetch} /> : <></>)}

      <br /><br /><br />
    </>
  )
}
export default GetAllTodos
