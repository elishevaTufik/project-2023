import useAxios from 'axios-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { get } from '../../Slices/PostSlice'
import BasicCard from './PostsMui'
import Button from '@mui/material/Button';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PostUseHttpRequest from '../../Hooks/PostUseHttpRequuest'
import PostAddIcon from '@mui/icons-material/PostAdd';

function GetAllPosts(props) {

  const searchVal = props.searchVal
  const page = props.page;
  
  const posts = useSelector(x => x.PostSlice.PostsData);
  const dispatch = useDispatch();
  const { createPost } = PostUseHttpRequest();

  const [open, setOpen] = React.useState(false);
  const [titleIsAble, setTitleIsAble] = React.useState(true);
  const [bodyIsAble, setBodyIsAble] = React.useState(true);

  let titleRef = React.useRef("");
  let bodyRef = React.useRef("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    const newTitle = titleRef.current.value ? titleRef.current.value : ""
    const newbody = bodyRef.current.value ? bodyRef.current.value : ""
    createPost({ title: newTitle, body: newbody }, refetch)
    setBodyIsAble(true)
    setTitleIsAble(true)
  };

  const handleClose1 = () => {
    setOpen(false);
    setBodyIsAble(true)
    setTitleIsAble(true)
  }

  const [{ data, loading, error }, refetch] = useAxios(
    `http://localhost:4963/api/${page}/getAll`
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  dispatch(get({ data: data }))

  return (
    <>
      <h1 style={{ color: '#b874bc' }}>POSTS:</h1>
      <br />

      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen} startIcon={<PostAddIcon />} sx={{ height: "37px", color: "#000000", backgroundColor: "#22b14c", margin: "5px", opacity: "60%" }}>
          Add post
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>add new post</DialogTitle>
          <DialogContent>
            <DialogContentText>please enter title and body:</DialogContentText>

            <TextField
              defaultValue={posts.title}
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
              defaultValue={posts.body}
              required="true"
              inputRef={bodyRef}
              autoFocus
              margin="dense"
              id="body"
              label="body"
              type="string"
              fullWidth
              variant="standard"
              onChange={event => { event.target.value != "" ? setBodyIsAble(false) : setBodyIsAble(true) }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1}>Cancel</Button>
            <Button onClick={handleClose} disabled={(!bodyIsAble && !titleIsAble) ? titleIsAble : true}>add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>


      {posts.map((e) =>
        e.title.includes(searchVal) ?
          <BasicCard card={e} refetch={refetch} /> : <></>
      )}

      <br/><br/><br/>
    </>
  )
}
export default GetAllPosts
