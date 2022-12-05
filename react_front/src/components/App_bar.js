import { Link } from 'react-router-dom';
import { BsSearch, BsSliders, BsFillBellFill } from "react-icons/bs";

function App_bar() {
    return(
        <nav id="nav_bar">

            <Link to={'my_workspaces'}> to workspaces </Link>

            <div id="app_bar_div1">
                <input id="app_bar_search" type="text" placeholder="you can search here "/>
                <BsSliders/>
                <BsSearch/>
            </div>



            <div id="app_bar_div2">
                <BsFillBellFill/>
                <img className='sener_pfp' src="/img.png" alt="unavailable" />
                {/*<Link to='/login'>login</Link>*/}
            </div>
        
        
        </nav>
    )
}







export default App_bar;