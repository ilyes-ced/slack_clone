import Rich_text_input from "./Rich_text_input";
import event_bus from "../events/event_bus";
import { BsPersonSquare, BsPersonPlus, BsX, BsFiles } from "react-icons/bs";
import { useEffect, useState, useRef, useMemo } from "react";
import ReactTooltip from 'react-tooltip';



function Main_container(props) {



    function useIsInViewport(ref) {
        const [isIntersecting, setIsIntersecting] = useState(false);
      
        const observer = useMemo(
            () => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting)),
          []
        )
      
        useEffect(() => {
            observer.observe(ref.current)
              return () => {
                  observer.disconnect()
            }
        }, [ref, observer])
        if(isIntersecting && allow_loading_messages){
            info = JSON.parse(localStorage.getItem('user_data'))
            info.channel_id = current_channel.id
            info.channel_type = current_channel_type
            info.messages_stage = messages_stage
    
            fetch(process.env.REACT_APP_API_URL+"/message/get_more?data="+JSON.stringify(info), {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => response.json())
            .then(data => {
                console.log(data)
                if(data.result == 'success'){
                    set_current_message_array([...data.message, ...current_message_array])
                    console.log(data.message)
                    console.log('(//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////)')
                }
            })
            set_allow_loading_messages(false)
            set_messages_stage(messages_stage+1)
            setTimeout(() => {
                set_allow_loading_messages(true)
            }, 2000)
        }
        return isIntersecting
      }

    const fetch_messages = (info, channel_type = 'channel') => {
        return fetch(process.env.REACT_APP_API_URL+"/message/"+channel_type+"?data="+JSON.stringify(info), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => response.json())
        .then(data => {
            if(data.result == 'failed'){
                
            }else if(data.result == 'success'){
                console.log(data.message)
                return data.message
            }
        })
    }

    var info
    const [messages_stage, set_messages_stage] = useState(1)
    const [allow_loading_messages, set_allow_loading_messages] = useState(false)
    setTimeout(() => {
        set_allow_loading_messages(true)
    }, 2000)
    const [current_channel, set_current_channel] = useState(props.channels[0])
    const [current_channel_type, set_current_channel_type] = useState('channel')
    const [current_message_array, set_current_message_array] = useState([])
    const [add_member_modal, set_add_member_modal] = useState(false)
    const [active_invitation_method, set_active_invitation_method] = useState([true, false])
    const [list_of_emails, set_list_of_emails] = useState([])
    const div_bottom = useRef(null);
    const div_top = useRef(null);
    const channel_id = useRef(current_channel.id);
    const channel_type = useRef(current_channel_type);

    const isInViewport1 = useIsInViewport(div_top);

    const hide_show_modal = (e) => {
        if(e.currentTarget == e.target){
            set_add_member_modal(false)

        }
    }

    const inputed_email = (e) => {
        console.log(e.key)
        if(e.key == " "){
            e.preventDefault()
            if(/\S+@\S+\.\S+/.test(e.target.innerText)){
                set_list_of_emails([...list_of_emails, e.target.innerText])
                e.target.innerText = ''
            }
        }
    }

    const invite_emails = () => {
        fetch(process.env.REACT_APP_API_URL+"/invitaion/workspace", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_data: localStorage.getItem('user_data'), emails: JSON.stringify(list_of_emails), workspace: localStorage.getItem('active_workspace')})
        }).then((response) => response.json())
        .then(data => {
            if(data.result == 'failed'){
                
            }else if(data.result == 'success'){
                console.log(data.message)
                return data.message
            }
        })
    }


    //fetch_messages(data)
    useEffect(() => {  
         
        //sets current channel messages
        info = JSON.parse(localStorage.getItem('user_data'))
        info.channel_id = props.channels[0].id
        fetch_messages(info).then(ele => set_current_message_array(ele))

        setTimeout(() => {
            div_bottom.current?.scrollIntoView({behavior: 'smooth'})
        }, 100);

        event_bus.on("select_chat", (data) =>{
            console.log(data)
            if(data.type == 'channel'){
                props.channels.find((ele, index) => {
                    console.log(ele)
                    console.log('/////////////////////////////////')
                    if(ele.id == data.id){
                        set_current_channel(props.channels[index])
                        set_current_channel_type('channel')
                        info = JSON.parse(localStorage.getItem('user_data'))
                        info.channel_id = data.id
                        fetch_messages(info, data.type).then(ele => set_current_message_array(ele))
                        setTimeout(() => {
                            div_bottom.current?.scrollIntoView({behavior: 'smooth'})
                        }, 100);
                        return
                    }
                })
            }else{
                props.users_channels.find((ele, index) => {
                    if(ele.id == data.id){
                        set_current_channel(props.users_channels[index])
                        set_current_channel_type('chat')
                        info = JSON.parse(localStorage.getItem('user_data'))
                        info.channel_id = data.id
                        fetch_messages(info, data.type).then(ele => set_current_message_array(ele))
                        setTimeout(() => {
                            div_bottom.current?.scrollIntoView({behavior: 'smooth'})
                        }, 100);
                        return
                    }
                })
            }
            
        })



        props.socket.on('room_message', (data) => {
            if(channel_id.current == data.data.channel && channel_type.current == 'channel'){
                set_current_message_array(prev => [...prev, data.data])
                //timeout because setstate is async
                setTimeout(() => {
                    div_bottom.current?.scrollIntoView({behavior: 'smooth'})
                }, 100);
            }else{
                document.getElementById('channel-element_'+data.data.channel).style.color = 'red'
            }
        })

        props.socket.on('chat_message', (data) => {
            if(channel_id.current == data.data.conversation && channel_type.current == 'chat'){
                set_current_message_array(prev => [...prev, data.data])
                setTimeout(() => {
                    div_bottom.current?.scrollIntoView({behavior: 'smooth'})
                }, 100);
            }else{
                document.getElementById('chat-element_'+data.data.conversation).style.color = 'red'
            }
        })  


    }, [])

    useEffect(() => {
        channel_id.current = current_channel.id
        channel_type.current = current_channel_type
    }, [current_channel])
    useEffect(() => {        
        //div_bottom.current?.scrollIntoView({behavior: 'smooth'})
    }, [current_message_array])


    if(current_message_array) {
        return(
            <div id='main_container'>
            <ReactTooltip effect='solid' />



            {add_member_modal ? 
                <div className="modal " onClick={hide_show_modal}>
                    <div id="add_member_modal">
                        <div>
                            <h1>Add new members</h1>
                            <BsX onClick={() => {set_add_member_modal(!add_member_modal)}}/>
                        </div>
                        <div>
                            <div style={{ borderBottom: active_invitation_method[0] ? '2px red solid' : 'none'}} onClick={() => {set_active_invitation_method([true, false])}} >add member</div>
                            <div style={{ borderBottom: active_invitation_method[1] ? '2px red solid' : 'none'}} onClick={() => {set_active_invitation_method([false, true])}} >invitaion link</div>
                        </div>

                        <div>
                            <div style={{display: active_invitation_method[0] ? 'block' : 'none'}}>
                                <div>
                                    {list_of_emails.map((ele, ind) => 
                                        <div  className="email_box" >
                                            <div contentEditable='true' key={ind} > {ele} </div>
                                            <div onClick={() => {set_list_of_emails(list_of_emails.filter(element => element != ele ))}} ><BsX/></div>
                                        </div>
                                    )}
                                </div>
                                <div contentEditable='true' onKeyDown={inputed_email} ></div>
                                <div>
                                    <div>
                                        { list_of_emails.length == 0 ? "" : <button onClick={() => {set_list_of_emails([])}}>clear all elments</button>}
                                    </div>
                                    <button disabled={ list_of_emails.length == 0 ? true : false } onClick={invite_emails} >send</button>
                                </div>
                            </div>
                            <div style={{display: active_invitation_method[1] ? 'block' : 'none'}}>
                                <div>
                                    <div> d </div>
                                    <div><BsFiles/></div>
                                </div>
                                <button  >confirm</button>
                            </div>
                        </div>

                    </div>
                </div>
            : ""}

                <div id='main_container_title_bar'>
                    <div id='main_container_title'>{current_channel.name == null ? JSON.parse(localStorage.getItem('user_data')).username : current_channel.name}</div>
                    <div id='main_container_options'>
                        <div data-tip="Members of this workspace">
                            <BsPersonSquare className='person_icon' /> 
                            <p>{props.workspace.members_count}</p>
                        </div>
                        <div data-tip="Add new members" onClick={() => {set_add_member_modal(true)}}>
                            <BsPersonPlus className='person_icon' /> 
                        </div>
                    </div>
                </div>

                <div id='messages_cntainer'>
                    
                    <div ref={div_top}>Top div {isInViewport1 && '| in viewport ✅'}</div>

                    {current_message_array.map((ele, index, arr) => 
                    <div key={ele.id} className=''>

                        {/* display the date div */}
                        {arr[index-1] ? (new Date(ele.created_at).getDay() == new Date(arr[index-1].created_at).getDay() ? 
                                ''
                            : 
                            <div className="period_of_messages_button_div">
                                <button className="period_of_messages_button">{ele.created_at.substring(0, 10)}</button>
                            </div>
                        ) : 
                        <div className="period_of_messages_button_div">
                            <button className="period_of_messages_button">{ele.created_at.substring(0, 10)}</button>
                        </div>
                        }


                        {/* display the message div */}
                        {arr[index-1] ? ( ele.sender == arr[index-1].sender ? 
                            <div className="message_same_user message_content">
                                <div dangerouslySetInnerHTML={{ __html: ele.message }} />
                            </div> 
                            :
                            <div className="message">
                                <img className='sener_pfp' src="/img.png" alt="unavailable" />
                                <div className='message_data'>
                                    <div className='sender_data'>
                                        <a  href='www.google.com' className='message_user'> {ele.sender_username} </a>
                                        <p className='message_time'> {ele.created_at.substring(11, 16)} </p>
                                    </div>
                                    <div className="message_content">
                                        <div dangerouslySetInnerHTML={{ __html: ele.message }} />
                                    </div>
                                </div>
                            </div> )
                            : 
                            <div className="message">
                                <img className='sener_pfp' src="/img.png" alt="unavailable" />
                                <div className='message_data'>
                                    <div className='sender_data'>
                                        <a  href='www.google.com' className='message_user'> {ele.sender_username} </a>
                                        <p className='message_time'> {ele.created_at.substring(11, 16)} </p>
                                    </div>
                                    <div className="message_content">
                                        <div dangerouslySetInnerHTML={{ __html: ele.message }} />
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                    )}
                    <div ref={div_bottom} />
                </div>

                <Rich_text_input socket={props.socket} current_channel={ current_channel.id } current_channel_type={ current_channel_type } />

            </div>
        )}else{
        return(' eytrfedzxerctvbhui,;lnhbgvfcdsxdcfgbhjlmyou')
    }
}







export default Main_container;