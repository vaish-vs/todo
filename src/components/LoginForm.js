import React, { useState } from 'react'
import './login.css'


function LoginForm({Login}) {

    const [details, setDetails] = useState({name:"", password:""})

    const submitHandler = () =>{
        Login(details);
    }

    return (
        <form onSubmit={submitHandler} autoComplete="off">
            <div className="form-inner">
                <h2>Login</h2>
                {/* Error */}
                <div className="form-group">
                    <label htmlFor="user" className="login-label">UserID </label>
                    <input className="input-field-login" type="text" name="user" id="user" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="login-label">Password</label>
                    <input className="input-field-login" type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>

                <input type="submit" value="Login" className="login-btn"/>

            </div>
        </form>
    )
}

export default LoginForm
