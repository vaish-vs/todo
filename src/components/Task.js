import React, { useState } from 'react'
import './task.css'
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import firebase from '../util/firebase'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EditIcon from '@material-ui/icons/Edit';


function Task({task, inprogress, id}) {


    const [edit, setEdit] = useState("");

    function toggleInProgress(){
        firebase.firestore().collection("todos").doc(id).update({
            inProgress: !inprogress,
        })
    }

    function deleteTodo(){
        firebase.firestore().collection("todos").doc(id).delete();
    }

    function handleEdit() {

    }

    return (
        <div className="main-content">
            {task}

            <EditIcon className="small-icon" />
            <DeleteIcon className="small-icon" onClick={deleteTodo}/>

            {inprogress ? <CheckIcon className="small-icon" onClick={toggleInProgress}/> : <ChevronLeftIcon className="small-icon" onClick={toggleInProgress} /> }
            
        </div>
    )
}

export default Task
