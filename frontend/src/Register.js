import React, { useState } from 'react'

const Register = ({setIslogin}) => {

    const [formData , setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        re_password: '',
        type: ''
    })

    const { first_name, last_name, username, password, re_password, type } = formData;

    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if(password===re_password){
            var url = "http://localhost:8000/register/";

            fetch(url,
            {
                headers: {
                'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(formData)
            })

            .then(function(res){ return res.json() })

            .then((data) => { 
                console.log(data)
            })

            .catch(function(res){
                console.log(res)
                if(res.data.type === 'accountant'){
                    
                }
                else if(res.data.type === 'payer'){

                }
                else{
                    alert('Something went wrong..')
                }
            })

        }else{
            alert("Password not same")
        }
    }

    const gotologin = () => {
        setIslogin(true);
    }

    return (
        <div className='container mt-5'>
            <h1>Sign Up</h1>
            <p>Create a new Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='First Name'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group mt-2'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Last Name'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group mt-2'>
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
                <div className='form-group mt-2'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group mt-2'>
                    <select name="type" onChange={e => onChange(e)} required id="type" style={{'margin': '20px', 'padding': '10px 20vw'}}>
                        <option value="">----Select type of account----</option>
                        <option value="payer">Payer</option>
                        <option value="accountant">Accountant</option>
                    </select>
                </div>
                <button className='btn btn-primary mt-2' type='submit'>Register</button>
            </form>
            <br />
    
            
            <p className='mt-3'>
                Already have an account? <button className='btn btn-primary mt-1' type='button' onClick={gotologin}>Sign in</button>
            </p>

        </div>
    )
}

export default Register;
