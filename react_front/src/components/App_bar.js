import { Link } from 'react-router-dom';
import { BsSearch, BsSliders, BsFillBellFill, BsPersonSquare, BsX } from "react-icons/bs";
import { useState } from 'react';

function App_bar() {

    const [show_add_notifications ,set_show_add_notifications] = useState(false)
    const hide_show_modal = (e) => {
        if(e.currentTarget == e.target){
            set_show_add_notifications(false)

        }
    }
    return(
        <nav id="nav_bar">

            <Link to={'my_workspaces'}> to workspaces </Link>

            <div id="app_bar_div1">
                <input id="app_bar_search" type="text" placeholder="you can search here "/>
                <BsSliders/>
                <BsSearch/>
            </div>

            {show_add_notifications ?
                <div className='modal show_add_notifications' onClick={hide_show_modal} > 
                    <div id="show_add_notifications">
                        <div> no notifications</div>
                    </div>
                </div>
            : '' } 

            <div id="app_bar_div2">
                <BsFillBellFill onClick={() => {set_show_add_notifications(true)}} />
                <div>
                    <BsPersonSquare/>
                </div>
                {/*<Link to='/login'>login</Link>*/}
            </div>
        
        
        </nav>
    )
}







export default App_bar;