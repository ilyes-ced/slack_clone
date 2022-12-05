import Rich_text_input from "./Rich_text_input";
import event_bus from "../events/event_bus";
import { BsPersonSquare, BsPersonPlus } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import ReactTooltip from 'react-tooltip';



function Main_container(props) {


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
    const [current_channel, set_current_channel] = useState(props.channels[0])
    const [current_channel_type, set_current_channel_type] = useState('channel')
    const [current_message_array, set_current_message_array] = useState([])
    const div_bottom = useRef(null);
    const channel_id = useRef(current_channel.id);
    const channel_type = useRef(current_channel_type);





 


    //fetch_messages(data)
    useEffect(() => {   
        //sets current channel messages
        info = JSON.parse(localStorage.getItem('user_data'))
        info.channel_id = props.channels[0].id
        fetch_messages(info).then(ele => set_current_message_array(ele))

        event_bus.on("select_chat", (data) =>{
            if(data.type == 'channel'){
                props.channels.find((ele, index) => {
                    if(ele.id == data.id){
                        set_current_channel(props.channels[index])
                        set_current_channel_type('channel')
                        info = JSON.parse(localStorage.getItem('user_data'))
                        info.channel_id = data.id
                        fetch_messages(info, data.type).then(ele => set_current_message_array(ele))
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
                        return
                    }
                })
            }
            
        })



        props.socket.on('room_message', (data) => {
            if(channel_id.current == data.data.channel && channel_type.current == 'channel'){
                set_current_message_array(prev => [...prev, data.data])
            }else{
                document.getElementById('channel-element_'+data.data.channel).style.color = 'red'
            }
        })

        props.socket.on('chat_message', (data) => {
            if(channel_id.current == data.data.conversation && channel_type.current == 'chat'){
                set_current_message_array(prev => [...prev, data.data])
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
        div_bottom.current?.scrollIntoView({behavior: 'smooth'})
    }, [current_message_array])


    if(current_message_array) {
        return(
            <div id='main_container'>
            <ReactTooltip effect='solid' />




                <div id='main_container_title_bar'>
                    <div id='main_container_title'>{current_channel.name == null ? JSON.parse(localStorage.getItem('user_data')).username : current_channel.name}</div>
                    <div id='main_container_options'>
                        <div data-tip="Members of this workspace">
                            <BsPersonSquare className='person_icon' /> 
                            <p>{props.workspace.members_count}</p>
                        </div>
                        <div data-tip="Add new members">
                            <BsPersonPlus className='person_icon' /> 
                        </div>
                    </div>
                </div>

                <div id='messages_cntainer'>
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