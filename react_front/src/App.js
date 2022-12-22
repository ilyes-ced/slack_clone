import Home_page from './components/Home_page'
import Login from './components/Login'
import Register from './components/Register'
import Front_page from './components/Front_page'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { socket } from './events/socket'
import { useEffect } from 'react'



function App(){

    useEffect(() => {
        if(localStorage.getItem('color_mode')){
            const colors = JSON.parse(localStorage.getItem('color_mode'))
            const root = document.querySelector(':root')
            root.style.setProperty('--text-color', colors[2]);
            root.style.setProperty('--color1', colors[3]);
            root.style.setProperty('--color2', colors[4]);
            root.style.setProperty('--color3', colors[5]);
            root.style.setProperty('--color4', colors[6]);
            root.style.setProperty('--color5', colors[7]);
            root.style.setProperty('--color6', colors[8]);
            root.style.setProperty('--color7', colors[9]);
            root.style.setProperty('--color8', colors[10]);
        }
    }, [])

    //socket.on('room_message', (data) => {
    //    alert(JSON.stringify(data))
    //})

    return(
        <Router>
            {/*login and register routes maybe temporary*/}
            <Routes>
                <Route exact path='/' element={<Home_page socket={socket} />}></Route>
                <Route exact path='/login' element={< Login />}></Route>
                <Route exact path='/register' element={< Register />}></Route>
                <Route exact path='/landing_page' element={< Front_page />}></Route>
            </Routes>
        </Router>
    )
}







export default App