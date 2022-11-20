import Rich_text_input from "./Rich_text_input";
import event_bus from "../events/event_bus";
import { useEffect, useState } from "react";




function Main_container(props) {


    const fetch_messages = (info) => {
        return fetch(process.env.REACT_APP_API_URL+"/message?data="+JSON.stringify(info), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => response.json())
        .then(data => {
            if(data.result == 'failed'){
                
            }else if(data.result == 'success'){
                return data.message
            }
        })
    }

    var info
    const [current_channel, set_current_channel] = useState(props.channels[0])
    const [current_message_array, set_current_message_array] = useState()













    //fetch_messages(data)
    useEffect(() => {   
        //sets current channel messages
        info = JSON.parse(localStorage.getItem('user_data'))
        info.channel_id = props.channels[0].id
        fetch_messages(info).then(ele => set_current_message_array(ele))

        event_bus.on("select_chat", (data) =>{
            props.channels.find((ele, index) => {
                if(ele.id == data.id){
                    set_current_channel(props.channels[index])
                    info = JSON.parse(localStorage.getItem('user_data'))
                    info.channel_id = data.id
                    fetch_messages(info).then(ele => set_current_message_array(ele))
                }
            })
        })
    }, [])




    if(current_message_array) return(
        <div id='main_container'>

        
        

                <div id='main_container_title_bar'>
                    <div id='main_container_title'>{current_channel.name}</div>
                    <div id='main_container_options'>{current_channel.members_count} active memebers later V </div>
                </div>
                <div id='messages_cntainer'>
                    {current_message_array.map((ele, index, arr) => 
                    <div key={ele.id} className=''>


                        {/* display the date div */}
                        {arr[index-1] ? (new Date(ele.created_at).getDay() == new Date(arr[index-1].created_at).getDay() ? 
                                console.log('rgrg')
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
                        {arr[index-1] ? (ele.sender == arr[index-1].sender ? 
                            <p className="message_same_user message_content">e  e bigege bigessage bigessage </p> :
                            <div className="message">
                                <img className='sener_pfp' src="/img.png" alt="unavailable" />
                                <div className='message_data'>
                                    <div className='sender_data'>
                                        <p className='message_user'> {ele.sender_username} </p>
                                        <p className='message_time'> {ele.created_at.substring(11, 16)} </p>
                                    </div>
                                    <p className="message_content"> {ele.message} </p>
                                </div>
                            </div>
                            ) : 
                            <div className="message">
                                <img className='sener_pfp' src="/img.png" alt="unavailable" />
                                <div className='message_data'>
                                    <div className='sender_data'>
                                        <p className='message_user'> {ele.sender_username} </p>
                                        <p className='message_time'> {ele.created_at.substring(11, 16)} </p>
                                    </div>
                                    <p className="message_content"> {ele.message} </p>
                                </div>
                            </div>
                        }
                        
                    </div>
                    )}


                </div>
            






            <Rich_text_input/>




        </div>
    )
}







export default Main_container;