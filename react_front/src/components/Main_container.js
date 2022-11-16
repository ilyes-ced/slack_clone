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
            console.log(data)
            if(data.result == 'failed'){
                
            }else if(data.result == 'success'){
                console.log(data.message)
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

         
                    {current_message_array.map(ele => 
                        <div key={ele.id} className='period_of_messages'>
                        <div className="period_of_messages_button_div">
                            <button className="period_of_messages_button">date here</button>
                        </div>
                        <div className="message">
                            <img className='sener_pfp' src="/img.png" alt="unavailable" />
                            <div className='message_data'>
                                <div className='sender_data'>
                                    <p className='message_user'>username</p>
                                    <p className='message_time'>time</p>
                                </div>
                                <p className="message_content"> {ele.message} </p>
                            </div>
                        </div>
                        <div className='message_same_user'>
                            <p className="message_content">e  e bigege bigessage bigessage </p>
                            <p className="message_content">e  e bigege bigessage bigessage </p>
                            <p className="message_content">e  e bigege bigessage bigessage </p>
                            <p className="message_content">e  e bigege bigessage bigessage </p>
                            <p className="message_content">e  e bigege bigessage bigessage </p>
                            <p className="message_content">e  e bigege bigessage bigessage </p>
                            <p className="message_content">e  e bigege bigessage bigessage </p>
                            <p className="message_content">e  e bigege bigessage bigessage </p>
                            <p className="message_content">e  e bigege bigessage bigessage </p>
                            <p className="message_content">e  e bigege bigessage bigessage </p>
                            <p className="message_content">e  e bigege bigessage bigessage </p>
                        </div> 
                    </div>
                    )}


                </div>
            






            <Rich_text_input/>




        </div>
    )
}







export default Main_container;