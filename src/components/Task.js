import React from 'react'
import './task.css'
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import firebase from '../util/firebase'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

function Task({task, inprogress, id}) {

    function toggleInProgress(){
        firebase.firestore().collection("todos").doc(id).update({
            inProgress: !inprogress,
        })
    }

    function deleteTodo(){
        firebase.firestore().collection("todos").doc(id).delete();
    }

    return (
        <div className="main-content">
            {task}
            <DeleteIcon className="small-icon" onClick={deleteTodo}/>

            {inprogress ? <CheckIcon className="small-icon" onClick={toggleInProgress}/> : <ChevronLeftIcon className="small-icon" onClick={toggleInProgress} /> }
            
        </div>
    )
}

export default Task
