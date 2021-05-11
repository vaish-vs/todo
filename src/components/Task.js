import React, { useState } from 'react'
import './task.css'
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import firebase from '../util/firebase'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

function Task({task, inprogress, id}) {

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

      const classes = useStyles();


    const [edit, setEdit] = useState();

    const [isOpen, setIsOpen] = useState(false)

    function toggleInProgress(){
        firebase.firestore().collection("todos").doc(id).update({
            inProgress: !inprogress,
        })
    }

    function deleteTodo(){
        firebase.firestore().collection("todos").doc(id).delete();
    }

    const handleEdit = (e) =>{
        setEdit(e.target.value); 
      }

    function updateTodo(){
        firebase.firestore().collection("todos").doc(id).update({
            todo: edit,
        })

        handleClose();
    }

    function handleClose(){
        setIsOpen(false)
    }

    function handleOpen(){
        setIsOpen(true);
    }

    return (
        <div className="main-content">
            {task}

            <EditIcon className="small-icon" onClick={handleOpen}/>
            <DeleteIcon className="small-icon" onClick={deleteTodo}/>

            {inprogress ? <CheckIcon className="small-icon" onClick={toggleInProgress}/> : <ChevronLeftIcon className="small-icon" onClick={toggleInProgress} /> }

            {isOpen ? (
                <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={isOpen}>
                  <div className={classes.paper}>
                    <h2 id="transition-modal-title">Edit Task</h2>
                    <Box m={2}>
                    <TextField id="outlined-basic" label="Task" variant="outlined" onChange={handleEdit} value={edit}/>
                    </Box>
                    <Box m={2}>
                      <Button variant="contained" className="signoutbtn" onClick={updateTodo}>Update Task</Button>
                    </Box>
                  </div>
                </Fade>
              </Modal>
            ) : null}

            
            
        </div>
    )
}

export default Task
