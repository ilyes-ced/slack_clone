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

            console.log(colors)
            console.log(dark_light)

            root.style.setProperty('--color2', dark_light[1]);
            root.style.setProperty('--color3', dark_light[2]);
            root.style.setProperty('--color5', dark_light[3]);
            root.style.setProperty('--color6', dark_light[4]);
            root.style.setProperty('--color7', dark_light[5]);
            if(dark_light[0] == "dark"){
                root.style.setProperty('--text-color', 'white');
            }else{
                root.style.setProperty('--text-color', 'dark');
            }
            
        
            root.style.setProperty('--color1', colors[3][1]);
            root.style.setProperty('--color4', colors[3][1]);
            root.style.setProperty('--color8', colors[3][2]);
        }else{
            localStorage.setItem('dark_light_mode', JSON.stringify(['dark', '#14101a', '#1a1d21','#222529', '#313337', 'rgba(150,150,150,0.7)']))
            localStorage.setItem('color_mode', JSON.stringify( [0, 'name here', 'too lazy to change order', ['#6715eb', '#8544ef', '#503e6d']]))
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