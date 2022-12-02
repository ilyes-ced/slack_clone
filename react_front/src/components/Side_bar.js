import { useState, useRef } from "react";
import { BsPencilSquare, BsCaretDownFill, BsThreeDotsVertical, BsPlus, BsHash, BsPersonSquare } from "react-icons/bs";
import event_bus from "../events/event_bus";
import ReactTooltip from 'react-tooltip';

function Side_bar(props) {

    const [show_add_channel, set_show_add_channel] = useState(false)
    const [show_child_icons, set_show_child_icons] = useState(false)
    const new_channel = useRef(null)
    const hide_show_modal = (e) => {
        if(e.currentTarget == e.target)
        set_show_add_channel(!show_add_channel)
    }

    const change_chat = (e) => {
        if(e.target.classList.contains('channels_elements')){
            event_bus.dispatch("select_chat", { type:'channel' , id: e.target.id.split('_')[1] });
        }else{
            event_bus.dispatch("select_chat", { type:'chat' , id: e.target.id.split('_')[1] });
        }
    }
    const add_channel = () => {
        console.log(JSON.stringify({user_data: localStorage.getItem('user_data'), workspace_id: props.workspace.id, new_channel: new_channel.current.value}))
        fetch(process.env.REACT_APP_API_URL+"/channel/create", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_data: localStorage.getItem('user_data'), workspace_id: props.workspace.id, new_channel: new_channel.current.value})
        }).then((response) => response.json())
        .then(data => {
            alert(JSON.stringify(data))
        })
    }

    return(
        <div id='side_bar'>
            <ReactTooltip effect='solid' />


            <div className='side_bar_elements'  id='workspace_div'>
                <div>
                    {props.workspace.name}
                </div>
                <div>
                    <BsPencilSquare data-tip="hello world" />
                </div>
            </div>


            <div id='side_bar_options' className='side_bar_elements' >
                <div className='options_elements side_bar_sub_elements'>setting1</div>
                <div className='options_elements side_bar_sub_elements'>s 2</div>
                <div className='options_elements side_bar_sub_elements'> s3</div>
            </div>


            <div id='side_bar_channels' className='side_bar_elements' >
                <div onMouseEnter={() => {set_show_child_icons(true)}} onMouseLeave={() => set_show_child_icons(false )}  onClick={() => {set_show_add_channel(!show_add_channel)}} className='side_bar_sub_elements' id='channels_title_element'>
                    <div>
                        <div><BsCaretDownFill /></div>
                        <p>Channels</p>
                    </div>
                    <div>
                        {show_child_icons ? <><div><BsThreeDotsVertical/></div><div><BsPlus/></div></> : ''}
                        
                    </div>
                </div>
                {props.channels.map(element => <div key={ element.id } onClick={change_chat} className='channels_elements side_bar_sub_elements' id={"channel-element_"+element.id} >
                    <div>  <BsHash/>  </div>
                    <p>{element.name}</p>
                </div> )}
            </div>



            {/* created channel modal */}
            { show_add_channel ? 
                <div className='modal' onClick={hide_show_modal} > 
                    <div className='modal_content'> 
                        <input ref={new_channel}  type="text" />
                        <button onClick={add_channel}>
                            submit
                        </button>
                    </div>
                    
                </div>
            : console.log('gg') }
            
            


            <div id='side_bar_chats' className='side_bar_elements' >
                <div className='chats_elements side_bar_sub_elements' onClick={change_chat} >options here</div>
                {props.users_channels.map(element => <div key={ element.id } onClick={change_chat} className='users_channels_elements side_bar_sub_elements' id={"chat-element_"+element.id} >
                    <div><BsPersonSquare/></div>
                    <p>{element.name == null ? JSON.parse(localStorage.getItem('user_data')).username : element.name }</p>
                </div> )}
                
            </div>
        
        
        
        </div>
    )
}







export default Side_bar;