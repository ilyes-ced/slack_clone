import { useEffect, useState, useRef, createElement, useInsertionEffect } from 'react'



function Rich_text_input(props) {
    const text_input = useRef(null)
    const [is_disabled, change_ability] = useState([true,true,true,true,true,true,true,true,true])
    const [first_focus, set_first_focus] = useState(true)
    const [text_value, change_text_value] = useState([{classes: '',content:''}])
    var text_value_tempo = []
    //change_text_value([...text_value, {classes: 'test class', content: 'rugerughzpurq'}])



    useEffect(() => {        
        function handleClickOutside(event) {
          if (text_input.current && !text_input.current.contains(event.target)) {
            //alert("You clicked outside of me!")
          }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
          document.removeEventListener("mousedown", handleClickOutside)
        }
      }, [/*text_input*/])

      useEffect(() => {
        if(!first_focus){
            var tag = document.getElementById("rich_text_field")
            var setpos = document.createRange()
            var set = window.getSelection()
            setpos.setStart(tag.childNodes[tag.childNodes.length-1], 0)
            setpos.collapse(true)
            set.removeAllRanges()
            set.addRange(setpos)
            tag.focus()
        }
      }, [text_value])
      
    const icon_click = (e) => {
        //text_input.current.focus()
        
        e.target.style.backgroundColor = (e.target.style.backgroundColor  == 'green' ) ? '' : 'green'
        change_text_value([...text_value, {classes : e.target.id, content:''}])
        

        
    }
    const submit_text = () => {
        console.log('clickeddddddddddddddd')
        //text_value_tempo = text_value
        for(let i = 0; i < text_input.current.children.length; i++){
            console.log(text_input.current.children[i].innerText)
            text_value_tempo.push({classes : [...text_input.current.children[i].classList] ,content : text_input.current.children[i].innerText})
        }
        //console.log(text_value_tempo)
        props.socket.emit('sent_message', {value: text_value_tempo, channel: props.current_channel, channel_type: props.current_channel_type })
    }
    const input_focus = () => {
        change_ability(false)
        if(first_focus){
            var tag = document.getElementById("rich_text_field")
            var setpos = document.createRange()
            var set = window.getSelection()
            setpos.setStart(tag.childNodes[0], 0)
            setpos.collapse(true)
            set.removeAllRanges()
            set.addRange(setpos)
            tag.focus()
            set_first_focus(false)
        }
    }
    return(
        <div id='rich_text_input'>
            
            <div id='rich_text_input_content'>
                <div id='rich_text_top_icon_bar'>
                    <button disabled={is_disabled[0]} onClick={icon_click} className='text_icons' id='bold' >bold</button>
                    <button disabled={is_disabled[1]} onClick={icon_click} className='text_icons' id='italic' >italic</button>
                    <button disabled={is_disabled[2]} onClick={icon_click} className='text_icons' id='line_over' >line over</button>
                    <button disabled={is_disabled[3]} onClick={icon_click} className='text_icons' id='link' >link</button>
                    <button disabled={is_disabled[4]} onClick={icon_click} className='text_icons' id='list' >list</button>
                    <button disabled={is_disabled[5]} onClick={icon_click} className='text_icons' id='numbered_list' >numbered list</button>
                    <button disabled={is_disabled[6]} onClick={icon_click} className='text_icons' id='quote' >quote</button>
                    <button disabled={is_disabled[7]} onClick={icon_click} className='text_icons' id='code' >code</button>
                    <button disabled={is_disabled[8]} onClick={icon_click} className='text_icons' id='code_block' >code block</button>
                </div>

                
                <div ref={text_input} contenteditable="true" id='rich_text_field' onFocus={ input_focus }  >
                    {text_value.map((element, index, arr) =>
                        <div className={element.classes}> {element.content} </div>
                    )}
                </div>
                {/* {onBlur={() => {change_ability(true)} 
                <textarea  ref={text_input} onKeyUp={textarea_size} onFocus={() => {change_ability(false)}}  name="" ></textarea>
                */}
                <div id='rich_text_bottom_icon_bar'>
                    icons here
                    <div id='submit_text' onClick={submit_text}>
                        send_icon
                    </div>
                </div>
            </div>
        </div>
    )
}







export default Rich_text_input;