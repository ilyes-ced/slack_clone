import Home_page from './components/Home_page'
import Login from './components/Login'
import Register from './components/Register'
import Workspaces_page from './components/Workspaces_page'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { socket } from './events/socket'



function App(){

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
                <Route exact path='/my_workspaces' element={< Workspaces_page />}></Route>
            </Routes>
        </Router>
    )
}







export default App