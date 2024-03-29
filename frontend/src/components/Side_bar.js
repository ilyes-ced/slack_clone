import { useState, useRef } from "react";
import { BsPencilSquare, BsCaretDownFill, BsThreeDotsVertical, BsPlus, BsHash, BsPersonSquare, BsLockFill, BsX, BsChevronDown, BsChevronRight } from "react-icons/bs";
import event_bus from "../events/event_bus";
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

const colors = [
    //[0, 'name here', 'white', '#6715eb', '#14101a', '#1a1d21', '#8544ef', '#222529', '#313337', 'rgba(150,150,150,0.7)', '#503e6d'],
    
    [0, 'name here', 'too lazy to change order', ['#6715eb', '#8544ef', '#503e6d']],
    [1, 'name here', 'too lazy to change order', ['#4a154b', '#6d436e', '#3a2d3b']],
    [2, 'name here', 'too lazy to change order', ['#d53c9f', '#ad327f', '#6bc9ff']],
    [3, 'name here', 'too lazy to change order', ['#1f57e7', '#4c79ec', '#ffc806']],
]
const dark_light = [
    ['dark', '#14101a', '#1a1d21','#222529', '#313337', 'rgba(150,150,150,0.7)'],
    ['light', '#ebefe5', '#e5e2de','#dddad6', '#ceccc8', 'rgba(105,105,105,0.7)']
]

function Side_bar(props) {
    const [enabled, set_enabled] = useState(false);
    const [current_dark_light_mode, set_current_dark_light_mode] = useState(JSON.parse(localStorage.getItem('dark_light_mode')));
    const [rotate, set_rotate] = useState(false);
    const [rotate2, set_rotate2] = useState(false);
    const [show_channels, set_show_channels] = useState(true);
    const [show_chats, set_show_chats] = useState(true);
    const [show_add_channel, set_show_add_channel] = useState(false)
    const [open_workspace_modal, set_open_workspace_modal] = useState(false)
    const [show_add_chat, set_show_add_chat] = useState(false)
    const [show_child_icons, set_show_child_icons] = useState(false)
    const [show_child_icons2, set_show_child_icons2] = useState(false)
    const [public_private, set_public_private] = useState(false)
    const [submenu1, set_submenu1] = useState(false)
    const [submenu2, set_submenu2] = useState(false)
    const [custom_modal, set_custom_modal] = useState(false)

    const new_channel = useRef(null)
    const email_invite = useRef(null)
    const new_channel_desc = useRef(null)
    const hide_show_modal = (e) => {
        if(e.currentTarget == e.target){
            set_custom_modal(false)
            set_show_add_channel(false)
            set_show_add_chat(false)
            set_open_workspace_modal(false)
            set_submenu2(false)
            set_submenu1(false)
        }
    }
    const change_dark_light_theme = (col) => {

        const root = document.querySelector(':root')
        if(col == 'dark'){
            root.style.setProperty('--text-color', "white");
            root.style.setProperty('--color2', dark_light[0][1]);
            root.style.setProperty('--color3', dark_light[0][2]);
            root.style.setProperty('--color5', dark_light[0][3]);
            root.style.setProperty('--color6', dark_light[0][4]);
            root.style.setProperty('--color7', dark_light[0][5]);
            localStorage.setItem('dark_light_mode', JSON.stringify(dark_light[0]))
            set_current_dark_light_mode(dark_light[0])
        }else if (col == 'light'){
            root.style.setProperty('--text-color', "black");
            root.style.setProperty('--color2', dark_light[1][1]);
            root.style.setProperty('--color3', dark_light[1][2]);
            root.style.setProperty('--color5', dark_light[1][3]);
            root.style.setProperty('--color6', dark_light[1][4]);
            root.style.setProperty('--color7', dark_light[1][5]);
            localStorage.setItem('dark_light_mode', JSON.stringify(dark_light[1]))
            set_current_dark_light_mode(dark_light[1])
        }
    }
    const change_color_theme = (id) => {
        const root = document.querySelector(':root')
        root.style.setProperty('--color1', colors[id][3][0]);
        root.style.setProperty('--color4', colors[id][3][1]);
        root.style.setProperty('--color8', colors[id][3][2]);
        localStorage.setItem('color_mode', JSON.stringify(colors[id]))
    }

    const send_invite = () => {
        if(/\S+@\S+\.\S+/.test(email_invite.current.value)){
            fetch(process.env.REACT_APP_API_URL+"/invitaion/user", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({user_data: localStorage.getItem('user_data'), email: email_invite.current.value})
            }).then((response) => response.json())
            .then(data => {
                if(data.result == 'failed'){
                    
                }else if(data.result == 'success'){
                    console.log(data.message)
                    return data.message
                }
            })
        }
    }
    const change_chat = (e) => {
        if(e.target.classList.contains('channels_elements')){
            document.getElementsByClassName('avtive_channel')[0].classList.remove('avtive_channel')
            e.target.classList.add('avtive_channel')
            event_bus.dispatch("select_chat", { type:'channel' , id: e.target.id.split('_')[1] });
        }else{
            event_bus.dispatch("select_chat", { type:'chat' , id: e.target.id.split('_')[1] });
        }
    }
    const add_channel = () => {
        console.log(JSON.stringify({user_data: localStorage.getItem('user_data'), workspace_id: props.workspace.id, new_channel: new_channel.current.value, new_channel_desc: new_channel_desc.current.value, public_private: public_private}))
        fetch(process.env.REACT_APP_API_URL+"/channel/create", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_data: localStorage.getItem('user_data'), workspace_id: props.workspace.id, new_channel: new_channel.current.value, new_channel_desc: new_channel_desc.current.value, public_private: public_private})
        }).then((response) => response.json())
        .then(data => {
            console.log(JSON.stringify(data))
            if(data.result == 'success'){
                props.set_channels([...props.channels,data.message])
                set_show_add_channel(false)
            }
        })
    }

    return(
        <div id='side_bar'>
            <ReactTooltip effect='solid' />


            <div className='side_bar_elements' onClick={() => { set_open_workspace_modal(!open_workspace_modal) }} id='workspace_div'>
                <div>
                    {props.workspace.name}
                </div>
                <div>
                    <BsChevronDown/>
                </div>
                <div>
                    <BsPencilSquare data-tip="hello world" />
                </div>
            </div>


            <div id='side_bar_options' className='side_bar_elements' >
                <div className='options_elements side_bar_sub_elements'>settings</div>
                <div className='options_elements side_bar_sub_elements'>New messages</div>
                <div className='options_elements side_bar_sub_elements'>Drafts</div>
            </div>


            <div id='side_bar_channels' className='side_bar_elements' >
                <div onMouseEnter={() => {set_show_child_icons(true)}} onMouseLeave={() => set_show_child_icons(false )}  className='side_bar_sub_elements' id='channels_title_element'>
                    <div>
                        <div onClick={() => {set_rotate(!rotate); set_show_channels(!show_channels)}}><BsCaretDownFill style={{ transform: rotate ? "rotate(-90deg)" : "rotate(0)", transition: "all 0.2s linear" }}  /></div>
                        <p>Channels</p>
                    </div>
                    <div>
                        {show_child_icons ? <>
                            <div>
                                <BsThreeDotsVertical  />
                            </div>
                            {props.workspace.owner == JSON.parse(localStorage.getItem('user_data')).id ? <div onClick={() => {set_show_add_channel(!show_add_channel)}} ><BsPlus /> </div>: "" }
                            
                        </> : ''}
                    </div>
                </div>
                {props.channels.map((element, ind) => show_channels ? <div key={ element.id } onClick={change_chat} className={ind == 0 ? 'avtive_channel channels_elements side_bar_sub_elements' :'channels_elements side_bar_sub_elements'} id={"channel-element_"+element.id} >
                    <div> {element.public ==  'private' ? <BsLockFill/> : <BsHash/> }     </div>
                    <p>{element.name}</p>
                </div> : '' )}
            </div>
            

            {custom_modal ? 
                <div className='modal custom_modal' onClick={hide_show_modal} > 
                    <div id="custom_modal">
                        <div>
                            <h1>Customize</h1>
                            <BsX onClick={() => {set_show_add_channel(!show_add_channel)}}/>
                        </div>
                        <div>
                            <div onClick={() => {change_dark_light_theme("dark")}}>
                                <div>
                                    <BsPersonSquare/>
                                    <div>
                                        <div> <strong>Alex</strong> 9:23 </div>
                                        <div> hi, how are you doing </div>
                                    </div>
                                </div>
                                <div></div>
                                <div> <input type='radio' />dark mode</div>
                            </div>
                            <div onClick={() => {change_dark_light_theme("light")}}>
                                <div>
                                    <BsPersonSquare/>
                                    <div>
                                        <div> <strong>Alex</strong> 9:23 </div>
                                        <div> hi, how are you doing </div>
                                    </div>
                                </div>
                                <div></div>
                                <div> <input type='radio' />light mode</div>
                            </div>
                        </div>
                        <div>
                            {colors.map(ele =>
                                <div key={ele[0]} onClick={() => {change_color_theme(ele[0])}} >
                                    <div style={{backgroundColor : ele[3][0]}}>
                                        <div style={{backgroundColor : ele[3][1]}}></div>
                                        <div style={{backgroundColor : current_dark_light_mode[0] == 'dark' ? 'white' : 'black'}}></div>
                                    </div>
                                    <div style={{backgroundColor : current_dark_light_mode[1]}}>
                                        <div ><div style={{backgroundColor : current_dark_light_mode[5]}}></div></div>
                                        <div><BsHash/><div style={{backgroundColor : current_dark_light_mode[5]}}></div></div>
                                        <div style={{backgroundColor : ele[3][1]}}><BsHash/><div style={{backgroundColor : current_dark_light_mode[5]}}></div></div>
                                        <div><div style={{backgroundColor : ele[3][0]}}></div><div></div><div style={{backgroundColor : ele[3][2]}}></div></div>
                                    </div>
                                    <div>
                                        <input type='radio'/>
                                        {ele[1]}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            : ""}


            {open_workspace_modal ? 
                <div className='modal workspace_modal' onClick={hide_show_modal} > 
                    <div id="workspace_modal">
                        <div>
                            <div>
                                this workspace name 
                            </div>
                            <div>
                                <div>members</div>
                                <div>active mmebers</div>
                            </div>
                        </div>

                        <div>
                            <div>invite people</div>
                            <div>create channel</div>
                        </div>

                        <div>
                            <div onClick={() => {set_open_workspace_modal(false); set_submenu1(false); set_submenu2(false); set_custom_modal(true)}}>
                                custimize appearance
                            </div>
                            <div onMouseEnter={() => {set_submenu1(true); set_submenu2(false)}}  >
                                <div>
                                    settings
                                </div>
                                <div>
                                    <BsChevronRight/>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div onMouseEnter={() => {set_submenu2(true); set_submenu1(false)}}  >
                                <div>
                                    my workspaces c
                                </div>
                                <div>
                                    <BsChevronRight/>
                                </div>
                            </div>
                        </div>
                        
                        <div></div>
                    </div>
                </div>
            : "" }

            <div style={{display: submenu1 ? 'block' : 'none' }} className='submenu' id='first_submenu' onMouseLeave={() => {set_submenu1(false)}}>
                <div id='settings_list'>
                        <div>workspace settings</div>
                        <div>customize appearance</div>
                        <div>manage memebers</div>
                </div>
            </div>

            <div style={{display: submenu2 ? 'block' : 'none' }} className='submenu' id='second_submenu' onMouseLeave={() => {set_submenu2(false)}}>
                <div id='workspaces_list'>
                    
                    <div onClick={() => {}}>create new space</div>
                    
                    {props.all_workspaces.map(ele => <div onClick={() => {localStorage.setItem('active_workspace', ele.id); window.location.reload(false) }} >{ele.name}</div> )}
                </div>
            </div>


            
            {/* created channel modal */}
            { show_add_channel ? 
                <div className='modal' onClick={hide_show_modal} > 
                    <div id="add_channel_modal">
                        <div>
                            <h1>Create a new channel</h1>
                            <BsX onClick={() => {set_show_add_channel(!show_add_channel)}}/>
                        </div>
                        <div>
                            <p>Channels are where your team communicates. They're best when organized around a topic — #marketing, for example.</p>
                            <label>name</label>
                            <div>
                                {public_private ? <BsLockFill/> : <BsHash/> } 

                                <input ref={new_channel} onChange={() => { new_channel.current.value == "" ? set_enabled(true) : set_enabled(false)}} placeholder='put that icon inside input div'  type="text" required/>
                                <div>2 0</div>
                            </div>
                        </div>
                        <div>
                            <label>description (optional)</label>
                            <input ref={new_channel_desc} type="text" />
                            <span>what this channel is about</span>
                        </div>
                        <div>
                            <p>
                                <h3>Make private</h3>
                                This can't be undone. A private channel cannot be made public later on.
                            </p>
                            <div>
                                <label class="switch">
                                    <input onChange={() => {set_public_private(!public_private)}} type="checkbox" />
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <button onClick={add_channel} disabled={enabled}>submit</button>
                        </div>
                    </div>
                    
                </div>
            : '' }
            
            
            {show_add_chat ?
                <div className='modal' onClick={hide_show_modal} > 
                    <div id="add_chat_modal">
                        <div>
                            <h1>Add a new contact</h1>
                            <BsX onClick={() => {set_show_add_chat(!show_add_chat)}}/>
                        </div>
                        <div >
                            <input ref={email_invite} type='text' placeholder='email' />
                            <button onClick={send_invite} >send</button>
                        </div>
                    </div>
                </div>
            : '' } 

            <div id='side_bar_chats' className='side_bar_elements' >
                <div onMouseEnter={() => {set_show_child_icons2(true)}} onMouseLeave={() => set_show_child_icons2(false )}  className='side_bar_sub_elements' id='users_channels_title_element'>
                    <div>
                        <div onClick={() => {set_rotate2(!rotate2); set_show_chats(!show_chats)}}><BsCaretDownFill style={{ transform: rotate2 ? "rotate(-90deg)" : "rotate(0)", transition: "all 0.2s linear" }}  /></div>
                        <p>Chats</p>
                    </div>
                    <div  >
                        {show_child_icons2 ? <><div><BsThreeDotsVertical  /></div><div onClick={() => {set_show_add_chat(!show_add_chat)}} ><BsPlus /></div></> : ''}
                    </div>
                </div>
                {props.users_channels.map(element => show_chats ? <div key={ element.id } onClick={change_chat} className='users_channels_elements side_bar_sub_elements'  id={"chat-element_"+element.id} >
                    <div><BsPersonSquare/></div>
                    <p>{element.name == null ? JSON.parse(localStorage.getItem('user_data')).username : element.name }</p>
                </div> : '' )}
                
            </div>
        
        
        
        </div>
    )
}







export default Side_bar;