import './dashboard.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { AddNewTask } from './AddNewTask';
import React, {useState, useEffect} from 'react'
import Task from './Task';
import firebase from '../util/firebase'

function Dashboard({Logout}){

    document.body.style.overflow = "hidden";

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
      }));

      const [open, setOpen] = useState(false);

      const classes = useStyles();

      const handleOpen = () => {
        setOpen(true);
      };

      const logoutHandler = () => {
        Logout()
      }

      const alltodos = [];

      const [todos, setTodos] = useState([]);

      function getTodo(){
        firebase.firestore().collection("todos").onSnapshot(function (query){
            setTodos(
              query.docs.map((doc) =>({
                id: doc.id,
                todo: doc.data().todo,
                inProgress: doc.data().inProgress
              }))
            ) //setTodo end
        })

        console.log(todos);
      }
      
      useEffect(() => {
        getTodo();
      }, [])
     
    return(
        <>
        <div className="container">
            <div className="tbd">
                <div className="heading tbdhead">
                    <h3>To Be Done</h3>

                    <img src="add.png" alt="Not loading" className="addbtn" onClick={handleOpen}/><br/>

                    {todos.map((todo) =>(
                      todo.inProgress? <Task task={todo.todo.toString()} id={todo.id} inprogress={todo.inProgress} /> : null
                    ))}
                    
                    
                </div>
            </div>

            <div className="done">
                <div className="heading donehead">
                    <h3>Done</h3>
                    <br/>
                    {todos.map((todo) =>(
                      todo.inProgress? null : <Task task={todo.todo.toString()} inprogress={todo.inProgress} id={todo.id.toString()} />
                    ))}
                </div>
            </div>
        </div>
        

        <div className={classes.root} id="signoutbtndiv">
        
          <Button variant="contained" className="signoutbtn" onClick={logoutHandler}>Logout</Button>
        
                

        </div>


        <AddNewTask open={open} setOpen={setOpen}/>
 
  
        </>
    )

}

export default Dashboard;