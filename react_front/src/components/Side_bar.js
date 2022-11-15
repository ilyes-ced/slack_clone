function Side_bar(props) {
    console.log(props.channels)
    return(
        <div id='side_bar'>


            <div className='side_bar_elements'  id='workspace_div'>
                {props.workspace.name}
            </div>


            <div id='side_bar_options' className='side_bar_elements' >
                <div className='options_elements side_bar_sub_elements'>setting1</div>
                <div className='options_elements side_bar_sub_elements'>s 2</div>
                <div className='options_elements side_bar_sub_elements'> s3</div>
            </div>


            <div id='side_bar_channels' className='side_bar_elements' >
                <div className='channels_elements side_bar_sub_elements'>add channel here</div>
                {props.channels.map(element => <div key={element.id } className='channels_elements side_bar_sub_elements'>{element.name}</div> )}
            </div>


            <div id='side_bar_chats' className='side_bar_elements' >
                <div className='chats_elements side_bar_sub_elements'>to</div>
                <div className='chats_elements side_bar_sub_elements'>to</div>
                <div className='chats_elements side_bar_sub_elements'>to</div>
                <div className='chats_elements side_bar_sub_elements'>to</div>
                <div className='chats_elements side_bar_sub_elements'>to</div>
            </div>
        
        
        
        </div>
    )
}







export default Side_bar;