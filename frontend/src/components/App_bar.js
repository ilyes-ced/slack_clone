import { Link } from 'react-router-dom';
import { BsSearch, BsSliders, BsFillBellFill, BsPersonSquare, BsClockHistory, BsBoxArrowLeft, BsChevronDown } from "react-icons/bs";
import { useState } from 'react';

function App_bar() {

    const [show_add_notifications ,set_show_add_notifications] = useState(false)
    const [show_profile ,set_show_profile] = useState(false)
    const hide_show_modal = (e) => {
        if(e.currentTarget == e.target){
            set_show_add_notifications(false)
            set_show_profile(false)

        }
    }
    return(
        <nav id="nav_bar">

            <div id="app_bar_div1">
                <BsClockHistory/>
                <input id="app_bar_search" type="text" placeholder="doesnt work dont touch"/>
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

            {show_profile ?
                <div className='modal show_profile' onClick={hide_show_modal} > 
                    <div id="show_profile">
                        <div> profile settings </div>
                        <div className='divider'></div>
                        <div onClick={() => { localStorage.removeItem('user_data');  window.location.reload() }} > <BsBoxArrowLeft/> logout </div>
                    </div>
                </div>
            : '' } 

            <div id="app_bar_div2">
                <BsFillBellFill onClick={() => {set_show_add_notifications(true)}} />
                <div>
                    <img style={{borderRadius: '5px'}} src={JSON.parse(localStorage.getItem('user_data')).profile_image ? 'images/'+JSON.parse(localStorage.getItem('user_data')).profile_image : 'images/default_user.jpg' } alt="" />
                </div>
                <div style={{ paddingRight: '10px', paddingLeft: '10px', cursor: 'pointer', display: 'flex', alignItems:'center' }}  onClick={() => {set_show_profile(true)}} >
                    {JSON.parse(localStorage.getItem('user_data')).username}
                    <BsChevronDown style={{ marginLeft: '10px' }} />
                </div>
                {/*<Link to='/login'>login</Link>*/}
            </div>
        
        
        </nav>
    )
}







export default App_bar;