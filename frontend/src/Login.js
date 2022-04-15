import React, { useState } from 'react'
import './Login.css'

const Login = ({setAuth, setIslogin}) => {

    const [formData , setFormData] = useState({
        username: '',
        password: ''
    })

    const { username, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        var url = "http://localhost:8000/api/token/";

        fetch(url,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData)
        })

        .then(function(res){ if (res.status===200) return res.json(); else return null; })

        .then((data) => {
            if(data !== null){
                localStorage.setItem('access', data.access)
                setAuth(true)
            }else{
                alert("wrong credentials");
            }
        })

        .catch(function(res){ console.log(res) })

    }

    const gotoregister = () => {
        setIslogin(false)
    }

    return (
        <div className='container mt-5'>
            <h1>Sign In</h1>
            <p>Sign into your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username'
                        name='username'
                        value={username}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group mt-2'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary mt-2' type='submit'>Login</button>
            </form>

            <p className='mt-3'>
                Don't have an account? <button className='btn btn-primary mt-1' type='button' onClick={gotoregister}>Sign Up</button>
            </p>
            
        </div>
    )
}

export default Login;
