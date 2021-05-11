import './App.css';
import Dashboard from './components/Dashboard'
import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
function App() {
  
  const adminUser = {
    userID: "admin",
    password: "admin123",
    email:"scocsaemail"
  }

  const [user, setUser] = useState({name:"", password:""} )
  const [error, setError] = useState("")
  
  const Login = details =>{
    console.log(details)
    if(details.name == adminUser.userID && details.password == adminUser.password){
      console.log("Logged in")
      setUser({
        name: details.name,
        password: details.password
      })
    }
    else{
      console.log("Deatils do notmatc")
    }
  }

  const Logout = () =>{
    console.log("logged out");
    setUser({
      name: "",
      password: ""
    })
  }
  return (
    <div className="App">
    {(user.name !=="") ? (
        <Dashboard Logout={Logout}/>
    ): (
      <LoginForm Login={Login} error={error}/>
    )}
      
    </div>
  );
}

export default App;
