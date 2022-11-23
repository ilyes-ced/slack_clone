import { useEffect, useState, useRef, createElement } from 'react'
import { socket } from '../events/socket'



function Rich_text_input() {
    const text_input = useRef(null)
    const [is_disabled, change_ability] = useState([true,true,true,true,true,true,true,true,true])
    const [text_value, change_text_value] = useState([{classes: 'bold',content:'hello boldy'}, {classes: 'italic',content:'italia'}])
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

      
    const icon_click = (e) => {
        if(e.target.classList.contains('text_icons')){
            //change_ability([true,true,true,true,true,true,true,true,true])
            text_input.current.focus()
        }

        e.target.style.backgroundColor = (e.target.style.backgroundColor  == 'green' ) ? '' : 'green'
        change_text_value([...text_value, {classes : e.target.id, content:''}])
        
    }
    const submit_text = () => {

        //text_value_tempo = text_value
        for(let i = 0; i < text_input.current.children.length; i++){
            console.log(text_input.current.children[i].innerText)
            text_value_tempo.push({classes : [...text_input.current.children[i].classList] ,content : text_input.current.children[i].innerText})
        }
        console.log(text_value_tempo)
        socket.emit('sent_message', {value: text_value_tempo })
    }
    const input_change = (e) => {
        

        /*
        //alert(text_input.current.textContent)
        text_value_tempo = text_value
        text_value_tempo[text_value_tempo.length-1].content = text_value_tempo[text_value_tempo.length-1].content+text_input.current.textContent
        //text_input.current.innerText = ''
        change_text_value(text_value_tempo)
        console.log(text_value)


        if(text_value[text_value.length-1].content == ""){
            change_text_value(text_input.pop())
        }*/
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

                
                <div ref={text_input} contenteditable="true" id='rich_text_field' onInput={input_change} onFocus={() => {change_ability(false)}} >
                    {text_value.map((element) => <div className={element.classes}> {element.content} </div>)}
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