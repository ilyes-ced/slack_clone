import App_bar from './components/App_bar'
import Side_bar from './components/Side_bar'
import Main_container from './components/Main_container'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react'



function App(){
    const [is_auth, set_is_auth] = useState(null)
    useEffect(() => {
        console.log(localStorage.getItem("user_data"))
        fetch(process.env.REACT_APP_API_URL+"/users/verify_user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user_data')
        }).then((response) => response.json())
        .then(data => {
            console.log(data)
            if(data.result == 'failed'){
                set_is_auth(false)
                console.log(data)
            }
        })
    }, [])
    //const [data, set_data] = useState(JSON.parse(localStorage.getItem('user_data')))
    //console.log(data)
    return(
        <Router>
            {/*login and register routes maybe temporary*/}
            <Routes>
                <Route exact path='/' element={<><App_bar/><div id="main_window"><Side_bar/><Main_container/></div></>}></Route>
                <Route exact path='/login' element={< Login />}></Route>
                <Route exact path='/register' element={< Register />}></Route>
            </Routes>
        </Router>
    );
}







export default App;
