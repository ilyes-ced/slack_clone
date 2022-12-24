import Home_page from './components/Home_page'
import Login from './components/Login'
import Register from './components/Register'
import Front_page from './components/Front_page'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { socket } from './events/socket'
import { useEffect } from 'react'



function App(){

    useEffect(() => {
        if(localStorage.getItem('color_mode') && localStorage.getItem('dark_light_mode')){
            const colors = JSON.parse(localStorage.getItem('color_mode'))
            const dark_light = JSON.parse(localStorage.getItem('dark_light_mode'))
            const root = document.querySelector(':root')


            root.style.setProperty('--color2', dark_light[0]);
            root.style.setProperty('--color3', dark_light[1]);
            root.style.setProperty('--color5', dark_light[3]);
            root.style.setProperty('--color6', dark_light[3]);
            root.style.setProperty('--color7', dark_light[4]);
            
        
            root.style.setProperty('--text-color', colors[2]);
            root.style.setProperty('--color1', colors[3][1]);
            root.style.setProperty('--color4', colors[3][1]);
            root.style.setProperty('--color8', colors[3][2]);
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