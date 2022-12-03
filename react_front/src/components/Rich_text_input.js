import { useEffect, useState, useRef, createElement, useInsertionEffect } from 'react'
import {BsTypeBold, BsTypeItalic, BsTypeStrikethrough, BsLink45Deg, BsListUl, BsListOl, BsFillChatLeftQuoteFill, BsBraces, BsCodeSquare, BsChevronDown} from "react-icons/bs";



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

      //useEffect(() => {
      //  if(!first_focus){
      //      var tag = document.getElementById("rich_text_field")
      //      var setpos = document.createRange()
      //      var set = window.getSelection()
      //      tag.innerHTML = tag.innerHTML+'<div class="bold"></div>'

      //      setpos.setStart(tag.childNodes[tag.childNodes.length-1], 0)
      //      setpos.collapse(true)
      //      set.removeAllRanges()
      //      set.addRange(setpos)
      //      tag.focus()
      //  }
      //}, [text_value])
      
    const icon_click = (e) => {
        //text_input.current.focus()
        alert(e.target.id)
        e.target.style.backgroundColor = (e.target.style.backgroundColor  == 'green' ) ? '' : 'green'
        //change_text_value([...text_value, {classes : e.target.id, content:''}])
        
        var tag = document.getElementById("rich_text_field")
        var setpos = document.createRange()
        var set = window.getSelection()
        tag.innerHTML = '<div class="'+e.target.id+'"></div>'

        setpos.setStart(tag.childNodes[tag.childNodes.length-1], 0)
        setpos.collapse(true)
        set.removeAllRanges()
        set.addRange(setpos)
        tag.focus()
        
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
                    <button disabled={is_disabled[0]} onClick={icon_click} className='text_icons' id='bold' ><BsTypeBold/></button>
                    <button disabled={is_disabled[1]} onClick={icon_click} className='text_icons' id='italic' ><BsTypeItalic/></button>
                    <button disabled={is_disabled[2]} onClick={icon_click} className='text_icons' id='line_over' ><BsTypeStrikethrough/></button>
                    <button disabled={is_disabled[3]} onClick={icon_click} className='text_icons' id='link' ><BsLink45Deg/></button>
                    <button disabled={is_disabled[4]} onClick={icon_click} className='text_icons' id='list' ><BsListUl/></button>
                    <button disabled={is_disabled[5]} onClick={icon_click} className='text_icons' id='numbered_list' ><BsListOl/></button>
                    <button disabled={is_disabled[6]} onClick={icon_click} className='text_icons' id='quote' ><BsFillChatLeftQuoteFill/></button>
                    <button disabled={is_disabled[7]} onClick={icon_click} className='text_icons' id='code' ><BsBraces/></button>
                    <button disabled={is_disabled[8]} onClick={icon_click} className='text_icons' id='code_block' ><BsCodeSquare/></button>
                </div>

                
                <div ref={text_input} contenteditable="true" id='rich_text_field' onFocus={ input_focus }  >
                    {text_value.map((element, index, arr) =>
                        <div key={index} className={element.classes}> {element.content} </div>
                    )}
                </div>
                {/* {onBlur={() => {change_ability(true)} 
                <textarea  ref={text_input} onKeyUp={textarea_size} onFocus={() => {change_ability(false)}}  name="" ></textarea>
                */}
                <div id='rich_text_bottom_icon_bar'>
                    icons here
                    <div id='submit_text' >
                        <div onClick={submit_text}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                            </svg>
                        </div>
                        <div></div>
                        <div>
                            <BsChevronDown/>
                        </div>
                    </div>
                </div>


                
            </div>
        </div>
    )
}







export default Rich_text_input;