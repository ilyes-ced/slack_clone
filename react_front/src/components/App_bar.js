import { Link } from 'react-router-dom';

function App_bar() {
    return(
        <nav id="nav_bar">


            <div id="app_bar_div1">
                <input id="app_bar_search" type="text" placeholder="you can search here"/>
            </div>



            <div id="app_bar_div2">
                <img className='sener_pfp' src="/img.png" alt="unavailable" />
                {/*<Link to='/login'>login</Link>*/}
            </div>
        
        
        </nav>
    )
}







export default App_bar;