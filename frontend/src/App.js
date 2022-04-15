import './App.css';
import { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import Payer from './Payer';
import PayerDetails from './PayerDetails';
import Accountant from './Accountant';

function App() {
  const [isAuth, setAuth] = useState(false)
  const [islogin, setIslogin] = useState(true)
  const [page, setPage] = useState('')

  useEffect(() => {
    var access = localStorage.getItem("access")

    if (access !== null) {
      var url = "http://localhost:8000/isauthenticated/";

      fetch(url,
      {
          headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${access}`
          },
          method: 'GET'
      })

      .then(function(res){ return res.json() })

      .then((data) => { if (data.authenticated) {
        setAuth(true)
      }} )

      .catch(function(res){ console.log(res) })
    }

    else{
      setAuth(false)
    }
  }, [])

  return (
    <div className="App">
      {isAuth ?
        page === 'Payer'? 
          <Payer /> : 
          page === 'accountant'? 
            <Accountant /> : 
            <PayerDetails />

      :islogin ?
        <Login setAuth={setAuth} setIslogin={setIslogin} /> :
        <Register setIslogin={setIslogin} setPage={setPage} />
      }
    </div>
  );
}

export default App;
