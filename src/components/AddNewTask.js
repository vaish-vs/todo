import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import './AddNewTask.css'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import firebase from '../util/firebase'


export const AddNewTask = ({open, setOpen}) =>{

    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10px',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
          marginTop: '20px',
        },
     
      }));

      const handleClose = () => {
        setOpen(false);
      };

      const classes = useStyles();

      const [task, setTask] = useState('');

      const handleOnChange = (e) =>{
        setTask(e.target.value);
        
      }

      const createTodo = () =>{
          console.log("adding data")
          firebase.database().ref("todo/tbd/").push(task)
          firebase.firestore().collection("todos").add({
            inProgress: true,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            todo: task,
          })
          setTask("");
          handleClose();
      }

    return(
        <>
            {open ? (
                <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <h2 id="transition-modal-title">Add New Task</h2>
                    <Box m={2}>
                    <TextField id="outlined-basic" label="Task" variant="outlined" onChange={handleOnChange} value={task}/>
                    </Box>
                    <Box m={2}>
                      <Button variant="contained" className="signoutbtn" onClick={createTodo}>Add Task</Button>
                    </Box>
                  </div>
                </Fade>
              </Modal>
            ) : null}
        </>
    )
}