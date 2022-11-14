import Home_page from './components/Home_page'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';


const socket = io();

function App(){

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null); 
    //const [data, set_data] = useState(JSON.parse(localStorage.getItem('user_data')))
    //console.log(data)

    useEffect(() => {
        socket.on('connection', () => {
            alert(true);
        })
    }, [])

    return(
        <Router>
            {/*login and register routes maybe temporary*/}
            <Routes>
                <Route exact path='/' element={<Home_page/>}></Route>
                <Route exact path='/login' element={< Login />}></Route>
                <Route exact path='/register' element={< Register />}></Route>
            </Routes>
        </Router>
    );
}







export default App;
