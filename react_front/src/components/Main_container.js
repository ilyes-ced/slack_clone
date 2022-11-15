import Rich_text_input from "./Rich_text_input";
import event_bus from "../events/event_bus";
import { useEffect, useState } from "react";




function Main_container(props) {

    const [current_channel, set_current_channel] = useState(props.channels[0])
    useEffect(() => {
        event_bus.on("select_chat", (data) =>{
            alert('data is here dispatched')
            props.channels.find(ele => console.log(ele.id=4))
        })
    }, [])





    return(
        <div id='main_container'>





                <div>
                    <div id='main_container_title_bar'>
                        <div id='main_container_title'>{current_channel}</div>
                        <div id='main_container_options'>number of members active members ans show all members</div>
                    </div>

                    <div id='messages_cntainer'>
                        <div className='period_of_messages'>
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
                                    <p className="message_content">message big</p>
                                </div>
                            </div>
                            <div className='message_same_user'>
                                <p className="message_content">e  e bigege bigessage bigessage </p>
                            </div> 
                        </div>
                    </div>
                </div>
            






            <Rich_text_input/>




        </div>
    )
}







export default Main_container;