import App_bar from './components/App_bar'
import Side_bar from './components/Side_bar'
import Main_container from './components/Main_container'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';




function App(){
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
