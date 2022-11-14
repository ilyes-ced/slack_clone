import { useState, useRef, createElement } from 'react'


function Rich_text_input() {
    const text_input = useRef(null)
    const [is_disabled, change_ability] = useState(false)
    const text_value = [{type: 'strong',content:'hello boldy'}, {type: 'i',content:'italia'}]
    var vv =    ''
    for(let i=0; i< text_value.length; i++){
        vv = vv + '<'+text_value[i].type+'>'+text_value[i].content+'</'+text_value[i].type+'>'
    }
    console.log(vv)


    const clicked = (e) => {
        if(e.target.innerText == 'bold'){
            e.target.style.backgroundColor = 'green' === 'green' ? '' : 'green'
        }
    }

    return(
        <div id='rich_text_input'>
            <div id='rich_text_input_content'>
                <div id='rich_text_top_icon_bar'>
                    <button disabled={is_disabled} onClick={clicked} className='text_icons'>bold</button>
                    <button disabled={is_disabled} onClick={clicked} className='text_icons'>italic</button>
                    <button disabled={is_disabled} onClick={clicked} className='text_icons'>line over</button>
                    <button disabled={is_disabled} onClick={clicked} className='text_icons'>link</button>
                    <button disabled={is_disabled} onClick={clicked} className='text_icons'>list</button>
                    <button disabled={is_disabled} onClick={clicked} className='text_icons'>numbered list</button>
                    <button disabled={is_disabled} onClick={clicked} className='text_icons'>quote</button>
                    <button disabled={is_disabled} onClick={clicked} className='text_icons'>code</button>
                    <button disabled={is_disabled} onClick={clicked} className='text_icons'>code block</button>
                </div>
                <div contenteditable="true" id='rich_text_field' dangerouslySetInnerHTML={{ __html: vv }}></div>
                {/* {onBlur={() => {change_ability(true)} 
                <textarea  ref={text_input} onKeyUp={textarea_size} onFocus={() => {change_ability(false)}}  name="" ></textarea>
                */}
                <div id='rich_text_bottom_icon_bar'>
                    icons here
                    <div id='submit_text'>
                        send_icon
                    </div>
                </div>
            </div>
        </div>
    )
}







export default Rich_text_input;