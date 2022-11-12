import Rich_text_input from "./Rich_text_input";

function Main_container() {
    return(
        <div id='main_container'>

            <div id='main_container_title_bar'>
                <div id='main_container_title'>title</div>
                <div id='main_container_options'>icons here</div>
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
                            <p className="message_content">message bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage bigessage big</p>
                        </div>
                    </div>

                

                </div>



            </div>


            <Rich_text_input/>




        </div>
    )
}







export default Main_container;